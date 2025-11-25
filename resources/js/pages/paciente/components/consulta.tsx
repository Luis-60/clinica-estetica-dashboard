import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/manual/data-table";
import { SortColumnButton } from "@/components/manual/sort-column-button";
import { Eye, Edit, CalendarDays, Stethoscope } from "lucide-react";
import formatHandler from "@/lib/formatHandler";
import { Consulta } from "@/models/Consulta";
import ModalCriarConsulta from "./modal-criar-consulta";

const initialVisibility = {
  pacientes_id: false,
  created_at: false,
  updated_at: false,
};

const createColumns = (
  onEdit: (consulta: Consulta) => void,
  isReadOnly: boolean
): ColumnDef<Consulta>[] => [
  {
    accessorKey: "data",
    header: ({ column }) => <SortColumnButton nome="Data" column={column} />,
    cell: ({ row }) => {
      const data = row.getValue("data") as string;
      return (
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-muted-foreground" />
          <span>{formatHandler.formatDate(data)}</span>
        </div>
      );
    },
    meta: { displayName: "Data" },
  },
  {
    accessorKey: "procedimento",
    header: ({ column }) => (
      <SortColumnButton nome="Procedimento" column={column} />
    ),
    cell: ({ row }) => {
      const procedimento = row.original.procedimento;
      return (
        <div className="max-w-[300px]">
          <p className="font-medium text-sm truncate">
            {procedimento?.nome || "-"}
          </p>
        </div>
      );
    },
    meta: { displayName: "Procedimento" },
  },
  {
    meta: { displayName: "Criado em" },
    accessorKey: "created_at",
    header: ({ column }) => (
      <SortColumnButton nome="Criado em" column={column} />
    ),
    cell: ({ row }) => {
      const created_at = row.getValue("created_at") as string;
      return (
        <span className="text-sm text-muted-foreground">
          {formatHandler.formatDate(created_at)}
        </span>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: "Ações",
    cell: ({ row }) => {
      const consulta = row.original;

      return (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => console.log("Ver consulta:", consulta.id)}
          >
            <Eye className="h-4 w-4 mr-1" />
            Ver
          </Button>

          {!isReadOnly && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(consulta)}
            >
              <Edit className="h-4 w-4 mr-1" />
              Editar
            </Button>
          )}
        </div>
      );
    },
  },
];

interface Props {
  consultas: Consulta[];
  pacienteId: number;
  procedimentos: any[];
  isReadOnly: boolean;
}

export default function ConsultaTable({
  consultas,
  pacienteId,
  procedimentos,
  isReadOnly,
}: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [consultaEditando, setConsultaEditando] = useState<Consulta | null>(
    null
  );

  const handleNovaConsulta = () => {
    setConsultaEditando(null);
    setModalOpen(true);
  };

  const handleEditarConsulta = (consulta: Consulta) => {
    setConsultaEditando(consulta);
    setModalOpen(true);
  };

  const columns = createColumns(handleEditarConsulta, isReadOnly);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Stethoscope className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Consultas do Paciente</h3>
          <Badge variant="secondary">{consultas.length} registros</Badge>
        </div>

        {!isReadOnly && (
          <Button onClick={handleNovaConsulta}>
            <Stethoscope className="h-4 w-4 mr-2" />
            Nova Consulta
          </Button>
        )}
      </div>

      <DataTable
        columns={columns}
        data={consultas}
        initialColumnVisibility={initialVisibility}
      />

      <ModalCriarConsulta
        open={modalOpen}
        setOpen={setModalOpen}
        pacienteId={pacienteId}
        dado={consultaEditando}
        procedimentos={procedimentos}
      />
    </div>
  );
}