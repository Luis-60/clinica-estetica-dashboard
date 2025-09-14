import { AutorCard } from "@/components/cards/autor-card";
import LexicalHtmlRenderer from "@/components/manual/lexical-html-renderer";
import TextEditor from "@/components/manual/text-editor";
import { AddAuthorModal } from "@/components/modals/add-author-modal";
import { AutoComplete, type Option } from "@/components/ui/auto-complete-input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { FileInputBox } from "@/components/ui/file-input";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import AppLayout from "@/layouts/app-layout";
import { Artigo } from "@/models/Artigo";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { SerializedEditorState, SerializedLexicalNode } from "lexical";
import React, { useEffect, useState } from "react";

type User = {
  id: number | string;
  nome: string;
  email: string;
  // adicione outros campos conforme necessário
};

type PageProps = {
  artigos: Artigo[];
  areas?: any[];
  usuariosDisponiveis?: User[];
  auth?: {
    user?: User;
  };
};

type ArtigoForm = {
  titulo: string;
  resumo: string;
  criador_id?: number | string;
  arquivo: File | null | any;
  autores_ids: any[];
  eventos_id: any;
  areas_id: any;
};

export default function Artigos() {
  const { props } = usePage<PageProps>();
  const { areas = [] } = props;
  const [valor, setValor] = useState<Option>();
  const [selectedAutor, setSelectedAutor] = useState<{
    id: number;
    nome: string;
    email: string | null;
  } | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const { usuariosDisponiveis = [] } = props;
  const user = props.auth?.user; // agora tipado corretamente
  const [autores, setAutores] = useState<User[]>(user ? [user] : []);
  // Estados para armazenar arquivos
  const [documentFiles, setDocumentFiles] = useState({
    arquivo: null as File | null | any,
  });

  const [addAuthorOpen, setAddAuthorOpen] = useState(false); // novo estado

  // Pegue o eventos_id da URL
  let eventos_id = 1;
  if (typeof window !== "undefined") {
    const match = window.location.pathname.match(/\/novo-artigo-seget\/(\d+)/);
    if (match && match[1]) {
      eventos_id = parseInt(match[1]);
    }
  }

  const { data, setData, processing, errors, reset } = useForm<ArtigoForm>({
    titulo: "",
    resumo: "",
    arquivo: "",
    criador_id: user?.id || "",
    autores_ids: [],
    eventos_id: eventos_id, // inicialize com o valor da URL
    areas_id: "",
  });

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      autores_ids: autores.map((a) => parseInt(String(a.id))),
    }));
  }, [autores]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("titulo", data.titulo);
    formData.append("resumo", JSON.stringify(data.resumo));
    if (data.arquivo) {
      formData.append("arquivo", data.arquivo);
    }
    // Envie os autores_ids como array para o backend Laravel
    data.autores_ids.forEach((id: number | string) => {
      formData.append("autores_ids[]", String(id));
    });
    formData.append("eventos_id", data.eventos_id.toString());
    formData.append("areas_id", parseInt(data.areas_id).toString());

    // Adicione o criador_id (usuário logado)
    if (user && user.id) {
      formData.append("criador_id", String(user.id));
    }

    // Para depuração, veja o que está realmente no FormData
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    router.post(route("artigos.store"), formData, {
      onSuccess: () => {
        console.log("Success!");
        reset();
      },
      onError: (errors) => {
        console.error("Errors:", errors);
      },
    });
  };

  console.log("FormData:", data);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setData((prev) => ({ ...prev, arquivo: selectedFile })); // <-- ESSA LINHA É O QUE FALTAVA
    }
  };
  const handleFieldChange = (
    field: string,
    value:
      | string
      | Date
      | null
      | boolean
      | SerializedEditorState<SerializedLexicalNode>
  ) => {
    let processedValue = value;
    if (field === "data") {
      processedValue = new Date(value as string);
    }
    setData((prev) => ({ ...prev, [field]: processedValue }));
  };

  return (
    <AppLayout>
      <Head title="Submeter artigo" />
      <div className="m-2 p-4 space-y-4">
        {/* Header com botão de novo artigo */}
        <form action="" onSubmit={handleSubmit}>
          <div className="flex justify-between items-center">
            <div className="flex flex-col w-full">
              <h1 className="text-3xl font-bold mb-2">
                Submeter Artigo ao SEGET
              </h1>
              <h1 className="text-xl font-bold mt-2">1. Detalhes do Artigo</h1>
              <div className="w-full mt-2 space-y-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Título
                </Label>
                <Input
                  type="text"
                  required
                  onChange={(e) => handleFieldChange("titulo", e.target.value)}
                  value={data.titulo}
                  placeholder="Digite o título do artigo"
                />
                {/* <InputError message={} /> */}
                <div className="w-full mt-2 space-y-2 grid">
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Área Temática
                  </Label>
                  <AutoComplete
                    value={valor}
                    isLoading={false}
                    placeholder="Selecione a área temática"
                    emptyMessage="Nenhuma área encontrada"
                    onValueChange={(e) => {
                      setValor(e);
                      handleFieldChange("areas_id", e?.value);
                    }}
                    options={areas.map((area) => ({
                      value: area.id.toString(),
                      label: area.nome,
                    }))}
                  />
                </div>
              </div>

              <div className="w-full mt-2 space-y-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Descrição do Artigo
                </Label>
                <Textarea
                  className="resize-none"
                  placeholder="Digite a descrição do artigo"
                  rows={4}
                  value={data.resumo}
                  onChange={(e) => handleFieldChange("resumo", e.target.value)}
                />

                <div className="w-full space-y-2">
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Artigo (PDF)
                  </Label>
                  <FileInputBox accept=".pdf" onChange={handleFileChange} />
                  {file && (
                    <div className="flex items-center gap-2 mt-2">
                      {/* Ícone PDF */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <rect
                          x="4"
                          y="2"
                          width="16"
                          height="20"
                          rx="2"
                          fill="#fff"
                          stroke="#ef4444"
                          strokeWidth="2"
                        />
                        <path
                          d="M8 6h8M8 10h8M8 14h4"
                          stroke="#ef4444"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <text
                          x="12"
                          y="20"
                          textAnchor="middle"
                          fontSize="7"
                          fill="#ef4444"
                          fontWeight="bold"
                        >
                          PDF
                        </text>
                      </svg>
                      <a
                        href={URL.createObjectURL(file)}
                        target="_blank"
                        onChange={(file) =>
                          setDocumentFiles((prev) => ({
                            ...prev,
                            arquivo: file,
                          }))
                        }
                        rel="noopener noreferrer"
                        className="text-blue-600 underline text-sm hover:text-blue-800"
                        onClick={(e) => {
                          setTimeout(
                            () =>
                              URL.revokeObjectURL(URL.createObjectURL(file)),
                            1000
                          );
                        }}
                      >
                        {file.name}
                      </a>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-between">
                <h1 className="text-xl font-bold mt-5">2. Autores do Artigo</h1>
                <Dialog open={addAuthorOpen} onOpenChange={setAddAuthorOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="mt-4 text-center"
                      onClick={() => setAddAuthorOpen(true)}
                    >
                      Adicionar Autor
                    </Button>
                  </DialogTrigger>
                  <AddAuthorModal
                    usuariosDisponiveis={usuariosDisponiveis}
                    autores={autores}
                    onAdd={(autor) => {
                      if (autor.email) {
                        setAutores((prev) => [
                          ...prev,
                          { ...autor, email: autor.email } as User,
                        ]);
                        console.log("Autor adicionado:", autor);
                        console.log("Autores adicionados:", autores);
                      }
                    }}
                    onRemove={(id) =>
                      setAutores((prev) =>
                        prev.filter((a) => a.email !== id && a.id !== id)
                      )
                    }
                    tituloArtigo={""}
                    isOpen={addAuthorOpen}
                    onClose={() => setAddAuthorOpen(false)}
                  />
                </Dialog>
              </div>
              <div className="space-y-2 mt-2">
                {autores.map((autor, idx) => (
                  <AutorCard
                    key={autor.email || autor.id || idx}
                    nome={autor.nome}
                    email={autor.email}
                    isPrincipal={idx === 0}
                  />
                ))}
              </div>
              <Button
                type="submit"
                variant="outline"
                className="mt-4 text-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
              >
                Submeter artigo
              </Button>
            </div>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
