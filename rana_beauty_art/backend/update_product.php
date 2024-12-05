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

$product_id = $_GET['id'] ?? null;

if ($product_id) {
    // Fetch product details
    $sql = "SELECT * FROM products WHERE id = ?"
    ;
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $product_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $product = $result->fetch_assoc();
    } else {
        echo "Product not found.";
        exit;
    }
} else {
    echo "Invalid product ID.";
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Update Product</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 20px;
      background-color: #f4f4f4;
    }

    .form-container {
      max-width: 500px;
      margin: auto;
      padding: 20px;
      background: #fff;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .form-container h1 {
      text-align: center;
      margin-bottom: 20px;
      font-size: 1.8rem;
      color: #333;
    }

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
      color: #444;
    }

    input[type="text"], input[type="number"], input[type="file"] {
      width: 100%;
      padding: 10px;
      margin-bottom: 15px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }

    button {
      background: #5a98f2;
      color: white;
      border: none;
      padding: 10px 15px;
      border-radius: 5px;
      cursor: pointer;
    }

    button:hover {
      background: #3b82f6;
    }
  </style>
</head>
<body>
  <div class="form-container">
    <h1>Update Product</h1>
    <form action="update_product_action.php" method="POST" enctype="multipart/form-data">
      <input type="hidden" name="id" value="<?php echo $product['id']; ?>">
      <label for="name">Product Name</label>
      <input type="text" name="name" id="name" value="<?php echo htmlspecialchars($product['name']); ?>" required>

      <label for="price">Price</label>
      <input type="number" name="price" id="price" value="<?php echo $product['price']; ?>" required>

      <label for="discount">Discount</label>
      <input type="text" name="discount" id="discount" value="<?php echo htmlspecialchars($product['discount']); ?>" required>

      <label for="image">Product Image</label>
      <input type="file" name="image" id="image">
      <p>Current Image: <img src="<?php echo $product['image']; ?>" alt="Product Image" style="max-width: 100px;" require></p>

      <button type="submit">Update Product</button>
    </form>
  </div>
  <script>
  document.querySelector('form').addEventListener('submit', function (e) {
    const imageInput = document.getElementById('image');
    const allowedExtensions = ['jpeg', 'jpg', 'png', 'gif'];

    // Check if an image is selected
    if (imageInput.files.length > 0) {
      const fileExtension = imageInput.value.split('.').pop().toLowerCase();
      // Validate the file extension
      if (!allowedExtensions.includes(fileExtension)) {
        e.preventDefault();
        alert('Invalid file type! Please select a JPEG, PNG, or GIF image.');
        imageInput.style.border = '2px solid red';
        return false;
      }
    } else {
      // If no image is selected, display an alert
      e.preventDefault();
      alert('Please select an image to upload or leave it empty to keep the current image.');
      imageInput.style.border = '2px solid red';
      return false;
    }
  });
</script>

  
</body>

</html>
