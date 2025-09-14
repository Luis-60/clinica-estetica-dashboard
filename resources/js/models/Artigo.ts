import { Area } from '@/models/Area'; 
import { Evento } from '@/models/Evento'; 
import { Status } from '@/models/Status';
import { Usuario } from '@/models/Usuario';
import  { Modalidade } from '@/models/Modalidade';
export interface Artigo {
    id: number;
    titulo?: string | null;
    resumo?: string | null;
    arquivo?: string | null;
    data_envio?: string | null;
    data_avaliacao?: string | null;
    media_final?: number | null;
    ano?: number | null;
    tipo?: string; // "SEAC" | "SEGET" 
    // Foreign Keys
    areas_id: number;
    eventos_id: number;
    status_id: number;
    modalidades_id: number;
    
    // Relacionamentos (opcionais) - nomes devem bater com os métodos do modelo Laravel
    area?: Area;
    evento?: Evento;
    status?: Status;
    autores?: Usuario[];
    modalidades?: Modalidade;
    
    // Helper
    autores_string?: string;
    
    // Timestamps
    created_at: string;
    updated_at: string;
}
   
