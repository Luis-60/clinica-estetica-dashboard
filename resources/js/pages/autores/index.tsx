import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { PlusIcon, TextSearchIcon } from 'lucide-react';
import { DataTable } from '@/components/manual/data-table';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Head, usePage, Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table'
import { SortColumnButton } from '@/components/manual/sort-column-button'
import formatHandler from '@/lib/formatHandler';
import { Usuario } from '@/models/Usuario';
import { useUsuarios } from '@/hooks/useUsuarios';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Autores',
    href: route('autores.index'),
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
}
    
export const columns: ColumnDef<Usuario>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <SortColumnButton nome="Id" column={column} />,
    cell: info => info.getValue(),
    meta: {
      displayName: 'ID'
    }
  },
  {
    accessorKey: 'nome',
    header: ({ column }) => <SortColumnButton nome="Nome" column={column} />,
    cell: info => info.getValue(),
    meta: {
      displayName: 'Nome'
    }
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <SortColumnButton nome="Email" column={column} />,
    cell: info => info.getValue(),
    meta: {
      displayName: 'Email'
    }
  },
  {
    accessorKey: 'instituicao.nome',
    header: ({ column }) => <SortColumnButton nome="Instituição" column={column} />,
    cell: ({ row }) => row.original.instituicao?.nome || '-',
    meta: {
      displayName: 'Instituição'
    }
  },
  {
    accessorKey: 'curso_periodo.curso.nome',
    header: ({ column }) => <SortColumnButton nome="Curso" column={column} />,
    cell: ({ row }) => row.original.curso_periodo?.curso?.nome || '-',
    meta: {
      displayName: 'Curso'
    }
  },
  {
    accessorKey: 'curso_periodo.periodo.nome',
    header: ({ column }) => <SortColumnButton nome="Período" column={column} />,
    cell: ({ row }) => row.original.curso_periodo?.periodo?.nome || '-',
    meta: {
      displayName: 'Período'
    }
  },
  {
    accessorKey: 'telefone',
    header: ({ column }) => <SortColumnButton nome="Telefone" column={column} />,
    cell: info => info.getValue(),
    meta: {
      displayName: 'Telefone'
    }
  },
 
  // {
  //   id: "actions",
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     const id = row.original.id
  //     return (
  //       <Link href={route('artigos.details', { id })} prefetch>
  //         <Button>
  //           <TextSearchIcon />Detalhes
  //         </Button>
  //       </Link>  
  //     )
  //   }
  // }
]

export default function Autores() {
  const { autores } = useUsuarios();

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Autores" />
      <div className=" m-2">
        <DataTable columns={columns} data={autores} initialColumnVisibility={initialVisibility}/>
      </div>
    </AppLayout>
  )
}