import { Instituicao } from '@/models/Instituicao';
import { Curso }  from '@/models/Curso';
import { Periodo }  from '@/models/Periodo';

export interface Usuario {
    id: number;
    nome: string;
    email: string;
    senhaHash?: string; // Opcional pois nem sempre vem do backend
    foto?: string | null;
    matricula?: string | null;
    estado?: string | null;
    cidade?: string | null;
    endereco?: string | null;
    bairro?: string | null;
    cep?: string | null;
    telefone?: string | null;
    email_verificado: boolean;
    aluno_AEDB: boolean;
    token_recuperacao?: string | null;
    ultimo_login?: string | null;
    
    // Foreign Keys
    instituicoes_id: number;
    periodos_id: number;
    
    // Relacionamentos (podem estar presentes ou não)
    instituicao?: Instituicao;
    cursos?: Curso[];
    periodo?: Periodo;
    // Timestamps
    created_at: string;
    updated_at: string;
}

