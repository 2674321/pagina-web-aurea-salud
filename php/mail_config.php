<?php
declare(strict_types=1);

/**
 * Configuración de correo del sitio.
 *
 * AJUSTAR EN EL SERVIDOR. No versionar direcciones reales.
 * El destinatario debe pertenecer al dominio del sitio; NUNCA debe apuntar al
 * buzón de una marca anterior.
 *
 * Se puede sobrescribir por variables de entorno:
 *   AUREA_MAIL_TO   → destinatario de los formularios
 *   AUREA_MAIL_FROM → remitente fijo del dominio
 */

return [
    'destinatario' => getenv('AUREA_MAIL_TO') ?: 'contacto@example.invalid',
    'from'         => getenv('AUREA_MAIL_FROM') ?: 'no-reply@example.invalid',
];
