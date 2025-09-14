<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\Artigo;
use App\Models\Usuario;

class ArtigoAdicionadoEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $artigo;
    public $autor;
    public $criador;

    /**
     * Create a new message instance.
     */
    public function __construct(Artigo $artigo, Usuario $autor)
    {
        $this->artigo = $artigo;
        $this->autor = $autor;
        // Buscar o criador do artigo
        $this->criador = Usuario::find($artigo->criador_id);
    }

    /**
     * Build the message.
     */
    public function build()
    {
        // Gerar token único para confirmação
        $token = hash('sha256', $this->artigo->id . $this->autor->id . config('app.key'));
        
        return $this->subject('Você foi adicionado como autor em um artigo')
                    ->view('emails.artigo-adicionado')
                    ->with([
                        'nomeAutor' => $this->autor->nome,
                        'tituloArtigo' => $this->artigo->titulo,
                        'nomeCriador' => $this->criador->nome,
                        'emailCriador' => $this->criador->email,
                        'resumoArtigo' => $this->artigo->resumo,
                        'evento' => $this->artigo->evento->nome ?? 'Evento não informado',
                        'artigoId' => $this->artigo->id,
                        'autorId' => $this->autor->id,
                        'token' => $token,
                    ]);
    }
}