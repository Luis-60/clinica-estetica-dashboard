import React from 'react';
import { Head } from '@inertiajs/react';

interface ConfirmacaoProps {
  success: boolean;
  message: string;
}

export default function Confirmacao({ success, message }: ConfirmacaoProps) {
  return (
    <div style={{ maxWidth: 400, margin: '80px auto', padding: 32, background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px #0002', textAlign: 'center' }}>
      <Head title="Confirmação de Email" />
      <h2 style={{ color: '#1976d2' }}>
        Verifique seu email para validar cadastro
      </h2>
      <p style={{ marginTop: 16 }}>
        Enviamos um email de confirmação para você. Por favor, acesse seu email e clique no link para ativar sua conta.
      </p>
      <a href="/login" style={{ display: 'inline-block', marginTop: 32, background: '#1976d2', color: '#fff', padding: '12px 24px', borderRadius: 6, textDecoration: 'none', fontWeight: 'bold' }}>
        Ir para o Login
      </a>
    </div>
  );
}
