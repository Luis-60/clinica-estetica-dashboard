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
    <div className="space-y-8 py-4">
      <Accordion type="multiple" className="overflow-visible">
        {Object.entries(grupos).map(([tipo, docs]) => (
          <AccordionItem key={tipo} value={tipo}>
            <AccordionTrigger className="text-xl font-semibold text-gray-800 dark:text-gray-200 hover:no-underline">
              {getTipo(tipo)} <span className="text-sm text-gray-500"> {docs.length > 0 && `(${docs.length})`}</span>
            </AccordionTrigger>

            <AccordionContent>
              <div className="grid break-all grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {docs.map((doc) => { 
                  const [open, setOpen] = useState(false);
                  return (
                  <div
                    key={doc.id}
                    className="relative border rounded p-2 cursor-pointer 
                               bg-card dark:hover:dark:bg-neutral-800 hover:bg-gray-100 
                               transition"
                    onContextMenu={(e) => {
                      e.preventDefault();
                      
                      setOpen(true);
                      
                    }}
                  >
                    {/* Ellipsis Menu no canto superior direito */}
                    <div className="absolute top-2 right-2">
                      <EllipsisMenu
                        open={open} 
                        setOpen={setOpen}
                      >
                        <EllipsisItem
                          icon={InfoIcon}
                          label="Informações"
                          onClick={() => {
                            /* informações */
                          }}
                        />
                        <EllipsisItem
                          icon={Pencil}
                          label="Editar"
                          onClick={() => {
                            /* editar */
                          }}
                        />
                        <EllipsisItem
                          label="Excluir"
                          icon={Trash2}
                          onClick={() => {
                            /* excluir documento */
                          }}
                        />
                      </EllipsisMenu>
                    </div>

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

