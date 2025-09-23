import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/manual/data-table";
import { SortColumnButton } from "@/components/manual/sort-column-button";
import { Evolucao } from "@/models/Evolucao";
import formatHandler from "@/lib/formatHandler";
import { Eye, Edit, Calendar, FileText } from "lucide-react";
import ModalCriarEvolucao from "./modal-criar-evolucao";

// Configuração inicial de visibilidade das colunas
const initialVisibility = {
  pacientes_id: false,
  created_at: false,
  updated_at: false,
};

// Função para criar as colunas da tabela
const createColumns = (onEdit: (evolucao: Evolucao) => void): ColumnDef<Evolucao>[] => [
  {
    accessorKey: 'data',
    header: ({ column }) => <SortColumnButton nome="Data" column={column} />,
    cell: ({ row }) => {
      const data = row.getValue('data') as string;
      return (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>{formatHandler.formatDate(data)}</span>
        </div>
      );
    },
    meta: {
      displayName: 'Data'
    }
  },
  {
    accessorKey: 'procedimento',
    header: ({ column }) => <SortColumnButton nome="Procedimento" column={column} />,
    cell: ({ row }) => {
      const procedimento = row.getValue('procedimento') as string;
      return (
        <div className="max-w-[300px]">
          <p className="font-medium text-sm truncate">{procedimento}</p>
        </div>
      );
    },
    meta: {
      displayName: 'Procedimento'
    }
  },
  {
    accessorKey: 'observacoes',
    header: ({ column }) => <SortColumnButton nome="Observações" column={column} />,
    cell: ({ row }) => {
      const observacoes = row.getValue('observacoes') as string;
      if (!observacoes) {
        return <span className="text-muted-foreground text-sm">-</span>;
      }
      return (
        <div className="max-w-[250px]">
          <p className="text-sm truncate" title={observacoes}>
            {observacoes}
          </p>
        </div>
      );
    },
    meta: {
      displayName: 'Observações'
    }
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => <SortColumnButton nome="Criado em" column={column} />,
    cell: ({ row }) => {
      const created_at = row.getValue('created_at') as string;
      return (
        <div className="text-sm text-muted-foreground">
          {formatHandler.formatDate(created_at)}
        </div>
      );
    },
    meta: {
      displayName: 'Criado em'
    }
  },
  {
    id: "actions",
    enableHiding: false,
    header: "Ações",
    cell: ({ row }) => {
      const evolucao = row.original;
      return (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              // TODO: Implementar visualização da evolução
              console.log('Ver evolução:', evolucao.id);
            }}
          >
            <Eye className="h-4 w-4 mr-1" />
            Ver
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(evolucao)}
          >
            <Edit className="h-4 w-4 mr-1" />
            Editar
          </Button>
        </div>
      );
    }
  }
];

interface Props {
  evolucoes: Evolucao[];
  pacienteId: number;
}

export default function EvolucaoTable({ evolucoes, pacienteId }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [evolucaoEditando, setEvolucaoEditando] = useState<Evolucao | null>(null);

  const handleNovaEvolucao = () => {
    setEvolucaoEditando(null);
    setModalOpen(true);
  };

  const handleEditarEvolucao = (evolucao: Evolucao) => {
    setEvolucaoEditando(evolucao);
    setModalOpen(true);
  };

  // Criar as colunas com as funções de callback
  const columns = createColumns(handleEditarEvolucao);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Evoluções do Paciente</h3>
          <Badge variant="secondary" className="ml-2">
            {evolucoes.length} registros
          </Badge>
        </div>
        <Button
          onClick={handleNovaEvolucao}
        >
          <FileText className="h-4 w-4 mr-2" />
          Nova Evolução
        </Button>
      </div>
      
      <DataTable 
        columns={columns} 
        data={evolucoes} 
        initialColumnVisibility={initialVisibility}
      />

      {/* Modal de Criar/Editar Evolução */}
      <ModalCriarEvolucao
        open={modalOpen}
        setOpen={setModalOpen}
        pacienteId={pacienteId}
        dado={evolucaoEditando}
      />
    </div>
  );
}
