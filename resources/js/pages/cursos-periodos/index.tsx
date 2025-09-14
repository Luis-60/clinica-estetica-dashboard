
import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { useCursosPeriodos } from '@/hooks/useCursos';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, GraduationCap } from 'lucide-react';
import { BreadcrumbItem } from '@/types';

export default function CursosPeriodosIndex() {
    const { 
        cursos_periodos, 
        cursos, 
        periodos, 
        createCursoPeriodo, 
        updateCursoPeriodo, 
        deleteCursoPeriodo 
    } = useCursosPeriodos();

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Cursos e Períodos',
            href: route('cursos-periodos.index'),
        },
    ];

    const handleCreate = () => {
        // Exemplo: criar uma nova combinação
        const data = {
            cursos_id: 1, // ID do curso selecionado
            periodos_id: 1, // ID do período selecionado
        };
        createCursoPeriodo(data);
    };

    const handleUpdate = (cursoPeriodo: any) => {
        updateCursoPeriodo(cursoPeriodo.id, {
            // dados atualizados
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Tem certeza que deseja deletar esta combinação?')) {
            deleteCursoPeriodo(id);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cursos e Períodos" />
            
            <div className="m-2">
                <div className="container mx-auto p-4">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-3xl font-bold">Cursos e Períodos</h1>
                            <p className="text-muted-foreground">
                                Gerencie as combinações de cursos e períodos
                            </p>
                        </div>
                        <Button onClick={handleCreate}>
                            <Plus className="h-4 w-4 mr-2" />
                            Nova Combinação
                        </Button>
                    </div>

                    {/* Estatísticas */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Total de Cursos
                                </CardTitle>
                                <GraduationCap className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{cursos.length}</div>
                            </CardContent>
                        </Card>
                        
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Total de Períodos
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{periodos.length}</div>
                            </CardContent>
                        </Card>
                        
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Combinações Ativas
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{cursos_periodos.length}</div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Lista de Cursos e Períodos */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Combinações Ativas</h2>
                        
                        {cursos_periodos.length === 0 ? (
                            <Card>
                                <CardContent className="text-center py-12">
                                    <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold mb-2">
                                        Nenhuma combinação encontrada
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Comece criando uma nova combinação de curso e período.
                                    </p>
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {cursos_periodos.map((cursoPeriodo) => (
                                    <Card key={cursoPeriodo.id} className="hover:shadow-md transition-shadow">
                                        <CardHeader className="pb-3">
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-blue-100 rounded-lg">
                                                        <GraduationCap className="h-4 w-4 text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-semibold">
                                                            {cursoPeriodo.curso?.nome || 'Curso não encontrado'}
                                                        </h3>
                                                        <Badge variant="secondary">
                                                            {cursoPeriodo.periodo?.nome || 'Período não encontrado'}
                                                        </Badge>
                                                    </div>
                                                </div>
                                                <div className="flex gap-1">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleUpdate(cursoPeriodo)}
                                                        className="h-8 w-8 p-0"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleDelete(cursoPeriodo.id)}
                                                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardHeader>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Lista de Cursos Disponíveis */}
                    <div className="mt-8 space-y-4">
                        <h2 className="text-xl font-semibold">Cursos Disponíveis</h2>
                        <div className="grid gap-2 md:grid-cols-3 lg:grid-cols-4">
                            {cursos.map((curso) => (
                                <Badge key={curso.id} variant="outline" className="p-2 justify-center">
                                    {curso.nome}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Lista de Períodos Disponíveis */}
                    <div className="mt-6 space-y-4">
                        <h2 className="text-xl font-semibold">Períodos Disponíveis</h2>
                        <div className="grid gap-2 md:grid-cols-6 lg:grid-cols-8">
                            {periodos.map((periodo) => (
                                <Badge key={periodo.id} variant="outline" className="p-2 justify-center">
                                    {periodo.nome}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
