<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "soporte.cuidados.vitalis@gmail.com";
    $subject = "Nuevo mensaje de contacto";

    $name = htmlspecialchars($_POST["name"]);
    $email = htmlspecialchars($_POST["email"]);
    $subjectInput = htmlspecialchars($_POST["subject"]);
    $message = htmlspecialchars($_POST["message"]);

    $body = "Nombre: $name\nCorreo: $email\nAsunto: $subjectInput\n\nMensaje:\n$message";
    $headers = "From: $email\r\nReply-To: $email\r\n";

    if (mail($to, $subject, $body, $headers)) {
        echo "success";
    } else {
        echo "error";
    }
}
?>
