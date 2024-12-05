<!DOCTYPE html>
<html lang="en">
<?php
session_start();
?>
<head>
    <style>
        /* General Styles */
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 50px auto;
            background: white;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h1 {
            text-align: center;
            color: #333;
        }

        label {
            display: block;
            margin: 10px 0 5px;
        }

        input[type="text"],
        input[type="file"] {
            width: 100%;
            padding: 10px;
            margin-bottom: 20px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }

        button {
            width: 48%; /* Make buttons sit side-by-side */
            padding: 10px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
        }

        button.add {
            background-color: #28a745;
            color: white;
        }

        button.add:hover {
            background-color: #218838;
        }

        button.update {
            background-color: #ffc107;
            color: white;
        }

        button.update:hover {
            background-color: #e0a800;
        }

        .button-group {
            display: flex;
            justify-content: space-between;
        }

        /* Alert Box Styles */
        .alert {
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            width: 90%;
            max-width: 400px;
            padding: 15px;
            border: 1px solid transparent;
            border-radius: 5px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            text-align: center;
            z-index: 1000;
            display: none; /* Initially hidden */
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

        .alert.show {
            display: block;
        }
    </style>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manage Products</title>
</head>
<body>
    <!-- Alert Message -->
    <?php
    // Check for success or error messages
    if (isset($_SESSION['message'])) {
        $msg_type = $_SESSION['msg_type']; // Get message type
        echo "<div class='alert $msg_type show'>" . $_SESSION['message'] . "</div>";
        unset($_SESSION['message']); // Clear the message after displaying it
    }
    ?>

    <!-- Form Container -->
    <div class="container">
        <h1>Manage Products</h1>
        <form action="display.php" method="POST" enctype="multipart/form-data">
            <label for="name">Product Name:</label>
            <input type="text" id="name" name="name" required>

            <label for="price">Price:</label>
            <input type="text" id="price" name="price" required>

            <label for="discount">Discount:</label>
            <input type="text" id="discount" name="discount" required>

            <label for="image">Upload Image:</label>
            <input type="file" id="image" name="image" required>
            <label for="name">category:</label>
            <input type="text" id="name" name="category" required>
            <div class="button-group">
                <button type="submit" class="add" name="submit">submit</button>
                <button type="button" class="update" onclick="redirectToUpdate()">Display Product</button>
            </div>
        </form>
    </div>

    <script>
        function redirectToUpdate() {
            window.location.href = 'display.php';
        }
    </script>
</body>
</html>
