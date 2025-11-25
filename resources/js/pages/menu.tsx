import { Head, usePage } from '@inertiajs/react';
import { Users, Calendar, TrendingUp, Activity } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type SharedData } from '@/types';

interface MenuProps {
    stats?: any;      // Admin stats OU stats do paciente
    paciente?: any;   // Dados completos do paciente (quando role=user)
}

export default function Menu({ stats, paciente }: MenuProps) {
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;

    const isAdmin = user.role === "admin";

    return (
        <AppLayout>
            <Head title="Dashboard - Clínica Estética" />

            <div className="px-4 py-6 space-y-8">

                {/* HEADER */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Bem-vindo, {user.nome}!
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                        {isAdmin
                            ? "Gerencie sua clínica estética de forma eficiente"
                            : "Aqui estão suas informações e suas consultas"
                        }
                    </p>
                </div>

                {/* ADMIN */}
                {isAdmin && (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Total de Pacientes</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.totalPacientes}</div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Consultas Hoje</CardTitle>
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.consultasHoje}</div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Consultas na Semana</CardTitle>
                                <Activity className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.consultasSemana}</div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Faturamento do Mês</CardTitle>
                                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    R$ {stats.faturamentoMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* PACIENTE */}
                {!isAdmin && paciente && (
                    <div className="space-y-6">

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Suas Informações</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <p><strong>Nome:</strong> {paciente.nome}</p>
                                <p><strong>Telefone:</strong> {paciente.telefone}</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Consultas</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-lg">
                                    <p><strong>Consultas Hoje:</strong> {stats.consultasHoje}</p>
                                    <p><strong>Consultas na Semana:</strong> {stats.consultasSemana}</p>
                                </div>

                                <div className="mt-4 border-t pt-4 space-y-3">
                                    {paciente.consultas?.map((c: any) => (
                                        <div key={c.id} className="border p-3 rounded">
                                            <p><strong>Data:</strong> {c.data}</p>
                                            <p><strong>Procedimento:</strong> {c.procedimento?.nome}</p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                    </div>
                )}

            </div>
        </AppLayout>
    );
}
