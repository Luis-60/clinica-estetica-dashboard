import { Head, usePage } from '@inertiajs/react';
import { Calendar, TrendingUp, Users, FileText, ArrowRight } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import EventCard from '@/components/cards/event-card';
import { Evento } from '@/models/Evento';
import { type SharedData } from '@/types';

interface MenuProps {
    eventos: Evento[];
}

export default function Menu({ eventos }: MenuProps) {
    const { auth } = usePage<SharedData>().props;
    
    // Filtrar eventos baseado no tipo de usuário
    const filteredEventos = eventos.filter(evento => {
        // Se for aluno_AEDB, mostra todos os eventos
        if (auth.user.aluno_AEDB) {
            return true;
        }
        // Se não for aluno_AEDB, mostra apenas eventos SEGET
        return evento.seget;
    });
    
    // Filtrar eventos em andamento
    console.log("Eventos recebidos:", eventos);
    const eventosEmAndamento = filteredEventos.filter(evento => 
        !evento.evento_finalizado && 
        evento.data_inicio && evento.data_fim &&
        new Date(evento.data_inicio) <= new Date() && 
        new Date(evento.data_fim) >= new Date()
    );
    console.log("Eventos em andamento:", eventosEmAndamento);
    // Filtrar próximos eventos
    const proximosEventos = filteredEventos.filter(evento => 
        !evento.evento_finalizado && 
        new Date(evento.data_inicio) > new Date()
    ).slice(0, 3);

    const handleEventClick = (evento: Evento) => {
        // Navegar para detalhes do evento
        window.location.href = `/evento/${evento.id}`;
    };

    return (
        <AppLayout>
            <Head title="Menu Principal" />
            
            <div className="px-4 py-4 space-y-8">
                {/* Header */}


                {/* Eventos em Andamento */}
                {eventosEmAndamento.length > 0 && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Eventos em Andamento
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Eventos que estão acontecendo neste momento
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {eventosEmAndamento.map((evento) => (
                                <EventCard
                                    key={evento.id}
                                    evento={evento}
                                    onClick={handleEventClick}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Próximos Eventos */}
                {proximosEventos.length > 0 && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Próximos Eventos
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Eventos programados para os próximos dias
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {proximosEventos.map((evento) => (
                                <EventCard
                                    key={evento.id}
                                    evento={evento}
                                    onClick={handleEventClick}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Mensagem quando não há eventos */}
                {eventosEmAndamento.length === 0 && proximosEventos.length === 0 && (
                    <div className="text-center py-36">
                        <Calendar className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            Nenhum evento ativo
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Não há eventos em andamento ou programados no momento.
                        </p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}