import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { PacienteCard } from '@/pages/pacientes/components/paciente-card';
import ModalCriar from '@/pages/pacientes/components/modal-criar';
import { Button } from '@/components/ui/button';
import { Plus, Users, Calendar, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Paciente } from '@/models/Paciente';

interface PacientesIndexProps {
    pacientes: Paciente[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pacientes',
        href: '/pacientes',
    },
];

export default function PacientesIndex({ pacientes = [] }: PacientesIndexProps) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [pacienteSelecionado, setPacienteSelecionado] = useState<Paciente | null>(null);

    const handleEdit = (paciente: Paciente) => {
        setPacienteSelecionado(paciente);
        setIsCreateModalOpen(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Tem certeza que deseja excluir este paciente?')) {
            router.delete(`/pacientes/${id}`);
        }
    };

    const handleCreateNew = () => {
        setPacienteSelecionado(null);
        setIsCreateModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsCreateModalOpen(false);
        setPacienteSelecionado(null);
    };

    // Estatísticas dos pacientes
    const totalPacientes = pacientes.length;
    const pacientesMasculinos = pacientes.filter(p => p.sexo === 'masculino').length;
    const pacientesFemininos = pacientes.filter(p => p.sexo === 'feminino').length;
    
    // Pacientes cadastrados este mês (mockado para demonstração)
    const pacientesEsteMes = Math.floor(totalPacientes * 0.2);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pacientes" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                {/* Header com ações */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">Pacientes</h1>
                        <p className="text-muted-foreground">
                            Gerencie os pacientes da clínica estética
                        </p>
                    </div>
                    <Button onClick={handleCreateNew}>
                        <Plus className="h-4 w-4 mr-2" />
                        Novo Paciente
                    </Button>
                </div>

                {/* Cards de estatísticas */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total de Pacientes
                            </CardTitle>
                            <Users className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">
                                {totalPacientes}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                pacientes cadastrados
                            </p>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Pacientes Femininas
                            </CardTitle>
                            <Users className="h-4 w-4 text-pink-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-pink-600">
                                {pacientesFemininos}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {totalPacientes > 0 ? Math.round((pacientesFemininos / totalPacientes) * 100) : 0}% do total
                            </p>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Pacientes Masculinos
                            </CardTitle>
                            <Users className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">
                                {pacientesMasculinos}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {totalPacientes > 0 ? Math.round((pacientesMasculinos / totalPacientes) * 100) : 0}% do total
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Novos Este Mês
                            </CardTitle>
                            <TrendingUp className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">
                                {pacientesEsteMes}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                novos cadastros
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Lista de pacientes */}
                <div className="flex-1">
                    {pacientes.length === 0 ? (
                        <div className="text-center py-12">
                            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Nenhum paciente encontrado</h3>
                            <p className="text-muted-foreground">
                                Comece cadastrando um novo paciente para iniciar o acompanhamento.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-muted-foreground">Pacientes</h2>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {pacientes.map((paciente) => (
                                    <PacienteCard
                                        key={paciente.id}
                                        paciente={paciente}
                                        onEdit={handleEdit}
                                        onDelete={handleDelete}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal de criação/edição de paciente */}
            <ModalCriar 
                open={isCreateModalOpen}
                setOpen={handleCloseModal}
                dado={pacienteSelecionado}
            />
        </AppLayout>
    );
}
