import { usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { Area } from '@/models/Area';

interface PageProps extends Record<string, any> {
    areas?: Area[];
    area?: Area;
}

export function useAreas() {
    const { props } = usePage<PageProps>();
    
    const areas = props.areas || [];
    const area = props.area;

    const fetchAreas = () => {
        router.get('/areas');
    };

    const createArea = (data: Omit<Area, 'id' | 'created_at' | 'updated_at'>) => {
        router.post('/areas', data);
    };

    const updateArea = (id: number, data: Partial<Area>) => {
        router.put(`/areas/${id}`, data);
    };

    const deleteArea = (id: number) => {
        router.delete(`/areas/${id}`);
    };

    return {
        areas,
        area,
        fetchAreas,
        createArea,
        updateArea,
        deleteArea,
    };
}
