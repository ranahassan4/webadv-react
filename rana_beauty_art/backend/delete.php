<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "rana_hassan";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_GET['id'])) {
    $id = $_GET['id'];

    $sql = "DELETE FROM products WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo "Product deleted successfully.";
        header("Location: display.php"); // Redirect back to the main page
    } else {
        echo "Error deleting product: " . $conn->error;
    }

    $stmt->close();
}

$conn->close();
?>
