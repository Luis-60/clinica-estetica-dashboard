<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\Usuario;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;

class EmailConfirmacao extends Mailable
{
    use Queueable, SerializesModels;

    public $usuario;
    public $confirmationUrl;

    /**
     * Create a new message instance.
     */
    public function __construct(Usuario $usuario, $confirmationUrl)
    {
        $this->usuario = $usuario;
        $this->confirmationUrl = $confirmationUrl;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Confirme seu cadastro',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.confirmacao',
            with: [
                'usuario' => $this->usuario,
                'confirmationUrl' => $this->confirmationUrl,
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
