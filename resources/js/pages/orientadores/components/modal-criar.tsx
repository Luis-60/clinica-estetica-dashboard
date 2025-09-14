import Field from "@/components/manual/field";
import ModalBase from "@/components/manual/modal-base";
import SubmitButton from "@/components/manual/submit-button";
import { Button } from "@/components/ui/button";
import FormBuilder from "@/lib/formBuilder";
import { Usuario } from "@/models/Usuario";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dado: Usuario | null;
}

export default function ModalCriar({ open, setOpen, dado }: Props) {
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
  return (
    <ModalBase open={open} setOpen={setOpen} titulo="Cadastrar Orientador">
      <form onSubmit={handleSubmit}>
        <div className="grid gap-2">
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
