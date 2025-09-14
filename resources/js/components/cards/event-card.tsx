import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Evento } from '@/models/Evento';
import { useEventos } from '@/hooks/useEventos';
import LexicalHTMLRenderer from '@/components/manual/lexical-html-renderer';
import { useMemo } from 'react';

interface EventCardProps {
    evento: Evento;
    onClick?: (evento: Evento) => void;
}

export default function EventCard({ evento, onClick }: EventCardProps) {
    const formatDate = (date?: string | null) => {
        if (!date) return '';
        return new Date(date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    const isActive =
        !evento.evento_finalizado &&
        !!evento.data_inicio &&
        !!evento.data_fim &&
        new Date(evento.data_inicio) <= new Date() &&
        new Date(evento.data_fim) >= new Date();

    const isUpcoming =
        !evento.evento_finalizado &&
        !!evento.data_inicio &&
        new Date(evento.data_inicio) > new Date();

    const getStatusBadge = () => {
        if (evento.evento_finalizado) {
            return <Badge variant="secondary" className="bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">Finalizado</Badge>;
        }
        if (isActive) {
            return <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">Em Andamento</Badge>;
        }
        if (isUpcoming) {
            return <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">Programado</Badge>;
        }
        return null;
    };

    return (
        <Card 
            className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
            onClick={() => onClick?.(evento)}
        >
            {/* Imagem do Evento */}
            <div className="relative h-48 overflow-hidden">
                {evento.image ? (
                    <img 
                        src={`/storage/eventos/imagens/${evento.image}`}
                        alt={evento.nome}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                        <Calendar className="h-16 w-16 text-white/70" />
                    </div>
                )}
                
                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                    {getStatusBadge()}
                </div>

                {/* Tipos de Evento */}
                <div className="absolute bottom-3 left-3 flex gap-2">
                    {evento.seac ? (
                        <Badge className="bg-orange-500 hover:bg-orange-600 text-white text-xs">
                            SEAC
                        </Badge>
                    ) : null}
                    {evento.seget ? (
                        <Badge className="bg-purple-500 hover:bg-purple-600 text-white text-xs">
                            SEGET
                        </Badge>
                    ) : null}
                </div>
            </div>

            <CardHeader className="">
                <div className="space-y-2">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                        {evento.nome}
                    </h3>
                </div>
            </CardHeader>

            <CardContent className="pt-0 space-y-3">
                {/* Descrição */}
                <div className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                    <LexicalHTMLRenderer text={evento.descricao} />
                </div>

                {/* Informações de Data */}
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="h-4 w-4" />
                        {formatDate(evento.data_inicio)}
                        {evento.data_inicio !== evento.data_fim && evento.data_fim && (
                            <> - {formatDate(evento.data_fim)}</>
                        )}
                </div>

                {/* Indicador de Status com ícone */}
                <div className="flex items-center gap-2 text-sm">
                    {isActive ? (
                        <>
                            <Clock className="h-4 w-4 text-green-500" />
                            <span className="text-green-600 dark:text-green-400 font-medium">
                                Acontecendo agora
                            </span>
                        </>
                    ) : null}
                    {isUpcoming ? (
                        <>
                            <Clock className="h-4 w-4 text-blue-500" />
                            <span className="text-blue-600 dark:text-blue-400 font-medium">
                                Em breve
                            </span>
                        </>
                    ) : null}
                    {evento.evento_finalizado ? (
                        <>
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span className="text-gray-500 dark:text-gray-400">
                                Encerrado
                            </span>
                        </>
                    ) : null}
                </div>
            </CardContent>
        </Card>
    );
}
