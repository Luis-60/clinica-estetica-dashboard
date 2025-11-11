import { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/manual/data-table";
import { format } from "date-fns";
import AppLayout from "@/layouts/app-layout";
import ModalCriarProcedimento from "./components/modal-criar-procedimento";
import AcoesProcedimento from "./components/acoes-procedimento";

interface Procedimento {
  id: number;
  nome: string;
  descricao?: string;
  preco?: number | string;
  created_at?: string;
}

export default function ProcedimentosPage({ procedimentos = [] }: { procedimentos?: Procedimento[] }) {
  const [filter, setFilter] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
      cell: (info: any) => info.getValue(),
    },
    {
      accessorKey: "nome",
      header: "Nome",
      cell: ({ row }: any) => row.original.nome || "-",
    },
    {
      accessorKey: "descricao",
      header: "Descrição",
      cell: ({ row }: any) => (
        <div>
          <p className="font-medium text-sm truncate" style={{ maxWidth: 300 }}>
            {row.original.descricao || "-"}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "preco",
      header: "Preço",
      cell: ({ row }: any) => {
        const preco = row.original.preco;
        if (preco === undefined || preco === null || preco === "") return "-";
        try {
          const num = Number(preco);
          return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(num);
        } catch (e) {
          return String(preco);
        }
      },
    },
    {
      accessorKey: "created_at",
      header: "Criado em",
      cell: ({ row }: any) => (row.original.created_at ? format(new Date(row.original.created_at), "dd/MM/yyyy") : "-"),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }: any) => (
        <div className="flex gap-1 justify-end">
          <AcoesProcedimento procedimento={row.original} />
        </div>
      ),
    },
  ];

  return (
    <AppLayout>
      <Head title="Procedimentos" />
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Procedimentos</h1>
          <div className="flex items-center gap-2">
            <Button onClick={() => setModalOpen(true)}>
              Novo Procedimento
            </Button>
          </div>
        </div>

        <DataTable columns={columns} data={procedimentos} />
        <ModalCriarProcedimento open={modalOpen} setOpen={setModalOpen} />
      </div>
    </AppLayout>
  );
}
