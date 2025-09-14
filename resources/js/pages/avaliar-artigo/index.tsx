import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { Artigo } from "@/models/Artigo";
import { Avaliacao } from "@/models/Avaliacao";
import { Usuario } from "@/models/Usuario";
import { BreadcrumbItem } from "@/types";
import { Head, usePage, Link } from "@inertiajs/react";
import React from "react";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Avaliar Artigos",
    href: "/avaliar-artigo",
  },
];

type PageProps = {
  usuario: Usuario;
  artigos: Avaliacao[];
};

export default function AvaliarArtigo() {
  const { usuario, artigos: avaliacoes } = usePage<PageProps>().props;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Avaliar Artigos" />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-2">Artigos para Avaliação</h1>
        <div className="grid gap-6">
          {avaliacoes.length > 0 ? (
            avaliacoes.map((avaliacao, idx: number) => (
              <div key={avaliacao.id || idx} className="border rounded-lg p-4">
                <h3 className="text-lg font-bold mb-1">
                  {avaliacao.artigo?.titulo || "Sem título"}
                </h3>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                    Área: {avaliacao.artigo?.area?.nome}
                  </span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                    Evento: {avaliacao.artigo?.evento?.nome}
                  </span>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">
                    Status: {avaliacao.artigo?.status?.nome}
                  </span>
                </div>
                <div className="mb-2">
                  <b>Autores:</b>
                  <ul className="ml-4 list-disc">
                    {avaliacao.artigo?.autores?.map((autor: Usuario) => (
                      <li key={autor.id}>
                        {autor.nome} -{" "}
                        {autor.instituicao?.sigla_instituicao ||
                          autor.instituicao?.nome ||
                          "Sem instituição"}{" "}
                        - {autor.curso_periodo?.curso?.nome || "Sem curso"}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href={route("gerir-artigo", avaliacao.artigo?.id)}>
                  <Button className="bg-blue-500 text-white hover:bg-blue-600">
                    Ver Detalhes
                  </Button>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-700">
              Nenhum artigo para avaliar.
            </p>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
