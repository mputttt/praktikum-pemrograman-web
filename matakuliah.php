<?php
include 'config.php';
if($_SESSION['role']!='admin') header("Location: dashboard.php");
$edit=null;
if(isset($_GET['id'])){
    $stmt = $conn->prepare("SELECT * FROM matakuliah WHERE id=?");
    $stmt->bind_param("i", $_GET['id']);
    $stmt->execute();
    $edit = $stmt->get_result()->fetch_assoc();
    $stmt->close();
}
if(isset($_POST['simpan'])){
    if(empty($_POST['nama']) || empty($_POST['sks'])){
        $error = "Nama dan SKS harus diisi!";
    } elseif(!is_numeric($_POST['sks'])){
        $error = "SKS harus berupa angka!";
    } else {
        if($_POST['id']==""){
            $stmt = $conn->prepare("INSERT INTO matakuliah (nama, sks) VALUES (?, ?)");
            $stmt->bind_param("si", $_POST['nama'], $_POST['sks']);
            if($stmt->execute()){
                header("Location: dashboard.php");
                exit;
            } else {
                $error = "Gagal menambah mata kuliah!";
            }
            $stmt->close();
        } else {
            $stmt = $conn->prepare("UPDATE matakuliah SET nama=?, sks=? WHERE id=?");
            $stmt->bind_param("sii", $_POST['nama'], $_POST['sks'], $_POST['id']);
            if($stmt->execute()){
                header("Location: dashboard.php");
                exit;
            } else {
                $error = "Gagal mengupdate mata kuliah!";
            }
            $stmt->close();
        }
    }
}
?>
<!DOCTYPE html>
<html>
<head>
<title>Form Mata Kuliah</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<div class="container mt-4 col-md-6">
<div class="card shadow">
<div class="card-header bg-info text-white">Form Mata Kuliah</div>
<div class="card-body">
<?php if(isset($error)) echo "<div class='alert alert-danger'>$error</div>"; ?>
<form method="post">
<input type="hidden" name="id" value="<?= isset($edit['id']) ? $edit['id'] : '' ?>">
<input class="form-control mb-2" name="nama" value="<?= isset($edit['nama']) ? $edit['nama'] : '' ?>" placeholder="Nama">
<input class="form-control mb-2" name="sks" value="<?= isset($edit['sks']) ? $edit['sks'] : '' ?>" placeholder="SKS">
<button name="simpan" class="btn btn-success w-100">Simpan</button>
</form>
</div></div></div>
</body>
</html>