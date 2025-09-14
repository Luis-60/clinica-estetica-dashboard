import { Calendar, MapPin, Clock, Users, Newspaper, Hourglass } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Evento } from "@/models/Evento";
import { useEventos } from "@/hooks/useEventos";
import { Button } from "@headlessui/react";
import formatHandler from "@/lib/formatHandler";
import { TipoTag } from "@/components/ui/tipo-tag";
import { Ciclo } from "@/models/Ciclo";
interface CardCicloProps {
  ciclo: Ciclo;
}

export default function CardCiclo({ ciclo }: CardCicloProps) {

  const isActive =
    !!ciclo.data_inicio &&
    !!ciclo.data_fim &&
    new Date(ciclo.data_inicio) <= new Date() &&
    new Date(ciclo.data_fim) >= new Date();

  const isUpcoming = 
    !!ciclo.data_inicio &&
    new Date(ciclo.data_inicio) > new Date();

    const isFinished =
    !!ciclo.data_fim &&
    new Date(ciclo.data_fim) < new Date();
  const getStatusBadge = () => {
    if (isFinished) {
      return (
        <Badge
          variant="secondary"
          className="bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
        >
          Finalizado
        </Badge>
      );
    }
    if (isUpcoming) {
      return (
        <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300">
           Em breve
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
    return null;
  };

  return (
    <>
      {/* Card do Ciclo */}
      <div className="mb-4 w-full  md:max-w-64 md:flex-shrink-0">
        <div className="border md:min-h-52 w-full md:mr-2 rounded-lg shadow-sm bg-card">
          {/*Card Content */}
          <div className="p-6">
            <Hourglass className="w-6 h-6 mb-2 text-gray-500" />
            <h2 className="text-lg font-bold text-gray-800 dark:text-white">{ciclo.nome}</h2>
            <div className="flex mt-2 gap-2">
                {getStatusBadge()}
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <div className="flex items-center text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                
                <span className="ml-2 text-gray-900 dark:text-gray-400">
                  {formatHandler.formatDate(ciclo.data_inicio)} - {formatHandler.formatDate(ciclo.data_fim ?? "")}
                </span>
                </div>
            
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
