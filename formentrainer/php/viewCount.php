<?php

include "./php/db.php";

$sql = "UPDATE ViewCount SET Views = Views + 1";

$conn->query($sql);

$conn = null;
?>
