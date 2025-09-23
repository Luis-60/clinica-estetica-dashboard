import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FichaAnamnese } from "@/models/FichaAnamnese";
import formatHandler from "@/lib/formatHandler";
import {
  Eye,
  Edit,
  Clock,
  User,
  Baby,
  FileIcon
} from "lucide-react";

const trueColorDefault = "bg-green-300";

interface Props {
  fichas: FichaAnamnese[];
  onCreateNew: () => void;
  onViewDetails?: (ficha: FichaAnamnese) => void;
  onEdit?: (ficha: FichaAnamnese) => void;
}

interface IndicatorProps {
  value: boolean;
  label: string;
  trueColor: string;
  falseColor?: string;
}

const FieldIndicator: React.FC<IndicatorProps> = ({ 
  value, 
  label, 
  trueColor, 
  falseColor = "bg-red-300" 
}) => (
  <div className="flex items-center gap-2">
    <span className={`h-2 w-2 rounded-full ${value ? trueColor : falseColor}`}></span>
    <span className="text-xs">{label}</span>
  </div>
);

export default function FichaAnamneseList({ fichas, onCreateNew, onViewDetails, onEdit }: Props) {
  if (!fichas || fichas.length === 0) {
    return (
      <Card className="w-full mb-6">
        <CardContent className="py-8 text-center">
          <FileIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium mb-2">
            Nenhuma ficha de anamnese
          </h3>
          <p className="text-gray-500 mb-4">
            Este paciente ainda não possui fichas de anamnese cadastradas.
          </p>
          <Button onClick={onCreateNew} variant="default">
            Criar primeira ficha
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 mb-6">
      {fichas.map((ficha) => (
        <Card key={ficha.id} className="w-full p-4 hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center justify-between">
              <span className="font-semibold">Ficha #{ficha.id}</span>
              <Badge variant="secondary" className="text-xs">
                {formatHandler.formatDate(ficha.created_at)}
              </Badge>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="pt-0 space-y-4">
            {/* Seção: Histórico Médico */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wide">
                Histórico Médico
              </h4>
                            <div className="grid grid-cols-2 gap-1">
                <FieldIndicator
                  value={ficha.problema_pele}
                  label="Prob. de pele"
                  trueColor={trueColorDefault}
                />
                <FieldIndicator
                  value={ficha.filtro_solar}
                  label="Filtro solar"
                  trueColor={trueColorDefault}
                />
                <FieldIndicator
                  value={ficha.boa_qual_sono}
                  label="Bom sono"
                  trueColor={trueColorDefault}
                />
                <FieldIndicator
                  value={ficha.boa_alimentacao}
                  label="Boa alimentação"
                  trueColor={trueColorDefault}
                />
                <FieldIndicator
                  value={ficha.agua_freq}
                  label="Bebe água freq."
                  trueColor={trueColorDefault}
                />
                <FieldIndicator
                  value={ficha.tabagismo}
                  label="Tabagismo"
                  trueColor={trueColorDefault}
                />
              </div>
            </div>

            {/* Seção: Hábitos e Estilo de Vida */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wide">
                Hábitos de Vida
              </h4>
                            <div className="grid grid-cols-2 gap-1">
                <FieldIndicator
                  value={ficha.filtro_solar}
                  label="Usa filtro solar"
                  trueColor={trueColorDefault}
                />
                <FieldIndicator
                  value={ficha.bebida_alcool}
                  label="Bebida alcóolica"
                  trueColor={trueColorDefault}
                />
                <FieldIndicator
                  value={ficha.agua_freq}
                  label="Bebe água freq."
                  trueColor={trueColorDefault}
                />
                <FieldIndicator
                  value={ficha.boa_qual_sono}
                  label="Sono de qualidade"
                  trueColor={trueColorDefault}
                />
                <FieldIndicator
                  value={ficha.tabagismo}
                  label="Tabagismo"
                  trueColor={trueColorDefault}
                />
                <FieldIndicator
                  value={ficha.boa_alimentacao}
                  label="Boa alimentação"
                  trueColor={trueColorDefault}
                />
              </div>
            </div>

            {/* Seção: Questões Específicas */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wide">
                Questões Específicas
              </h4>
              <div className="grid grid-cols-2 gap-1">
                <FieldIndicator
                  value={ficha.periodo_menstrual}
                  label="Menstruação"
                  trueColor={trueColorDefault}
                />
                <FieldIndicator
                  value={ficha.gestante}
                  label="Gestante"
                  trueColor={trueColorDefault}
                />
                <FieldIndicator
                  value={ficha.protese_corpo_fac}
                  label="Prótese"
                  trueColor={trueColorDefault}
                />
                <FieldIndicator
                  value={ficha.funciona_instest_reg}
                  label="Intestino OK"
                  trueColor={trueColorDefault}
                />
              </div>
            </div>

            {/* Campos de texto importantes */}
            {(ficha.horas_por_noite || ficha.qual_anticoncepcional || ficha.tempo_gestante) && (
              <div className="space-y-1">
                {ficha.horas_por_noite && (
                  <div className="flex items-center gap-2 text-xs">
                    <Clock className="w-3 h-3 text-gray-500" />
                    <span className="font-medium">Sono:</span>
                    <span>{ficha.horas_por_noite}</span>
                  </div>
                )}
                {ficha.qual_anticoncepcional && (
                  <div className="flex items-center gap-2 text-xs">
                    <User className="w-3 h-3 text-gray-500" />
                    <span className="font-medium">Anticoncepcional:</span>
                    <span className="truncate">{ficha.qual_anticoncepcional}</span>
                  </div>
                )}
                {ficha.tempo_gestante && (
                  <div className="flex items-center gap-2 text-xs">
                    <Baby className="w-3 h-3 text-gray-500" />
                    <span className="font-medium">Gestação:</span>
                    <span>{ficha.tempo_gestante}</span>
                  </div>
                )}
              </div>
            )}

            {/* Motivo Estético */}
            {ficha.motivo_estetico && (
              <div className="p-2 rounded-lg border">
                <h5 className="text-xs font-semibold mb-1">
                  Motivo Estético:
                </h5>
                <p className="text-xs line-clamp-2">
                  {ficha.motivo_estetico}
                </p>
              </div>
            )}

            {/* Histórico Estético */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wide">
                Histórico Estético
              </h4>
              <div className="grid grid-cols-2 gap-1">
                <FieldIndicator
                  value={ficha.trat_facial_anterior}
                  label="Trat. anterior"
                  trueColor={trueColorDefault}
                />
                <FieldIndicator
                  value={ficha.problema_pele}
                  label="Prob. pele"
                  trueColor={trueColorDefault}
                />
              </div>
            </div>

            {/* Botões de ação */}
            <div className="flex gap-2 pt-2 border-t">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 text-xs"
                onClick={() => onViewDetails?.(ficha)}
              >
                <Eye className="w-3 h-3 mr-1" />
                Ver detalhes
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 text-xs"
                onClick={() => onEdit?.(ficha)}
              >
                <Edit className="w-3 h-3 mr-1" />
                Editar
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
