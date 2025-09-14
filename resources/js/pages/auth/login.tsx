import AnimatedAuth from '@/components/auth/animated-auth';
import { Curso } from '@/models/Curso';
import { Instituicao } from '@/models/Instituicao';
import { Periodo } from '@/models/Periodo';
import { usePage } from '@inertiajs/react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}
type PageProps = {
  instituicoes?: Instituicao[];
  cursos?: Curso[];
  periodos?: Periodo[];

};

export default function Login({ status, canResetPassword }: LoginProps) {
    const { props } = usePage<PageProps>();
    const { instituicoes = [], cursos = [], periodos = [] } = props;
    return (
        <AnimatedAuth
            initialMode="login"
            status={status}

            instituicoes={instituicoes}
            cursos={cursos}
            periodos={periodos}
        />
    );
}