<?php

$statusP  = $_POST["blood"];
$comment  = $_POST["comment"];
$time01   = $_POST["time01"];
$time02   = $_POST["time02"];
$id       = $_POST["id"];

include "funcs.php";
$pdo =db_con();

$sql = "UPDATE ikisaki_s SET statusP=:statusP,comment=:comment,time01=:time01,time02=:time02 WHERE id=:id";
$stmt = $pdo->prepare($sql);
$stmt->bindValue(':statusP',$statusP,PDO::PARAM_STR);
$stmt->bindValue(':comment',$comment,PDO::PARAM_STR);
$stmt->bindValue(':time01',$time01,PDO::PARAM_STR);
$stmt->bindValue(':time02',$time02,PDO::PARAM_STR);
$stmt->bindValue(':id',$id,PDO::PARAM_INT);
$status = $stmt->execute();

if ($status == false) {
    sqlError($stmt);
} else {
    redirect("index.php");
}

?>