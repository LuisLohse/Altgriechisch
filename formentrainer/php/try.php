<?php

include "./db.php";

$num = $_GET["lection"];

$sql = "SELECT * FROM Words WHERE `KairosLektion` <= $num ORDER BY Rand() LIMIT 1";
$result = $conn->query($sql)->fetchAll();
$json = json_encode($result);

echo $json;

$conn = null;
?>
