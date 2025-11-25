import { Paciente } from "./Paciente";
import { Procedimento } from "./Procedimento";

export interface Consulta {
    id: number;
    nome: string;
    concluido: 0 | 1;
    paciente: Paciente;
    pacientes_id: number;
    procedimentos_id: number;
    procedimento: Procedimento;
    data: string;
    created_at: string;
    updated_at: string;
}


