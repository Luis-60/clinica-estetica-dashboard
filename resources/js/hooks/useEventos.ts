import { usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { Evento } from '@/models/Evento';

interface PageProps extends Record<string, any> {
    eventos?: Evento[];
    evento?: Evento;
}

export function useEventos() {
    const { props } = usePage<PageProps>();
    
    const eventos = props.eventos || [];
    const evento = props.evento;

    const fetchEventos = () => {
        router.get('/eventos');
    };

    const createEvento = (data: any) => {
        router.post('/eventos', data);
    };

    const updateEvento = (id: number, data: any) => {
        router.put(`/eventos/${id}`, data);
    };

    const deleteEvento = (id: number) => {
        router.delete(`/eventos/${id}`);
    };

    return {
        eventos,
        evento,
        fetchEventos,
        createEvento,
        updateEvento,
        deleteEvento,
    };
}
