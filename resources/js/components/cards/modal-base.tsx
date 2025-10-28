import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "../ui/drawer";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  titulo?: string | null;
  className?: string | null;
  focusOnOpen?: boolean;
  canClose?: boolean;
  children: React.ReactNode;
  useDrawer?: boolean;
}

export default function ModalBase({
  open,
  setOpen,
  titulo,
  className,
  focusOnOpen = true,
  canClose = true,
  children,
  useDrawer = true,
}: Props) {
  const isMobile = useIsMobile();
  function checkCanClose(event: Event) {
    if (canClose == false) {
      event.preventDefault();
    }
  }
  // const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isMobile && useDrawer) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent
          onEscapeKeyDown={checkCanClose}
          onPointerDownOutside={checkCanClose}
        >
          {titulo && (
            <DrawerHeader className="text-left">
              <DrawerTitle>{titulo}</DrawerTitle>
            </DrawerHeader>
          )}
          <div className="p-2">{children}</div>
        </DrawerContent>
      </Drawer>
    );
  }
  return (
    <Dialog open={open} onOpenChange={setOpen} modal={false}>
      {open && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      )}
      <DialogContent
        onEscapeKeyDown={checkCanClose}
        onPointerDownOutside={checkCanClose}
        showCloseButton={canClose}
        className={cn("max-w-1/2 md:max-h-[90%] overflow-y-auto", className)}
        onOpenAutoFocus={(e) => {
          if (!focusOnOpen) {
            e.preventDefault();
          }
        }}
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