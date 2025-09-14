import React, { useEffect, useRef, useState } from 'react';
import { useForm } from '@inertiajs/react';
import { LogIn, LoaderCircle } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

export default function AnimatedAuth() {
  const loginForm = useForm({
    email: '',
    senhaHash: '',
    remember: false,
  });

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
        className={`py-10 px-8 bg-white/90 rounded-3xl shadow-2xl w-full max-w-md flex flex-col items-center border border-blue-200 backdrop-blur-md transition-all duration-700 ease-out
        ${show ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}
      >
        <div className="flex flex-col items-center mb-6">
          <span
            className={`bg-blue-100 p-4 rounded-full shadow-lg mb-2 transition-transform duration-700 ${iconAnim ? 'scale-100 rotate-0' : 'scale-75 -rotate-12'}`}
          >
            <LogIn size={36} className="text-blue-600 transition-transform duration-700" />
          </span>
          <h2 className="text-3xl font-extrabold text-blue-900 tracking-tight mb-1">Bem-vindo ao Sistema!</h2>
          <p className="text-base text-blue-700/80 mb-2">Faça login para acessar o sistema</p>
        </div>
        <form className="w-full space-y-6" onSubmit={e => { e.preventDefault(); loginForm.post(route('login'), { onFinish: () => loginForm.reset('senhaHash') }); }}>
          <div>
            <Label htmlFor="email">Usuário</Label>
            <Input
              id="email"
              value={loginForm.data.email}
              onChange={e => loginForm.setData('email', e.target.value)}
              placeholder="Digite seu usuário ou email"
              autoFocus
            />
          </div>
          <div>
            <Label htmlFor="senhaHash">Senha</Label>
            <Input
              id="senhaHash"
              type="password"
              value={loginForm.data.senhaHash}
              onChange={e => loginForm.setData('senhaHash', e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>
          <button
            className="py-2 px-8 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-700 hover:from-blue-700 hover:to-indigo-600 focus:ring-offset-blue-200 text-white w-full transition-all duration-300 ease-in-out text-center text-base font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg cursor-pointer select-none transform hover:scale-[1.03] active:scale-95"
            type="submit"
            disabled={loginForm.processing}
          >
            {loginForm.processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

