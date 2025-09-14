import React, { useState } from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Users, UserPlus, Trash2, Mail } from "lucide-react";
import AutoCompleteInputStyled from "@/components/ui/auto-complete-input-styled";
import { AutorCard } from "@/components/cards/autor-card";
import { Button } from "@/components/ui/button";
import { ComboBox } from "../manual/combo-box";
import { AutoComplete, type Option } from "@/components/ui/auto-complete-input";
import { UserInfo } from "../user-info";
interface Autor {
  id: number | string;
  nome: string;
  email: string;
}

interface AutoresModalProps {
  usuariosDisponiveis: Autor[];
  autores: Autor[];
  onAdd: (autor: Autor) => void;
  onRemove: (id: number | string) => void;
  tituloArtigo: string;
  isOpen: boolean;
  onClose: () => void;
}

export function AddAuthorModal({
  usuariosDisponiveis,
  autores,
  onAdd,
  onRemove,
  tituloArtigo,
  isOpen,
  onClose,
}: AutoresModalProps) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Autor | null>(null);
  const [value, setValue] = useState<Option>();
  // Sugestões de autores disponíveis (não adicionados ainda)
  const suggestions = usuariosDisponiveis.filter(
    (u) => !autores.some((a) => a.id === u.id)
  );
  console.log("Sugestões de autores:", suggestions);
  const handleAdd = () => {
    if (selected) {
      onAdd(selected);
      setSelected(null);
      setSearch("");
      setValue(undefined); // Limpar o valor do AutoComplete
    } else if (search) {
      // Permite adicionar autor não cadastrado, apenas com email
      onAdd({
        id: `email:${search}`,
        nome: "",
        email: search,
      });
      setSelected(null);
      setSearch("");
      setValue(undefined); // Limpar o valor do AutoComplete
    }
  };

  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Adicionar Autores
        </DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground">
          <strong>Artigo:</strong> {tituloArtigo}
        </div>

        <div className="flex gap-2 ">
          <AutoComplete
            options={suggestions.map((autor) => ({
              label: <UserInfo user={{
                id: typeof autor.id === 'string' ? parseInt(autor.id) : autor.id,
                nome: autor.nome,
                email: autor.email
              }} showEmail />,
              value: autor.id.toString(),
              text: autor.nome,
            }))}
            emptyMessage="Nenhum autor encontrado"
            isLoading={false}
            value={value}
            onValueChange={(e) => {
              setValue(e);
              suggestions.find((autor) => autor.id.toString() === e.value)
                ? setSelected(
                    suggestions.find(
                      (autor) => autor.id.toString() === e.value
                    )!
                  )
                : setSelected(null);
            }}
            placeholder="Pesquisar autores..."
          />

          {/* <ComboBox
            value={selected?.id.toString()}
            onChange={(val) => {
              setSelected(val);
            }}
            options={suggestions.map((autor) => ({
              value: autor.id.toString(),
              label: autor.email,
            }))}
          /> */}
          {/* <AutoCompleteInputStyled
            suggestions={suggestions}
            showOnFocus={false}
            value={selected ? selected : { email: search }}
            onChange={(val) => {
              if (typeof val === "string") {
                setSearch(val);
                setSelected(null);
              } else if (val) {
                setSearch(val.email);
                setSelected(val);
              }
            }}
            onSelect={(autor) => {
              setSearch(autor.email);
              setSelected(autor);
            }}
            placeholder="Pesquisar autores..."
            className="flex-1"
            customRenderOption={(option) => option.email}
          /> */}
          <Button
            type="button"
            onClick={handleAdd}
            disabled={autores.some((a) => a.email === search)}
            variant="outline"
            className="flex items-center gap-1"
          >
            <UserPlus className="w-4 h-4" />
            Adicionar
          </Button>
        </div>
        <div className="space-y-2 ">
          <h4 className="font-medium">
            Autores adicionados ({autores.length}):
          </h4>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {autores.map((autor, index) => (
              <AutorCard
                key={autor.id}
                nome={autor.nome}
                email={autor.email}
                isPrincipal={index === 0}
              >
                {/* Se não tem nome, mostra ícone de email */}
                {!autor.nome ? (
                  <Mail className="w-4 h-4 text-blue-500 mr-2" />
                ) : null}
                {index !== 0 && (
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() => onRemove(autor.id)}
                    title="Remover autor"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                )}
              </AutorCard>
            ))}
          </div>
        </div>
      </div>
    </DialogContent>
  );
}
