import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  titulo?: string | null;
  className?: string | null;
  children: React.ReactNode;
}

export default function ModalBase({
  open,
  setOpen,
  titulo,
  className,
  children,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen} modal={false}>
      {open && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      )}
      <DialogContent
        className={cn(
          className,
          "sm:max-w-[600px] md:max-h-[90%] overflow-auto",
        )}
      >
        {titulo && (
          <DialogTitle>
            {titulo}
            <hr className="mt-3" />
          </DialogTitle>
        )}
        {children}
      </DialogContent>
    </Dialog>
  );
}
