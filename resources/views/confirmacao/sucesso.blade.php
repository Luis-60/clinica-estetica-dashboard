<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Confirmação de Autoria - Sucesso</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
        }
        .container {
            background-color: #ffffff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .success-header {
            text-align: center;
            color: #28a745;
            margin-bottom: 20px;
        }
        .success-icon {
            font-size: 48px;
            margin-bottom: 10px;
        }
        .article-info {
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
            border-left: 4px solid #28a745;
        }
        .btn {
            display: inline-block;
            padding: 12px 24px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin: 10px 5px;
            text-align: center;
        }
        .btn:hover {
            background-color: #0056b3;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e9ecef;
            color: #6c757d;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="success-header">
            <div class="success-icon">✅</div>
            <h1>Confirmação Realizada com Sucesso!</h1>
        </div>

        <p>Olá, <strong>{{ $autor->nome }}</strong>!</p>

        <p>Sua participação como autor foi confirmada com sucesso!</p>

        <div class="article-info">
            <h3>📄 Artigo Confirmado:</h3>
            <p><strong>Título:</strong> {{ $artigo->titulo }}</p>
            <p><strong>Resumo:</strong> {{ $artigo->resumo }}</p>
        </div>

        <p>Agora você pode:</p>
        <ul>
            <li>Acessar a plataforma para acompanhar o status do artigo</li>
            <li>Receber notificações sobre avaliações e próximos passos</li>
            <li>Colaborar com os demais autores</li>
        </ul>

        <div style="text-align: center; margin: 30px 0;">
            <a href="{{ config('app.url') }}/artigos" class="btn">Acessar Meus Artigos</a>
            <a href="{{ config('app.url') }}" class="btn">Ir para Plataforma</a>
        </div>

        <div class="footer">
            <p>Este é um sistema automático de confirmação de autoria.</p>
            <p>© {{ date('Y') }} AEDB - Associação Educacional Dom Bosco</p>
        </div>
    </div>
</body>
</html>
