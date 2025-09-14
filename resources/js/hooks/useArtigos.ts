import { usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { Artigo } from '@/models/Artigo';

interface PageProps extends Record<string, any> {
    artigos?: Artigo[];
    artigo?: Artigo;
}

export function useArtigos() {
    const { props } = usePage<PageProps>();
    
    const artigos = props.artigos || [];
    const artigo = props.artigo;

    const fetchArtigos = () => {
        router.get('/artigos');
    };

    const createArtigo = (data: any) => {
        router.post('/artigos', data);
    };

    const updateArtigo = (id: number, data: any) => {
        router.put(`/artigos/${id}`, data);
    };

    const deleteArtigo = (id: number) => {
        router.delete(`/artigos/${id}`);
    };

    const avaliarArtigo = (id: number, data: any) => {
        router.put(`/artigos/${id}/avaliar`, data);
    };

    return {
        artigos,
        artigo,
        fetchArtigos,
        createArtigo,
        updateArtigo,
        deleteArtigo,
        avaliarArtigo,
    };
}
