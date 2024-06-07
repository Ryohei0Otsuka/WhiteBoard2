<?php

function h($a) {
    return htmlspecialchars($a, ENT_QUOTES);
}

function db_con() {
    try {
        $pdo = new PDO('mysql:dbname=andb;charset=utf8;host=localhost','root','');
        return $pdo;
    } catch (PDOException $e) {
        exit('DB-Conection-Error:'.$e->getMessage());
    }
}

function redirect($page) {
    header("Location: ".$page);
    exit;
}

function sqlError($stmt) {
    $error = $stmt->errorInfo();
    exit("SQLError:".$error[2]);
}

?>