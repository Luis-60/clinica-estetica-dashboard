import Field from "@/components/manual/field";
import ModalBase from "@/components/manual/modal-base";
import SubmitButton from "@/components/manual/submit-button";
import { AutoComplete, type Option } from "@/components/ui/auto-complete-input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import FormBuilder from "@/lib/formBuilder";
import { Usuario } from "@/models/Usuario";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dado: Usuario | null;
  cursos?: Option[];
}
export default function ModalCriar({ open, setOpen, dado, cursos = [] }: Props) {
  useEffect(() => {
    if (open === false) {
      reset();
      clearErrors();
    }
  }, [open]);
  const [value, setValue] = useState<Option>({ value: '', label: '' });

  const { data, setData, post, processing, errors, clearErrors, reset } =
    useForm<Required<{ nome: string; email: string; cursos_id: string }>>({
      nome: "",
      email: "",
      cursos_id: "",
    });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    post(route("coordenadores.store"), {
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
    <ModalBase open={open} setOpen={setOpen} titulo="Cadastrar Coordenador">
      <form onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <Label>
            Cursos
          </Label>
          <AutoComplete
            options={cursos.map(i => ({
              value: String(i.id),
              label: i.nome,
            }))}
            isLoading={false}
            emptyMessage="Nenhum curso encontrado"
            value={value}
            onValueChange={(e) => { setValue(e); setData("cursos_id", e.value)}}
            placeholder="Pesquisar Cursos..."
            />
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
