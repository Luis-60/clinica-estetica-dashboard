import { confirmDialog } from "@/components/manual/dialog-events";
import { EllipsisItem } from "@/components/manual/ellipsis-item";
import { EllipsisMenu } from "@/components/manual/ellipsis-menu";
import { Usuario } from "@/models/Usuario";
import { router } from "@inertiajs/react";
import { BookOpen, FolderIcon, LogIn, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

export default function AcoesConsulta({
  consulta,
}: {
  consulta: any;
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