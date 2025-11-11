export interface Medicamento {
    id: number;
    nome: string;
    descricao: string;
    valor: number;
    estoque: number;
    imagem: string;
    categorias_id: number;
    marcas_id: number;
    created_at: string;
    updated_at: string;
    // Relações opcionais (caso o backend retorne via Eloquent::with)
    categorias?: {
        id: number;
        nome: string;
    };
    marcas?: {
        id: number;
        nome: string;
    };
}
