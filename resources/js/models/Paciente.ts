export interface Paciente {
    id: number;
    nome: string;
    data_nasc: string;
    endereco: string;
    telefone: string;
    sexo: 'masculino' | 'feminino';
    rede_social: string;
    usuarios_id: number;
    created_at: string;
    updated_at: string;
}