<?php
header('Access-Control-Allow-Origin: http://localhost:5176'); // Allow requests from React frontend
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');  // Specify allowed HTTP methods
header('Access-Control-Allow-Headers: Content-Type');        // Allow specific headers
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

include('db_connection.php'); // Ensure this file exists and connects to your database

$query = "SELECT * FROM products"; // Fetch all products from the table
$result = $con->query($query);

if ($result && $result->num_rows > 0) {
  $products = []; // Array to hold all products
  while ($row = $result->fetch_assoc()) {
    $products[] = $row; // Add each product to the array
  }
  echo json_encode($products); // Output the products as JSON
} else {
  echo json_encode([]); // Return an empty array if no products found
}

mysqli_close($con);
