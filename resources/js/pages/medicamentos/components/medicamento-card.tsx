import React from "react";
import { Medicamento } from "@/models/Medicamento";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Package, Tag, Layers, DollarSign } from "lucide-react";
import { router } from "@inertiajs/react";

interface MedicamentoCardProps {
  medicamento: Medicamento;
  onEdit: (medicamento: Medicamento) => void;
  onDelete: (id: number) => void;
}

export function MedicamentoCard({ medicamento, onEdit, onDelete }: MedicamentoCardProps) {
  const imageUrl = medicamento.imagem
    ? `/storage/${medicamento.imagem}`
    : "/images/placeholder-medicamento.png";

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-16 h-16 rounded-md overflow-hidden border">
              <img
                src={imageUrl}
                alt={medicamento.nome}
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold line-clamp-2">{medicamento.nome}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {medicamento.descricao}
              </p>
            </div>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(medicamento)}
              className="h-8 w-8 p-0"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(medicamento.id)}
              className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-1">
            <DollarSign className="h-3 w-3 text-green-500" />{" "}
            <strong>R$ {Number(medicamento.valor).toFixed(2)}</strong>
          </span>
          <span className="flex items-center gap-1">
            <Package className="h-3 w-3 text-blue-500" />{" "}
            <strong>{medicamento.estoque} un.</strong>
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Layers className="h-3 w-3 text-muted-foreground" />
          <span className="capitalize">{medicamento.categorias?.nome ?? "—"}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Tag className="h-3 w-3 text-muted-foreground" />
          <span className="capitalize">{medicamento.marcas?.nome ?? "—"}</span>
        </div>

        <Button
          variant="default"
          size="sm"
          className="w-full mt-2"
          onClick={() => router.visit(`/medicamentos/${medicamento.id}`)}
        >
          Ver Detalhes
        </Button>
      </CardContent>
    </Card>
  );
}
