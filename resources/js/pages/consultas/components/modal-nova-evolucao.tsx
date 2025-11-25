import ModalBase from "@/components/manual/modal-base";
import Field from "@/components/manual/field";
import SubmitButton from "@/components/manual/submit-button";
import { Button } from "@/components/ui/button";
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
  procedimentos: any[];
  consultaSelecionada?: any; // recebe a consulta clicada na tabela
}

export default function ModalNovaEvolucao({
  open,
  setOpen,
  pacientes,
  procedimentos,
  consultaSelecionada,
}: Props) {
  const [dateStr, setDateStr] = useState<string>("");
  const [timeStr, setTimeStr] = useState<string>("");

  const { data, setData, post, processing, errors, reset } = useForm({
    pacientes_id: "",
    data: "",
    procedimentos_id: "",
    observacoes: "",
  });

  // junta data + hora em ISO
  const combineAndSet = (d?: string, t?: string) => {
    const datePart = d ?? dateStr;
    const timePart = t ?? timeStr;

    if (!datePart) {
      setData("data", "");
      return;
    }

    const [y, m, day] = datePart.split("-").map(Number);
    const [hh = 0, mm = 0] = (timePart || "").split(":").map(Number);

    const dt = new Date(y, m - 1, day, hh, mm, 0);

    // para campos DATE
    const mysqlDate = dt.toISOString().slice(0, 10);

    setData("data", mysqlDate);
  };

  // Quando abrir modal → pré-preencher se veio de uma consulta
  useEffect(() => {
    if (open && consultaSelecionada) {
      // Paciente
      setData("pacientes_id", consultaSelecionada.paciente?.id || "");

      // Procedimento (STRING - conforme o controller exige)
      setData(
        "procedimentos_id",
        String(consultaSelecionada.procedimento?.id ?? "")
      );

      // Data/hora
      const dt = new Date(consultaSelecionada.data);
      const d = dt.toISOString().slice(0, 10);
      const t = dt.toISOString().slice(11, 16);

      setDateStr(d);
      setTimeStr(t);
      combineAndSet(d, t);
    }

    // se fechou a modal → reseta tudo
    if (!open) {
      reset();
      setDateStr("");
      setTimeStr("");
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    post(route("evolucoes.store"), {
      preserveScroll: true,
      onSuccess: () => {
        setOpen(false);
        reset();
        setDateStr("");
        setTimeStr("");
      },
    });
  };
  console.log(data);

  return (
    <ModalBase open={open} setOpen={setOpen} titulo="Nova Evolução">
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4">
          {/* PACIENTE */}
          <Field label="Paciente">
            <select
              className="w-full rounded border px-2 py-1"
              value={data.pacientes_id}
              onChange={(e) => setData("pacientes_id", e.target.value)}
            >
              <option value="">Selecione...</option>
              {pacientes.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nome}
                </option>
              ))}
            </select>
            {errors.pacientes_id && (
              <div className="text-destructive text-sm">
                {errors.pacientes_id}
              </div>
            )}
          </Field>

          {/* PROCEDIMENTO */}
          <Field label="Procedimento">
            <select
              className="w-full rounded border px-2 py-1"
              value={data.procedimentos_id}
              onChange={(e) => setData("procedimentos_id", e.target.value)}
            >
              <option value="">Selecione...</option>
              {procedimentos.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nome}
                </option>
              ))}
            </select>
            {errors.procedimentos_id && (
              <div className="text-destructive text-sm">
                {errors.procedimentos_id}
              </div>
            )}
          </Field>

          {/* DATA + HORA */}
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

          {/* OBSERVAÇÕES */}
          <Field label="Observações">
            <textarea
              className="w-full rounded border px-2 py-1"
              rows={3}
              value={data.observacoes}
              onChange={(e) => setData("observacoes", e.target.value)}
            />
            {errors.observacoes && (
              <div className="text-destructive text-sm">
                {errors.observacoes}
              </div>
            )}
          </Field>
        </div>

        {/* BOTÕES */}
        <div className="grid grid-flow-col md:w-50 mt-5 ml-auto gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancelar
          </Button>
          <SubmitButton processing={processing} />
        </div>
      </form>
    </ModalBase>
  );
}
