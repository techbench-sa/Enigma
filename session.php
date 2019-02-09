<?php
session_start([
    'cookie_lifetime' => 86400,
]);
if(!isset($_SESSION['pid'])){
    header("Location: login.php");
    exit();
}
?>