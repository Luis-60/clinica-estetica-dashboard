import Field from "@/components/manual/field";
import ModalBase from "@/components/manual/modal-base";
import SubmitButton from "@/components/manual/submit-button";
import { Button } from "@/components/ui/button";
import Stepper from "@/components/ui/stepper";
import { applyCEPMask } from "@/lib/CEPMask";
import { applyTelMask } from "@/lib/TelMask";
import { cn } from "@/lib/utils";
import { Usuario } from "@/models/Usuario";
import { useForm } from "@inertiajs/react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPinHouseIcon, UserCheck, Phone, MapPin, Lock } from "lucide-react";
import { useEffect, useState } from "react";

function FieldGroup({ children }: { children: React.ReactNode }) {
  return <div className="md:grid grid-cols-2 gap-2">{children}</div>;
}

export default function ModalAtualizarDados({ usuario }: { usuario: Usuario }) {
  const [open, setOpen] = useState(true);
  const [currentStep, setCurrentStep] = useState(0); // Começar no step 0 (boas-vindas)

  const {
    data,
    setData,
    put,
    processing,
    errors,
    setError,
    clearErrors,
    reset,
  } = useForm<
    Required<{
      senha: string;
      senha_confirmation: string;
      matricula: string;
      estado: string;
      cidade: string;
      endereco: string;
      bairro: string;
      cep: string;
      telefone: string;
    }>
  >({
    senha: "",
    senha_confirmation: "",
    matricula: "",
    estado: "",
    cidade: "",
    endereco: "",
    bairro: "",
    cep: "",
    telefone: "",
  });

  useEffect(() => {
    if (open === false) {
      reset();
      clearErrors();
    }
  }, [open]);

  // Compara Senhas
  useEffect(() => {
    if (processing) return;

    const nenhumaSenhaEstaVazia = data.senha !== "" && data.senha_confirmation !== "";

    if (data.senha !== data.senha_confirmation && nenhumaSenhaEstaVazia) {
      setError("senha", "Senhas não coincidem!");
      return;
    }
    setError("senha", "");
  }, [data.senha, data.senha_confirmation]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    put(route("user.update"), {
      preserveScroll: true,
      onSuccess: () => {
        setOpen(false);
      },
      onError: (errors) => {
        console.error(JSON.stringify(errors));
      },
    });
  };

  function step(number: number) {
    setCurrentStep(number);
  }

  const steps = ["Contato", "Endereço", "Senha"];

  const getStepInfo = (stepNumber: number) => {
    switch (stepNumber) {
      case 0:
        return {
          title: "Bem-vindo ao Sistema",
          subtitle: "",
          icon: null
        };
      case 1:
        return {
          title: "Informações de Contato",
          subtitle: "Atualize seus dados pessoais",
          icon: <Phone className="w-8 h-8 text-blue-600" />
        };
      case 2:
        return {
          title: "Endereço Residencial",
          subtitle: "Mantenha seu endereço atualizado",
          icon: <MapPin className="w-8 h-8 text-blue-600" />
        };
      case 3:
        return {
          title: "Segurança da Conta",
          subtitle: "Defina uma senha segura",
          icon: <Lock className="w-8 h-8 text-blue-600" />
        };
      default:
        return {
          title: "",
          subtitle: "",
          icon: null
        };
    }
  };

  const currentStepInfo = getStepInfo(currentStep);

  return (
    <ModalBase open={open} setOpen={setOpen} titulo="Atualizar Dados">
      <form onSubmit={handleSubmit}>
        {/* Tela de Boas-vindas (Step 0) */}
        {currentStep === 0 && (
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <UserCheck className="w-20 h-20 text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Bem-vindo ao Sistema!
            </h2>
            <p className="text-gray-600 leading-relaxed max-w-md mx-auto mb-8">
              Identificamos que este é o seu primeiro acesso. Solicitamos a
              gentileza de atualizar suas informações cadastrais para prosseguir.
            </p>
            <Button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="px-8 py-2"
            >
              Ok, vamos começar!
            </Button>
          </div>
        )}

        {/* Steps com Formulários (Steps 1-3) */}
        {currentStep > 0 && (
          <>
            <Stepper 
              step={currentStep} 
              steps={steps} 
              onStepChange={step}
            />

            {/* Título da Etapa Atual */}
            <div className="text-center mb-6">
              <div className="flex justify-center mb-3">
                {currentStepInfo.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                {currentStepInfo.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {currentStepInfo.subtitle}
              </p>
            </div>
          </>
        )}
        
        {/* Formulários (Steps 1-3) */}
        {currentStep > 0 && (
          <div className="grid gap-2">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="1"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {ParteContato()}
                </motion.div>
              )}
              {currentStep === 2 && (
                <motion.div
                  key="2"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {ParteEndereco()}
                </motion.div>
              )}
              {currentStep === 3 && (
                <motion.div
                  key="3"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {ParteSenha()}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
        
        {/* Botões de Navegação (apenas nos steps 1-3) */}
        {currentStep > 0 && (
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="px-6"
            >
              Cancelar
            </Button>
            <div className="flex gap-3">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="px-6"
                >
                  Voltar
                </Button>
              )}
              {currentStep < 3 ? (
                <Button
                  type="button"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="px-6"
                >
                  Próximo
                </Button>
              ) : (
                <SubmitButton label="Concluir Cadastro" processing={processing} />
              )}
            </div>
          </div>
        )}
      </form>
    </ModalBase>
  );

  function ParteSenha() {
    return (
      <>
        <Field
          type="password"
          label="Senha"
          value={data.senha}
          onChange={(e) => {
            setData({ ...data, senha: e.target.value });
          }}
          errors={errors.senha}
        />
        <Field
          type="password"
          label="Confirmar Senha"
          value={data.senha_confirmation}
          onChange={(e) => {
            setData({ ...data, senha_confirmation: e.target.value });
          }}
          errors={errors.senha}
        />
      </>
    );
  }

  function ParteContato() {
    return (
      <FieldGroup>
        <Field
          fieldClassName={usuario.aluno_AEDB == false ? "col-span-2" : ""}
          label="Telefone"
          value={data.telefone}
          onChange={(e) => {
            setData({ ...data, telefone: applyTelMask(e.target.value) });
          }}
          errors={errors.telefone}
        />
        {usuario.aluno_AEDB == true && (
          <Field
            label="Matricula"
            value={data.matricula}
            onChange={(e) => {
              setData({ ...data, matricula: e.target.value });
            }}
            errors={errors.matricula}
          />
        )}
      </FieldGroup>
    );
  }

  function ParteEndereco() {
    async function handleCepChange(value: string) {
      setData({ ...data, cep: applyCEPMask(value) });

      const cepLimpo = value.replace(/\D/g, "");

      if (cepLimpo.length !== 8) {
        return;
      }

      const response = await fetch(
        `https://viacep.com.br/ws/${cepLimpo}/json/`
      );
      const cepData = await response.json();
      if (cepData.erro) {
        return;
      }
      setData({
        ...data,
        cep: applyCEPMask(value),
        endereco: cepData.logradouro || data.endereco,
        bairro: cepData.bairro || data.bairro,
        cidade: cepData.localidade || data.cidade,
        estado: cepData.uf || data.estado,
      });
    }

    return (
      <>
        <Field
          inputIcon={<MapPinHouseIcon className="size-5" />}
          label="CEP"
          value={data.cep}
          onChange={(e) => {
            handleCepChange(e.target.value);
          }}
          errors={errors.cep}
        />
        <FieldGroup>
          <Field
            label="Estado"
            value={data.estado}
            onChange={(e) => {
              setData({ ...data, estado: e.target.value });
            }}
            errors={errors.estado}
          />
          <Field
            label="Cidade"
            value={data.cidade}
            onChange={(e) => {
              setData({ ...data, cidade: e.target.value });
            }}
            errors={errors.cidade}
          />
        </FieldGroup>
        <FieldGroup>
          <Field
            label="Endereço"
            value={data.endereco}
            onChange={(e) => {
              setData({ ...data, endereco: e.target.value });
            }}
            errors={errors.endereco}
          />
          <Field
            label="Bairro"
            value={data.bairro}
            onChange={(e) => {
              setData({ ...data, bairro: e.target.value });
            }}
            errors={errors.bairro}
          />
        </FieldGroup>
      </>
    );
  }
}
