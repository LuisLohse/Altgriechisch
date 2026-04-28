<?php

include "./db.php";

$num = $_GET["lection"];

if ($_GET["narrow"] == "nomen") {
  $sql = "SELECT * FROM Words WHERE `KairosLektion` <= $num AND `Type` = 'Nomen' ORDER BY Rand() LIMIT 1";
} else if ($_GET["narrow"] == "verb") {
  $sql = "SELECT * FROM Words WHERE `KairosLektion` <= $num AND `Type` = 'Verb' ORDER BY Rand() LIMIT 1";
} else {
  $sql = "SELECT * FROM Words WHERE `KairosLektion` <= $num ORDER BY Rand() LIMIT 1";
}


$result = $conn->query($sql)->fetchAll();
$json = json_encode($result);

echo $json;

$conn = null;
?>
