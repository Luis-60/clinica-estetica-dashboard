import AnimatedAuth from '@/components/auth/animated-auth';
import { Curso } from '@/models/Curso';
import { Instituicao } from '@/models/Instituicao';
import { Periodo } from '@/models/Periodo';
import { usePage } from '@inertiajs/react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}
export default function Login({ status, canResetPassword }: LoginProps) {
    return (
        <AnimatedAuth
            initialMode="login"
            status={status}
        />
    );
}