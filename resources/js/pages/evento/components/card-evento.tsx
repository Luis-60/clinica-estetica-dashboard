import { Calendar, MapPin, Clock, Users, Newspaper } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Evento } from "@/models/Evento";
import { useEventos } from "@/hooks/useEventos";
import { Button } from "@headlessui/react";
import { Area } from "@/models/Area";
import formatHandler from "@/lib/formatHandler";
import { TipoTag } from "@/components/ui/tipo-tag";
import { router } from "@inertiajs/react";
interface CardEventoProps {
  evento: Evento;
  onClick?: (evento: Evento) => void;
}
export default function CardEvento({ evento, onClick }: CardEventoProps) {
  const formatDate = (date?: string | null) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
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
      return (
        <Badge
          variant="secondary"
          className="bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
        >
          Finalizado
        </Badge>
      );
    }
    if (isActive) {
      return (
        <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
          Em Andamento
        </Badge>
      );
    }
    if (isUpcoming) {
      return (
        <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
          Programado
        </Badge>
      );
    }
    return null;
  };
    const handleSelecionarEvento = (evento: any) => {
        if (evento.seac) {
            router.visit(`/novo-artigo-seac/${evento.id}`);
        } else if (evento.seget) {
            router.visit(`/novo-artigo-seget/${evento.id}`);
        }
    };

  return (
    <>
      {/* Imagem do Evento */}
      <div className="grid top-4">
        <div className="md:border-1 md:shadow-lg h-full min-h-[42vw] flex flex-col">
          {/* Card Image */}
            <div className="-mx-4 -my-4 sm:my-0 sm:mx-0">

              <img
                className="w-full h-48 object-cover"
                src={
                  `/storage/eventos/imagens/${evento.image}`
                }
                alt={evento.nome}
                />
            </div>
          {/*Card Content */}
          <div className="md:p-6 py-7 flex-1 flex flex-col">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">{evento.nome}</h2>
                <div className="flex mt-2 gap-2">
                    {getStatusBadge()}
                        
                    {evento.seac ? (
                        <TipoTag tipo="seac" />
                    ) : null}
                    {evento.seget ? (
                        <TipoTag tipo="seget" />
                    ) : null}
                </div>

            <div className="mt-4 flex flex-col gap-2 flex-1">
              <div className="flex items-center text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Data de Início: </span>
                <span className="ml-2 text-gray-900 dark:text-gray-400">
                  {formatHandler.formatDate(evento.data_inicio)}
                </span>
                </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Data de Fim: </span>
                <span className="ml-2 text-gray-900 dark:text-gray-400">
                  {formatHandler.formatDate(evento.data_fim ?? "")}
                </span>
                </div>
            </div>
            {/* Botão sempre no final e fixo no card */}
          </div>
            <Button 
                onClick={() => handleSelecionarEvento(evento)}
                className="w-full p-2 flex gap-2 justify-center bg-blue-600 text-white hover:bg-blue-700 mt-auto">
                <Newspaper />
                Submeter Artigo
            </Button>
        </div>
      </div>
    </>
  );
}
