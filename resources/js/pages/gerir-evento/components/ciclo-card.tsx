import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { DatePicker } from "../../../components/manual/date-picker";
import { Head, router, useForm, Link, usePage } from "@inertiajs/react";

interface CicloCardProps {
  ciclo: any; // Ciclo com dados de cicloEvento incluídos
  eventoId: number | string;
  onUpdate?: (
    id: number | string,
    data: { data_inicio: string; data_fim: string }
  ) => void;
}

interface CicloEventoForm {
  data_inicio: string;
  data_fim: string;
  ciclos_id: string;
  eventos_id: any;
  [key: string]: any;
}

export function CicloCard({
  ciclo,
  eventoId,
  onUpdate,
}: CicloCardProps) {
  const [edit, setEdit] = useState(false);
  const [inicio, setInicio] = useState(ciclo?.data_inicio || "");
  const [fim, setFim] = useState(ciclo?.data_fim || "");
  
  console.log("Ciclo recebido:", ciclo);

  function formatDate(dateString: string) {
    if (!dateString) return "-";
    const parts = dateString.split("-");
    if (parts.length !== 3) return dateString;
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }

  function getDaysDiff(start: string, end: string) {
    if (!start || !end) return 0;
    const d1 = new Date(start);
    const d2 = new Date(end);
    return Math.max(
      0,
      Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24))
    );
  }

  function getDaysLeft(end: string) {
    if (!end) return 0;
    const d2 = new Date(end);
    const today = new Date();
    return Math.max(
      0,
      Math.ceil((d2.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    );
  }

  const diasPeriodo = getDaysDiff(inicio, fim);
  const restante = getDaysLeft(fim);
  
  const { data, setData, processing, errors, reset } = useForm<CicloEventoForm>(
    {
      data_inicio: "",
      data_fim: "",
      ciclos_id: ciclo?.id,
      eventos_id: eventoId || "",
    }
  );

  const handleFieldChange = (name: string, value: string) => {
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting Form Data:", data);
    const formData = new FormData();
    formData.append("data_inicio", data.data_inicio);
    formData.append("data_fim", data.data_fim);
    formData.append("ciclos_id", data.ciclos_id);
    formData.append("eventos_id", data.eventos_id);
    
    router.post(route("cicloEvento.store", eventoId), formData, {
      preserveScroll: true,
      onSuccess: () => {
        console.log("Success!");
        reset();
      },
      onError: (errors) => {
        console.error("Errors:", errors);
      },
    });
  };

  return (
    <div className="w-full border rounded-lg p-4 shadow flex flex-col gap-2">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          {/* Título do ciclo com botão na mesma linha */}
          <div className="flex justify-between items-center">
            <span className="font-bold text-lg">{ciclo?.nome}</span>
            {!edit && (
              <Button size="sm" variant="outline" onClick={() => setEdit(true)}>
                Editar datas
              </Button>
            )}
          </div>
          
          {/* Informações do ciclo */}
          <div className="flex flex-col md:flex-row gap-2 md:gap-6 text-sm">
            <div>
              <span className="font-medium">Início:</span>{" "}
              {formatDate(ciclo?.data_inicio || "")}
            </div>
            <div>
              <span className="font-medium">Fim:</span>{" "}
              {formatDate(ciclo?.data_fim || "")}
            </div>
            <div>
              <span className="font-medium">Período:</span> {diasPeriodo} dias
            </div>
            <div>
              <span className="font-medium">Tempo restante:</span> {restante}{" "}
              dias
            </div>
          </div>
        </div>
        
        {edit && (
          <div className="flex flex-col md:flex-row gap-2 mt-2">
            <DatePicker
              value={inicio}
              onChange={(date) => {
                if (date instanceof Date) {
                  const dateString = date.toISOString().split("T")[0];
                  setInicio(dateString);
                  handleFieldChange("data_inicio", dateString);
                }
              }}
            />

            <DatePicker
              value={fim}
              onChange={(date) => {
                if (date instanceof Date) {
                  const dateString = date.toISOString().split("T")[0];
                  setFim(dateString);
                  handleFieldChange("data_fim", dateString);
                }
              }}
            />
            <Button size="sm" className="bg-blue-600 text-white" type="submit">
              Salvar
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setEdit(false);
                setInicio(ciclo?.data_inicio || "");
                setFim(ciclo?.data_fim || "");
              }}
            >
              Cancelar
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}
