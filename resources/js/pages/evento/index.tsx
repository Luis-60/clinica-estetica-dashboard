import { Head, usePage } from "@inertiajs/react";
import { useMemo } from "react";
import AppLayout from "@/layouts/app-layout";
import { Calendar, Users, FileText, CirclePoundSterling, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import formatHandler from "@/lib/formatHandler";
import CardEvento from "@/pages/evento/components/card-evento";
import CardCiclo from "./components/card-ciclos";
import { Ciclo } from "@/models/Ciclo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Area } from "@/models/Area";
import SectionHeader from "@/components/manual/section-header";
import Documentos from "./components/documentos";
import { Alert } from "@/components/ui/alert";
import LexicalHTMLRenderer from "@/components/manual/lexical-html-renderer";
import { Evento } from "@/models/Evento";
export default function EventoDetails() {
  const { evento } = usePage().props as unknown as { evento: any };
  const { ciclos } = usePage().props as unknown as { ciclos: any };
  const { areas } = usePage().props as unknown as { areas: any };
  const { documentos } = usePage().props as unknown as { documentos: any };

  const descricao = useMemo(() => {
    if (!evento.descricao) return { root: { children: [], type: "root", version: 1 } };
      return typeof evento.descricao === 'string' 
        ? JSON.parse(evento.descricao)
        : evento.descricao;
  }, [evento.descricao]);

  if (!evento) {
    return (
      <AppLayout>
        <div className="p-8 text-center text-gray-500">
          Evento não encontrado.
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Head title={`Evento: ${evento.nome}`} />
      <div className="px-4 md:px-16 py-4">

          <Alert className="w-full p-4 text-red-900 bg-red-200 opacity-75 flex gap-2 items-center dark:bg-opacity-75 border-red-400 rounded-lg mb-3">
            <Info/>
            <p>
              Por favor, antes de submeter o artigo, verifique as instruções 
              de como efetuar a submissão.
            </p>
          </Alert>
        </div>
        <div className="px-4 md:px-16 pb-8">
        <div className="md:grid grid-cols-12 flex flex-col-reverse gap-6">
          <div className="col-span-7 xl:col-span-8">
            <div className="grid-rows-2">
              <div className="mb-2 ">
                <Accordion type="single" collapsible className="mb-6">
                  <AccordionItem value="detalhes-evento">
                    <AccordionTrigger className="text-xl font-semibold text-gray-800 dark:text-white hover:no-underline">
                      <SectionHeader icon={<Info/>} title="Detalhes do Evento" />
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="text-sm text-muted-foreground mb-3">
                        <LexicalHTMLRenderer text={descricao} />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <Accordion type="single" collapsible className="mb-6">
                <AccordionItem value="datas-importantes">
                  <AccordionTrigger className="text-xl font-semibold text-gray-800 dark:text-white hover:no-underline">
                    <SectionHeader icon={<Calendar/>} title="Datas Importantes" />
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col md:flex-row md:flex-wrap gap-4  pt-2">
                      {ciclos &&
                        ciclos.length > 0 &&
                        ciclos.map((ciclo: Ciclo) => (
                          <CardCiclo key={ciclo.id} ciclo={ciclo} />
                        ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Accordion type="single" collapsible className="mb-6">
                <AccordionItem value="documentos">
                  <AccordionTrigger className="text-xl font-semibold text-gray-800 dark:text-white hover:no-underline">
                    <SectionHeader icon={<FileText/>} title="Documentos" />
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col md:flex-row md:flex-wrap gap-4  pt-2">
                        <Documentos documentos={documentos}/>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              {/* Áreas do Evento */}

              <div className="mb-4 flex items-center gap-2">
                <p className="text-xl font-semibold text-gray-800 hover:no-underline dark:text-white">
                  Áreas do Evento
                </p>
              </div>
              <div className="flex gap-2 flex-wrap ">
                {areas &&
                  areas.length > 0 &&
                  areas.map((area: Area) => (
                    <div className="border p-1 rounded">{area.nome}</div>
                  ))}
              </div>
            </div>
          </div>

          <div className="col-span-5 xl:col-span-4">
            <div className="sticky top-4 w-full">
              <CardEvento evento={evento} />
            </div>
            {/* Adicione aqui mais informações, como participantes, artigos, etc, se desejar */}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
