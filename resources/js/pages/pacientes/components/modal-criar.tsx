import Field from "@/components/manual/field";
import ModalBase from "@/components/manual/modal-base";
import SubmitButton from "@/components/manual/submit-button";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Paciente } from "@/models/Paciente";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dado: Paciente | null;
}

export default function ModalCriar({ open, setOpen, dado }: Props) {
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
      data_nasc: dado?.data_nasc ?? "",
      endereco: dado?.endereco ?? "",
      telefone: dado?.telefone ?? "",
      sexo: (dado?.sexo ?? "feminino") as "masculino" | "feminino",
      rede_social: dado?.rede_social ?? "",
    };
  }

  const { data, setData, post, put, processing, errors, clearErrors, reset } =
    useForm<
      Required<{
        id: number;
        nome: string;
        data_nasc: string;
        endereco: string;
        telefone: string;
        sexo: "masculino" | "feminino";
        rede_social: string;
      }>
    >(newForm());

  useEffect(() => {
    setData(newForm());
  }, [dado]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (data.id !== 0) {
      put(route("pacientes.update", data.id), {
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

    post(route("pacientes.store"), {
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
      titulo={dado ? "Editar Paciente" : "Cadastrar Paciente"}
    >
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <Field
            label="Nome Completo"
            value={data.nome}
            onChange={(e) => {
              setData({ ...data, nome: e.target.value });
            }}
            errors={errors.nome}
            placeholder="Digite o nome completo do paciente"
          />
          
          <Field
            label="Data de Nascimento"
            type="date"
            value={data.data_nasc}
            onChange={(e) => {
              setData({ ...data, data_nasc: e.target.value });
            }}
            errors={errors.data_nasc}
          />

          <Field
            label="Endereço"
            value={data.endereco}
            onChange={(e) => {
              setData({ ...data, endereco: e.target.value });
            }}
            errors={errors.endereco}
            placeholder="Digite o endereço completo"
          />

          <Field
            label="Telefone"
            value={data.telefone}
            onChange={(e) => {
              setData({ ...data, telefone: e.target.value });
            }}
            errors={errors.telefone}
            placeholder="(00) 00000-0000"
          />

          <Field
            label="Rede Social"
            value={data.rede_social}
            onChange={(e) => {
              setData({ ...data, rede_social: e.target.value });
            }}
            errors={errors.rede_social}
            placeholder="@usuario ou link da rede social"
          />

          <Field label="Sexo" errors={errors.sexo}>
            <div className="flex gap-6 mt-2">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="feminino"
                  name="sexo"
                  value="feminino"
                  checked={data.sexo === "feminino"}
                  onChange={(e) => {
                    setData({ ...data, sexo: e.target.value as "masculino" | "feminino" });
                  }}
                  className="w-4 h-4"
                />
                <Label htmlFor="feminino">Feminino</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="masculino"
                  name="sexo"
                  value="masculino"
                  checked={data.sexo === "masculino"}
                  onChange={(e) => {
                    setData({ ...data, sexo: e.target.value as "masculino" | "feminino" });
                  }}
                  className="w-4 h-4"
                />
                <Label htmlFor="masculino">Masculino</Label>
              </div>
            </div>
          </Field>
        </div>

        <div className="grid grid-flow-col  mt-6 ml-auto gap-3">
          <SubmitButton
            processing={processing}
            label={dado ? "Salvar Alterações" : "Cadastrar Paciente"}
          />
        </div>
      </form>
    </ModalBase>
  );
}
