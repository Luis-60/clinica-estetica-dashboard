import { usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { Curso } from '@/models/Curso';
import { Periodo } from '@/models/Periodo';
import { CursoPeriodo } from '@/models/CursoPeriodo';

interface PageProps extends Record<string, any> {
    cursos?: Curso[];
    curso?: Curso;
    periodos?: Periodo[];
    periodo?: Periodo;
    cursos_periodos?: CursoPeriodo[];
    curso_periodo?: CursoPeriodo;
}

export function useCursos() {
    const { props } = usePage<PageProps>();
    
    const cursos = props.cursos || [];
    const curso = props.curso;

    const fetchCursos = () => {
        router.get('/cursos');
    };

    const createCurso = (data: any) => {
        router.post('/cursos', data);
    };

    const updateCurso = (id: number, data: any) => {
        router.put(`/cursos/${id}`, data);
    };

    const deleteCurso = (id: number) => {
        router.delete(`/cursos/${id}`);
    };

    return {
        cursos,
        curso,
        fetchCursos,
        createCurso,
        updateCurso,
        deleteCurso,
    };
}

export function usePeriodos() {
    const { props } = usePage<PageProps>();
    
    const periodos = props.periodos || [];
    const periodo = props.periodo;

    const fetchPeriodos = () => {
        router.get('/periodos');
    };

    const createPeriodo = (data: any) => {
        router.post('/periodos', data);
    };

    const updatePeriodo = (id: number, data: any) => {
        router.put(`/periodos/${id}`, data);
    };

    const deletePeriodo = (id: number) => {
        router.delete(`/periodos/${id}`);
    };

    return {
        periodos,
        periodo,
        fetchPeriodos,
        createPeriodo,
        updatePeriodo,
        deletePeriodo,
    };
}

export function useCursosPeriodos() {
    const { props } = usePage<PageProps>();
    
    const cursos_periodos = props.cursos_periodos || [];
    const curso_periodo = props.curso_periodo;
    const cursos = props.cursos || []; // Para formulários/selects
    const periodos = props.periodos || []; // Para formulários/selects

    const fetchCursosPeriodos = () => {
        router.get('/cursos-periodos');
    };

    const createCursoPeriodo = (data: any) => {
        router.post('/cursos-periodos', data);
    };

    const updateCursoPeriodo = (id: number, data: any) => {
        router.put(`/cursos-periodos/${id}`, data);
    };

    const deleteCursoPeriodo = (id: number) => {
        router.delete(`/cursos-periodos/${id}`);
    };

    return {
        cursos_periodos,
        curso_periodo,
        cursos,           // Lista para selects
        periodos,         // Lista para selects
        fetchCursosPeriodos,
        createCursoPeriodo,
        updateCursoPeriodo,
        deleteCursoPeriodo,
    };
}
