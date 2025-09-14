import { Avaliacao } from "@/models/Avaliacao";
import { StatusTag } from "../../../components/ui/status-tag";
import { UserInfo } from "../../../components/user-info";
import LexicalHtmlRenderer from "@/components/manual/lexical-html-renderer";
import lexicalHelper from "@/lib/lexicalHelper";

interface EvaluatedCardProps {
  avaliacao: Avaliacao;
}

export function EvaluatedCard({ avaliacao }: EvaluatedCardProps) {
  const statusAtual = avaliacao.status.nome
    ? {
        nome: avaliacao.status.nome,
      }
    : null;

  return (
    <div className="rounded-lg border bg-background p-6 shadow-sm w-full">
      <div className="mb-4">
        <UserInfo user={avaliacao.usuario} />
      </div>
      <div className="flex-1 mb-2">
        <span className="font-semibold text-gray-700/300">Avaliação: </span>
        <span className="text-gray-800/200 text-base">
          {avaliacao.avaliacao ? (
            <LexicalHtmlRenderer text={avaliacao.avaliacao} />
          ) : (
            <span className="text-muted-foreground">Sem avaliação</span>
          )}
        </span>
      </div>
      <div className="flex-1">
        <span className="font-semibold text-gray-700/300">Sugestão: </span>
        <span className="text-gray-800/200 text-base">
          {avaliacao.sugestao ? (
            <LexicalHtmlRenderer text={avaliacao.sugestao} />
          ) : (
            <span className="text-muted-foreground">Sem sugestão</span>
          )}
        </span>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <span className="font-semibold text-gray-700/300">Status:</span>
        <StatusTag status={statusAtual} />
      </div>
    </div>
  );
}
