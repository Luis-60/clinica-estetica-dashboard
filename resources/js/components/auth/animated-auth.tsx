import React, { useEffect, useRef, useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import { LogIn, LoaderCircle, AlertCircle } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';


export default function AnimatedAuth() {
  const loginForm = useForm({
    nome: '',
    password: '',
    remember: false,
  });

  // Função para submeter o formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    loginForm.post(route('login'), {
      onFinish: () => loginForm.reset('password'),
      onSuccess: () => {
        // Redirecionar para dashboard após login bem-sucedido
        router.visit('/dashboard');
      },
      onError: (errors) => {
        console.error('Erro no login:', errors);
      }
    });
  };

  // Animação de entrada do card
  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

  // Animação do ícone
  const [iconAnim, setIconAnim] = useState(false);
  useEffect(() => {
    setTimeout(() => setIconAnim(true), 400);
  }, []);

  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-sky-300 to-indigo-400 px-4">
      <div
        className={`py-10 px-8 bg-card rounded-3xl shadow-2xl w-full max-w-md flex flex-col items-center border border-blue-200 backdrop-blur-md transition-all duration-700 ease-out
        ${show ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}
      >
        <div className="flex flex-col items-center mb-6">
          <span
            className={`bg-blue-100 p-4 rounded-full shadow-lg mb-2 transition-transform duration-700 ${iconAnim ? 'scale-100 rotate-0' : 'scale-75 -rotate-12'}`}
          >
            <LogIn size={36} className="text-blue-600 transition-transform duration-700" />
          </span>
          <h2 className="text-3xl font-extrabold text-primary tracking-tight mb-1">Bem-vindo ao Sistema!</h2>
          <p className="text-base text-primary mb-2">Faça login para acessar o sistema</p>
        </div>
        <form className="w-full space-y-6" onSubmit={handleSubmit}>
          {/* Mostrar erros de validação */}
          {(loginForm.errors.nome || loginForm.errors.password) && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <span className="text-sm text-red-700">
                {loginForm.errors.nome || loginForm.errors.password || 'Credenciais inválidas'}
              </span>
            </div>
          )}
          
          <div>
            <Label htmlFor="nome">Nome</Label>
            <Input
              id="nome"
              value={loginForm.data.nome}
              onChange={e => loginForm.setData('nome', e.target.value)}
              placeholder="Digite seu nome"
              autoFocus
              className={loginForm.errors.nome ? 'border-red-300' : ''}
            />
          </div>
          <div>
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              value={loginForm.data.password}
              onChange={e => loginForm.setData('password', e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              className={loginForm.errors.password ? 'border-red-300' : ''}
            />
          </div>
          <Button
          type="submit"
          disabled={loginForm.processing}
          className='w-full'
          variant="outline"
          >Entrar
            
          </Button>
          
        </form>
      </div>
    </div>
  );
}

