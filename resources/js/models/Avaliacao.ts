import { Artigo } from "./Artigo";
import { Status } from "./Status";
import { Usuario } from "./Usuario";

export interface Avaliacao {
  id: number;
  avaliacao: string;
  sugestao: string;
  observacoes: string;
  media_ava: number;

  artigos_id: number;
  avaliadores_id: number;
  status_id: number;

  usuario: Usuario;
  status: Status;
  artigo: Artigo;

  created_at: string;
  updated_at: string;
}
