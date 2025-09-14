import ArtigoCards from "@/components/cards/artigo-cards";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { Artigo } from "@/models/Artigo";
import { Head, router, usePage } from "@inertiajs/react";
import { Mail, Phone, User } from "lucide-react";
import { useState } from "react";

// Novo import para modal
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";

export default function UsuarioPage() {
  const { usuario } = usePage().props as { usuario?: any };
  const { props } = usePage<{ artigos: Artigo[] }>();
  const data = props.artigos;

  // Estado para modal de seleção de evento
  const [modalOpen, setModalOpen] = useState(false);

  // Eventos ativos (mock, depois buscar do backend via props)
  const eventosAtivos = usuario?.eventosAtivos || [];

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja excluir este artigo?")) {
      // TODO: Implementar exclusão
      console.log("Excluir artigo:", id);
    }
  };

  // Handler para seleção de evento
  const handleSelecionarEvento = (evento: any) => {
    setModalOpen(false);
    if (evento.seac) {
      router.visit(`/novo-artigo-seac/${evento.id}`);
    } else if (evento.seget) {
      router.visit(`/novo-artigo-seget/${evento.id}`);
    }
  };

  return (
    <AppLayout>
      <Head title="Perfil" />
      <div className="">
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
            <div className="col-span-4 sm:col-span-3">
              <div className="bg-white shadow dark:bg-stone-900 rounded-lg p-6">
                <div className="mb-6 mt-5 flex flex-col items-center">
                  <div className="w-16 h-16 object-cover flex items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-center text-xl mt-2 font-bold">{usuario?.nome}</h1>
                  <p className="mt-2 text-center dark:text-white  text-gray-700">
                    {usuario?.instituicao?.nome}
                  </p>
                </div>
                <hr className="my-4 border-t border-gray-300" />
                <div className="flex flex-col">
                  <span className="text-gray-700 dark:text-white uppercase font-bold tracking-wider">
                    Curso
                  </span>
                  <p className="text-gray-700 dark:text-white">
                    {usuario?.curso_periodo?.curso?.nome}
                  </p>
                </div>
                <hr className="my-4 border-t border-gray-300" />
                <div className="flex flex-col">
                  <span className="text-gray-700 dark:text-white uppercase font-bold tracking-wider">
                    Período
                  </span>
                  <p className="text-gray-700 dark:text-white">
                    {usuario?.curso_periodo?.periodo?.nome}
                  </p>
                </div>
                <hr className="my-4 border-t border-gray-300" />
                <div className="flex flex-col">
                  <span className="text-gray-700 dark:text-white uppercase font-bold tracking-wider">
                    Contatos
                  </span>
                  <div className="flex items-center mt-2 gap-2 overflow-x-hidden">
                    <span className="shrink-0">
                      <Mail className="w-4 h-4 text-gray-500" />
                    </span>
                    <span
                      className="text-gray-700 dark:text-white"
                      title={usuario?.email}
                    >
                      {usuario?.email}
                    </span>
                  </div>
                  <div className="flex items-center mt-2 gap-2">
                    <span className="shrink-0">
                      <Phone className="w-4 h-4 text-gray-500" />
                    </span>
                    <span className="text-gray-700 dark:text-white">
                      {usuario?.telefone}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-4 sm:col-span-9 ">
              <div className="bg-white shadow dark:bg-stone-900 rounded-lg p-6">
                <div className="flex align-center items-center justify-between mb-6">
                  <h2 className="text-xl font-bold dark:text-white">Artigos</h2>
                  <Button
                    variant="outline"
                    className="mt-4 text-center"
                    onClick={() => setModalOpen(true)}
                  >
                    Criar artigo
                  </Button>
                </div>
                <div className="mb-6 flex flex-col align-center">
                  <div className="grid w-full gap-2">
                    {usuario.artigos?.length > 0 ? (
                      <ArtigoCards
                        key={usuario.artigos[0].id}
                        artigos={usuario.artigos}
                      />
                    ) : (
                      <p className="mt-2 text-center text-gray-700 col-span-full">
                        Nenhum artigo encontrado.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Selecione o evento</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            {eventosAtivos.length === 0 && (
              <p className="text-gray-500">Nenhum evento ativo disponível.</p>
            )}
            {eventosAtivos.map((evento: any) => (
              <Button
                key={evento.id}
                className="w-full justify-between"
                variant="outline"
                onClick={() => handleSelecionarEvento(evento)}
              >
                <span>{evento.nome}</span>
                <span className="text-xs text-gray-500">
                  {evento.seac ? "SEAC" : evento.seget ? "SEGET" : ""}
                </span>
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
