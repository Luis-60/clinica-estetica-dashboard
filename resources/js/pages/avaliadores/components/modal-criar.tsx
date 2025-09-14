import { ComboBox } from "@/components/manual/combo-box";
import Field from "@/components/manual/field";
import ModalBase from "@/components/manual/modal-base";
import MultiSelect from "@/components/manual/multi-select";
import SubmitButton from "@/components/manual/submit-button";
import { AutoComplete } from "@/components/ui/auto-complete-input";
import { Button } from "@/components/ui/button";
import { Area } from "@/models/Area";
import { Usuario } from "@/models/Usuario";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dado: Usuario | null;
  areas: Area[];
}

export default function ModalCriar({ open, setOpen, dado, areas }: Props) {
  useEffect(() => {
    if (open === false) {
      reset();
      clearErrors();
    }
  }, [open]);

  const { data, setData, post, processing, errors, clearErrors, reset } =
    useForm<Required<{ nome: string; email: string }>>({
      nome: "",
      email: "",
    });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    post(route("orientadores.store"), {
      preserveScroll: true,
      onSuccess: () => {
        setOpen(false);
      },
      onError: (errors) => {
        console.error(JSON.stringify(errors));
      },
    });
  };

  const [selectedAreas, setSelectedAreas] = useState([]);
  return (
    <ModalBase open={open} setOpen={setOpen} titulo="Cadastrar Avaliador">
      <form onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <Field label="Áreas">
            <MultiSelect
              options={areas.map((o) => ({
                value: o.sigla,
                label: o.nome,
              }))}
              selectedValues={selectedAreas}
              setSelectedValues={setSelectedAreas}
              placeholder="Selecione as áreas..."
            />
          </Field>
          <Field
            label="Nome"
            value={data.nome}
            onChange={(e) => {
              setData({ ...data, nome: e.target.value });
            }}
            errors={errors.nome}
          />
          <Field
            label="E-mail"
            value={data.email}
            onChange={(e) => {
              setData({ ...data, email: e.target.value });
            }}
            errors={errors.email}
          />
        </div>
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
