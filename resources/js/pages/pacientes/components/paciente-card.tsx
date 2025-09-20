import React from 'react';
import { Paciente } from '@/models/Paciente';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Calendar, Phone, MapPin, User, Venus, Mars, Instagram } from 'lucide-react';

interface PacienteCardProps {
    paciente: Paciente;
    onEdit: (paciente: Paciente) => void;
    onDelete: (id: number) => void;
}

export function PacienteCard({ paciente, onEdit, onDelete }: PacienteCardProps) {
    const formatDate = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleDateString('pt-BR');
        } catch {
            return dateString;
        }
    };

    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-100">
                            <User className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold line-clamp-2">{paciente.nome}</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <Calendar className="h-3 w-3 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">
                                    Nasc.: {formatDate(paciente.data_nasc)}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-1">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEdit(paciente)}
                            className="h-8 w-8 p-0"
                        >
                            <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDelete(paciente.id)}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pt-0">
                <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <span className="font-medium">{paciente.telefone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="font-medium">{paciente.endereco}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        {paciente.sexo === 'feminino' ? (
                            <Venus className="h-3 w-3 text-pink-500" />
                        ) : (
                            <Mars className="h-3 w-3 text-blue-500" />
                        )}
                        <span className="font-medium capitalize">{paciente.sexo}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <Instagram className="h-3 w-3 text-purple-500" />
                        <span className="font-medium">{paciente.rede_social}</span>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                        Paciente Ativo
                    </Badge>
                </div>
            </CardContent>
        </Card>
    );
}