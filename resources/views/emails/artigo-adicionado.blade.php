<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Adicionado como Autor</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        .content {
            background-color: #ffffff;
            padding: 20px;
            border: 1px solid #e9ecef;
            border-radius: 8px;
        }
        .article-info {
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 5px;
            margin: 15px 0;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #e9ecef;
            color: #6c757d;
            font-size: 14px;
        }
        .btn {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin: 10px 0;
        }
        .btn-success {
            background-color: #28a745;
        }
        .btn:hover {
            opacity: 0.8;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🎓 Você foi adicionado como autor!</h1>
    </div>

    <div class="content">
        <p>Olá, <strong>{{ $nomeAutor }}</strong>!</p>

        <p>Você foi adicionado como autor no artigo abaixo por <strong>{{ $nomeCriador }}</strong> ({{ $emailCriador }}).</p>

        <div class="article-info">
            <h3>📄 Informações do Artigo:</h3>
            <p><strong>Título:</strong> {{ $tituloArtigo }}</p>
            <p><strong>Evento:</strong> {{ $evento }}</p>
            <p><strong>Resumo:</strong></p>
            <p style="margin-left: 15px; font-style: italic;">{{ $resumoArtigo }}</p>
        </div>

        <p>Para confirmar sua participação como autor neste artigo, clique no botão abaixo:</p>
        
        <div style="text-align: center; margin: 20px 0;">
            <a href="{{ route('confirmar.autoria', ['artigo' => $artigoId, 'autor' => $autorId, 'token' => $token]) }}" 
               class="btn btn-success" 
               style="background-color: #28a745; font-size: 16px; padding: 15px 30px; color: white; text-decoration: none;">
                ✅ Confirmar Participação
            </a>
        </div>
        
        <p>Ou acesse a plataforma para gerenciar suas submissões:</p>
        
        <a href="{{ config('app.url') }}" class="btn">Acessar Plataforma</a>

        <p><strong>Importante:</strong> Se você não deseja ser autor deste artigo ou não autorizou sua inclusão, entre em contato com {{ $nomeCriador }} ou com a coordenação do evento.</p>
    </div>

    <div class="footer">
        <p>Este é um email automático do Sistema de Submissão de Artigos.</p>
        <p>© {{ date('Y') }} AEDB - Associação Educacional Dom Bosco</p>
    </div>
</body>
</html>