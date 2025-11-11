import React, { useState } from "react";
import { Medicamento } from "@/models/Medicamento";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Edit, Trash2, Layers, Tag, DollarSign, Minus, Plus } from "lucide-react";
import { router } from "@inertiajs/react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface MedicamentoCardProps {
  medicamento: Medicamento;
  onEdit: (medicamento: Medicamento) => void;
  onDelete: (id: number) => void;
}

export function MedicamentoCard({ medicamento, onEdit, onDelete }: MedicamentoCardProps) {
  const [loading, setLoading] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const [novoEstoque, setNovoEstoque] = useState<number>(medicamento.estoque);

  const imageUrl = medicamento.imagem
    ? `/storage/${medicamento.imagem}`
    : "/images/placeholder-medicamento.png";

  const atualizarEstoque = (novoValor: number) => {
    if (novoValor < 0) return;

    setLoading(true);
    router.put(
      route("medicamentos.updateEstoque", medicamento.id),
      { estoque: novoValor },
      {
        preserveScroll: true,
        onFinish: () => setLoading(false),
      }
    );
  };

  const salvarEdicaoEstoque = () => {
    atualizarEstoque(novoEstoque);
    setModalAberto(false);
  };

  return (
    <>
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

        <CardContent className="pt-0 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1">
              <DollarSign className="h-3 w-3 text-green-500" />{" "}
              <strong>R$ {Number(medicamento.valor).toFixed(2)}</strong>
            </span>

            {/* Controles de Estoque */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={loading || medicamento.estoque <= 0}
                onClick={() => atualizarEstoque(medicamento.estoque - 1)}
                className="h-8 w-8 p-0"
              >
                <Minus className="h-4 w-4" />
              </Button>

              <span
                onDoubleClick={() => {
                  setNovoEstoque(medicamento.estoque);
                  setModalAberto(true);
                }}
                className="min-w-[2rem] text-center font-semibold cursor-pointer select-none hover:underline"
                title="Clique duas vezes para editar"
              >
                {medicamento.estoque}
              </span>

              <Button
                variant="outline"
                size="sm"
                disabled={loading}
                onClick={() => atualizarEstoque(medicamento.estoque + 1)}
                className="h-8 w-8 p-0"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Layers className="h-3 w-3 text-muted-foreground" />
            <span className="capitalize">{medicamento.categorias?.nome ?? "—"}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Tag className="h-3 w-3 text-muted-foreground" />
            <span className="capitalize">{medicamento.marcas?.nome ?? "—"}</span>
          </div>
        </CardContent>
      </Card>

      {/* Modal de edição de estoque */}
      <Dialog open={modalAberto} onOpenChange={setModalAberto}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar estoque de {medicamento.nome}</DialogTitle>
          </DialogHeader>

          <div className="py-2">
            <Input
              type="number"
              value={novoEstoque}
              min={0}
              onChange={(e) => setNovoEstoque(Number(e.target.value))}
              className="text-center"
              autoFocus
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setModalAberto(false)}>
              Cancelar
            </Button>
            <Button onClick={salvarEdicaoEstoque} disabled={loading}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
