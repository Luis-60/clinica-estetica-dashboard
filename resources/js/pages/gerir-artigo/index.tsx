import ModalBase from "@/components/manual/modal-base";
import { Button } from "@/components/ui/button";
import { StatusTag } from "@/components/ui/status-tag";
import { TipoTag } from "@/components/ui/tipo-tag";
import AppLayout from "@/layouts/app-layout";
import formatHandler from "@/lib/formatHandler";
import { Head, router, usePage } from "@inertiajs/react";
import { BookOpen, CalendarDays, Check, Edit, Tag, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import AvaliacoesArea from "./components/avaliacoes-area";
import CardsParticipantes from "./components/cards-participantes";
import ModalApagar from "./components/modal-apagar";
import FormBuilder from "@/lib/formBuilder";
import { Artigo } from "@/models/Artigo";
import { Usuario } from "@/models/Usuario";
import { Status } from "@/models/Status";
import { Avaliacao } from "@/models/Avaliacao";
import { Auth } from "@/types";

function Detalhes({ artigo }: { artigo: Artigo }) {
  return (
    <>
      <div className="flex items-center gap-2 mb-2">
        <CalendarDays className="w-5 h-5 text-blue-500" />
        <span className="font-medium text-gray-700/300">
          <b>Data de Envio:</b>{" "}
          {formatHandler.formatDate(artigo.data_envio) || "Sem data definida"}
        </span>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <BookOpen className="w-5 h-5 text-blue-500" />
        <span className="font-medium text-gray-700/300">
          <b>Área Temática:</b> {artigo.area?.nome || "Sem área definida"}
        </span>
      </div>
      {artigo.modalidades != null && (
        <div className="flex items-center gap-2 mb-2">
          <Tag className="w-5 h-5 text-blue-500" />
          <span className="font-medium text-gray-700/300">
            <b>Modalidade:</b>{" "}
            {artigo.modalidades.nome || "Sem modalidade definida"}
          </span>
        </div>
      )}
      {artigo.arquivo && (
        <div className="mt-4">
          <a
            href={`/storage/${artigo.arquivo}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-base font-medium"
            download
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
              />
            </svg>
            Baixar PDF
          </a>
        </div>
      )}
    </>
  );
}

export default function GerirArtigoPage() {
  const { props } = usePage<{
    artigo: Artigo;
    autores: Usuario[];
    orientadores: Usuario[];
    avaliacoes: Avaliacao[];
    status: Status;
  }>();
  const artigo = props.artigo || {};
  const auth = props.auth as Auth;
  const autores = props.autores || [];
  const orientadores = props.orientadores || [];

  const [titulo, setTitulo] = React.useState(artigo.titulo || "");
  const [resumo, setResumo] = React.useState(artigo.resumo || "");

  // const autor = artigo.autores ? artigo.autores[0] : null;
  const avaliacoes = props.avaliacoes || [];
  const status = props.status || [];

  function onEdit() {
    const payload = {
      id: artigo.id,
      titulo: titulo,
      resumo: resumo,
    };

    router.put(route("artigos.update"), payload, {
      preserveScroll: true,
      onSuccess: () => {
        artigo.titulo = payload.titulo;
        artigo.resumo = payload.resumo;

        setArtigoEstaSendoEditado(false);
      },
    });
  }

  function onDelete(artigo: Artigo) {
    setOpenDelete(true);
  }

  useEffect(() => {
    const artigoFoiEditado =
      titulo !== artigo.titulo || resumo !== artigo.resumo;

    setArtigoEstaSendoEditado(artigoFoiEditado);
  }, [titulo, resumo]);

  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [artigoEstaSendoEditado, setArtigoEstaSendoEditado] =
    useState<boolean>(false);
  // Estado para controlar a visibilidade do card de avaliação

  React.useEffect(() => {
    setTitulo(artigo.titulo || "");
  }, [artigo.titulo]);

  React.useEffect(() => {
    setResumo(artigo.resumo || "");
  }, [artigo.resumo]);
  return (
    <AppLayout>
      <Head title="Gerir Artigo" />
      <ModalApagar
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
        artigo={artigo}
      />
      <div className="w-full px-0">
        <div className="p-8">
          <div className="block md:grid grid-cols-[2fr_1fr] gap-8 min-h-[45vh]">
            {/* Detalhes do artigo */}
            <div className="space-y-4">
              <input
                className="text-2xl font-bold"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
              <div className="flex gap-1">
                {artigoEstaSendoEditado && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit()}
                    className="h-8 w-8 p-0"
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(artigo)}
                  className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-2">
                <TipoTag tipo={artigo.tipo} />
                <StatusTag status={artigo.status} />
              </div>
              <textarea
                placeholder="Resumo"
                value={resumo}
                onChange={(e) => setResumo(e.target.value)}
                className="w-full text-lg mb-5"
              />
              <Detalhes artigo={artigo} />
            </div>
            <CardsParticipantes autores={autores} orientadores={orientadores} />
          </div>
          <AvaliacoesArea
            artigo={artigo}
            avaliacoes={avaliacoes}
            status={status}
            auth={auth}
          />
        </div>
      </div>
    </AppLayout>
  );
}
