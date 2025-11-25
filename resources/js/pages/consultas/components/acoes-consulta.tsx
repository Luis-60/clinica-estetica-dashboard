import { confirmDialog } from "@/components/manual/dialog-events";
import { EllipsisItem } from "@/components/manual/ellipsis-item";
import { EllipsisMenu } from "@/components/manual/ellipsis-menu";
import { Usuario } from "@/models/Usuario";
import { router } from "@inertiajs/react";
import { BookOpen, FolderIcon, LogIn, Pencil, Stethoscope, Trash2 } from "lucide-react";
import { useState } from "react";

export default function AcoesConsulta({
  consulta,
  onOpenEvolucao,
}: {
  consulta: any;
  onOpenEvolucao: Function | null;
}) {
  const [open, setOpen] = useState(false); 
  return (
    <div className="">
      <EllipsisMenu open={open} setOpen={setOpen}>
        {/* Itens do menu */}
        <EllipsisItem
          icon={Pencil}
          label="Editar"
          onClick={() => console.log("Editar", consulta)}
        />
        <EllipsisItem
          icon={Stethoscope}
          label="Nova Evolução"
          onClick={() => {
            setOpen(false);
            if (onOpenEvolucao) onOpenEvolucao(consulta);
          }}
        />
        <hr className="my-1" />
        <EllipsisItem
          variant="destructive"
          label="Excluir"
          icon={Trash2}
          onClick={() => {
            confirmDialog({
              title: "Excluir Consulta",
              text: `Tem certeza que deseja apagar a consulta ${consulta.nome}?`,
              onConfirm: async (resolve) => {
                router.delete(route("consultas.destroy", consulta.id), {
                  preserveScroll: true,
                  onFinish: () => {
                    resolve();
                  },
                });
              },
            });
          }}
        />
      </EllipsisMenu>
    </div>
  );
}