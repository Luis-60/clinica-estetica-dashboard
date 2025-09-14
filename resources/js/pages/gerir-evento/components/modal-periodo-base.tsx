import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import formatHandler from "@/lib/formatHandler";
import { DatePicker } from "../../../components/manual/date-picker";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { router, useForm } from "@inertiajs/react";
import { AutoComplete, type Option } from "../../../components/ui/auto-complete-input";
interface Ciclo {
  id: number | string;
  nome: string;
  data_inicio: string;
  data_fim: string;
}

interface ModalPeriodoBaseProps {
  open: boolean;
  onClose: () => void;
  ciclos?: Ciclo[];
  tipo: "SEAC" | "SEGET";
  eventoId: number | string;
}

interface PeriodoForm {
  data_inicio: string;
  data_fim: string;
  ciclos_id: string;
  eventos_id: any;
  [key: string]: any;
}

export default function ModalPeriodoBase({ 
  open, 
  onClose, 
  ciclos = [], 
  tipo,
  eventoId 
}: ModalPeriodoBaseProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState<Option>();
  const { data, setData, processing, errors, reset } = useForm<PeriodoForm>({
    data_inicio: "",
    data_fim: "",
    ciclos_id: "",
    eventos_id: eventoId || "",
  });

  const handleFieldChange = (name: string, value: string) => {
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
console.log(data)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("data_inicio", data.data_inicio);
    formData.append("data_fim", data.data_fim);
    formData.append("eventos_id", data.eventos_id);
    formData.append("ciclos_id", data.ciclos_id || value?.value || "");
    router.post(route("cicloEvento.store", eventoId), formData, {
      preserveScroll: true,
      onSuccess: () => {
        console.log("Success!");
        reset();
        onClose();
      },
      onError: (errors) => {
        console.error("Errors:", errors);
      },
    });
  };

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      document.addEventListener("keydown", handleEsc);
      return () => document.removeEventListener("keydown", handleEsc);
    }
  }, [open, onClose]);

  // Reset form when modal closes
  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/20 flex items-center justify-center z-50"
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div ref={contentRef} className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Adicionar Período {tipo}</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Lista de ciclos */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Ciclos {tipo} cadastrados:</h3>
            {ciclos.length === 0 ? (
              <div className="text-sm text-gray-500">Nenhum ciclo cadastrado.</div>
            ) : (
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {ciclos.map(ciclo => (
                  <div 
                    key={ciclo.id} 
                    className="border rounded px-2 py-1 flex flex-col bg-gray-50"
                  >
                    <span className="font-medium">{ciclo.nome}</span>
                    <span className="text-xs text-gray-600">
                      {ciclo.data_inicio && ciclo.data_fim ? (
                        <>
                          {formatHandler.formatDate(ciclo.data_inicio)} até {formatHandler.formatDate(ciclo.data_fim)}
                        </>
                      ) : (
                        "Datas não disponíveis"
                      )}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Formulário de nome e datas */}
          <div className="mb-4">
            <Label>Nome do Período:</Label>
            <AutoComplete
              options={ciclos.map(ciclo => ({
                label: ciclo.nome,
                value: ciclo.id.toString(),
              }))}
              emptyMessage="Nenhum ciclo encontrado"
              isLoading={false}
              value={value}
              onValueChange={(e) => { setValue(e); handleFieldChange("ciclos_id", e.value)}}
              placeholder="Nome do período"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="col-span-1">
              <Label>Data Início:</Label>
              <DatePicker
                value={data.data_inicio}
                onChange={(date) => {
                  if (date instanceof Date) {
                    const dateString = date.toISOString().split("T")[0];
                    handleFieldChange("data_inicio", dateString);
                  }
                }}
              />
            </div>
            <div className="col-span-1">
              <Label>Data Fim:</Label>
              <DatePicker
                value={data.data_fim}
                onChange={(date) => {
                  if (date instanceof Date) {
                    const dateString = date.toISOString().split("T")[0];
                    handleFieldChange("data_fim", dateString);
                  }
                }}
              />
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <Button 
              type="button" 
              onClick={onClose} 
              variant="outline"
              disabled={processing}
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              className="bg-blue-600 text-white"
              disabled={processing}
            >
              {processing ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
