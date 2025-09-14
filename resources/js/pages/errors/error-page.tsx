import AppLayout from "@/layouts/app-layout";
import { Head, Link } from "@inertiajs/react";

export default function ErrorPage({ status }: { status: number }) {
  const title = {
    503: "Erro do Sistema",
    500: "Erro do Sistema",
    404: "Não Encontrado",
    403: "Proibido",
  }[status];

  const description = {
    503: "Algo ocorreu errado, tente novamente mais tarde",
    500: "Algo ocorreu errado, tente novamente mais tarde",
    404: "A página solicitada não foi encontrada",
    403: "Acesso não autorizado",
  }[status];

  return (
    <AppLayout>
      <Head title={title} />
      <div className="flex">
        <div className="mx-auto flex flex-col">
          <h1 className="mx-auto font-bold text-2xl">{title}</h1>
          <div>{description}</div>
        </div>
      </div>
    </AppLayout>
  );
}
