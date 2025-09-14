import { InfoCard } from "@/components/cards/info-card";
import { PessoaStatusItem } from "@/components/ui/pessoa-status-item";
import {
    GraduationCap,
    Pen,
    User
} from "lucide-react";

export default function CardsParticipantes({ autores, orientadores }: {
    autores: any[];
    orientadores: any[];
}) {
    return (
        <div className="grid">
            {/* Autores */}
            <InfoCard
                className="my-4"
                icon={<Pen className="w-6 h-6 text-blue-500" />}
                title="Autores"
            >
                {autores.length > 0 ? (
                    autores.map((autor, idx) => (
                        <PessoaStatusItem
                            key={autor.id || idx}
                            icon={<User className="w-5 h-5 text-primary" />}
                            nome={autor.nome}
                            email={autor.email}
                            status={autor.confirma === 1 ? "aceitou" : "pendente"}
                        />
                    ))
                ) : (
                    <span className="text-muted-foreground">
                        Nenhum autor listado.
                    </span>
                )}
            </InfoCard>
            {/* Orientadores */}
            {orientadores.length > 0 && (
                <InfoCard
                    icon={<GraduationCap className="w-6 h-6 text-blue-500" />}
                    title="Orientadores"
                >
                    {orientadores.map((orientador, idx) => (
                        <PessoaStatusItem
                            key={orientador.id || idx}
                            icon={<User className="w-5 h-5 text-foreground" />}
                            nome={orientador.nome}
                            email={orientador.email}
                            status={orientador.confirma === 1 ? "aceitou" : "pendente"}
                        />
                    ))}
                </InfoCard>
            )}
        </div>
    )
}