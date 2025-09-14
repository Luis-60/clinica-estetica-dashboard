import { Textarea } from "@/components/ui/textarea";
import { router, useForm, usePage } from "@inertiajs/react";
import { SerializedEditorState, SerializedLexicalNode } from "lexical";
import React, { useState } from "react";
import { ComboBox } from "../../../components/manual/combo-box";
import TextEditor from "../../../components/manual/text-editor";
import { Button } from "../../../components/ui/button";
import { UserInfo } from "../../../components/user-info";

interface Instituicao {
  nome: string;
  [key: string]: any;
}

interface AvaliacaoForm {
  artigos_id: string;
  avaliacao: string;
  sugestao: string;
  status_id: string;
  status: string;
  [key: string]: string;
}
interface EvaluateCardProps {
  open: boolean;
  status: any;
  artigoId: number;
  onClose: () => void;
}

export function EvaluateCard({
  open,
  onClose,
  artigoId,
  status,
}: EvaluateCardProps) {
  const [registerStep, setRegisterStep] = useState(1);
  const [txtAvaliacao, setTxtAvaliacao] = useState<any>();
  const [txtSugestao, setTxtSugestao] = useState<any>();

  const [selectedStatus, setSelectedStatus] = useState<any>(null);
  const { auth } = usePage().props as any;
  if (!open) return null;
  if (!open) return null;
  const { data, setData, processing, errors, reset } = useForm<AvaliacaoForm>({
    artigos_id: artigoId.toString(),
    avaliacao: "",
    sugestao: "",
    status_id: "",
    status: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avaliacao", JSON.stringify(txtAvaliacao));
    formData.append("sugestao", JSON.stringify(txtSugestao));
    formData.append("status", data.status);
    formData.append("status_id", parseInt(data.status_id).toString());
    formData.append("artigos_id", parseInt(data.artigos_id).toString());

    router.post(route("avaliacao.updateSeac", artigoId), formData, {
      onSuccess: () => {
        console.log("Success!");
        reset();
      },
      onError: (errors) => {
        console.error("Errors:", errors);
      },
    });
  };

  console.log("FormData:", data);

  const handleFieldChange = (field: string, value: string | null | boolean) => {
    let processedValue = value;
    setData((prev) => ({
      ...prev,
      [field]:
        processedValue !== null && processedValue !== undefined
          ? String(processedValue)
          : "",
    }));
  };

  return (
    <div className="border rounded-lg p-6">
      <div className="flex gap-4 mb-4 ">
        <UserInfo user={auth.user} />

        <Button
          size="icon"
          variant="ghost"
          className="end-0 hover:bg-gray-200"
          onClick={() => {
            onClose();
            setRegisterStep(1);
          }}
          title="Remover"
        >
          ×
        </Button>
      </div>
      {/* Campos do formulário por etapa */}
      <form action="" onSubmit={handleSubmit}>
        {registerStep === 1 && (
          <>
            <label className="m-1 font-bold">Avaliação</label>
            <TextEditor
              placeholder="Digite sua avaliação para o artigo aqui..."
              value={txtAvaliacao}
              onChange={(value) => setTxtAvaliacao(value)}
            />

            <div className="flex justify-end gap-2 mt-4">
              <Button
                type="button"
                onClick={() => setRegisterStep(2)}
                className="bg-blue-600 text-white"
              >
                Próximo
              </Button>
            </div>
          </>
        )}
        {registerStep === 2 && (
          <>
            <label className="m-1 font-bold">Sugestão</label>
            <TextEditor
              placeholder="Digite sua sugestão para o artigo aqui..."
              value={txtSugestao}
              onChange={(value) => setTxtSugestao(value)}
            />
            <div className="flex items-center justify-between gap-2 mt-4 w-full">
              <div className="flex gap-2 items-center">
                <span className="text-lg text-gray-800">Status:</span>
                <ComboBox
                  value={data.status_id}
                  onChange={(e) => handleFieldChange("status_id", e)}
                  options={status.map((s: any) => ({
                    value: s.id.toString(),
                    label: s.nome,
                  }))}
                ></ComboBox>
              </div>
              <div className="flex gap-2 items-center">
                <Button
                  type="button"
                  onClick={() => setRegisterStep(1)}
                  variant="outline"
                >
                  Voltar
                </Button>
                <Button type="submit" className="bg-blue-600 text-white">
                  Avaliar
                </Button>
              </div>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
