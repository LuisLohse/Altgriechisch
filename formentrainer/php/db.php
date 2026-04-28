<?php 

$servername = "database-5000849204.ud-webspace.de";
$username = "dbu972911";
$password = ""; // REDACTED

try {
  $conn = new PDO("mysql:host=$servername;dbname=dbs748420", $username, $password);
  // set the PDO error mode to exception
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
}

?>
