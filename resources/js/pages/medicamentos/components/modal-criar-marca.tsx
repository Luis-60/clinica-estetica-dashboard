import ModalBase from "@/components/manual/modal-base";
import Field from "@/components/manual/field";
import SubmitButton from "@/components/manual/submit-button";
import { useForm } from "@inertiajs/react";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ModalCriarMarca({ open, setOpen }: Props) {
  const { data, setData, post, processing, errors, reset } = useForm({
    nome: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route("marcas.store"), {
      onSuccess: () => {
        reset();
        setOpen(false);
      },
    });
  };

  return (
    <ModalBase open={open} setOpen={setOpen} titulo="Cadastrar Marca">
      <form onSubmit={handleSubmit}>
        <Field
          label="Nome da Marca"
          value={data.nome}
          onChange={(e) => setData("nome", e.target.value)}
          errors={errors.nome}
          placeholder="Ex: Neo Química"
        />

        <div className="flex justify-end mt-4">
          <SubmitButton processing={processing} label="Salvar" />
        </div>
      </form>
    </ModalBase>
  );
}
