import { Documento } from "@/models/Documento";
import { EllipsisMenu } from "@/components/manual/ellipsis-menu";
import { EllipsisItem } from "@/components/manual/ellipsis-item";
import { FileTypes } from "@/components/manual/file-types";
import { InfoIcon, Pencil, Trash2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";

type Props = {
  documentos: Documento[];
};

export default function Documentos({ documentos }: Props) {
  if (!documentos || documentos.length === 0) {
    return <p>Nenhum documento encontrado.</p>;
  }

  // Função para mapear tipo -> título
  const getTipo = (tipo: string) => {
    switch (tipo) {
      case "modelo":
        return "Modelos";
      case "edital":
        return "Editais";
      case "manual":
        return "Manuais";
      case "orientacoes":
        return "Orientações";
      default:
        return "Documentos";
    }
  };

  // Agrupa documentos por tipo
  const grupos = documentos.reduce((acc, doc) => {
    if (!acc[doc.tipo]) acc[doc.tipo] = [];
    acc[doc.tipo].push(doc);
    return acc;
  }, {} as Record<string, Documento[]>);

  return (
    <div className="space-y-8 w-full">
      <Accordion type="multiple" className="overflow-visible">
        {Object.entries(grupos).map(([tipo, docs]) => (
          <AccordionItem key={tipo} value={tipo}>
            <AccordionTrigger className="text-xl text-gray-800 dark:text-gray-200 hover:no-underline">
              <li className="ml-6">
                {getTipo(tipo)} <span className="text-sm text-gray-500"> {docs.length > 0 && `(${docs.length})`}</span>

              </li>
            </AccordionTrigger>

            <AccordionContent>
              <div className="break-all gap-4">
                {docs.map((doc) => { 
                  return (
                  <div
                    key={doc.id}
                    className="relative border rounded p-2 mb-2 cursor-pointer w-full
                               bg-card dark:hover:dark:bg-neutral-800 hover:bg-gray-100 
                               transition"
                  >

                    <div className="flex items-center">
                      <FileTypes file={doc.documento} />
                      <a
                        href={`../storage/${doc.documento}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block ml-2"
                      >
                        <h3 className="font-bold line-clamp-2 mr-12">
                          {doc.nome}
                        </h3>
                        <p>{doc.descricao}</p>
                      </a>
                    </div>
                  </div>
                ) })}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

