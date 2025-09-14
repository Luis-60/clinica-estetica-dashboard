import ModalAtualizarDados from "@/components/manual/modal-atualizar-dados";
import AppLayoutTemplate from "@/layouts/app/app-sidebar-layout";
import { type BreadcrumbItem } from "@/types";
import { router, usePage } from "@inertiajs/react";
import { SetStateAction, useEffect, type ReactNode } from "react";
import { toast, Toaster } from "sonner";

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

  useEffect(() => {
    const props = page.props;
    if (props.errors?.mensagem) {
      toast.error(props.errors.mensagem);
      // Optional: clear error after showing
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
      {(page.props.auth as any)?.user?.endereco === null && <ModalAtualizarDados usuario={(page.props.auth as any).user} />}
      {children}
      <Toaster richColors position="bottom-right" />
    </AppLayoutTemplate>
  );
}
