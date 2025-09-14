import React from 'react';
import { Badge } from './badge';

interface StatusTagProps {
  status?: { nome: string } | null;
}

export function StatusTag({ status }: StatusTagProps) {
  if (!status) {
    return <span className="text-muted-foreground text-sm">Sem status</span>;
  }

  const statusName = status.nome.toLowerCase();

  if (statusName.includes('aprovado') || statusName.includes('aceito')) {
    return (
      <Badge 
        variant="secondary"
        className="bg-green-100 text-green-800 hover:bg-green-200"
      >
        {status.nome}
      </Badge>
    );
  }

  if (statusName.includes('rejeitado') || statusName.includes('reprovado') || statusName.includes('recusado')) {
    return (
      <Badge 
        variant="secondary"
        className="bg-red-100 text-red-800 hover:bg-red-200"
      >
        {status.nome}
      </Badge>
    );
  }

  if (statusName.includes('pendente') || statusName.includes('análise') || statusName.includes('analise') || statusName.includes('aguardando')) {
    return (
      <Badge 
        variant="secondary"
        className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
      >
        {status.nome}
      </Badge>
    );
  }

  if (statusName.includes('em revisão') || statusName.includes('revisão') || statusName.includes('em andamento')) {
    return (
      <Badge 
        variant="secondary"
        className="bg-blue-100 text-blue-800 hover:bg-blue-200"
      >
        {status.nome}
      </Badge>
    );
  }

  return (
    <Badge 
      variant="secondary"
      className="bg-gray-100 text-gray-800 hover:bg-gray-200"
    >
      {status.nome}
    </Badge>
  );
}
