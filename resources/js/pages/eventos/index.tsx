import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { useEventos } from '@/hooks/useEventos';
import EventoCards from '@/pages/eventos/components/evento-cards';
import CreateEventModal from '@/pages/eventos/components/create-event-modal';
import { Button } from '@/components/ui/button';
import { Plus, Calendar, TrendingUp, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Evento } from '@/models/Evento';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Eventos',
        href: '/eventos',
    },
];

export default function EventosIndex() {
    const { eventos, deleteEvento } = useEventos();
    const [viewMode, setViewMode] = useState<'cards' | 'grid'>('cards');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const handleEdit = (evento: Evento) => {
        // TODO: Implementar edição de evento
        console.log('Editar evento:', evento);
    };
    
    const handleEventClick = (evento: Evento) => {
        // Navegar para detalhes do evento
        window.location.href = `/gerir-evento/${evento.id}`;
    };

    const handleDelete = (id: number) => {
        if (confirm('Tem certeza que deseja excluir este evento?')) {
            deleteEvento(id);
        }
    };

    // Estatísticas dos eventos
    const eventosAtivos = eventos.filter(e => !e.evento_finalizado && new Date(e.data_inicio) <= new Date());
    const eventosProgramados = eventos.filter(e => !e.evento_finalizado && new Date(e.data_inicio) > new Date());
    const eventosFinalizados = eventos.filter(e => e.evento_finalizado);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Eventos" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                {/* Header com ações */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">Eventos</h1>
                        <p className="text-muted-foreground">
                            Gerencie eventos acadêmicos, congressos e outras atividades
                        </p>
                    </div>
                    <Button onClick={() => setIsCreateModalOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Novo Evento
                    </Button>
                </div>

                {/* Cards de estatísticas */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Em Andamento
                            </CardTitle>
                            <Clock className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">
                                {eventosAtivos.length}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                eventos ativos no momento
                            </p>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Programados
                            </CardTitle>
                            <Calendar className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">
                                {eventosProgramados.length}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                eventos para o futuro
                            </p>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Finalizados
                            </CardTitle>
                            <TrendingUp className="h-4 w-4 text-gray-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-600">
                                {eventosFinalizados.length}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                eventos concluídos
                            </p>
                        </CardContent>
                    </Card>
                </div>
                {/* Lista de eventos */}
                <div className="flex-1">
                    <EventoCards 
                        key={eventos.map(evento => evento.id).join(",")}
                        eventos={eventos}
                        onEdit={handleEventClick}
                        onDelete={handleDelete}
                    />
                </div>
            </div>

            {/* Modal de criação de evento */}
            <CreateEventModal 
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
            />
        </AppLayout>
    );
}
