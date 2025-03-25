<?php
$host = "localhost";
$username = "root"; // Change if your MySQL has a different user
$password = "your_new_password"; // Change if you have a MySQL password
$database = "user_systems";

// Create connection
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Database connection failed: " . $conn->connect_error]));
}
?>