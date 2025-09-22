import { DatePicker } from "@/components/manual/date-picker";
import Field from "@/components/manual/field";
import ModalBase from "@/components/manual/modal-base";
import SubmitButton from "@/components/manual/submit-button";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { applyTelMask } from "@/lib/TelMask";
import { Paciente } from "@/models/Paciente";
import { useForm } from "@inertiajs/react";
import { set } from "date-fns";

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
  
  console.log(data);
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
          <Label>
          Data de Nascimento
          </Label>
          <DatePicker
              value={data.data_nasc}
              onChange={(date) => {
                if (date instanceof Date && !isNaN(date.getTime())) {
                  const dateString = date.toISOString().split("T")[0];
                  setData({ ...data, data_nasc: dateString });
                }
              }}
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
              setData({ ...data, telefone: applyTelMask(e.target.value) });
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
                <RadioGroup 
                  className="flex gap-6" 
                  value={data.sexo}
                  onValueChange={(value) => setData({ ...data, sexo: value as "masculino" | "feminino" })}
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="masculino" id="masculino" />
                    <Label htmlFor="masculino">Masculino</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="feminino" id="feminino" />
                    <Label htmlFor="feminino">Feminino</Label>
                  </div>
                </RadioGroup>
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
