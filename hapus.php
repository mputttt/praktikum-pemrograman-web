<?php
include 'config.php';
if($_SESSION['role']=='admin'){
    $stmt = $conn->prepare("DELETE FROM matakuliah WHERE id=?");
    $stmt->bind_param("i", $_GET['id']);
    $stmt->execute();
    $stmt->close();
}
header("Location: dashboard.php");
?>
