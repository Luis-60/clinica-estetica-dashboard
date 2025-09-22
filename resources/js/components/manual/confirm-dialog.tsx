import { useEffect, useState } from "react";
import { ConfirmDialogOptions, subscribeConfirmDialog } from "./dialog-events";
import ModalBase from "./modal-base";
import { Button } from "../ui/button";
import SubmitButton from "./submit-button";

type ConfirmUsed = { __confirmUsed: true };
export function ConfirmDialogRenderer() {
  const [processing, setProcessing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmDialogOptions>({
    title: "",
    text: "",
    onConfirm: undefined as
      | undefined
      | ((resolve: () => void, reject: (reason?: any) => void) => void),
    onCancel: undefined as undefined | (() => void),
  });

  useEffect(() => {
    const unsubscribe = subscribeConfirmDialog((opts) => {
      setOptions(opts);
      setIsOpen(true);
    });

    return unsubscribe;
  }, []);

  const handleConfirm = async () => {
    setProcessing(true);

    await new Promise<void>((resolve, reject) => {
      options.onConfirm?.(resolve, reject);
    })
      .then(() => {
        setIsOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });

    setProcessing(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
    options.onCancel?.();
  };

  return (
    <ModalBase open={isOpen} setOpen={setIsOpen} titulo={options.title}>
      <div className="m-2">{options.text}</div>
      <div className="grid grid-flow-col gap-2 md:ml-auto">
        <Button variant="outline" onClick={handleCancel}>
          Cancelar
        </Button>
        <SubmitButton
          label="Aceitar"
          onClick={handleConfirm}
          processing={processing}
        />
      </div>
    </ModalBase>
  );
}
