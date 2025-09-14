import { usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { Status } from '@/models/Status';

interface PageProps extends Record<string, any> {
    status?: Status[];
    statusItem?: Status;
}

export function useStatus() {
    const { props } = usePage<PageProps>();
    
    const status = props.status || [];
    const statusItem = props.statusItem;

    const fetchStatus = () => {
        router.get('/status');
    };

    const createStatus = (data: any) => {
        router.post('/status', data);
    };

    const updateStatus = (id: number, data: any) => {
        router.put(`/status/${id}`, data);
    };

    const deleteStatus = (id: number) => {
        router.delete(`/status/${id}`);
    };

    return {
        status,
        statusItem,
        fetchStatus,
        createStatus,
        updateStatus,
        deleteStatus,
    };
}
