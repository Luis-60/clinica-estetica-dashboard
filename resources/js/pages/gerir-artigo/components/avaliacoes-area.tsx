import { EvaluateCard } from "@/pages/gerir-artigo/components/evaluate-card";
import { EvaluatedCard } from "@/pages/gerir-artigo/components/evaluated-card";
import { Button } from "@/components/ui/button";
import { Artigo } from "@/models/Artigo";
import { Avaliacao } from "@/models/Avaliacao";
import { Status } from "@/models/Status";
import { Auth } from "@/types";
import { FileCheck } from "lucide-react";
import React from "react";

interface Props {
    artigo: Artigo;
    avaliacoes: Avaliacao[];
    status: Status;
    auth: Auth;
}

export default function AvaliacoesArea({ artigo, avaliacoes, status, auth }: Props) {
    const [isEvaluateCardOpen, setIsEvaluateCardOpen] = React.useState(false);

    return (
        <div className="mt-8">
            <div className="flex gap-6 ">
                <div className="text-2xl font-bold mb-4">
                    Avaliações{" "}
                    <span className="text-muted-foreground text-lg">
                        ( {Array.isArray(avaliacoes) ? avaliacoes.length : 0} )
                    </span>
                </div>
                {(auth.userTypes.includes("Avaliador Seget") ||
                    auth.userTypes.includes("Avaliador Seac")) && (
                        <div className="flex justify-end mb-4">
                            <Button
                                onClick={() => setIsEvaluateCardOpen(true)}
                                className="bg-green-600 text-white hover:bg-green-700"
                            >
                                <FileCheck className="w-5 h-5 text-white" />
                                Avaliar Artigo
                            </Button>
                        </div>
                    )}
            </div>
            <div className="space-y-4">
                {isEvaluateCardOpen && (
                    <EvaluateCard
                        open={isEvaluateCardOpen}
                        onClose={() => setIsEvaluateCardOpen(false)}
                        status={status}
                        artigoId={artigo.id}
                    />
                )}
                {Array.isArray(avaliacoes) && avaliacoes.length > 0 ? (
                    avaliacoes.map((avaliacao: any, idx: number) => (
                        <EvaluatedCard
                            key={idx}
                            avaliacao={avaliacao}
                        />
                    ))
                ) : (
                    <div className="text-muted-foreground">
                        Nenhuma avaliação registrada.
                    </div>
                )}
            </div>
        </div>
    )
};