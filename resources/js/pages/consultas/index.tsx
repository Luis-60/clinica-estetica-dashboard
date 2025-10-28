import { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/manual/data-table";
import { format } from "date-fns";
import AppLayout from "@/layouts/app-layout";
import ModalCriarConsulta from "./components/modal-criar-consulta";

interface Paciente {
  id: number;
  nome: string;
}

interface Consulta {
  id: number;
  paciente: Paciente;
  data_consulta: string;
  horario: string;
  procedimento: string;
  observacoes?: string;
  created_at: string;
}

export default function ConsultasPage({ pacientes = [], consultas = [] }: { pacientes?: Paciente[]; consultas?: Consulta[] }) {
  const [modalOpen, setModalOpen] = useState(false);

  // Definição das colunas da tabela
  const columns = [
    {
      accessorKey: "id",
      header: "ID",
      cell: (info: any) => info.getValue(),
    },
    {
      accessorKey: "paciente.nome",
      header: "Paciente",
      cell: ({ row }: any) => row.original.paciente?.nome || "-",
    },
    {
      accessorKey: "data",
      header: "Data",
      cell: ({ row }: any) =>
        row.original.data
          ? format(new Date(row.original.data), "dd/MM/yyyy")
          : "-",
    },
    {
      accessorKey: "horario",
      header: "Horário",
        cell: ({ row }: any) =>
          row.original?.data
            ? format(new Date(row.original.data), "HH:mm")
            : "-",
    },
    {
      accessorKey: "procedimento",
      header: "Procedimento",
      cell: (info: any) => info.getValue(),
    },
    // {
    //   id: "actions",
    //   header: "Ações",
    //   cell: ({ row }: any) => (
    //     <Link href={route("consultas.show", row.original.id)}>
    //       <Button size="sm" variant="outline">Ver</Button>
    //     </Link>
    //   ),
    // },
  ];

  return (
    <AppLayout>
      <Head title="Marcação de Consultas" />
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Consultas</h1>
          <Button onClick={() => setModalOpen(true)}>Nova Consulta</Button>
        </div>

        {/* Tabela de consultas */}
       <DataTable columns={columns} data={consultas} />

        <ModalCriarConsulta
          open={modalOpen}
          setOpen={setModalOpen}
          pacientes={pacientes}
        />

        
      </div>
    </AppLayout>
  );
}