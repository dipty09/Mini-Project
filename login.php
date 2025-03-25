<?php
session_start();
// header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
 // Ensure response is JSON
include 'db.php'; // Include database connection

// Read JSON input
$data = json_decode(file_get_contents("php://input"), true);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = trim($data['email']);
    $password = $data['password'];

    // Check if email exists
    $query = "SELECT * FROM userdata WHERE email = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Email exists, check password
        $row = $result->fetch_assoc();
        if (password_verify($password, $row['password'])) {
            $_SESSION['user_id'] = $row['id'];
            $_SESSION['email'] = $row['email'];

            echo json_encode(["success" => true, "message" => "Login successful!", "redirect" => "Notes.html"]);
        } else {
            echo json_encode(["success" => false, "message" => "Incorrect password!"]);
        }
    } else {
        // Email does not exist, redirect to register page
        echo json_encode(["success" => false, "message" => "Email not found. Redirecting to register...", "redirect" => "Sign.html?email=" . urlencode($email)]);
    }
    exit();
}
?>