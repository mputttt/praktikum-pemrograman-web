<?php
$conn = new mysqli("localhost","root","","kampus");
if ($conn->connect_error) {
    die("Koneksi gagal");
}
session_start();
?>