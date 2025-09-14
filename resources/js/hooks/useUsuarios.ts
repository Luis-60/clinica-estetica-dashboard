import { usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { Usuario } from '@/models/Usuario';

interface PageProps extends Record<string, any> {
    usuarios?: Usuario[];
    usuario?: Usuario;
    autores?: Usuario[];
    coordenadores?: Usuario[];
    avaliadores?: Usuario[];
    orientadores?: Usuario[];
}

export function useUsuarios() {
    const { props } = usePage<PageProps>();
    
    const usuarios = props.usuarios || [];
    const usuario = props.usuario;
    const autores = props.autores || [];
    const coordenadores = props.coordenadores || [];
    const avaliadores = props.avaliadores || [];
    const orientadores = props.orientadores || [];

    const fetchUsuarios = () => {
        router.get('/usuarios');
    };

    const fetchAutores = () => {
        router.get('/autores');
    };

    const fetchAvaliadores = () => {
        router.get('/avaliadores');
    };

    const fetchOrientadores = () => {
        router.get('/orientadores');
    };

    const createUsuario = (data: any) => {
        router.post('/usuarios', data);
    };

    const updateUsuario = (id: number, data: any) => {
        router.put(`/usuarios/${id}`, data);
    };

    const deleteUsuario = (id: number) => {
        router.delete(`/usuarios/${id}`);
    };

    return {
        usuarios,
        usuario,
        autores,
        avaliadores,
        orientadores,
        coordenadores,
        fetchUsuarios,
        fetchAutores,
        fetchAvaliadores,
        fetchOrientadores,
        createUsuario,
        updateUsuario,
        deleteUsuario,
    };
}
