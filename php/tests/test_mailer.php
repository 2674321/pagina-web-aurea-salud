<?php
declare(strict_types=1);

/**
 * Prueba mínima del armado de cabeceras. No envía correos reales.
 *
 * Ejecutar:  php php/tests/test_mailer.php
 */

require_once __DIR__ . '/../mailer.php';

function verificar(bool $condicion, string $mensaje): void
{
    if (!$condicion) {
        fwrite(STDERR, "FALLA: {$mensaje}\n");
        exit(1);
    }
}

verificar(aurea_email_valido('paciente01@example.invalid'), 'un correo válido se acepta');
verificar(!aurea_email_valido('no-es-un-correo'), 'un correo inválido se rechaza');
verificar(!aurea_email_valido("a@b.invalid\r\nBcc: otro@x.invalid"), 'CRLF debe rechazarse');
verificar(!aurea_email_valido("a@b.invalid\nBcc: otro@x.invalid"), 'LF debe rechazarse');

$cabeceras = aurea_construir_cabeceras(
    'no-reply@example.invalid',
    "visita@example.invalid\r\nBcc: otro@x.invalid"
);
verificar($cabeceras === 'From: no-reply@example.invalid', 'Reply-To con CRLF no debe incluirse');

$cabecerasOk = aurea_construir_cabeceras('no-reply@example.invalid', 'visita@example.invalid');
verificar(
    $cabecerasOk === "From: no-reply@example.invalid\r\nReply-To: visita@example.invalid",
    'Reply-To válido sí se incluye'
);

verificar(aurea_limpiar("  <b>hola</b>\n  ") === 'hola', 'el cuerpo quita etiquetas y espacios');

fwrite(STDOUT, "OK pruebas de correo\n");
