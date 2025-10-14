import { useState } from "react";
import { useForm } from "@inertiajs/react";
import { DatePicker } from "@/components/manual/date-picker";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ModalBase from "@/components/manual/modal-base";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  pacientes: Array<{ id: number; nome: string }>;
}

const procedimentos = [
  "Limpeza de Pele",
  "Peeling",
  "Drenagem Linfática",
  "Massagem Modeladora",
  "Tratamento Facial",
  "Depilação a Laser",
  "Microagulhamento",
  "Botox",
  "Preenchimento",
  "Hidratação Facial",
];

export default function ModalCriarConsulta({ open, setOpen, pacientes }: Props) {
  const [openPaciente, setOpenPaciente] = useState(false);
  const [openProcedimento, setOpenProcedimento] = useState(false);
  
  const { data, setData, post, processing, errors, reset } = useForm({
    pacientes_id: "",
    data: "",
    procedimento: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route("consultas.store"), {
      preserveScroll: true,
      onSuccess: () => {
        setOpen(false);
        reset();
      },
    });
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  return (
    <ModalBase open={open} setOpen={handleClose} titulo="Nova Consulta">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label>Paciente</Label>
          <Popover open={openPaciente} onOpenChange={setOpenPaciente}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openPaciente}
                className="w-full justify-between"
              >
                {data.pacientes_id
                  ? pacientes.find((p) => p.id === Number(data.pacientes_id))?.nome
                  : "Selecione o paciente..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Buscar paciente..." />
                <CommandEmpty>Nenhum paciente encontrado.</CommandEmpty>
                <CommandGroup>
                  {pacientes.map((paciente) => (
                    <CommandItem
                      key={paciente.id}
                      onSelect={() => {
                        setData("pacientes_id", String(paciente.id));
                        setOpenPaciente(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          Number(data.pacientes_id) === paciente.id
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {paciente.nome}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          {errors.pacientes_id && (
            <p className="text-sm text-red-500">{errors.pacientes_id}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Procedimento</Label>
          <Popover open={openProcedimento} onOpenChange={setOpenProcedimento}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openProcedimento}
                className="w-full justify-between"
              >
                {data.procedimento || "Selecione o procedimento..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Buscar procedimento..." />
                <CommandEmpty>Nenhum procedimento encontrado.</CommandEmpty>
                <CommandGroup>
                  {procedimentos.map((proc) => (
                    <CommandItem
                      key={proc}
                      onSelect={() => {
                        setData("procedimento", proc);
                        setOpenProcedimento(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          data.procedimento === proc ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {proc}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          {errors.procedimento && (
            <p className="text-sm text-red-500">{errors.procedimento}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Data e Hora da Consulta</Label>
          <div className="flex gap-2">
            <div className="flex-1">
              <DatePicker
                value={data.data || ""}
                onChange={(date) => {
                  if (date instanceof Date) {
                    const currentDate = data.data ? new Date(data.data) : new Date();
                    date.setHours(currentDate.getHours(), currentDate.getMinutes());
                    setData("data", date.toISOString());
                  }
                }}
              />
            </div>
            <Input
              type="time"
              value={data.data ? new Date(data.data).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : ""}
              onChange={(e) => {
                const [hours, minutes] = e.target.value.split(':');
                const currentDate = data.data ? new Date(data.data) : new Date();
                currentDate.setHours(Number(hours), Number(minutes));
                setData('data', currentDate.toISOString());
              }}
              className="w-32"
            />
          </div>
          {errors.data && (
            <p className="text-sm text-red-500">{errors.data}</p>
          )}
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button type="submit" disabled={processing}>
            {processing ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </form>
    </ModalBase>
  );
}
