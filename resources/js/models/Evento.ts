export interface Evento {
    id: number;
    nome: string;
    descricao?: string | null | [];
    data_inicio: string;
    data_fim?: string | null;
    evento_finalizado: boolean;
    seac: boolean;
    seget: boolean;
    image: string;
    created_at: string;
    updated_at: string;
}