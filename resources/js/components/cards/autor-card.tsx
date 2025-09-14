import React from "react";
import { User } from "lucide-react";

interface AutorCardProps {
  nome: string;
  email?: string;
  isPrincipal?: boolean;
  children?: React.ReactNode; // Novo: permite inserir botão de ação
}

export const AutorCard: React.FC<AutorCardProps> = ({ nome, email, isPrincipal, children }) => (
  <div className="flex items-center justify-between gap-3 p-4 bg-card border rounded-lg shadow-sm min-h-[72px]">
    <div className="flex items-center gap-3 flex-1 min-w-0">
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600">
        <User className="w-6 h-6 text-white" />
      </div>
      <div className="min-w-0">
        <div className="font-semibold text-accent-foreground truncate">{nome}</div>
        {email && <div className="text-xs text-gray-500 truncate">{email}</div>}
        {isPrincipal && (
          <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded">
            Autor principal
          </span>
        )}
      </div>
    </div>
    {children && <div className="ml-2 flex-shrink-0">{children}</div>}
  </div>
);