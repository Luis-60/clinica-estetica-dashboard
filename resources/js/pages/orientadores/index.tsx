import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Grid2x2PlusIcon, PlusIcon, TextSearchIcon, Trash } from "lucide-react";
import { DataTable } from "@/components/manual/data-table";
import { PlaceholderPattern } from "@/components/ui/placeholder-pattern";
import { Head, usePage, Link, router } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { SortColumnButton } from "@/components/manual/sort-column-button";
import formatHandler from "@/lib/formatHandler";
import { Usuario } from "@/models/Usuario";
import { useUsuarios } from "@/hooks/useUsuarios";
import ModalCriar from "./components/modal-criar";
import { useState } from "react";
import ModalImportar from "./components/modal-importar";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Orientadores",
    href: route("orientadores.index"),
  },
];

const initialVisibility = {
  cep: false,
  estado: false,
  bairro: false,
  endereco: false,
  cidade: false,
  curso: false,
  periodo: false,
  telefone: false,
  email: false,
  aluno_AEDB: false,
  email_verificado: false,
  ultimo_login: false,
};

export const columns: ColumnDef<Usuario>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <SortColumnButton nome="Id" column={column} />,
    cell: (info) => info.getValue(),
    meta: {
      displayName: "ID",
    },
  },
  {
    accessorKey: "nome",
    header: ({ column }) => <SortColumnButton nome="Nome" column={column} />,
    cell: (info) => info.getValue(),
    meta: {
      displayName: "Nome",
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => <SortColumnButton nome="Email" column={column} />,
    cell: (info) => info.getValue(),
    meta: {
      displayName: "Email",
    },
  },
  {
    accessorKey: "instituicao.nome",
    header: ({ column }) => (
      <SortColumnButton nome="Instituição" column={column} />
    ),
    cell: ({ row }) => row.original.instituicao?.nome || "-",
    meta: {
      displayName: "Instituição",
    },
  },
  {
    accessorKey: "curso_periodo.curso.nome",
    header: ({ column }) => <SortColumnButton nome="Curso" column={column} />,
    cell: ({ row }) => row.original.curso_periodo?.curso?.nome || "-",
    meta: {
      displayName: "Curso",
    },
  },
  {
    accessorKey: "curso_periodo.periodo.nome",
    header: ({ column }) => <SortColumnButton nome="Período" column={column} />,
    cell: ({ row }) => row.original.curso_periodo?.periodo?.nome || "-",
    meta: {
      displayName: "Período",
    },
  },
  {
    accessorKey: "telefone",
    header: ({ column }) => (
      <SortColumnButton nome="Telefone" column={column} />
    ),
    cell: (info) => info.getValue(),
    meta: {
      displayName: "Telefone",
    },
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const id = row.original.id
      return (
        <Button
          variant="destructive"
          size="sm"
          onClick={() => {
            if (confirm('Tem certeza que deseja excluir este orientador?')) {
              // Faz a requisição DELETE usando Inertia
                router.delete(route('orientadores.destroy', id))
            }
          }}
        >
          <Trash className="w-4 h-4" /> 
        </Button>
      )
    }
  }
];

export default function Orientadores() {
  const { orientadores } = useUsuarios();
  const [openCriar, setOpenCriar] = useState(false);
  const [openImportar, setOpenImportar] = useState(false);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>

      <div className="p-4">
      <Head title="Orientadores" />
      <ModalCriar open={openCriar} setOpen={setOpenCriar} dado={null} />
      <ModalImportar
        open={openImportar}
        setOpen={setOpenImportar}
        dado={null}
      />
      <div className="flex justify-between gap-2 m-2">
          <div>
            <h1 className="text-2xl font-bold">Orientadores</h1>
            <p className="text-muted-foreground">
              Adicione e gerencie os orientadores que irão supervisionar os alunos.
            </p>
          </div>
        <div className="flex gap-2">
          <Button onClick={() => setOpenCriar(true)}>
            <PlusIcon />
            Cadastrar
          </Button>
          <Button onClick={() => setOpenImportar(true)}>
            <Grid2x2PlusIcon />
            Importar CSV
          </Button>
        </div>
      </div>
      <div className=" m-2">
        <DataTable
          columns={columns}
          data={orientadores}
          initialColumnVisibility={initialVisibility}
        />
      </div>
    </div>
    </AppLayout>
  );
}
