
import { DataTable } from "@/components/manual/data-table";
import { SortColumnButton } from "@/components/manual/sort-column-button";
import { Button } from "@/components/ui/button";
import { useUsuarios } from "@/hooks/useUsuarios";
import AppLayout from "@/layouts/app-layout";
import { Usuario } from "@/models/Usuario";
import { BreadcrumbItem } from "@/types";
import { Head, router } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { Grid2x2PlusIcon, PlusIcon, Trash } from "lucide-react";
import { useState } from "react";
import { Area } from "@/models/Area";
import { Link } from "@radix-ui/react-navigation-menu";
import ModalCriar from "./components/modal-criar";
import ModalImportar from "./components/modal-importar";
import { Curso } from "@/models/Curso";
const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Coordenadores",
    href: route("coordenadores.index"),
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
    accessorKey: "curso.nome",
    header: ({ column }) => <SortColumnButton nome="Curso" column={column} />,
    cell: ({ row }) => row.original.cursos?.map(c => c.nome).join(", ") || "-",
    meta: {
      displayName: "Curso",
    },
  },
  {
    accessorKey: "periodo.nome",
    header: ({ column }) => <SortColumnButton nome="Período" column={column} />,
    cell: ({ row }) => row.original.periodo?.nome || "-",
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
            if (confirm('Tem certeza que deseja excluir este coordenador?')) {
              // Faz a requisição DELETE usando Inertia
                router.delete(route('coordenadores.destroy', id))
            }
          }}
        >
          <Trash className="w-4 h-4" /> 
        </Button>
      )
    }
  }
];

export default function Coordenadores({ cursos }: { cursos: [] }) {
  const { coordenadores } = useUsuarios();
  const [openCriar, setOpenCriar] = useState(false);
  const [openImportar, setOpenImportar] = useState(false);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Avaliadores" />
      <div className="p-4">
      <ModalCriar open={openCriar} setOpen={setOpenCriar} cursos={cursos} dado={null} />
      <ModalImportar
        open={openImportar}
        setOpen={setOpenImportar}
        dado={null}
      />

      <div className="flex justify-between gap-2 m-2">
          <div>
            <h1 className="text-2xl font-bold">Coordenadores</h1>
            <p className="text-muted-foreground">
              Gerencie os coordenadores cadastrados no sistema.
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
          data={coordenadores}
          initialColumnVisibility={initialVisibility}
          />
      </div>
    </div>
    </AppLayout>
  );
}
