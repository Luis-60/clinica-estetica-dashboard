import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Usuario } from '@/models/Usuario';

import { Users } from "lucide-react";

// Componente para modal de autores
export function AutoresModal({ autores, tituloArtigo }: { autores: Usuario[], tituloArtigo: string }) {
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
                    <div className="text-sm text-muted-foreground">{autor.email}</div>
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