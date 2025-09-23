export interface Evolucao {
  id: number;
  data: string;
  procedimento: string;
  observacoes?: string;
  pacientes_id: number;
  created_at: string;
  updated_at: string;
  paciente?: {
    id: number;
    nome: string;
    slug?: string;
  };
}
