import ModalBase from "@/components/manual/modal-base";
import Field from "@/components/manual/field";
import SubmitButton from "@/components/manual/submit-button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dado?: any | null; // optional procedimento for edit
  pacientes?: any; // optional to be compatible with other modal props if passed
}

export default function ModalCriarProcedimento({ open, setOpen, dado }: Props) {
  useEffect(() => {
    if (open === false) {
      reset();
      clearErrors();
    }
  }, [open]);

  function newForm() {
    return {
      id: dado?.id ?? 0,
      nome: dado?.nome ?? "",
      descricao: dado?.descricao ?? "",
      preco: dado?.preco ?? "",
      ativo: dado?.ativo ?? true,
    };
  }

  const { data, setData, post, put, processing, errors, clearErrors, reset } =
    useForm<Required<{ id: number; nome: string; descricao: string; preco: string | number; ativo: boolean }>>(newForm());

  useEffect(() => {
    setData(newForm());
  }, [dado]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (data.id && data.id !== 0) {
      put(route("procedimentos.update", data.id), {
        preserveScroll: true,
        onSuccess: () => setOpen(false),
      });
      return;
    }

    post(route("procedimentos.store"), {
      preserveScroll: true,
      onSuccess: () => setOpen(false),
    });
  };

  return (
    <ModalBase open={open} setOpen={setOpen} titulo={data.id && data.id !== 0 ? "Editar Procedimento" : "Novo Procedimento"}>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <Field label="Nome">
            <input
              className="w-full rounded border px-2 py-1"
              value={data.nome}
              onChange={(e) => setData("nome", e.target.value)}
              placeholder="Nome do procedimento"
            />
            {errors.nome && <div className="text-destructive text-sm">{errors.nome}</div>}
          </Field>

          <div>
            <Label>Descrição</Label>
            <Textarea
              value={data.descricao}
              onChange={(e) => setData("descricao", e.target.value)}
              className="mt-2"
              placeholder="Descrição do procedimento"
            />
            {errors.descricao && <div className="text-destructive text-sm">{errors.descricao}</div>}
          </div>

          <Field label="Preço">
            <input
              type="number"
              step="0.01"
              className="w-full rounded border px-2 py-1"
              value={data.preco as any}
              onChange={(e) => setData("preco", e.target.value)}
              placeholder="0.00"
            />
            {errors.preco && <div className="text-destructive text-sm">{errors.preco}</div>}
          </Field>

          <div className="flex items-center gap-2">
            <input
              id="ativo"
              type="checkbox"
              checked={Boolean(data.ativo)}
              onChange={(e) => setData("ativo", e.target.checked)}
            />
            <Label htmlFor="ativo">Ativo</Label>
          </div>
        </div>

        <div className="grid grid-flow-col mt-6 ml-auto gap-3">
          <SubmitButton processing={processing} label={data.id && data.id !== 0 ? "Salvar" : "Criar"} />
        </div>
      </form>
    </ModalBase>
  );
}
