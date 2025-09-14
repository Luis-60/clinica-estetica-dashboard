import { Usuario } from '@/models/Usuario';
import { Tipo } from '@/models/Tipo';

export interface TipoUsuario {
    id: number;
    usuarios_id: number;
    tipos_id: number;
    
    // Relacionamentos (opcionais)
    tipo?: Tipo;
    usuario?: Usuario;
    
    // Timestamps
    created_at: string;
    updated_at: string;
}