<?php
declare(strict_types=1);

/**
 * Utilidades de correo del sitio. Sin dependencias externas.
 *
 * Reglas de seguridad:
 *  - El destinatario y el remitente salen de configuración, nunca del visitante.
 *  - El correo del visitante solo se usa como Reply-To, y únicamente si es
 *    válido y no contiene CR/LF (evita inyección de cabeceras).
 *  - Todos los campos se recortan y se les quitan etiquetas antes de armar el
 *    cuerpo.
 */

function aurea_config_correo(): array
{
    $ruta = __DIR__ . '/mail_config.php';
    $config = is_file($ruta) ? require $ruta : [];
    $config = is_array($config) ? $config : [];

    return array_merge([
        'destinatario' => '',
        'from'         => '',
    ], $config);
}

/** Quita retornos de carro y saltos de línea (cabeceras y asuntos). */
function aurea_sin_saltos(string $valor): string
{
    return trim(str_replace(["\r", "\n", '%0a', '%0d'], '', $valor));
}

/** Recorta y elimina etiquetas del cuerpo. */
function aurea_limpiar(string $valor): string
{
    return trim(strip_tags($valor));
}

/** Un correo es válido si lo es y no esconde saltos de línea. */
function aurea_email_valido(string $valor): bool
{
    if ($valor === '' || $valor !== aurea_sin_saltos($valor)) {
        return false;
    }

    return filter_var($valor, FILTER_VALIDATE_EMAIL) !== false;
}

/** Cabeceras con From fijo y Reply-To solo si es válido. Sin datos del visitante en From. */
function aurea_construir_cabeceras(string $from, string $replyTo = ''): string
{
    $cabeceras = [];
    if (aurea_email_valido($from)) {
        $cabeceras[] = 'From: ' . $from;
    }
    if ($replyTo !== '' && aurea_email_valido($replyTo)) {
        $cabeceras[] = 'Reply-To: ' . $replyTo;
    }

    return implode("\r\n", $cabeceras);
}

/**
 * Envía un formulario del sitio.
 *
 * @param array<string,string> $campos Etiqueta => valor de cada campo.
 * @return bool true si el correo se entregó a la capa de envío.
 */
function aurea_enviar_formulario(string $asunto, array $campos, string $emailVisitante = ''): bool
{
    $config = aurea_config_correo();
    $destinatario = aurea_sin_saltos((string) ($config['destinatario'] ?? ''));
    $from = aurea_sin_saltos((string) ($config['from'] ?? ''));

    if (!aurea_email_valido($destinatario) || !aurea_email_valido($from)) {
        error_log('AUREA: correo mal configurado; no se envió el formulario.');
        return false;
    }

    $cuerpo = '';
    foreach ($campos as $etiqueta => $valor) {
        $cuerpo .= $etiqueta . ': ' . aurea_limpiar((string) $valor) . "\n";
    }

    $visitante = aurea_sin_saltos($emailVisitante);
    $replyTo = aurea_email_valido($visitante) ? $visitante : '';
    $cabeceras = aurea_construir_cabeceras($from, $replyTo);

    return mail($destinatario, aurea_sin_saltos($asunto), $cuerpo, $cabeceras);
}
