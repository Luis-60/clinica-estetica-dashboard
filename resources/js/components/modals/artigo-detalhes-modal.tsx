import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  FileText,
  Calendar,
  MapPin,
  CheckCircle,
  Clock,
  AlertCircle,
  Users,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Artigo } from "@/models/Artigo";

interface ArtigoDetalhesModalProps {
  artigo: Artigo;
}

export function ArtigoDetalhesModal({ artigo }: ArtigoDetalhesModalProps) {
  function foiReprovado(nomeStatus: string) {
    return (
      nomeStatus.includes("rejeitado") ||
      nomeStatus.includes("recusado") ||
      nomeStatus.includes("reprovado")
    );
  }
  function foiAprovado(nomeStatus: string) {
    return nomeStatus.includes("aprovado") || nomeStatus.includes("aceito");
  }
  function estaPendente(nomeStatus: string) {
    return nomeStatus.includes("pendente") || nomeStatus.includes("análise");
  }

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
    if (foiAprovado(statusName)) {
      return "bg-green-100 text-green-800";
    }
    if (foiReprovado(statusName)) {
      return "bg-red-100 text-red-800";
    }
    if (estaPendente(statusName)) {
      return "bg-yellow-100 text-yellow-800";
    }
    return "bg-blue-100 text-blue-800";
  };

  const getStatusIcon = (status?: { nome: string }) => {
    if (!status) return AlertCircle;

    const statusName = status.nome.toLowerCase();
    if (foiAprovado(statusName)) {
      return CheckCircle;
    }
    if (foiReprovado(statusName)) {
      return AlertCircle;
    }
    return Clock;
  };

  const StatusIcon = getStatusIcon(artigo.status);

  return (
    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Detalhes do Artigo
        </DialogTitle>
      </DialogHeader>

      <div className="space-y-6">
        {/* Informações Básicas */}
        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-semibold leading-tight">
              {artigo.titulo || "Sem título"}
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <span>ID: {artigo.id}</span>
              {artigo.ano && (
                <>
                  <span>•</span>
                  <span>Ano: {artigo.ano}</span>
                </>
              )}
            </div>
          </div>

          {/* Status e Data */}
          <div className="flex flex-wrap gap-2 items-center">
            {artigo.status && (
              <Badge
                variant="secondary"
                className={getStatusColor(artigo.status)}
              >
                <StatusIcon className="h-3 w-3 mr-1" />
                {artigo.status.nome}
              </Badge>
            )}
            {artigo.data_envio && (
              <Badge variant="outline">
                <Calendar className="h-3 w-3 mr-1" />
                Enviado em {formatDate(artigo.data_envio)}
              </Badge>
            )}
            {artigo.data_avaliacao && (
              <Badge variant="outline">
                <Clock className="h-3 w-3 mr-1" />
                Avaliado em {formatDate(artigo.data_avaliacao)}
              </Badge>
            )}
          </div>
        </div>

        <Separator />

        {/* Resumo */}
        {artigo.resumo && (
          <div className="space-y-2">
            <h4 className="font-medium">Resumo</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {artigo.resumo}
            </p>
          </div>
        )}

        {/* Informações do Evento e Área */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {artigo.evento && (
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Evento
              </h4>
              <p className="text-sm bg-muted p-3 rounded-lg">
                {artigo.evento.nome}
              </p>
            </div>
          )}

          {artigo.area && (
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Área
              </h4>
              <p className="text-sm bg-muted p-3 rounded-lg">
                {artigo.area.sigla} - {artigo.area.nome}
              </p>
            </div>
          )}
        </div>

        {/* Autores */}
        {artigo.autores && artigo.autores.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <Users className="h-4 w-4" />
              Autores ({artigo.autores.length})
            </h4>
            <div className="grid gap-2">
              {artigo.autores.map((autor, index) => (
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
        )}

        {/* Notas e Avaliação */}
        {artigo.media_final && (
          <div className="space-y-2">
            <h4 className="font-medium">Avaliação</h4>
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className={
                  artigo.media_final >= 7
                    ? "bg-green-100 text-green-800"
                    : artigo.media_final >= 5
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                }
              >
                Nota: {artigo.media_final}
              </Badge>
            </div>
          </div>
        )}

        {/* Arquivo */}
        {artigo.arquivo && (
          <div className="space-y-2">
            <h4 className="font-medium">Arquivo</h4>
            <Button variant="outline" size="sm" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Baixar Arquivo ({artigo.arquivo})
            </Button>
          </div>
        )}
      </div>
    </DialogContent>
  );
}
