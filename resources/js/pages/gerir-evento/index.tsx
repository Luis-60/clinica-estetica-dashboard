import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import ModalPeriodoSeac from "@/pages/gerir-evento/components/modal-periodo-seac";
import ModalPeriodoSeget from "@/pages/gerir-evento/components/modal-periodo-seget";
import { Head, Link, router, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

import Field from "@/components/manual/field";
import SectionHeader from "@/components/manual/section-header";
import TextEditor from "@/components/manual/text-editor";
import { Label } from "@/components/ui/label";
import { CicloCard } from "@/pages/gerir-evento/components/ciclo-card";
import { Input } from "@headlessui/react";
import { EditorState, SerializedEditorState } from "lexical";
import { CalendarRangeIcon, Check, FileIcon } from "lucide-react";
import DocumentoCard from "./components/documento-card";
import Documentos from "./components/documentos";

export default function GerirEventoPage() {
  const { props } = usePage<{ evento: any; ciclos: any[]; ciclo?: any }>();
  const evento = props.evento;
  const [nome, setNome] = React.useState(evento.nome || "");
  const [descricao, setDescricao] = useState<any>();

  const [activeToolbar, setActiveToolbar] = useState(false);
  const ciclos = Array.isArray(props.ciclos) ? props.ciclos : [];
  const documentos = Array.isArray(props.documentos) ? props.documentos : [];
  const [tipo, setTipo] = useState(evento.seac ? "seac" : "seget");
  const [modalSeacOpen, setModalSeacOpen] = useState(false);
  const [documentoCardOpen, setDocumentoCardOpen] = useState(false);
  const [modalSegetOpen, setModalSegetOpen] = useState(false);
  const [editEvent, setEditEvent] = useState(false);

  function onEdit() {
    if (!descricao) return;

    // const descricaoStr =
    //   typeof descricao === "string" ? descricao : JSON.stringify(descricao);

    const payload = {
      id: evento.id,
      nome: nome,
      descricao: JSON.stringify(descricao),
    };

    router.put(route("eventos.update", evento.id), payload, {
      preserveScroll: true,
      onSuccess: () => {
        // Atualiza o estado local com os novos valores
        evento.nome = nome;
        evento.descricao = descricao;
        setEditEvent(false);
      },
      onError: (errors) => {
        console.error("Error updating event:", errors);
      },
    });
  }

  useEffect(() => {
    const hasNameChanged = nome !== evento.nome;

    // Compare stringified versions for deep comparison
    const currentDesc = descricao ? JSON.stringify(descricao) : "";
    const originalDesc = evento.descricao
      ? typeof evento.descricao === "string"
        ? evento.descricao
        : JSON.stringify(evento.descricao)
      : "";

    const hasDescriptionChanged = currentDesc !== originalDesc;

    setEditEvent(hasNameChanged || hasDescriptionChanged);
  }, [nome, descricao, evento.nome, evento.descricao]);

  React.useEffect(() => {
    setNome(evento.nome || "");
  }, [evento.nome]);

  React.useEffect(() => {
    try {
      const parsedText = JSON.parse(evento.descricao);
      setDescricao(parsedText);
    } catch (error) {
      setDescricao("");
    }
  }, [evento.descricao]);

  return (
    <AppLayout>
      <Head title="Gerir Evento" />
      <div className="px-4 pt-4">
        <nav className="mb-4 flex items-center text-sm text-gray-500 gap-2">
          <Link
            href={route("eventos.index")}
            className="hover:underline text-blue-600"
          >
            Eventos
          </Link>
          <span className="text-gray-700">Gerir Evento</span>
        </nav>
        <div className="flex item-center justify-between">
          <h1 className="text-2xl font-bold">Gerir Evento</h1>

          <Button
            type="button"
            onClick={() => {
              /* finalizar evento */
            }}
            className="bg-red-600 text-white"
          >
            Finalizar Evento
          </Button>
        </div>
      </div>
      <div className="rounded-lg px-4">
        <div className="mt-4">
          <h2 className="text-xl mb-4 font-semibold">Detalhes do Evento</h2>
          <div className="space-y-4">
            <Field label="Nome do Evento">
              <Input
                type="text"
                placeholder="Nome do Evento"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </Field>
            <div className="flex gap-2 justify-between items-center">
              <Label className="text-lg">Descrição do Evento</Label>
              <div className="flex gap-2">
                {editEvent && (
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
                  onClick={() => {
                    setActiveToolbar(!activeToolbar);
                  }}
                >
                  {activeToolbar === true ? "Desativar" : "Ativar"} Barra de
                  Ferramentas
                </Button>
              </div>
            </div>
            {descricao != undefined && (
              <TextEditor
                placeholder="Digite a descrição do evento aqui..."
                value={descricao}
                onChange={(value) => setDescricao(value)}
                activeToolbar={activeToolbar}
              />
            )}
          </div>
        </div>
        <div className="flex justify-between items-center mt-6">
          <SectionHeader
            icon={<CalendarRangeIcon />}
            title="Ciclos do Evento"
          />
          {tipo === "seac" && (
            <Button
              onClick={() => setModalSeacOpen(true)}
              className="bg-blue-600 text-white"
            >
              Adicionar Período SEAC
            </Button>
          )}
          {tipo === "seget" && (
            <Button
              onClick={() => setModalSegetOpen(true)}
              className="bg-green-600 text-white"
            >
              Adicionar Período SEGET
            </Button>
          )}
        </div>
        <div className="space-y-4 mt-4">
          {tipo === "seac" &&
            ciclos.length > 0 &&
            ciclos.map((ciclo: any, index: number) => (
              <CicloCard
                key={`seac-${ciclo.id || index}`}
                ciclo={ciclo}
                eventoId={evento.id}
                // onUpdate={...} // Adicione aqui a função de atualização se desejar
              />
            ))}
          {tipo === "seget" &&
            ciclos.length > 0 &&
            ciclos.map((ciclo: any, index: number) => (
              <CicloCard
                key={`seget-${ciclo.id || index}`}
                ciclo={ciclo}
                eventoId={evento.id}
                // onUpdate={...}
              />
            ))}
        </div>
        <div className="flex justify-between items-center mt-6">
          <SectionHeader icon={<FileIcon />} title="Documentos" />
          <Button
            onClick={() => setDocumentoCardOpen(true)}
            className="bg-blue-600 text-white"
          >
            Adicionar Documento
          </Button>
        </div>
        <ModalPeriodoSeac
          open={modalSeacOpen}
          onClose={() => setModalSeacOpen(false)}
          ciclos={tipo === "seac" ? ciclos : []}
          eventoId={evento.id}
        />
        <DocumentoCard
          open={documentoCardOpen}
          onClose={() => setDocumentoCardOpen(false)}
          eventoId={evento.id}
        />
        <Documentos documentos={documentos} />
        <ModalPeriodoSeget
          open={modalSegetOpen}
          onClose={() => setModalSegetOpen(false)}
          ciclos={tipo === "seget" ? ciclos : []}
          eventoId={evento.id}
        />
      </div>
    </AppLayout>
  );
}
