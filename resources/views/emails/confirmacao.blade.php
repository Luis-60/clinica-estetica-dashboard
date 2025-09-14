<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Confirmação de Cadastro</title>
</head>
<body>
    <h2>Olá, {{ $usuario->nome }}!</h2>
    <p>Obrigado por se registrar no sistema acadêmico. Para confirmar seu cadastro, clique no botão abaixo:</p>
    <p style="text-align:center;">
        <a href="{{ $confirmationUrl }}" style="background:#1976d2;color:#fff;padding:12px 24px;text-decoration:none;border-radius:6px;font-weight:bold;display:inline-block;">Confirmar Cadastro</a>
    </p>
    <p>Se você não realizou este cadastro, ignore este email.</p>
    <p>Atenciosamente,<br>Equipe AEDB</p>
</body>
</html>
