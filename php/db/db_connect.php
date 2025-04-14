<?php
$conn = mysqli_connect("localhost","grp1","Oongieg1","db_grp1");
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

mysqli_set_charset($conn,"utf8");
?>