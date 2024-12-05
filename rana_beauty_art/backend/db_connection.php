<?php

try {
  $con = mysqli_connect("localhost", "root", "", "rana_hassan");

  if ($con->connect_error) {
    throw new Exception("Connection failed: " . $con->connect_error);
  }
} catch (Exception $e) {

  die("Connection failed: " . $e->getMessage());
}
