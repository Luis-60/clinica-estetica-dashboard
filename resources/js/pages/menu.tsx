import { Head, usePage } from '@inertiajs/react';
import { Users, Calendar, FileText, Plus, TrendingUp, Activity, Clock, CheckCircle } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { type SharedData } from '@/types';

interface MenuProps {
    stats?: {
        totalPacientes: number;
        consultasHoje: number;
        consultasSemana: number;
        faturamentoMes: number;
    };
}

export default function Menu({ stats }: MenuProps) {
    const { auth } = usePage<SharedData>().props;

    // Dados mockados para demonstração
    const defaultStats = {
        totalPacientes: 234,
        consultasHoje: 8,
        consultasSemana: 42,
        faturamentoMes: 15750.00
    };

    const currentStats = stats || defaultStats;


    return (
        <AppLayout>
            <Head title="Dashboard - Clínica Estética" />
            
            <div className="px-4 py-6 space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Bem-vindo, {auth?.user?.nome || 'Usuário'}!
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300 mt-1">
                            Gerencie sua clínica estética de forma eficiente
                        </p>
                    </div>
                </div>

                {/* Estatísticas */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total de Pacientes</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{currentStats.totalPacientes}</div>
                            <p className="text-xs text-muted-foreground">
                                +12% em relação ao mês passado
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Consultas Hoje</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{currentStats.consultasHoje}</div>
                            <p className="text-xs text-muted-foreground">
                                3 restantes para hoje
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Consultas na Semana</CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{currentStats.consultasSemana}</div>
                            <p className="text-xs text-muted-foreground">
                                +18% em relação à semana passada
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Faturamento do Mês</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                R$ {currentStats.faturamentoMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                +25% em relação ao mês passado
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Ações Rápidas */}
                <div className="space-y-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            Ações Rápidas
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Acesse rapidamente as principais funcionalidades
                        </p>
                    </div>

                </div>

                {/* Últimas Atividades */}
                <div className="space-y-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            Últimas Atividades
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Acompanhe as atividades recentes da clínica
                        </p>
                    </div>

                    <Card>
                        <CardContent className="p-6">
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4">
                                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                                        <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">Consulta finalizada</p>
                                        <p className="text-xs text-gray-500">Paciente Maria Silva - Limpeza de pele</p>
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        <Clock className="h-3 w-3 inline mr-1" />
                                        10 min atrás
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                                        <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">Novo paciente cadastrado</p>
                                        <p className="text-xs text-gray-500">João Santos - Primeira consulta agendada</p>
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        <Clock className="h-3 w-3 inline mr-1" />
                                        1h atrás
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                                        <FileText className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">Prontuário atualizado</p>
                                        <p className="text-xs text-gray-500">Ana Costa - Evolução do tratamento registrada</p>
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        <Clock className="h-3 w-3 inline mr-1" />
                                        2h atrás
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}