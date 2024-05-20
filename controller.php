<?php
$servername = "bg6jgousq2bk4dtvaxm2-mysql.services.clever-cloud.com";
$username = "ulbcqsbq50wv5xib";
$password = "Gbz2TOGD0XH0KUkIogH8";
$dbname = "bg6jgousq2bk4dtvaxm2";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $data = json_decode(file_get_contents('php://input'), true);
  if (!$data) {
    http_response_code(400); 
    echo json_encode(array("success" => false, "error" => "Datos inválidos"));
    exit;
  }

  $name = isset($data['name']) ? $data['name'] : '';
  $email = isset($data['email']) ? $data['email'] : '';
  $phone = isset($data['phone']) ? $data['phone'] : '';
  $subject = isset($data['subject']) ? $data['subject'] : '';
  $message = isset($data['message']) ? $data['message'] : '';

  $name = $conn->real_escape_string($name);
  $email = $conn->real_escape_string($email);
  $phone = $conn->real_escape_string($phone);
  $subject = $conn->real_escape_string($subject);
  $message = $conn->real_escape_string($message);

  $sql = "INSERT INTO usuarios (nombre, email, telefono, asunto, mensaje) 
          VALUES ('$name', '$email', '$phone', '$subject', '$message')";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(array("success" => true));
    } else {
        echo json_encode(array("success" => false));
    }
} else {
    $sql = "SELECT * FROM usuarios";
    $result = $conn->query($sql);
    $users = array();

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $users[] = array("name" => $row["nombre"], "email" => $row["email"]);
        }
    }

    echo json_encode($users);
}

$conn->close();