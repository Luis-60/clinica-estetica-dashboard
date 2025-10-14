import React, { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import { Paciente } from "@/models/Paciente";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Edit,
  Trash2,
  User,
  Calendar,
  Phone,
  MapPin,
  Instagram,
  Venus,
  Mars,
  Clock,
  FileText,
  Stethoscope,
  FileIcon,
} from "lucide-react";
import AppLayout from "@/layouts/app-layout";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { BreadcrumbItem } from "@/types";
import formatHandler from "@/lib/formatHandler";
import SectionHeader from "@/components/manual/section-header";
import FichaAnamneseCard from "./components/ficha-card";
import FichaAnamneseList from "./components/ficha";
import EvolucaoTable from "./components/evolucao";
import { FichaAnamnese } from "@/models/FichaAnamnese";
import { Evolucao } from "@/models/Evolucao";
import { confirmDialog } from "@/components/manual/dialog-events";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Props {
  paciente: Paciente;
  consultas?: any[];
  evolucoes?: Evolucao[];
  fichas?: FichaAnamnese[];
}

export default function PacienteShow({
  paciente,
  consultas = [],
  evolucoes = [],
  fichas = [],
}: Props) {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: "Pacientes",
      href: "/pacientes",
    },
    {
      title: paciente.nome,
      href: `/pacientes/${paciente.id}`,
    },
  ];
  const [fichaCardOpen, setFichaCardOpen] = useState(false);
  const formatDateTime = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleString("pt-BR");
    } catch {
      return dateString;
    }
  };

  const calcularIdade = (dataNasc: string) => {
    const hoje = new Date();
    const nascimento = new Date(dataNasc);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();

    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }

    return idade;
  };

  const handleEdit = () => {
    router.visit(`/pacientes/${paciente.id}/edit`);
  };
  const handleDelete = (id: number) => {
    confirmDialog({
      title: "Excluir Paciente",
      text: "Tem certeza que deseja deletar o paciente?",
      onConfirm: (resolve) => {
        router.delete(route("pacientes.destroy", id), {
          preserveScroll: true,
          onFinish: () => {
            resolve();
          },
        });
      },
    });
  };
  return (
    <>
      <AppLayout breadcrumbs={breadcrumbs}>
        <Head title={`Paciente - ${paciente.nome}`} />

        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-secondar">
                  {paciente.nome}
                </h1>
                <p className="text-sm text-muted-foreground">
                  Paciente desde {formatHandler.formatDate(paciente.created_at)}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={handleEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </Button>
              <Button variant="destructive" 
                onClick={() => handleDelete(paciente.id)}>
                <Trash2 className="h-4 w-4 mr-2" />
                Excluir
              </Button>
            </div>
          </div>

          {/* Accordion Principal */}
          <Accordion type="multiple" defaultValue={["informacoes", "resumo", "fichas", "evolucoes"]} className="w-full">
            
            {/* Informações Pessoais */}
            <AccordionItem value="informacoes" className="pt-3">
              <AccordionTrigger className="font-semibold text-foreground/90 hover:no-underline">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Informações Pessoais
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <Card className="w-full">
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Nome Completo
                        </label>
                        <p className="text-base font-medium">{paciente.nome}</p>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Data de Nascimento
                        </label>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <p className="text-base">
                            {formatHandler.formatDate(paciente.data_nasc)}
                            <span className="text-sm text-muted-foreground ml-2">
                              ({calcularIdade(paciente.data_nasc)} anos)
                            </span>
                          </p>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Telefone
                        </label>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <p className="text-base">{paciente.telefone}</p>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Sexo
                        </label>
                        <div className="flex items-center gap-2">
                          {paciente.sexo === "feminino" ? (
                            <Venus className="h-4 w-4 text-pink-500" />
                          ) : (
                            <Mars className="h-4 w-4 text-blue-500" />
                          )}
                          <p className="text-base capitalize">{paciente.sexo}</p>
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-sm font-medium text-muted-foreground">
                          Endereço
                        </label>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <p className="text-base">{paciente.endereco}</p>
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-sm font-medium text-muted-foreground">
                          Rede Social
                        </label>
                        <div className="flex items-center gap-2">
                          <Instagram className="h-4 w-4 text-purple-500" />
                          <p className="text-base">
                            {paciente.rede_social || "Não informado"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>

            {/* Resumo */}
            <AccordionItem value="resumo" className="pt-3">
              <AccordionTrigger className="font-semibold text-foreground/90 hover:no-underline">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Resumo do Paciente
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col lg:flex-row gap-6 w-full">
                  {/* Status e Resumo */}
                  <Card className="w-full lg:w-1/2">
                    <CardHeader>
                      <CardTitle>Status e Estatísticas</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-800"
                        >
                          Paciente Ativo
                        </Badge>
                      </div>

                      <Separator />

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Consultas
                          </span>
                          <span className="font-medium">{consultas.length}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Evoluções
                          </span>
                          <span className="font-medium">{evolucoes.length}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Fichas
                          </span>
                          <span className="font-medium">{fichas.length}</span>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Cadastrado em
                        </label>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <p className="text-sm">
                            {formatDateTime(paciente.created_at)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Última Consulta e Evolução */}
                  <div className="flex flex-col gap-4 w-full lg:w-1/2">
                    {/* Última Consulta */}
                    {consultas.length > 0 && (
                      <Card className="w-full">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Stethoscope className="h-5 w-5" />
                            Última Consulta
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">
                              {formatDateTime(consultas[0]?.data_consulta || "")}
                            </p>
                            <p className="text-sm">
                              {consultas[0]?.observacoes || "Sem observações"}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Última Evolução */}
                    {evolucoes.length > 0 && (
                      <Card className="w-full">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            Última Evolução
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">
                              {formatDateTime(evolucoes[0]?.data || "")}
                            </p>
                            <p className="text-sm">
                              {evolucoes[0]?.observacoes || "Sem observações"}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>


            {/* Evoluções */}
            <AccordionItem value="evolucoes" className="pt-3">
              <AccordionTrigger className="font-semibold text-foreground/90 hover:no-underline">
                <div className="flex items-center gap-2">
                  <Stethoscope className="h-5 w-5" />
                  Evoluções ({evolucoes.length})
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <EvolucaoTable evolucoes={evolucoes} pacienteId={paciente.id} />
              </AccordionContent>
            </AccordionItem>

            {/* Fichas de Anamnese */}
            <AccordionItem value="fichas" className="pt-3">
              <AccordionTrigger className="font-semibold text-foreground/90 hover:no-underline">
                <div className="flex items-center gap-2">
                  <FileIcon className="h-5 w-5" />
                  Fichas de Anamnese ({fichas.length})
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex justify-between items-center mb-4">
                  <Button
                    onClick={() => setFichaCardOpen(true)}
                    variant="default"
                  >
                    Adicionar Ficha
                  </Button>
                </div>
                
                {/* Lista de fichas existentes */}
                <FichaAnamneseList 
                  fichas={fichas}
                  onCreateNew={() => setFichaCardOpen(true)}
                  onViewDetails={(ficha) => {
                    // TODO: Implementar visualização detalhada da ficha
                    console.log('Ver detalhes da ficha:', ficha.id);
                  }}
                  onEdit={(ficha) => {
                    // TODO: Implementar edição da ficha
                    console.log('Editar ficha:', ficha.id);
                  }}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Modal da Ficha */}
          <FichaAnamneseCard
            open={fichaCardOpen}
            onClose={() => setFichaCardOpen(false)}
            pacienteId={paciente.id}
          />
        </div>
      </AppLayout>
    </>
  );
}
