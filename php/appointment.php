<?php
declare(strict_types=1);

require_once __DIR__ . '/mailer.php';

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    exit;
}

$email = (string) ($_POST['email'] ?? '');

$enviado = aurea_enviar_formulario(
    'Nueva solicitud de atención domiciliaria',
    [
        'Nombre'           => (string) ($_POST['name'] ?? ''),
        'Correo'           => $email,
        'Teléfono'         => (string) ($_POST['phone'] ?? ''),
        'Fecha preferente' => (string) ($_POST['date'] ?? ''),
        'Tipo de atención' => (string) ($_POST['care_plan'] ?? ''),
        'Especialidad'     => (string) ($_POST['specialty'] ?? ''),
        'Urgencia'         => (string) ($_POST['urgency'] ?? ''),
        'Mensaje'          => (string) ($_POST['message'] ?? ''),
    ],
    $email
);

echo $enviado ? 'success' : 'error';
