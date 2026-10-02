<?php
declare(strict_types=1);

require_once __DIR__ . '/mailer.php';

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    exit;
}

$email = (string) ($_POST['email'] ?? '');

$enviado = aurea_enviar_formulario(
    'Nuevo mensaje de contacto',
    [
        'Nombre'  => (string) ($_POST['name'] ?? ''),
        'Correo'  => $email,
        'Asunto'  => (string) ($_POST['subject'] ?? ''),
        'Mensaje' => (string) ($_POST['message'] ?? ''),
    ],
    $email
);

echo $enviado ? 'success' : 'error';
