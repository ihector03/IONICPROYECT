<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

// Debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Respuesta para OPTIONS (CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Obtener datos JSON
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!$data) {
    die(json_encode([
        'success' => false,
        'message' => 'Datos no recibidos',
        'received_data' => $json
    ]));
}

// Conexión a la base de datos
$mysqli = new mysqli('localhost', 'root', '', 'ionic_login');

if ($mysqli->connect_error) {
    die(json_encode([
        'success' => false,
        'message' => 'Error de conexión a MySQL',
        'error' => $mysqli->connect_error
    ]));
}

// Consulta segura con prepared statements
$query = "SELECT * FROM usuarios WHERE TRIM(username) = ?";
$stmt = $mysqli->prepare($query);

if (!$stmt) {
    die(json_encode([
        'success' => false,
        'message' => 'Error al preparar consulta',
        'error' => $mysqli->error
    ]));
}

$username = trim($data['username']);
$stmt->bind_param('s', $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    die(json_encode([
        'success' => false,
        'message' => 'Usuario no encontrado',
        'query' => $query,
        'username' => $username
    ]));
}

$user = $result->fetch_assoc();

// Verificación de contraseña
if ($data['password'] === $user['password']) {
    echo json_encode([
        'success' => true,
        'user' => [
            'nombre' => $user['nombre'],
            'edad' => $user['edad'],
            'fechaNacimiento' => $user['fechaNacimiento'],
            'correo' => $user['correo'],
            'telefono' => $user['telefono']
        ]
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Contraseña incorrecta'
    ]);
}

$stmt->close();
$mysqli->close();
?>