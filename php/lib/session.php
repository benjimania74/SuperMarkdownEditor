<?php

function loginSource($login) {
    $res = false;
    for($i=0;$i<strlen($login);$i++){
        if($login[$i]=="@"){
            $res = true;
        }
    }
    return $res;
}

function connect($conn,$login,$pswd){
    $hashPsw = hash("sha256",$pswd);
    if(loginSource($login)==true){
        $query = "SELECT `id` FROM `user` WHERE `mail`='$login' AND `pswd`='$pswd'";
    }
    else {
        $query = "SELECT `id` FROM `user` WHERE `pseudo`='$login' AND `pswd`='$pswd'";
    }
    $ret = mysqli_query($conn,$query);
}

function disconnect(){

}

?>