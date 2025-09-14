import { Badge } from "@/components/ui/badge";
import { TipoTag } from "@/components/ui/tipo-tag";
import formatHandler from "@/lib/formatHandler";
import { router, useForm } from "@inertiajs/react";
import { AnimatePresence, motion } from "framer-motion";
import { Building, Check, Filter, TextSearchIcon, User, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { ArtigoDetalhesModal } from "../modals/artigo-detalhes-modal";
import { AutoComplete } from "../ui/auto-complete-input";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";
interface Instituicao {
  nome: string;
  [key: string]: any;
}

interface Avaliador {
  curso_periodo: any;
  id: number;
  nome: string;
  nomeInstituicao?: string;
  email: string;
  instituicao?: string | Instituicao;
  curso?: string;
}

interface InfoCardProps {
  title: string;
  date: string;
  artigo?: any;
  cursosAutores?: string[];
  avaliadores?: Avaliador[];
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  evento: any;
  area: any;
  instituicoesAutores?: string[];
  avaliadoresArtigo?: any[];
}

interface AvaliacaoForm {
  avaliadores_ids: number[];
  artigos_id: string;
  [key: string]: any;
}

function AreaAvaliadores({
  avaliadoresArtigo,
  avaliadoresDesignados,
  removerAvaliador,
  removerAvaliadorBackend,
}: {
  avaliadoresArtigo: Avaliador[];
  avaliadoresDesignados: Avaliador[];
  removerAvaliador: (id: number) => void;
  removerAvaliadorBackend: (id: number) => void;
}) {
  return (
    <div className="flex flex-col gap-2 mt-2">
      {avaliadoresArtigo.length === 0 && avaliadoresDesignados.length === 0 && (
        <span className="text-muted-foreground text-sm">
          Nenhum avaliador designado.
        </span>
      )}
      {/* Avaliadores do backend */}
      {avaliadoresArtigo.length > 0 && (
        <>
          {avaliadoresArtigo.map((avaliador) => (
            <AnimatePresence>
              <motion.div
                key={"id" + avaliador.id}
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { duration: 0.5 } }}
              >
                <div
                  key={avaliador.id}
                  className="flex items-center gap-2 border border-green-300 bg-green-100 text-background rounded px-3 py-2 relative group"
                >
                  <User className="w-5 h-5 text-blue-500" />
                  <div
                    className="font-semibold cursor-pointer underline decoration-dotted"
                    title={
                      `Email: ${avaliador.email}\n` +
                      `Instituição: ${typeof avaliador.instituicao === "string" ? avaliador.instituicao : avaliador.instituicao?.nome || "Não informado"}\n` +
                      `Curso: ${avaliador.curso_periodo?.curso.nome || "Não informado"}`
                    }
                  >
                    {avaliador.nome}
                    {avaliador.instituicao && (
                      <span className="text-xs text-gray-500 ml-1">
                        (
                        {typeof avaliador.instituicao === "string"
                          ? avaliador.instituicao
                          : avaliador.instituicao.sigla_instituicao}
                        )
                      </span>
                    )}
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="end-0 absolute top-1/2 hover:bg-green-200 -translate-y-1/2 right-2"
                    onClick={() => removerAvaliadorBackend(avaliador.id)}
                    title="Remover"
                    type="button"
                  >
                    ×
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          ))}
        </>
      )}
      {/* Avaliadores do frontend */}
      {avaliadoresDesignados.length > 0 && (
        <>
          {avaliadoresDesignados.map((avaliador) => (
            <div
              key={avaliador.id}
              className="flex items-center gap-2 bg-gray-100 dark:bg-gray-900 rounded px-3 py-2 relative group"
            >
              <User className="w-5 h-5 text-blue-500" />
              <div
                className="font-semibold cursor-pointer underline decoration-dotted"
                title={
                  `Email: ${avaliador.email}\n` +
                  `Instituição: ${typeof avaliador.instituicao === "string" ? avaliador.instituicao : avaliador.instituicao?.nome || "Não informado"}\n` +
                  `Curso: ${avaliador.curso_periodo?.curso.nome || "Não informado"}`
                }
              >
                {avaliador.nome}
                {avaliador.instituicao && (
                  <span className="text-xs text-gray-500 ml-1">
                    (
                    {typeof avaliador.instituicao === "string"
                      ? avaliador.instituicao
                      : avaliador.instituicao.sigla_instituicao}
                    )
                  </span>
                )}
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="end-0 absolute top-1/2 -translate-y-1/2 right-2"
                onClick={() => removerAvaliador(avaliador.id)}
                title="Remover"
              >
                ×
              </Button>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export function DesignaCard({
  title,
  avaliadoresArtigo = [],
  artigo,
  area,
  date,
  avaliadores = [],
  descricao = "",
  evento = "",
  orientador = "",
  instituicoesAutores = [],
  cursosAutores = [],
  searchValue = "",
  onSearchChange,
}: InfoCardProps & {
  descricao?: string;
  orientador?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}) {
  const [avaliadoresDesignados, setAvaliadoresDesignados] = useState<
    Avaliador[]
  >([]);
  console.log("");
  const handleSelect = (option: any) => {
    const found = avaliadores.find((a) => a.id === option.value);
    if (found && !avaliadoresDesignados.some((a) => a.id === found.id)) {
      setAvaliadoresDesignados([...avaliadoresDesignados, found]);
      console.log("Avaliador selecionado:", found);
    }
  };
  const removerAvaliador = (id: number) => {
    setAvaliadoresDesignados(avaliadoresDesignados.filter((a) => a.id !== id));
  };

  const removerAvaliadorBackend = (id: number) => {
    router.delete(route("avaliacao.destroy", id), {
      preserveScroll: true,

      onSuccess: () => {
        avaliadoresArtigo.filter((a) => a.id !== id);
      },
      onError: (errors) => {
        console.error("Erro ao remover avaliador:", errors);
      },
    });
  };

  const { data, setData, processing, errors, reset } = useForm<AvaliacaoForm>({
    avaliadores_ids: avaliadoresDesignados.map((a) => parseInt(String(a.id))),
    artigos_id: artigo.id || "",
  });

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      avaliadores_ids: avaliadoresDesignados.map((a) => parseInt(String(a.id))),
    }));
  }, [avaliadoresDesignados]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    // Adiciona avaliadores_ids como array JSON
    // Envie os autores_ids como array para o backend Laravel
    data.avaliadores_ids.forEach((id: number | string) => {
      formData.append("avaliadores_ids[]", String(id));
    });
    // Adiciona artigo_id
    if (artigo && artigo.id) {
      formData.append("artigos_id", String(artigo.id));
    }
    router.post(route("avaliacao.store"), formData, {
      preserveScroll: true,

      onSuccess: () => {
        console.log("Success!");
        reset();
        setAvaliadoresDesignados([]);
      },
      onError: (errors) => {
        console.error("Errors:", errors);
      },
    });
  };
  console.log("FormData", data);
  return (
    <div className="rounded-lg mb-4 border p-6">
      <form
        onSubmit={handleSubmit}
        action=""
        className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start"
      >
        {/* Coluna 1: Título, badges, instituição, data, descrição, orientador */}
        <div className="flex flex-col gap-4">
          <span className="block text-lg font-bold mb-2 break-words whitespace-normal">
            {title}
          </span>
          <div className="flex">
            <div className="flex flex-wrap gap-2 mb-2">
              <TipoTag tipo={evento} />
              {cursosAutores.map((curso, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="bg-purple-100 text-purple-800"
                >
                  {curso}
                </Badge>
              ))}
              <Badge
                variant="outline"
                className="bg-yellow-100 text-yellow-800"
              >
                {area.nome}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-1 text-gray-700">
            <Building className="w-4 h-4 text-gray-700" />
            <span className="font-semibold">
              Instituições:{" "}
              {instituicoesAutores.length > 1
                ? instituicoesAutores.join(", ")
                : instituicoesAutores[0]}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1 text-gray-500">
            <span className="text-sm font-medium">Data de Envio:</span>
            <span className="text-base font-semibold">
              {formatHandler.formatDate(date)}
            </span>
          </div>
          {descricao && (
            <div className="mt-2 text-sm text-gray-700">
              <span className="font-semibold">Descrição:</span> {descricao}
            </div>
          )}
          {orientador && (
            <div className="mt-1 text-sm text-gray-700">
              <span className="font-semibold">Orientador:</span> {orientador}
            </div>
          )}
        </div>
        {/* Coluna 2: Designar avaliadores (maior espaço) */}
        <div className="flex flex-col gap-3 md:col-span-2">
          <div className="flex items-center gap-3">
            <AutoComplete
              options={avaliadores
                .filter(
                  // Se avaliador não estiver selecionado ou já estiver dentro do artigo. Exibe ele no autocomplete
                  (a) =>
                    !avaliadoresDesignados.some((d) => d.id === a.id) &&
                    !avaliadoresArtigo.some((d) => d.id === a.id)
                )
                .map((a) => ({
                  label: a.nomeInstituicao || a.nome,
                  value: a.id,
                }))}
              onValueChange={(option) => handleSelect(option)}
              placeholder="Selecione um avaliador"
              emptyMessage={"Sem Avaliadores"}
              cleanAfterSelect
            />
            <Filter className="cursor-pointer text-gray-600 hover:text-gray-800" />
          </div>
          <AreaAvaliadores
            avaliadoresArtigo={avaliadoresArtigo}
            avaliadoresDesignados={avaliadoresDesignados}
            removerAvaliador={removerAvaliador}
            removerAvaliadorBackend={removerAvaliadorBackend}
          />
        </div>
        {/* Coluna 4: Botão concluir e detalhes do artigo */}
        <div className="grid h-full justify-center items-center gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="bg-sky-500 text-white hover:bg-sky-600"
                type="button"
              >
                <TextSearchIcon className="size-4" />
                Ver Detalhes do Artigo
              </Button>
            </DialogTrigger>
            <ArtigoDetalhesModal artigo={artigo} />
          </Dialog>
          <Button
            type="submit"
            className="bg-teal-500 text-white hover:bg-teal-600 w-full h-full"
          >
            <Check className="size-5" />
            Concluir
          </Button>
          <Button className="bg-rose-500 text-white hover:bg-rose-600 w-full h-full">
            <X className="size-5" />
            Recusar Artigo
          </Button>
        </div>
      </form>
    </div>
  );
}
