import { DatePicker } from "@/components/manual/date-picker";
import Field from "@/components/manual/field";
import ModalBase from "@/components/manual/modal-base";
import SubmitButton from "@/components/manual/submit-button";
import { Label } from "@/components/ui/label";
import { Evolucao } from "@/models/Evolucao";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  pacienteId: number;
  dado?: Evolucao | null;
}

export default function ModalCriarEvolucao({ open, setOpen, pacienteId, dado }: Props) {
  useEffect(() => {
    if (open === false) {
      reset();
      clearErrors();
    }
  }, [open]);

  function newForm() {
    return {
      id: dado?.id ?? 0,
      data: dado?.data ?? "",
      procedimento: dado?.procedimento ?? "",
      observacoes: dado?.observacoes ?? "",
      pacientes_id: pacienteId,
    };
  }

  const { data, setData, post, put, processing, errors, clearErrors, reset } =
    useForm<
      Required<{
        id: number;
        data: string;
        procedimento: string;
        observacoes: string;
        pacientes_id: number;
      }>
    >(newForm());

  useEffect(() => {
    setData(newForm());
  }, [dado, pacienteId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (data.id !== 0) {
      put(route("evolucoes.update", data.id), {
        preserveScroll: true,
        onSuccess: () => {
          setOpen(false);
        },
        onError: (errors) => {
          console.error(JSON.stringify(errors));
        },
      });
      return;
    }

    post(route("evolucoes.store"), {
      preserveScroll: true,
      onSuccess: () => {
        setOpen(false);
      },
      onError: (errors) => {
        console.error(JSON.stringify(errors));
      },
    });
  };

  return (
    <ModalBase 
      open={open} 
      setOpen={setOpen} 
      titulo={dado ? "Editar Evolução" : "Nova Evolução"}
    >
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <div>
            <Label>Data da Evolução</Label>
            <DatePicker
              value={data.data}
              onChange={(date) => {
                if (date instanceof Date && !isNaN(date.getTime())) {
                  const dateString = date.toISOString().split("T")[0];
                  setData({ ...data, data: dateString });
                }
              }}
            />
            {errors.data && (
              <p className="text-red-500 text-sm mt-1">{errors.data}</p>
            )}
          </div>

          <Field
            label="Procedimento"
            value={data.procedimento}
            onChange={(e) => {
              setData({ ...data, procedimento: e.target.value });
            }}
            errors={errors.procedimento}
            placeholder="Digite o nome do procedimento realizado"
          />

          <div>
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              placeholder="Digite observações sobre a evolução do paciente..."
              value={data.observacoes}
              onChange={(e) => {
                setData({ ...data, observacoes: e.target.value });
              }}
              className="mt-2 min-h-[100px]"
            />
            {errors.observacoes && (
              <p className="text-red-500 text-sm mt-1">{errors.observacoes}</p>
            )}
          </div>
        </div>

        <div className="grid grid-flow-col mt-6 ml-auto gap-3">
          <SubmitButton
            processing={processing}
            label={dado ? "Salvar Alterações" : "Criar Evolução"}
          />
        </div>
      </form>
    </ModalBase>
  );
}
