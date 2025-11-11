
import { confirmDialog } from "@/components/manual/dialog-events";
import { EllipsisItem } from "@/components/manual/ellipsis-item";
import { EllipsisMenu } from "@/components/manual/ellipsis-menu";
import { Usuario } from "@/models/Usuario";
import { router } from "@inertiajs/react";
import { BookOpen, FolderIcon, LogIn, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

export default function AcoesProcedimento({
  procedimento,
}: {
  procedimento: any;
}) {
  const [open, setOpen] = useState(false); 
  return (
    <div className="">
      <EllipsisMenu open={open} setOpen={setOpen}>
        {/* Itens do menu */}
        <EllipsisItem
          icon={Pencil}
          label="Editar"
          onClick={() => console.log("Editar", procedimento)}
        />

        <EllipsisItem
          variant="destructive"
          label="Excluir"
          icon={Trash2}
          onClick={() => {
            confirmDialog({
              title: "Excluir Procedimento",
              text: `Tem certeza que deseja apagar o procedimento ${procedimento.nome}?`,
              onConfirm: async (resolve) => {
                router.delete(route("procedimentos.destroy", procedimento.id), {
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