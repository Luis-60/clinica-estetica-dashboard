import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { router, useForm } from "@inertiajs/react";
import Field from "@/components/manual/field";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FichaAnamnese } from "@/models/FichaAnamnese";

interface FichaAnamneseProps {
  open: boolean;
  onClose: () => void;
  pacienteId: number | string;
  fichaExistente?: FichaAnamnese;
}
export default function FichaAnamneseCard({
  open,
  onClose,
  pacienteId,
  fichaExistente,
}: FichaAnamneseProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  
  const { data, setData, processing, errors, reset } = useForm<FichaAnamnese>({
    lente_contato: fichaExistente?.lente_contato || false,
    epilepsia_convulsoes: fichaExistente?.epilepsia_convulsoes || false,
    funciona_instest_reg: fichaExistente?.funciona_instest_reg || false,
    trat_facial_anterior: fichaExistente?.trat_facial_anterior || false,
    agua_freq: fichaExistente?.agua_freq || false,
    bebida_alcool: fichaExistente?.bebida_alcool || false,
    filtro_solar: fichaExistente?.filtro_solar || false,
    periodo_menstrual: fichaExistente?.periodo_menstrual || false,
    boa_qual_sono: fichaExistente?.boa_qual_sono || false,
    protese_corpo_fac: fichaExistente?.protese_corpo_fac || false,
    tabagismo: fichaExistente?.tabagismo || false,
    alteracoes_cardiacas: fichaExistente?.alteracoes_cardiacas || false,
    portador_marcapasso: fichaExistente?.portador_marcapasso || false,
    gestante: fichaExistente?.gestante || false,
    problema_pele: fichaExistente?.problema_pele || false,
    tratamento_medico: fichaExistente?.tratamento_medico || false,
    tumor_lesao_cancer: fichaExistente?.tumor_lesao_cancer || false,
    boa_alimentacao: fichaExistente?.boa_alimentacao || false,
    horas_por_noite: fichaExistente?.horas_por_noite || "",
    qual_anticoncepcional: fichaExistente?.qual_anticoncepcional || "",
    tempo_gestante: fichaExistente?.tempo_gestante || "",
    motivo_estetico: fichaExistente?.motivo_estetico || "",
    pacientes_id: pacienteId,
  });

  const handleBooleanChange = (field: keyof FichaAnamnese, value: string) => {
    setData(field, value === "true");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (fichaExistente) {
      // Atualizar ficha existente
      router.put(route("fichas.update", fichaExistente.id), data, {
        preserveScroll: true,
        onSuccess: () => {
          reset();
          onClose();
        },
        onError: (errors) => {
          console.error("Errors:", errors);
        },
      });
    } else {
      // Criar nova ficha
      router.post(route("fichas.store"), data, {
        preserveScroll: true,
        onSuccess: () => {
          reset();
          onClose();
        },
        onError: (errors) => {
          console.error("Errors:", errors);
        },
      });
    }
  };

  if (!open) return null;

  return (
    <div className="">
      <div className="">
        <h2 className="text-xl font-semibold mb-4">
          {fichaExistente ? "Editar" : "Nova"} Ficha de Anamnese
        </h2>
        
        <div ref={contentRef} className="w-full">
          <form onSubmit={handleSubmit}>
            
            {/* Seção 1: Histórico Médico */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Histórico Médico</h3>
              <div className="grid md:grid-cols-2 gap-4">
                
                <div className="space-y-2">
                  <Label>Usa lentes de contato?</Label>
                  <RadioGroup
                    value={data.lente_contato.toString()}
                    onValueChange={(value) => handleBooleanChange("lente_contato", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="lente_sim" />
                      <Label htmlFor="lente_sim">Sim</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="lente_nao" />
                      <Label htmlFor="lente_nao">Não</Label>
                    </div>
                  </RadioGroup>
                  {errors.lente_contato && (
                    <p className="text-sm text-red-600">{errors.lente_contato}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Epilepsia/Convulsões?</Label>
                  <RadioGroup
                    value={data.epilepsia_convulsoes.toString()}
                    onValueChange={(value) => handleBooleanChange("epilepsia_convulsoes", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="epilepsia_sim" />
                      <Label htmlFor="epilepsia_sim">Sim</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="epilepsia_nao" />
                      <Label htmlFor="epilepsia_nao">Não</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Alterações cardíacas?</Label>
                  <RadioGroup
                    value={data.alteracoes_cardiacas.toString()}
                    onValueChange={(value) => handleBooleanChange("alteracoes_cardiacas", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="cardiaco_sim" />
                      <Label htmlFor="cardiaco_sim">Sim</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="cardiaco_nao" />
                      <Label htmlFor="cardiaco_nao">Não</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Portador de marcapasso?</Label>
                  <RadioGroup
                    value={data.portador_marcapasso.toString()}
                    onValueChange={(value) => handleBooleanChange("portador_marcapasso", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="marcapasso_sim" />
                      <Label htmlFor="marcapasso_sim">Sim</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="marcapasso_nao" />
                      <Label htmlFor="marcapasso_nao">Não</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Tumor/Lesão/Câncer?</Label>
                  <RadioGroup
                    value={data.tumor_lesao_cancer.toString()}
                    onValueChange={(value) => handleBooleanChange("tumor_lesao_cancer", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="tumor_sim" />
                      <Label htmlFor="tumor_sim">Sim</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="tumor_nao" />
                      <Label htmlFor="tumor_nao">Não</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Em tratamento médico?</Label>
                  <RadioGroup
                    value={data.tratamento_medico.toString()}
                    onValueChange={(value) => handleBooleanChange("tratamento_medico", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="tratamento_sim" />
                      <Label htmlFor="tratamento_sim">Sim</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="tratamento_nao" />
                      <Label htmlFor="tratamento_nao">Não</Label>
                    </div>
                  </RadioGroup>
                </div>

              </div>
            </div>

            {/* Seção 2: Hábitos e Estilo de Vida */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Hábitos e Estilo de Vida</h3>
              <div className="grid md:grid-cols-2 gap-4">

                <div className="space-y-2">
                  <Label>Bebe água com frequência?</Label>
                  <RadioGroup
                    value={data.agua_freq.toString()}
                    onValueChange={(value) => handleBooleanChange("agua_freq", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="agua_sim" />
                      <Label htmlFor="agua_sim">Sim</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="agua_nao" />
                      <Label htmlFor="agua_nao">Não</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Consume bebida alcoólica?</Label>
                  <RadioGroup
                    value={data.bebida_alcool.toString()}
                    onValueChange={(value) => handleBooleanChange("bebida_alcool", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="alcool_sim" />
                      <Label htmlFor="alcool_sim">Sim</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="alcool_nao" />
                      <Label htmlFor="alcool_nao">Não</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Usa filtro solar?</Label>
                  <RadioGroup
                    value={data.filtro_solar.toString()}
                    onValueChange={(value) => handleBooleanChange("filtro_solar", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="filtro_sim" />
                      <Label htmlFor="filtro_sim">Sim</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="filtro_nao" />
                      <Label htmlFor="filtro_nao">Não</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Tem boa qualidade de sono?</Label>
                  <RadioGroup
                    value={data.boa_qual_sono.toString()}
                    onValueChange={(value) => handleBooleanChange("boa_qual_sono", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="sono_sim" />
                      <Label htmlFor="sono_sim">Sim</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="sono_nao" />
                      <Label htmlFor="sono_nao">Não</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>É tabagista?</Label>
                  <RadioGroup
                    value={data.tabagismo.toString()}
                    onValueChange={(value) => handleBooleanChange("tabagismo", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="tabaco_sim" />
                      <Label htmlFor="tabaco_sim">Sim</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="tabaco_nao" />
                      <Label htmlFor="tabaco_nao">Não</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Tem boa alimentação?</Label>
                  <RadioGroup
                    value={data.boa_alimentacao.toString()}
                    onValueChange={(value) => handleBooleanChange("boa_alimentacao", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="alimentacao_sim" />
                      <Label htmlFor="alimentacao_sim">Sim</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="alimentacao_nao" />
                      <Label htmlFor="alimentacao_nao">Não</Label>
                    </div>
                  </RadioGroup>
                </div>

              </div>

              {/* Campos de texto específicos */}
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <Field
                  label="Quantas horas dorme por noite?"
                  value={data.horas_por_noite}
                  onChange={(e) => setData("horas_por_noite", e.target.value)}
                  errors={errors.horas_por_noite}
                  placeholder="Ex: 8 horas"
                />
              </div>
            </div>

            {/* Seção 3: Questões Específicas Femininas */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Questões Específicas</h3>
              <div className="grid md:grid-cols-2 gap-4">

                <div className="space-y-2">
                  <Label>Está no período menstrual?</Label>
                  <RadioGroup
                    value={data.periodo_menstrual.toString()}
                    onValueChange={(value) => handleBooleanChange("periodo_menstrual", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="menstrual_sim" />
                      <Label htmlFor="menstrual_sim">Sim</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="menstrual_nao" />
                      <Label htmlFor="menstrual_nao">Não</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Está gestante?</Label>
                  <RadioGroup
                    value={data.gestante.toString()}
                    onValueChange={(value) => handleBooleanChange("gestante", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="gestante_sim" />
                      <Label htmlFor="gestante_sim">Sim</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="gestante_nao" />
                      <Label htmlFor="gestante_nao">Não</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Field
                  label="Qual anticoncepcional usa?"
                  value={data.qual_anticoncepcional}
                  onChange={(e) => setData("qual_anticoncepcional", e.target.value)}
                  errors={errors.qual_anticoncepcional}
                  placeholder="Nome do anticoncepcional"
                />

                <Field
                  label="Há quanto tempo está gestante?"
                  value={data.tempo_gestante}
                  onChange={(e) => setData("tempo_gestante", e.target.value)}
                  errors={errors.tempo_gestante}
                  placeholder="Ex: 3 meses"
                />

              </div>
            </div>

            {/* Seção 4: Histórico Estético */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Histórico Estético</h3>
              <div className="grid md:grid-cols-2 gap-4">

                <div className="space-y-2">
                  <Label>Já fez tratamento facial anterior?</Label>
                  <RadioGroup
                    value={data.trat_facial_anterior.toString()}
                    onValueChange={(value) => handleBooleanChange("trat_facial_anterior", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="facial_sim" />
                      <Label htmlFor="facial_sim">Sim</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="facial_nao" />
                      <Label htmlFor="facial_nao">Não</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Tem problema de pele?</Label>
                  <RadioGroup
                    value={data.problema_pele.toString()}
                    onValueChange={(value) => handleBooleanChange("problema_pele", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="pele_sim" />
                      <Label htmlFor="pele_sim">Sim</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="pele_nao" />
                      <Label htmlFor="pele_nao">Não</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Possui prótese no corpo ou face?</Label>
                  <RadioGroup
                    value={data.protese_corpo_fac.toString()}
                    onValueChange={(value) => handleBooleanChange("protese_corpo_fac", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="protese_sim" />
                      <Label htmlFor="protese_sim">Sim</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="protese_nao" />
                      <Label htmlFor="protese_nao">Não</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Intestino funciona regularmente?</Label>
                  <RadioGroup
                    value={data.funciona_instest_reg.toString()}
                    onValueChange={(value) => handleBooleanChange("funciona_instest_reg", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="intestino_sim" />
                      <Label htmlFor="intestino_sim">Sim</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="intestino_nao" />
                      <Label htmlFor="intestino_nao">Não</Label>
                    </div>
                  </RadioGroup>
                </div>

              </div>
            </div>

            {/* Motivo Estético */}
            <div className="mb-6">
              <Field label="Motivo Estético / Observações">
                <Textarea
                  value={data.motivo_estetico}
                  onChange={(e) => setData("motivo_estetico", e.target.value)}
                  placeholder="Descreva o motivo da busca por tratamento estético..."
                  rows={4}
                />
              </Field>
            </div>

            {/* Botões */}
            <div className="flex justify-end gap-4 mt-6">
              <Button
                type="button"
                onClick={onClose}
                variant="outline"
                className="w-32"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 text-white w-48"
                disabled={processing}
              >
                {processing 
                  ? "Salvando..." 
                  : fichaExistente 
                    ? "Atualizar Ficha" 
                    : "Salvar Ficha"
                }
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}