<?php

require_once 'phpmailer/PHPMailerAutoload.php';
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$name = $_POST['user_name'];
$phone = $_POST['user_phone'];

$mail->isSMTP(); // Set mailer to use SMTP
$mail->Host = 'smtp.yandex.ru'; // Specify main and backup SMTP servers
$mail->SMTPAuth = true; // Enable SMTP authentication
$mail->Username = 'dsk-stroy-site@yandex.ru'; // Ваш логин от почты с которой будут отправляться письма
$mail->Password = 'appleJack@22'; // Ваш пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'ssl'; // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465; // TCP port to connect to / этот порт может отличаться у других провайдеров

$mail->setFrom('dsk-stroy-site@yandex.ru', 'DSK-STROY.COM'); // от кого будет уходить письмо?
$mail->addAddress('main.acr0matic@gmail.com'); // Кому будет уходить письмо
$mail->addAttachment($_FILES['user_file']['tmp_name'], $_FILES['user_file']['name']); // Optional name
$mail->isHTML(true); // Set email format to HTML

$mail->Subject = 'Запрос на обратный звонок';
$mail->Body = 'Поступила заявка на обратный звонок. <br>Имя: ' . $name . '<br>Номер телефона: <a href="tel:' . $phone . '">' . $phone . '</a>';
$mail->AltBody = '';

if (!$mail->send()) {
    echo 'Error';
}
