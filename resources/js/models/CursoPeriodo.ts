import { Periodo } from '@/models/Periodo';
import { Curso } from '@/models/Curso';

export interface CursoPeriodo {
    id: number;
    cursos_id: number;
    periodos_id: number;
    
    // Relacionamentos (opcionais)
    curso?: Curso;
    periodo?: Periodo;
    
    // Timestamps
    created_at: string;
    updated_at: string;
}