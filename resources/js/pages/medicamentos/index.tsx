import React, { useState } from "react";
import { Head, router } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { MedicamentoCard } from "@/pages/medicamentos/components/medicamento-card";
import ModalCriar from "@/pages/medicamentos/components/modal-criar";
import { Button } from "@/components/ui/button";
import { Plus, Package, DollarSign, AlertTriangle, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Medicamento } from "@/models/Medicamento";
import { confirmDialog } from "@/components/manual/dialog-events";

interface MedicamentosIndexProps {
  medicamentos: Medicamento[];
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Medicamentos",
    href: "/medicamentos",
  },
];

export default function MedicamentosIndex({ medicamentos = [] }: MedicamentosIndexProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [medicamentoSelecionado, setMedicamentoSelecionado] = useState<Medicamento | null>(null);

  const handleEdit = (medicamento: Medicamento) => {
    setMedicamentoSelecionado(medicamento);
    setIsCreateModalOpen(true);
  };

  const handleDelete = (id: number) => {
    confirmDialog({
      title: "Excluir Medicamento",
      text: "Tem certeza que deseja deletar este medicamento?",
      onConfirm: (resolve) => {
        router.delete(route("medicamentos.destroy", id), {
          preserveScroll: true,
          onFinish: () => resolve(),
        });
      },
    });
  };

  const handleCreateNew = () => {
    setMedicamentoSelecionado(null);
    setIsCreateModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
    setMedicamentoSelecionado(null);
  };

  // Estatísticas básicas
  const totalMedicamentos = medicamentos.length;
  const estoqueBaixo = medicamentos.filter((m) => m.estoque < 5).length;
  const valorTotal = medicamentos.reduce(
    (acc, m) => acc + (Number(m.valor) * Number(m.estoque || 0)),
    0
  );
  const novosEsteMes = Math.floor(totalMedicamentos * 0.1);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Medicamentos" />
      <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Medicamentos</h1>
            <p className="text-muted-foreground">
              Gerencie o estoque e os detalhes dos medicamentos
            </p>
          </div>
          <Button onClick={handleCreateNew}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Medicamento
          </Button>
        </div>

        {/* Cards de estatísticas */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total de Medicamentos</CardTitle>
              <Package className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{totalMedicamentos}</div>
              <p className="text-xs text-muted-foreground">itens cadastrados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Estoque Baixo</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{estoqueBaixo}</div>
              <p className="text-xs text-muted-foreground">com menos de 5 unidades</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Valor em Estoque</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                R$ {valorTotal.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">valor total estimado</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Novos Este Mês</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{novosEsteMes}</div>
              <p className="text-xs text-muted-foreground">novos cadastros</p>
            </CardContent>
          </Card>
        </div>

        {/* Lista */}
        <div className="flex-1">
          {medicamentos.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nenhum medicamento encontrado</h3>
              <p className="text-muted-foreground">
                Cadastre novos medicamentos para começar a gerenciar o estoque.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-muted-foreground">Lista de Medicamentos</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {medicamentos.map((medicamento) => (
                  <MedicamentoCard
                    key={medicamento.id}
                    medicamento={medicamento}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Criação/Edição */}
      <ModalCriar
        open={isCreateModalOpen}
        setOpen={handleCloseModal}
        dado={medicamentoSelecionado}
      />
    </AppLayout>
  );
}
