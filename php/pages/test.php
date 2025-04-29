<?php
    $pizza = selectFile($conn, 6);
    printf("<textarea >".$pizza["content"]."</textarea>");
?>

