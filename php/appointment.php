<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "soporte.cuidados.vitalis@gmail.com";
    $subject = "Nueva solicitud de atención domiciliaria";

    $name = htmlspecialchars($_POST["name"]);
    $email = htmlspecialchars($_POST["email"]);
    $phone = htmlspecialchars($_POST["phone"]);
    $date = htmlspecialchars($_POST["date"]);
    $care_plan = htmlspecialchars($_POST["care_plan"]);
    $specialty = htmlspecialchars($_POST["specialty"]);
    $urgency = htmlspecialchars($_POST["urgency"]);
    $message = htmlspecialchars($_POST["message"]);

    $body = "Nombre: $name\nCorreo: $email\nTeléfono: $phone\nFecha preferente: $date\n";
    $body .= "Tipo de atención: $care_plan\nEspecialidad: $specialty\nUrgencia: $urgency\n\n";
    $body .= "Mensaje:\n$message";

    $headers = "From: $email\r\nReply-To: $email\r\n";

    if (mail($to, $subject, $body, $headers)) {
        echo "success";
    } else {
        echo "error";
    }
}
?>
