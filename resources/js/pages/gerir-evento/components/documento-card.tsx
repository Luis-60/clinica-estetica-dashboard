import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import formatHandler from "@/lib/formatHandler";
import { DatePicker } from "../../../components/manual/date-picker";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { router, useForm } from "@inertiajs/react";
import {
  AutoComplete,
  type Option,
} from "../../../components/ui/auto-complete-input";
import { Documento } from "@/models/Documento";
import Field from "@/components/manual/field";
import InputFile from "@/components/manual/input-file";
import { FileTypes } from "@/components/manual/file-types";
import { Textarea } from "@/components/ui/textarea";
interface CardDocumentoProps {
  open: boolean;
  onClose: () => void;

  documentos?: Documento[];
  eventoId: number | string;
}
const tipo = [
  { label: "Modelo", value: "modelo" },
  { label: "Edital", value: "edital" },
  { label: "Manual", value: "manual" },
  { label: "Orientações", value: "orientacoes" },
];
interface DocumentoForm {
  documento: File[];
  nome: string;
  eventos_id: any;
  descricao: string;
  tipo: string;
  [key: string]: any;
}

export default function DocumentoCard({
  open,
  onClose,
  eventoId,
  documentos = [],
}: CardDocumentoProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState<Option>();
  const { data, setData, processing, errors, reset } = useForm<DocumentoForm>({
    documento: [],
    nome: "",
    tipo: "",
    descricao:"",
    eventos_id: eventoId || "",
  });

  const handleFieldChange = (name: string, value: string) => {
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  console.log(data);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nome", data.nome);
    formData.append("documento", data.documento[0]);
    formData.append("tipo", data.tipo);
    formData.append("descricao", data.descricao)
    formData.append("eventos_id", data.eventos_id);
    router.post(route("eventos.documentos.store", eventoId), formData, {
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
  if (!open) return null;

  return (
    <div ref={contentRef} className="w-full">
      <form onSubmit={handleSubmit}>
        {/* Formulário de nome e datas */}
        <div className="grid md:grid-cols-2 gap-4 ">
          <div className="cols-span-1">
            <Field
              label="Nome"
              value={data.nome}
              onChange={(e) => {
                setData({ ...data, nome: e.target.value });
              }}
              errors={errors.nome}
            />
          </div>
          <div className="mb-4">
            <Field label="Tipo de Documento">
              <AutoComplete
                options={tipo}
                emptyMessage="Nenhum documento encontrado"
                isLoading={false}
                value={value}
                onValueChange={(e) => {
                  setValue(e);
                  handleFieldChange("tipo", e.value);
                }}
                placeholder="Tipo de Documento"
              />
            </Field>
          </div>
        </div>
          <Field
            label="Descrição">
             <Textarea
             value={data.descricao}
             onChange={(e) => {
               setData({ ...data, descricao: e.target.value });
             }}
           />
          </Field>

        <div className="mb-4 mt-4">
          <Field label="Arquivo">
            <InputFile
              label="até 10MB"
              accept=".csv, .pdf, .doc, .docx"
              value={data.documento}
              onChange={(e) => {
                setData({ ...data, documento: [e[0]] });
              }}
            />
        <div className="flex justify-end gap-4 mt-2">
            <Button
            className="w-32"
              type="button"
              onClick={() => onClose()}
              variant="outline"
            >
              Fechar
            </Button>
            <Button
              type="submit"
              className="bg-green-600 text-white w-48"
              disabled={processing}
            >
              {processing ? "Adicionando..." : "Adicionar Documento"}
            </Button>
            </div>
          </Field>
        </div>
      </form>
    </div>
  );
}
