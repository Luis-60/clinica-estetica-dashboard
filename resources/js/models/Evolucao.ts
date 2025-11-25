import { Procedimento } from "./Procedimento";

export interface Evolucao {
  id: number;
  data: string;
  procedimentos_id: string | number;
  observacoes?: string;
  procedimento?: Procedimento;
  pacientes_id: number;
  created_at: string;
  updated_at: string;
  paciente?: {
    id: number;
    nome: string;
    slug?: string;
  };
}
