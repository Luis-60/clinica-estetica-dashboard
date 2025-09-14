import React from "react";
import { Artigo } from "@/models/Artigo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Edit,
  Trash2,
  FileText,
  Calendar,
  User,
  MapPin,
  CheckCircle,
  Clock,
  AlertCircle,
  Users,
} from "lucide-react";
import { Link } from "@inertiajs/react";
import { Usuario } from "@/models/Usuario";

// Componente para modal de autores
function AutoresModal({
  autores,
  tituloArtigo,
}: {
  autores: Usuario[];
  tituloArtigo: string;
}) {
  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Autores do Artigo
        </DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground">
          <strong>Artigo:</strong> {tituloArtigo}
        </div>
        <div className="space-y-2">
          <h4 className="font-medium">Autores ({autores.length}):</h4>
          <div className="space-y-2">
            {autores.map((autor, index) => (
              <div
                key={autor.id}
                className="flex items-center gap-3 p-3 rounded-lg border bg-card"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{autor.nome}</div>
                  {autor.email && (
                    <div className="text-sm text-muted-foreground">
                      {autor.email}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

interface ArtigoCardProps {
  artigo: Artigo;
}

export function ArtigoCard({ artigo }: ArtigoCardProps) {
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("pt-BR");
    } catch {
      return dateString;
    }
  };

  const getStatusColor = (status?: { nome: string }) => {
    if (!status) return "bg-gray-100 text-gray-800";

    const statusName = status.nome.toLowerCase();
    if (statusName.includes("aprovado") || statusName.includes("aceito")) {
      return "bg-green-100 text-green-800";
    }
    if (statusName.includes("rejeitado") || statusName.includes("recusado")) {
      return "bg-red-100 text-red-800";
    }
    if (statusName.includes("pendente") || statusName.includes("analise")) {
      return "bg-yellow-100 text-yellow-800";
    }
    return "bg-blue-100 text-blue-800";
  };

  const getStatusIcon = (status?: { nome: string }) => {
    if (!status) return AlertCircle;

    const statusName = status.nome.toLowerCase();
    if (statusName.includes("aprovado") || statusName.includes("aceito")) {
      return CheckCircle;
    }
    if (statusName.includes("rejeitado") || statusName.includes("recusado")) {
      return AlertCircle;
    }
    return Clock;
  };

  const StatusIcon = getStatusIcon(artigo.status);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className="p-1 rounded-sm bg-blue-100">
              <FileText className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold mb-1 truncate max-w-28">
                {artigo.titulo}
              </h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {/* <span>ID: {artigo.id}</span> */}
                {artigo.data_envio && (
                  <>
                    <Calendar className="size-3" />
                    <span>{formatDate(artigo.data_envio)}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-1">
            <Link href={route("gerir-artigo", artigo.id)}>
              <Edit className="h-4 w-4" />
            </Link>
            {/* <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(artigo)}
              className="h-8 w-8 p-0"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(artigo.id)}
              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button> */}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-4">
        {/* Evento e Área */}
        <div className="space-y-2">
          {artigo.evento && (
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="size-3 text-muted-foreground" />
              <span className="text-muted-foreground">Evento:</span>
              <span className="font-medium">{artigo.evento.nome}</span>
            </div>
          )}
          {artigo.area && (
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="size-3 text-muted-foreground" />
              <span className="text-muted-foreground">Área:</span>
              <span className="font-medium">{artigo.area.sigla}</span>
            </div>
          )}
        </div>

        {/* Resumo */}
        {artigo.resumo && (
          <div>
            <span className="text-sm text-muted-foreground mb-2 block">
              Resumo:
            </span>
            <p className="text-sm text-foreground break-all md:line-clamp-1 line-clamp-3 max-w-50">
              {artigo.resumo}
            </p>
          </div>
        )}

        {/* Autores */}
        {artigo.autores && artigo.autores.length > 0 && (
          <div>
            <span className="text-sm text-muted-foreground mb-2 block">
              Autores ({artigo.autores.length}):
            </span>
            <div className="flex flex-wrap gap-1 items-center">
              {artigo.autores.length <= 3 ? (
                // Mostra todos se forem 3 ou menos
                artigo.autores.map((autor) => (
                  <Badge
                    key={autor.id}
                    variant="secondary"
                    className="bg-blue-100 text-blue-800 hover:bg-blue-100"
                  >
                    {autor.nome}
                  </Badge>
                ))
              ) : (
                // Mostra os primeiros 2 + botão "Ver mais"
                <>
                  {artigo.autores.slice(0, 2).map((autor) => (
                    <Badge
                      key={autor.id}
                      variant="secondary"
                      className="bg-blue-100 text-blue-800 hover:bg-blue-100"
                    >
                      {autor.nome}
                    </Badge>
                  ))}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-6 px-2 text-xs"
                      >
                        +{artigo.autores.length - 2} mais
                      </Button>
                    </DialogTrigger>
                    <AutoresModal
                      autores={artigo.autores}
                      tituloArtigo={artigo.titulo || "Sem título"}
                    />
                  </Dialog>
                </>
              )}
            </div>
          </div>
        )}

        {/* Status */}
        <div className="flex flex-wrap gap-2">
          {artigo.status && (
            <Badge
              variant="secondary"
              className={getStatusColor(artigo.status)}
            >
              <StatusIcon className="h-3 w-3 mr-1" />
              {artigo.status.nome}
            </Badge>
          )}
          {artigo.ano && <Badge variant="outline">Ano: {artigo.ano}</Badge>}
        </div>
      </CardContent>
    </Card>
  );
}

interface ArtigoCardsProps {
  artigos: Artigo[];
}

export default function ArtigoCards({ artigos }: ArtigoCardsProps) {
  if (artigos.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold mb-2">Nenhum artigo encontrado</h3>
        <p className="text-muted-foreground">
          Comece criando um novo artigo científico para seu evento.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {artigos.map((artigo) => (
        <ArtigoCard key={artigo.id} artigo={artigo} />
      ))}
    </div>
  );
}
