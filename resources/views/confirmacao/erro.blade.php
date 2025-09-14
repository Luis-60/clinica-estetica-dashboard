<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Confirmação de Autoria - Erro</title>
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
        .error-header {
            text-align: center;
            color: #dc3545;
            margin-bottom: 20px;
        }
        .error-icon {
            font-size: 48px;
            margin-bottom: 10px;
        }
        .error-message {
            background-color: #f8d7da;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
            border-left: 4px solid #dc3545;
            color: #721c24;
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
        <div class="error-header">
            <div class="error-icon">❌</div>
            <h1>Erro na Confirmação</h1>
        </div>

        <div class="error-message">
            <strong>Não foi possível confirmar sua autoria:</strong><br>
            {{ $mensagem }}
        </div>

        <p>Possíveis causas:</p>
        <ul>
            <li>O link de confirmação pode ter expirado</li>
            <li>O link pode ter sido usado anteriormente</li>
            <li>Houve um erro no sistema</li>
        </ul>

        <p><strong>O que fazer:</strong></p>
        <ul>
            <li>Entre em contato com quem adicionou você como autor</li>
            <li>Acesse a plataforma diretamente para verificar seus artigos</li>
            <li>Entre em contato com o suporte técnico se o problema persistir</li>
        </ul>

        <div style="text-align: center; margin: 30px 0;">
            <a href="{{ config('app.url') }}" class="btn">Acessar Plataforma</a>
            <a href="mailto:suporte@aedb.br" class="btn" style="background-color: #28a745;">Contatar Suporte</a>
        </div>

        <div class="footer">
            <p>Se você acredita que este é um erro, entre em contato conosco.</p>
            <p>© {{ date('Y') }} AEDB - Associação Educacional Dom Bosco</p>
        </div>
    </div>
</body>
</html>
