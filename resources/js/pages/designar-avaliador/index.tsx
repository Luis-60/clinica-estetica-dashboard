import { DesignaCard } from "@/components/cards/designa-card";
import { ComboBox } from "@/components/manual/combo-box";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AppLayout from "@/layouts/app-layout";
import formatHandler from "@/lib/formatHandler";
import { Artigo } from "@/models/Artigo";
import { Curso } from "@/models/Curso";
import { Instituicao } from "@/models/Instituicao";
import { Usuario } from "@/models/Usuario";
import { BreadcrumbItem } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { ArrowUpAZ, Filter, Search } from "lucide-react";
import { useEffect, useState } from "react";
const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Designar Avaliadores",
    href: route("designarAvaliador.index"),
  },
];
export default function DesignarAvaliador() {
  const [txtSearch, setTxtSearch] = useState("");
  
  const { artigos } = usePage().props as unknown as 
  { 
    artigos: Artigo,
    instituicoes: Instituicao,
    autores: Usuario,
    cursos: Curso
  };

  const [artigosFiltrados, setArtigosFiltrados] = useState(artigos);
  function filtraArtigos() {
    const filtrados = artigos.artigos.filter((artigo: Artigo) => {
      if (artigo.titulo == null) {
        return false;
      }

      return formatHandler
        .cleanSearchArgument(artigo.titulo)
        .includes(formatHandler.cleanSearchArgument(txtSearch));
    });

    setArtigosFiltrados(filtrados);
  }

  console.log("Avaliadores", artigos);


  // Filtra Artigos
  useEffect(() => {
    filtraArtigos();
  }, [txtSearch]);

  useEffect(() => {
    filtraArtigos();
  }, [artigos]);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Designar Avaliadores" />
      <div className=" m-2">
        <div className="container mx-auto p-6">
          <div>
            <h1 className="text-3xl font-bold">Designar Avaliadores</h1>
            <p className="text-muted-foreground my-4">
              Aqui você pode designar avaliadores para os artigos submetidos aos
              eventos.
            </p>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <Input
              placeholder="Pesquise um Artigo"
              className="w-full"
              inputIcon={<Search className="w-5 h-5 text-gray-500" />}
              value={txtSearch}
              onChange={(e) => {
                setTxtSearch(e.target.value);
              }}
            />
            <ComboBox
              options={[
                { label: "Mais Recentes", value: "recentes" },
                { label: "Mais Antigos", value: "antigos" },
                { label: "A - Z", value: "az" },
                { label: "Z - A", value: "za" },
              ]}
              onChange={() => {
                throw new Error("Não implementado!");
              }}
              icon={<ArrowUpAZ className="w-5 h-5 text-gray-500" />}
              placeholder="Classificar por..."
            />
            <Button variant="outline">
              Filtrar{" "}
              <Filter className="w-5 h-5 cursor-pointer text-gray-600 hover:text-gray-800" />
            </Button>
            <span className="text-sm text-gray-600">
              Possui {artigosFiltrados.length} artigos não designados.
            </span>
          </div>
          {artigosFiltrados?.length > 0 ? (
            artigosFiltrados.map((artigo, index) => (
              <DesignaCard
                artigo={artigo}
                date={artigo.data_envio}
                title={artigo.titulo}
                avaliadores={artigo.avaliadoresDisponiveis}
                evento={artigo.tipo}
                area={artigo.area}
                avaliadoresArtigo={
                  artigo.avaliadores.map((a: any) => a.usuario) || []
                }
                instituicoesAutores={artigo.instituicoes_autores}
                cursosAutores={artigo.cursos_autores}
              />
            ))
          ) : (
            <p className="mt-2 text-center text-gray-700 col-span-full">
              Nenhum artigo encontrado.
            </p>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
