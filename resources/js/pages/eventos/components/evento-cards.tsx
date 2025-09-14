import React from 'react';
import { Evento } from '@/models/Evento';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Calendar, Clock, MapPin, CheckCircle, XCircle } from 'lucide-react';
import LexicalHTMLRenderer from '../../../components/manual/lexical-html-renderer';
interface EventoCardProps {
    evento: Evento;
    onEdit: (evento: Evento) => void;
    onDelete: (id: number) => void;
}

export function EventoCard({ evento, onEdit, onDelete }: EventoCardProps) {
    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('pt-BR') + ' ' + date.toLocaleTimeString('pt-BR', { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
        } catch {
            return dateString;
        }
    };

    const formatDateShort = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleDateString('pt-BR');
        } catch {
            return dateString;
        }
    };

    const isEventoFinalizado = evento.evento_finalizado;
    const isEventoAtivo = !isEventoFinalizado && new Date(evento.data_inicio) <= new Date();

    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                            isEventoFinalizado ? 'bg-gray-100' : 
                            isEventoAtivo ? 'bg-green-100' : 'bg-blue-100'
                        }`}>
                            <Calendar className={`h-4 w-4 ${
                                isEventoFinalizado ? 'text-gray-600' : 
                                isEventoAtivo ? 'text-green-600' : 'text-blue-600'
                            }`} />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold line-clamp-2">{evento.nome}</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <Clock className="h-3 w-3 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">
                                    {formatDateShort(evento.data_inicio)}
                                    {evento.data_fim && ` - ${formatDateShort(evento.data_fim)}`}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-1">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEdit(evento)}
                            className="h-8 w-8 p-0"
                        >
                            <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDelete(evento.id)}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

            </CardHeader>
                            
            <CardContent className="pt-0">
                {evento.descricao && (

                    <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                        <LexicalHTMLRenderer text={evento.descricao} />
                    </p>
                )}
                
                {/* Data e hora detalhadas */}
                <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">Início:</span>
                        <span className="font-medium">{formatDate(evento.data_inicio)}</span>
                    </div>
                    {evento.data_fim && (
                        <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-muted-foreground">Fim:</span>
                            <span className="font-medium">{formatDate(evento.data_fim)}</span>
                        </div>
                    )}
                </div>

                {/* Status e tipos */}
                <div className="flex flex-wrap gap-2">
                    {/* Status do evento */}
                    {isEventoFinalizado ? (
                        <Badge variant="secondary" className="bg-gray-100 text-gray-800 hover:bg-gray-100">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Finalizado
                        </Badge>
                    ) : isEventoAtivo ? (
                        <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
                            <Clock className="h-3 w-3 mr-1" />
                            Em Andamento
                        </Badge>
                    ) : (
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                            <Calendar className="h-3 w-3 mr-1" />
                            Programado
                        </Badge>
                    )}

                    {/* Tipos de evento */}
                    {evento.seac ? (
                        <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
                            SEAC
                        </Badge>
                    ) : null}
                    {evento.seget ? (
                        <Badge variant="secondary" className="bg-purple-100 text-purple-800 hover:bg-purple-100">
                            SEGET
                        </Badge>
                    ) : null}
                    {!evento.seac && !evento.seget ? (
                        <Badge variant="outline">
                            Evento Geral
                        </Badge>
                    ): null}
                </div>
            </CardContent>
        </Card>
    );
}

interface EventoCardsProps {
    eventos: Evento[];
    onEdit: (evento: Evento) => void;
    onDelete: (id: number) => void;
}

export default function EventoCards({ eventos, onEdit, onDelete }: EventoCardsProps) {
    if (eventos.length === 0) {
        return (
            <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Nenhum evento encontrado</h3>
                <p className="text-muted-foreground">
                    Comece criando um novo evento para organizar suas atividades acadêmicas.
                </p>
            </div>
        );
    }

    // Organizar eventos por status
    const eventosAtivos = eventos.filter(e => !e.evento_finalizado && new Date(e.data_inicio) <= new Date());
    const eventosProgramados = eventos.filter(e => !e.evento_finalizado && new Date(e.data_inicio) > new Date());
    const eventosFinalizados = eventos.filter(e => e.evento_finalizado);

    const renderEventosList = (eventosLista: Evento[], titulo: string) => {
        if (eventosLista.length === 0) return null;

        return (
            <div className="space-y-4">
                <h2 className="text-xl font-semibold text-muted-foreground">{titulo}</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {eventosLista.map((evento) => (
                        <EventoCard
                            key={evento.id}
                            evento={evento}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-8">
            {renderEventosList(eventosAtivos, "Em Andamento")}
            {renderEventosList(eventosProgramados, "Programados")}
            {renderEventosList(eventosFinalizados, "Finalizados")}
        </div>
    );
}
