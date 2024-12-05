<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "rana_hassan";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'];
    $name = $_POST['name'];
    $price = $_POST['price'];
    $discount = $_POST['discount'];

    $allowed_types = ['image/jpeg', 'image/png', 'image/gif'];
    $upload_dir = 'uploads/';
    $image_path = null;

    // Validate uploaded image
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $image_type = mime_content_type($_FILES['image']['tmp_name']);
        // Check if the image type is allowed
        if (!in_array($image_type, $allowed_types)) {
            echo "<script>alert('Invalid image type! Only JPEG, PNG, or GIF files are allowed.'); window.history.back();</script>";
            exit;
        }

        // Move uploaded file to the desired location
        $image_name = basename($_FILES['image']['name']);
        $image_path = $upload_dir . $image_name;

        if (!move_uploaded_file($_FILES['image']['tmp_name'], $image_path)) {
            echo "<script>alert('Error uploading the image. Please try again.'); window.history.back();</script>";
            exit;
        }
    } else {
        // Retain the existing image if no new image is uploaded
        $sql = "SELECT image FROM products WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $product = $result->fetch_assoc();

        if ($product && $product['image']) {
            $image_path = $product['image'];
        } else {
            // If there's no existing image, prevent the update
            echo "<script>alert('No image provided! Please upload an image or select to keep the current image.'); window.history.back();</script>";
            exit;
        }
    }

    // Update product in the database
    $sql = "UPDATE products SET name = ?, price = ?, discount = ?, image = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sissi", $name, $price, $discount, $image_path, $id);

    if ($stmt->execute()) {
        echo "<script> window.location.href = 'display.php';</script>";
    } else {
        echo "<script>alert('Error updating the product. Please try again.'); window.history.back();</script>";
    }

    $stmt->close();
}

$conn->close();
?>
