<?php
function connect(mysqli $conn, string $login, string $password): array {
    $hashPsw = hash("sha256", $password);
    echo "a";
    $query = "SELECT `id` FROM `user` WHERE `pseudo`='$login' AND `pswd`='$hashPsw'";
    $ret = mysqli_query($conn, $query);
    echo "b";

    $id = null;
    $isCorrect = false;
    
    if($ret != false) {
        echo "c";
        while($r = mysqli_fetch_assoc($ret)) {
            $id = $r["id"];
            $isCorrect = true;
            break;
        }
    }

    $res = [
        "id" => $id,
        "correct" => $isCorrect
    ];
    print_r($res);
    return $res;
}
?>