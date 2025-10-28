import ModalBase from "@/components/manual/modal-base";
import Field from "@/components/manual/field";
import SubmitButton from "@/components/manual/submit-button";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

interface Paciente {
  id: number;
  nome: string;
}

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  pacientes: Paciente[];
}

export default function ModalCriarConsulta({ open, setOpen, pacientes }: Props) {
  // local separate fields for date and time to avoid DatePicker issues
  const [dateStr, setDateStr] = useState<string>("");
  const [timeStr, setTimeStr] = useState<string>("");

  const { data, setData, post, processing, errors, reset } = useForm({
    pacientes_id: "",
    data: "",
    procedimento: "",
  });

  useEffect(() => {
    // reset local inputs when modal closes
    if (!open) {
      reset();
      setDateStr("");
      setTimeStr("");
    }
  }, [open]);

  // combine date and time into ISO string
  const combineAndSet = (d?: string, t?: string) => {
    const datePart = d ?? dateStr;
    const timePart = t ?? timeStr;

    if (!datePart) {
      setData("data", "");
      return;
    }

    // datePart expected as YYYY-MM-DD, timePart as HH:MM
    const [y, m, day] = datePart.split("-").map(Number);
    const [hh = 0, mm = 0] = (timePart || "").split(":").map(Number);
    const dt = new Date(y, (m || 1) - 1, day || 1, hh || 0, mm || 0, 0);
    setData("data", dt.toISOString());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route("consultas.store"), {
      preserveScroll: true,
      onSuccess: () => {
        setOpen(false);
        reset();
        setDateStr("");
        setTimeStr("");
      },
    });
  };

  return (
    <ModalBase open={open} setOpen={setOpen} titulo="Nova Consulta">
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <Field label="Paciente">
            <select
              className="w-full rounded border px-2 py-1"
              value={data.pacientes_id}
              onChange={(e) => setData("pacientes_id", e.target.value)}
            >
              <option value="">Selecione o paciente...</option>
              {pacientes.map((p) => (
                <option key={p.id} value={String(p.id)}>
                  {p.nome}
                </option>
              ))}
            </select>
            {errors.pacientes_id && (
              <div className="text-destructive text-sm">{errors.pacientes_id}</div>
            )}
          </Field>

          <Field label="Procedimento">
            <input
              className="w-full rounded border px-2 py-1"
              value={data.procedimento}
              onChange={(e) => setData("procedimento", e.target.value)}
              placeholder="Digite o procedimento"
            />
            {errors.procedimento && (
              <div className="text-destructive text-sm">{errors.procedimento}</div>
            )}
          </Field>

          <div className="grid grid-cols-2 gap-2">
            <Field label="Data">
              <input
                type="date"
                className="w-full rounded border px-2 py-1"
                value={dateStr}
                onChange={(e) => {
                  setDateStr(e.target.value);
                  combineAndSet(e.target.value, undefined);
                }}
              />
            </Field>

            <Field label="Hora">
              <input
                type="time"
                className="w-full rounded border px-2 py-1"
                value={timeStr}
                onChange={(e) => {
                  setTimeStr(e.target.value);
                  combineAndSet(undefined, e.target.value);
                }}
              />
            </Field>
          </div>

        </div>

        <div className="grid grid-flow-col md:w-50 mt-5 ml-auto gap-3">
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <SubmitButton processing={processing} />
        </div>
      </form>
    </ModalBase>
  );
}