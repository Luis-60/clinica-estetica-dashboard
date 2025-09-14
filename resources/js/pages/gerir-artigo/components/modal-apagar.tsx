import ModalBase from "@/components/manual/modal-base";
import { Button } from "@/components/ui/button";
import { Artigo } from "@/models/Artigo";
import { router } from "@inertiajs/react";

interface Props {
    openDelete: boolean;
    setOpenDelete: React.Dispatch<React.SetStateAction<boolean>>;
    artigo: Artigo;
}

export default function ModalApagar({ openDelete, setOpenDelete, artigo }: Props) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // const formData = new FormData();
        // Object.entries(artigo).forEach(([key, value]: [string, any]) => {
        //     formData.append(key, value.toString());
        // });

        router.delete(route('artigos.destroy', artigo.id), {
            preserveScroll: true,
            onFinish: () => {
                setOpenDelete(false);
            },
            // onSuccess: (a) => {
            // },
            // onError: (errors) => {
            // },
        });
    };
    return <ModalBase open={openDelete} setOpen={setOpenDelete} titulo='Apagar Artigo'>
        <span>
            Tem Certeza que deseja apagar esse artigo?
        </span>

        <form onSubmit={handleSubmit}>
            <div className="grid grid-flow-col md:w-50 ml-auto gap-3">
                <Button
                    variant="outline"
                    onClick={() => setOpenDelete(false)}
                >
                    Cancelar
                </Button>
                <Button
                    variant="destructive"
                    type="submit"
                >
                    Apagar
                </Button>
            </div>
        </form>
    </ModalBase>;
}
