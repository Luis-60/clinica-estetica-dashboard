import { ConfirmDialogRenderer } from "@/components/manual/confirm-dialog";
import ModalAtualizarDados from "@/components/manual/modal-atualizar-dados";
import AppLayoutTemplate from "@/layouts/app/app-sidebar-layout";
import { type BreadcrumbItem } from "@/types";
import { router, usePage } from "@inertiajs/react";
import { useEffect, type ReactNode } from "react";
import { toast, Toaster } from "sonner";
import { PrimeReactProvider } from 'primereact/api';
interface AppLayoutProps {
  children: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

export default function AppLayout({
  children,
  breadcrumbs,
  ...props
}: AppLayoutProps) {
  const page = usePage();

    const value = {
        ripple: true,
        unstyled: true,
    };

  useEffect(() => {
    const props = page.props;

    if (props.errors.mensagem) {
      try {
        const erros = JSON.parse(props.errors?.mensagem);
        if (typeof erros == typeof [""]) {
          erros.forEach((erro: string) => {
            toast.error(erro);
          });
        } else {
          toast.error(props.errors.mensagem);
        }
      } catch {
        toast.error(props.errors.mensagem);
      }
    }

    if (props.success) {
      const mensagem = props.success as string;

      toast.success(mensagem);
      router.reload({ only: [] });
    }

    if (props.warning) {
      const mensagem = props.warning as string;

      toast.warning(mensagem);
      router.reload({ only: [] });
    }

    if (props.info) {
      const mensagem = props.info as string;

      toast.info(mensagem);
      router.reload({ only: [] });
    }
  }, [page]);

  return (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
      <PrimeReactProvider value={value}>
      {children}
      <Toaster richColors position="bottom-right" />

      </PrimeReactProvider>
      <ConfirmDialogRenderer />
    </AppLayoutTemplate>
  );
}