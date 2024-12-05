<?php
session_start(); // Start session to handle messages


$servername = "localhost";
$username = "root";
$password = "";
$dbname = "rana_hassan";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle form submission
if (isset($_POST['submit'])) {
    // Sanitize and validate inputs
    $nameOfProduct = htmlspecialchars(trim($_POST['name']), ENT_QUOTES);
    $price = filter_var($_POST['price'], FILTER_VALIDATE_FLOAT);
    $discount = filter_var($_POST['discount'], FILTER_VALIDATE_INT);
    $category = htmlspecialchars(trim($_POST['category']), ENT_QUOTES);
    $image = $_FILES['image'];

    if (!$nameOfProduct || !$price || !$discount || !$category || !$image['name']) {
        $_SESSION['message'] = "Invalid input. Please fill out all fields correctly.";
        $_SESSION['msg_type'] = "error";
        header("Location: display.php");
        exit();
    }

    // Validate and handle file upload
    $allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif'];
    $maxFileSize = 2 * 1024 * 1024; // 2MB
    $uploadDir = "uploads/";

    if (!in_array($image['type'], $allowedFileTypes)) {
        $_SESSION['message'] = "Invalid file type. Only JPEG, PNG, and GIF are allowed.";
        $_SESSION['msg_type'] = "error";
        header("Location: display.php");
        exit();
    }

    if ($image['size'] > $maxFileSize) {
        $_SESSION['message'] = "File size exceeds the 2MB limit.";
        $_SESSION['msg_type'] = "error";
        header("Location: display.php");
        exit();
    }

    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true); // Create upload directory if not exists
    }

    $uniqueFileName = uniqid() . "_" . basename($image['name']);
    $uploadFile = $uploadDir . $uniqueFileName;

    if (!move_uploaded_file($image['tmp_name'], $uploadFile)) {
        $_SESSION['message'] = "Error uploading the file.";
        $_SESSION['msg_type'] = "error";
        header("Location: display.php");
        exit();
    }

  
    $sql = "INSERT INTO products (name, price, discount, image, category) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    if ($stmt) {
        $stmt->bind_param("sdiss", $nameOfProduct, $price, $discount, $uploadFile, $category);
        if ($stmt->execute()) {
            $_SESSION['message'] = "Product added successfully!";
            $_SESSION['msg_type'] = "success";
        } else {
            $_SESSION['message'] = "Error adding product: " . $stmt->error;
            $_SESSION['msg_type'] = "error";
        }
        $stmt->close();
    } else {
        $_SESSION['message'] = "Database error: " . $conn->error;
        $_SESSION['msg_type'] = "error";
    }

  
    header("Location: display.php");
    exit();
}


$sql = "SELECT * FROM products";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manage Products</title>
    <style>
    body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
        }

        .container {
            max-width: 1200px;
            margin: 20px auto;
            padding: 20px;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .alert {
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid transparent;
            border-radius: 5px;
        }

        .alert.success {
            color: #155724;
            background-color: #d4edda;
            border-color: #c3e6cb;
        }

        .alert.error {
            color: #721c24;
            background-color: #f8d7da;
            border-color: #f5c6cb;
        }

        /* Products styling */
        .products-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }

        .product-item {
            background: #fff;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 15px;
            text-align: center;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            opacity: 0; /* Initially hidden for animation */
            transform: translateY(20px); /* Slide effect */
            animation: fadeInUp 0.6s ease forwards; /* Fade and slide up animation */
        }

        /* Stagger animation for delay effect */
        .product-item:nth-child(1) { animation-delay: 0.2s; }
        .product-item:nth-child(2) { animation-delay: 0.4s; }
        .product-item:nth-child(3) { animation-delay: 0.6s; }
        .product-item:nth-child(4) { animation-delay: 0.8s; }

        .product-item img {
            max-width: 100%;
            max-height: 150px;
            margin-bottom: 10px;
            border-radius: 8px;
            object-fit: cover;
        }

        .product-item p {
            margin: 5px 0;
            font-size: 14px;
            color: #555;
        }

        .product-item p strong {
            font-weight: bold;
            color: #333;
        }

        /* Button styling */
        .button-group {
            display: flex;
            justify-content: space-around;
            margin-top: 15px;
        }

        .button-group button {
            padding: 10px 20px;
            font-size: 14px;
            border: none;
            border-radius: 20px;
            cursor: pointer;
            transition: background-color 0.3s ease, transform 0.2s ease;
        }

        .button-group .update {
            background-color: #4caf50;
            color: white;
        }

        .button-group .delete {
            background-color: #f44336;
            color: white;
        }

        .button-group button:hover {
            transform: scale(1.05);
        }

        /* Animation keyframes */
        @keyframes fadeInUp {
            0% {
                opacity: 0;
                transform: translateY(20px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }
    </style>
</head>
<body>
    
    <?php if (isset($_SESSION['message'])): ?>
        <div class="alert <?= htmlspecialchars($_SESSION['msg_type']); ?>">
            <?= htmlspecialchars($_SESSION['message']); ?>
        </div>
        <?php unset($_SESSION['message']); ?>
    <?php endif; ?>

    <!-- Display Products -->
    <div class="products-container">
        <?php if ($result->num_rows > 0): ?>
            <?php while ($row = $result->fetch_assoc()): ?>
                <div class="product-item">
                    <img src="<?= htmlspecialchars($row['image']); ?>" alt="<?= htmlspecialchars($row['name']); ?>">
                    <div>
                        <p> <?= htmlspecialchars($row['name']); ?></p>
                        <p> ₹<?= number_format($row['price'], 2); ?></p>
                        <p> <?= htmlspecialchars($row['discount']); ?>%</p>
                        <p> <?= htmlspecialchars($row['category']); ?></p>
                    </div>
                    <div class="button-group">
                        <button class="update" onclick="location.href='update_product.php?id=<?= $row['id']; ?>'">Update</button>
                        <button class="delete" onclick="deleteProduct(<?= $row['id']; ?>)">Delete</button>
                    </div>
                </div>
            <?php endwhile; ?>
        <?php else: ?>
            <p>No products found.</p>
        <?php endif; ?>
    </div>

    <script>
        function deleteProduct(productId) {
            if (confirm("Are you sure you want to delete this product?")) {
                window.location.href = `delete.php?id=${productId}`;
            }
        }
    </script>
</body>
</html>
