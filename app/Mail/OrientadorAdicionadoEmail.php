<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\Artigo;
use App\Models\Usuario;

class OrientadorAdicionadoEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $artigo;
    public $orientador;
    public $criador;

    /**
     * Create a new message instance.
     */
    public function __construct(Artigo $artigo, Usuario $orientador)
    {
        $this->artigo = $artigo;
        $this->orientador = $orientador;
        // Buscar o criador do artigo
        $this->criador = Usuario::find($artigo->criador_id);
    }

    /**
     * Build the message.
     */
    public function build()
    {
        // Gerar token único para confirmação
        $token = hash('sha256', $this->artigo->id . $this->orientador->id . 'orientador' . config('app.key'));
        
        return $this->subject('Você foi adicionado como orientador de um artigo')
                    ->view('emails.orientador-adicionado')
                    ->with([
                        'nomeOrientador' => $this->orientador->nome,
                        'tituloArtigo' => $this->artigo->titulo,
                        'nomeCriador' => $this->criador->nome,
                        'emailCriador' => $this->criador->email,
                        'resumoArtigo' => $this->artigo->resumo,
                        'evento' => $this->artigo->evento->nome ?? 'Evento não informado',
                        'artigoId' => $this->artigo->id,
                        'orientadorId' => $this->orientador->id,
                        'token' => $token,
                    ]);
    }
}
