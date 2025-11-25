import { DatePicker } from "@/components/manual/date-picker";
import Field from "@/components/manual/field";
import ModalBase from "@/components/manual/modal-base";
import SubmitButton from "@/components/manual/submit-button";
import { Label } from "@/components/ui/label";
import { Consulta } from "@/models/Consulta";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  pacienteId: number;
  dado?: Consulta | null;
  procedimentos: any[];
}

export default function ModalCriarConsulta({
  open,
  setOpen,
  pacienteId,
  dado,
  procedimentos,
}: Props) {
  useEffect(() => {
    if (!open) {
      reset();
      clearErrors();
    }
  }, [open]);

  function newForm() {
    return {
      id: dado?.id ?? 0,
      data: dado?.data ?? "",
      procedimentos_id: dado?.procedimentos_id ?? "",
      pacientes_id: pacienteId,
    };
  }

  const { data, setData, post, put, processing, errors, reset, clearErrors } =
    useForm<
      Required<{
        id: number;
        data: string;
        procedimentos_id: number | string;
        pacientes_id: number;
      }>
    >(newForm());

  useEffect(() => {
    setData(newForm());
  }, [dado, pacienteId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (data.id !== 0) {
      put(route("consultas.update", data.id), {
        preserveScroll: true,
        onSuccess: () => setOpen(false),
      });
      return;
    }

    post(route("consultas.store"), {
      preserveScroll: true,
      onSuccess: () => setOpen(false),
    });
  };

  return (
    <ModalBase
      open={open}
      setOpen={setOpen}
      titulo={dado ? "Editar Consulta" : "Nova Consulta"}
    >
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4">
          {/* DATA */}
          <div>
            <Label>Data da Consulta</Label>
            <DatePicker
              value={data.data}
              onChange={(date) => {
                if (date instanceof Date && !isNaN(date.getTime())) {
                  const dateString = date.toISOString().split("T")[0];
                  setData("data", dateString);
                }
              }}
            />
            {errors.data && (
              <p className="text-red-500 text-sm mt-1">{errors.data}</p>
            )}
          </div>

          {/* PROCEDIMENTO */}
          <Field label="Procedimento">
            <select
              className="w-full rounded border px-2 py-1"
              value={data.procedimentos_id}
              onChange={(e) => setData("procedimentos_id", e.target.value)}
            >
              <option value="">Selecione o procedimento...</option>

              {procedimentos.map((proc: any) => (
                <option key={proc.id} value={proc.id}>
                  {proc.nome}
                </option>
              ))}
            </select>

            {errors.procedimentos_id && (
              <p className="text-destructive text-sm mt-1">
                {errors.procedimentos_id}
              </p>
            )}
          </Field>

          {/* OBSERVAÇÕES */}
          
        </div>

        <div className="flex justify-end mt-6">
          <SubmitButton
            processing={processing}
            label={dado ? "Salvar Alterações" : "Criar Consulta"}
          />
        </div>
      </form>
    </ModalBase>
  );
}
