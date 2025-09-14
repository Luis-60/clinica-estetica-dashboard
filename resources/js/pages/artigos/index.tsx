import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { PlusIcon, Table, LayoutGrid, Users, Eye, Edit, Trash2 } from 'lucide-react';
import { DataTable } from '@/components/manual/data-table';
import { Head, usePage, Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table'
import { SortColumnButton } from '@/components/manual/sort-column-button'
import formatHandler from '@/lib/formatHandler';
import { Artigo } from '@/models/Artigo';
import { LocalTabs } from '@/components/manual/local-tabs';
import ArtigoCards from '@/components/cards/artigo-cards';
import { AutoresModal } from '@/components/modals/autor-modal';
import { ArtigoDetalhesModal } from '@/components/modals/artigo-detalhes-modal';
import { StatusTag } from '@/components/ui/status-tag';
const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Artigos',
    href: route('artigos.index'),
  },
];


const initialVisibility = {
  curso: false,
  area: true,
  modalidade: false,
  status: true,
  orientador: false,
  actions: true
}

export const columns: ColumnDef<Artigo>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <SortColumnButton nome="Id" column={column} />,
    cell: info => info.getValue(),

  },
  {
    accessorKey: 'titulo',
    header: ({ column }) => <SortColumnButton nome="Titulo" column={column} />,
    cell: info => info.getValue(),
  },
  {
    accessorKey: 'orientador',
    header: ({ column }) => <SortColumnButton nome="Orientador" column={column} />,
    cell: info => info.getValue(),
  },
  // {
  //   accessorKey: 'curso',
  //   header: ({ column }) => <SortColumnButton nome="Curso" column={column} />,
  //   cell: ({ row }) => row.original.Curso ? `${row.original.Curso.nome}` : '-',
  // },
{
  accessorKey: 'evento',
  header: ({ column }) => <SortColumnButton nome="Evento" column={column} />,
  cell: ({ row }) => row.original.evento ? `${row.original.evento?.nome}` : '-',
},
{
  accessorKey: 'area',
  header: ({ column }) => <SortColumnButton nome="Area" column={column} />,
  cell: ({ row }) => row.original.area ? `${row.original.area?.sigla}` : '-',
},
  {
    accessorKey: 'modalidade',
    header: ({ column }) => <SortColumnButton nome="Modalidade" column={column} />,
    cell: info => info.getValue(),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <SortColumnButton nome="Status" column={column} />,
    cell: ({ row }) => <StatusTag status={row.original.status} />
  },
  { 
    accessorKey: 'data_envio',
    header: ({ column }) => <SortColumnButton nome="Envio" column={column} />,
    cell: info => formatHandler.formatDate((info.getValue()) as string),
    meta: {
      displayName: 'Data Envio'
    }
    
  },
  {
    accessorKey: 'autores',
    header: ({ column }) => <SortColumnButton nome="Autores" column={column} />,
    cell: ({ row }) => {
      const autores = row.original.autores || [];
      
      if (autores.length === 0) {
        return <span className="text-muted-foreground text-sm">Sem autores</span>;
      }
      
      if (autores.length === 1) {
        return (
          <Badge 
            variant="secondary"
            className="bg-blue-100 text-blue-800 hover:bg-blue-100"
          >
            {autores[0].nome}
          </Badge>
        );
      }
      
      // Mais de 1 autor - mostra o primeiro + botão "Ver mais"
      return (
        <div className="flex flex-wrap gap-1 items-center">
          <Badge 
            variant="secondary"
            className="bg-blue-100 text-blue-800 hover:bg-blue-100"
          >
            {autores[0].nome}
          </Badge>
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                className="h-6 px-2 text-xs"
              >
                +{autores.length - 1} mais
              </Button>
            </DialogTrigger>
            <AutoresModal 
              autores={autores} 
              tituloArtigo={row.original.titulo || 'Sem título'} 
            />
          </Dialog>
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: "Ações",
    cell: ({ row }) => {
      const artigo = row.original;
      return (
        <div className="flex gap-1">
          {/* Botão de Detalhes */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Eye className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <ArtigoDetalhesModal artigo={artigo} />
          </Dialog>
          
          
        </div>
      );
    }
  }
]

export default function Artigos() {
  const { props } = usePage<{ artigos: Artigo[] }>()
  const data = props.artigos
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  const handleEdit = (artigo: Artigo) => {
    // TODO: Implementar edição de artigo
    console.log('Editar artigo:', artigo);
  };

  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja excluir este artigo?')) {
      // TODO: Implementar exclusão
      console.log('Excluir artigo:', id);
    }
  };

  const tabs = [
    {
      label: 'Tabela',
      value: 'table',
      icon: Table,
    },
    {
      label: 'Cards',
      value: 'cards', 
      icon: LayoutGrid,
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Artigos" />
      <div className="m-2 p-4 space-y-4">
        {/* Header com botão de novo artigo */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Artigos</h1>
            <p className="text-muted-foreground">
              Gerencie artigos científicos e trabalhos acadêmicos
            </p>
          </div>
          <Button>
            <PlusIcon className="h-4 w-4 mr-2" />
            Novo Artigo
          </Button>
        </div>

        {/* Tabs para alternar entre visualizações */}
        <div className="border-b">
          <LocalTabs 
            tabs={tabs}
            value={viewMode}
            onValueChange={(value) => setViewMode(value as 'table' | 'cards')}
          />
        </div>

        {/* Conteúdo baseado na aba selecionada */}
        {viewMode === 'table' ? (
          <DataTable 
            columns={columns} 
            data={data} 
            initialColumnVisibility={initialVisibility}
          />
        ) : (
          <ArtigoCards 
            artigos={data}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </AppLayout>
  )
}
