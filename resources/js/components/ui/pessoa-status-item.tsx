import React from 'react';
import { Badge } from './badge';
import { cn } from '@/lib/utils';

interface PessoaStatusItemProps {
  icon: React.ReactNode;
  nome: string;
  email: string;
  status: 'aceitou' | 'pendente';
}

export function PessoaStatusItem({ icon, nome, email, status }: PessoaStatusItemProps) {
  return (
    <div className="flex items-center gap-3 py-2">
      {icon}
      <div className="flex flex-col">
        <span className="font-medium text-foreground">{nome}</span>
        <span className="text-gray-500 text-sm">{email}</span>
      </div>
      <Badge
        className={
          cn(
            status === 'aceitou'
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800',
              'ml-auto'
          )
        }
        variant="secondary"
      >
        {status === 'aceitou' ? 'Aceitou' : 'Pendente'}
      </Badge>
    </div>
  );
}
