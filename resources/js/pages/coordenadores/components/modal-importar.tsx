import Field from "@/components/manual/field";
import InputFile from "@/components/manual/input-file";
import ModalBase from "@/components/manual/modal-base";
import SubmitButton from "@/components/manual/submit-button";
import { Button } from "@/components/ui/button";
import { Usuario } from "@/models/Usuario";
import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import ExibeCsv from "./exibe-csv";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dado: Usuario | null;
}

export default function ModalImportar({ open, setOpen, dado }: Props) {
  const [arquivo, setArquivo] = useState<File[]>([]);
  const [csvData, setCsvData] = useState<any[]>([]);

  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (open === false) {
      setArquivo([]);
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("users", JSON.stringify(csvData));

    setProcessing(true);
    router.post(route("coordenadores.store_csv"), formData, {
      preserveScroll: true,
      onFinish: () => {
        setProcessing(false);
      },
      onSuccess: () => {
        setOpen(false);
      },
      onError: (errors) => {
        console.error(JSON.stringify(errors));
      },
    });
  };
  return (
    <ModalBase open={open} setOpen={setOpen} titulo="Cadastrar Coordenadores">
      <form onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <Field label="Arquivo">
            <InputFile
              label="CSV até 10MB"
              accept=".csv"
              value={arquivo}
              onChange={(e) => {
                setArquivo([e[0]]);
              }}
            />
          </Field>
        </div>
        <div className="my-2 overflow-auto h-32">
          <ExibeCsv file={arquivo[0]} onDataChange={(e) => setCsvData(e)} />
        </div>
        <div className="grid grid-flow-col md:w-50 mt-5 ml-auto gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancelar
          </Button>
          <SubmitButton processing={processing} />
        </div>
      </form>
    </ModalBase>
  );
}
