import React from 'react';
import { useAreas } from '@/hooks/useAreas';
import { Area } from '@/models/Area';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import AreaCards from '@/components/cards/area-cards';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { BreadcrumbItem } from '@/types';
export default function AreasIndex() {
    
    const { areas, createArea, updateArea, deleteArea } = useAreas();
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Areas',
            href: route('areas.index'),
        },
    ];

    const handleCreate = () => {
        createArea({
            nome: 'Nova Área',
            sigla: 'NA',
            descricao: 'Descrição da nova área',
            seac: true,
            seget: false,
        });
    };

    const handleUpdate = (area: Area) => {
        // Aqui você pode abrir um modal de edição ou navegar para página de edição
        console.log('Editando área:', area);
        
        // Exemplo de atualização rápida (substitua por seu modal/formulário):
        updateArea(area.id, {
            nome: area.nome + ' (Atualizado)'
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Tem certeza que deseja deletar esta área?')) {
            deleteArea(id);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Áreas" />
            <div className="m-2">
                <div className="container mx-auto p-4">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-3xl font-bold">Áreas</h1>
                            <p className="text-muted-foreground">
                                Gerencie as áreas de conhecimento dos eventos
                            </p>
                        </div>
                        <Button onClick={handleCreate}>
                            <Plus className="h-4 w-4 mr-2" />
                            Nova Área
                        </Button>
                    </div>

                    <AreaCards 
                        areas={areas}
                        onEdit={handleUpdate}
                        onDelete={handleDelete}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
