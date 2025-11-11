import Field from "@/components/manual/field";
import ModalBase from "@/components/manual/modal-base";
import SubmitButton from "@/components/manual/submit-button";
import { Label } from "@/components/ui/label";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";
import { Medicamento } from "@/models/Medicamento";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dado: Medicamento | null;
  categorias?: { id: number; nome: string }[];
  marcas?: { id: number; nome: string }[];
}

export default function ModalCriar({ open, setOpen, dado, categorias = [], marcas = [] }: Props) {
  useEffect(() => {
    if (!open) {
      reset();
      clearErrors();
    }
  }, [open]);

  function newForm() {
    return {
      id: dado?.id ?? 0,
      nome: dado?.nome ?? "",
      descricao: dado?.descricao ?? "",
      valor: dado?.valor ?? 0,
      estoque: dado?.estoque ?? 0,
      imagem: dado?.imagem ?? "",
      categorias_id: dado?.categorias_id ?? 0,
      marcas_id: dado?.marcas_id ?? 0,
    };
  }

  const { data, setData, post, put, processing, errors, clearErrors, reset } =
    useForm<
      Required<{
        id: number;
        nome: string;
        descricao: string;
        valor: number;
        estoque: number;
        imagem: string;
        categorias_id: number;
        marcas_id: number;
      }>
    >(newForm());

  useEffect(() => {
    setData(newForm());
  }, [dado]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as any);
    });

    if (data.id !== 0) {
      put(route("medicamentos.update", data.id), {
        preserveScroll: true,
        onSuccess: () => setOpen(false),
        onError: (errors) => console.error(errors),
      });
      return;
    }

    post(route("medicamentos.store"), {
      data: formData,
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => setOpen(false),
      onError: (errors) => console.error(errors),
    });
  };

  return (
    <ModalBase
      open={open}
      setOpen={setOpen}
      titulo={dado ? "Editar Medicamento" : "Cadastrar Medicamento"}
    >
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="grid gap-4">
          <Field
            label="Nome do Medicamento"
            value={data.nome}
            onChange={(e) => setData("nome", e.target.value)}
            errors={errors.nome}
            placeholder="Digite o nome do medicamento"
          />

          <Field
            label="Descrição"
            value={data.descricao}
            onChange={(e) => setData("descricao", e.target.value)}
            errors={errors.descricao}
            placeholder="Breve descrição do medicamento"
          />

          <Field
            label="Valor (R$)"
            type="number"
            value={data.valor}
            onChange={(e) => setData("valor", parseFloat(e.target.value))}
            errors={errors.valor}
            placeholder="0.00"
          />

          <Field
            label="Estoque"
            type="number"
            value={data.estoque}
            onChange={(e) => setData("estoque", parseInt(e.target.value))}
            errors={errors.estoque}
            placeholder="Quantidade em estoque"
          />

          <div>
            <Label>Imagem</Label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setData("imagem", e.target.files[0] as any);
                }
              }}
              className="mt-2 block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-primary/90"
            />
            {errors.imagem && <p className="text-destructive text-sm mt-1">{errors.imagem}</p>}
            {dado?.imagem && (
              <img
                src={`/storage/${dado.imagem}`}
                alt={dado.nome}
                className="mt-3 h-20 w-20 rounded-md object-cover"
              />
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Categoria" errors={errors.categorias_id}>
              <select
                className="border rounded-md px-3 py-2 w-full"
                value={data.categorias_id}
                onChange={(e) => setData("categorias_id", parseInt(e.target.value))}
              >
                <option value={0}>Selecione</option>
                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nome}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Marca" errors={errors.marcas_id}>
              <select
                className="border rounded-md px-3 py-2 w-full"
                value={data.marcas_id}
                onChange={(e) => setData("marcas_id", parseInt(e.target.value))}
              >
                <option value={0}>Selecione</option>
                {marcas.map((marca) => (
                  <option key={marca.id} value={marca.id}>
                    {marca.nome}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        </div>

        <div className="grid grid-flow-col mt-6 ml-auto gap-3">
          <SubmitButton
            processing={processing}
            label={dado ? "Salvar Alterações" : "Cadastrar Medicamento"}
          />
        </div>
      </form>
    </ModalBase>
  );
}
