
import React from 'react';
import { Area } from '@/models/Area';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Folder } from 'lucide-react';

interface AreaCardProps {
    area: Area;
    onEdit: (area: Area) => void;
    onDelete: (id: number) => void;
}

export function AreaCard({ area, onEdit, onDelete }: AreaCardProps) {
    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Folder className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">{area.nome}</h3>
                            <p className="text-sm text-muted-foreground">{area.sigla}</p>
                        </div>
                    </div>
                    <div className="flex gap-1">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEdit(area)}
                            className="h-8 w-8 p-0"
                        >
                            <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDelete(area.id)}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            
            <CardContent className="pt-0">
                {area.descricao ? (
                    <p className="text-sm text-muted-foreground mb-3">
                        {area.descricao}
                    </p>
                ) : null}
                
                <div className="flex gap-2">
                    {area.seac ? (
                        <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
                            SEAC
                        </Badge>
                    ) : null}
                    {area.seget ? (
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                            SEGET
                        </Badge>
                    ) : null}
                    {!area.seac && !area.seget ? (
                        <Badge variant="outline">
                            Nenhum evento
                        </Badge>
                    ) : null}
                </div>
            </CardContent>
        </Card>
    );
}

interface AreaCardsProps {
    areas: Area[];
    onEdit: (area: Area) => void;
    onDelete: (id: number) => void;
}

export default function AreaCards({ areas, onEdit, onDelete }: AreaCardsProps) {
    if (areas.length === 0) {
        return (
            <div className="text-center py-12">
                <Folder className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Nenhuma área encontrada</h3>
                <p className="text-muted-foreground">
                    Comece criando uma nova área para organizar seus artigos.
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {areas.map((area) => (
                <AreaCard
                    key={area.id}
                    area={area}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}