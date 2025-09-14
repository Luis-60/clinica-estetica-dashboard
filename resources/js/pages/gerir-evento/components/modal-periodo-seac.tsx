// components/modals/modal-periodo-seac.tsx
import React from "react";
import ModalPeriodoBase from "./modal-periodo-base";

interface Ciclo {
  id: number | string;
  nome: string;
  data_inicio: string;
  data_fim: string;
}

interface ModalPeriodoSeacProps {
  open: boolean;
  onClose: () => void;
  ciclos?: Ciclo[];
  eventoId: number | string;
}

export default function ModalPeriodoSeac({ 
  open, 
  onClose, 
  ciclos = [],
  eventoId 
}: ModalPeriodoSeacProps) {
  return (
    <ModalPeriodoBase
      open={open}
      onClose={onClose}
      ciclos={ciclos}
      tipo="SEAC"
      eventoId={eventoId}
    />
  );
}