<?php
include 'config.php';
if(!isset($_SESSION['login'])) header("Location: index.php");
?>
<!DOCTYPE html>
<html>
<head>
<title>Dashboard</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<div class="container mt-4">
<div class="d-flex justify-content-between">
<h4>Daftar Mata Kuliah (<?= $_SESSION['role'] ?>)</h4>
<a href="logout.php" class="btn btn-danger">Logout</a>
</div>
<?php if($_SESSION['role']=='mahasiswa' && !empty($selected)){ ?>
<div class="alert alert-success mt-3">
<strong>Mata Kuliah yang Anda Ambil:</strong><br>
<?php
$ambil = $conn->query("SELECT m.nama FROM matakuliah m JOIN mahasiswa_matakuliah mm ON m.id=mm.matakuliah_id WHERE mm.mahasiswa_id='$_SESSION[id]'");
while($a = $ambil->fetch_assoc()){
    echo "- " . $a['nama'] . "<br>";
}
?>
</div>
<?php } ?>
<?php
if(isset($_POST['ambil']) && isset($_SESSION['id'])){
    $conn->query("DELETE FROM mahasiswa_matakuliah WHERE mahasiswa_id='$_SESSION[id]'");
    if(isset($_POST['matakuliah'])){
        foreach($_POST['matakuliah'] as $mk){
            $stmt = $conn->prepare("INSERT INTO mahasiswa_matakuliah (mahasiswa_id, matakuliah_id) VALUES (?, ?)");
            $stmt->bind_param("ii", $_SESSION['id'], $mk);
            $stmt->execute();
            $stmt->close();
        }
    }
    $success = "Mata kuliah berhasil diupdate!";
}
$selected = [];
if(isset($_SESSION['id'])){
    $result = $conn->query("SELECT matakuliah_id FROM mahasiswa_matakuliah WHERE mahasiswa_id='$_SESSION[id]'");
    if($result){
        while($row = $result->fetch_assoc()){
            $selected[] = $row['matakuliah_id'];
        }
    }
}
?>
<?php if($_SESSION['role']=='admin'){ ?>
<a href="matakuliah.php" class="btn btn-success my-3">+ Tambah Mata Kuliah</a>
<?php } elseif($_SESSION['role']=='mahasiswa'){ ?>
<form method="post">
<button name="ambil" class="btn btn-primary my-3">Simpan Mata Kuliah yang Diambil</button>
<?php } ?>
<table class="table table-bordered">
<tr class="table-dark"><th>No</th><th>Nama</th><th>SKS</th><?php if($_SESSION['role']=='admin') echo "<th>Aksi</th>"; elseif($_SESSION['role']=='mahasiswa') echo "<th>Ambil</th>"; ?></tr>
<?php $no=1; $data=$conn->query("SELECT * FROM matakuliah"); while($d=$data->fetch_assoc()){ ?>
<tr>
<td><?= $no++ ?></td>
<td><?= $d['nama'] ?></td>
<td><?= $d['sks'] ?></td>
<?php if($_SESSION['role']=='admin'){ ?>
<td>
<a href="matakuliah.php?id=<?= $d['id'] ?>" class="btn btn-warning btn-sm">Edit</a>
<a href="hapus.php?id=<?= $d['id'] ?>" class="btn btn-danger btn-sm" onclick="return confirm('Hapus?')">Hapus</a>
</td>
<?php } elseif($_SESSION['role']=='mahasiswa'){ ?>
<td><input type="checkbox" name="matakuliah[]" value="<?= $d['id'] ?>" <?= in_array($d['id'], $selected) ? 'checked' : '' ?>></td>
<?php } ?>
</tr>
<?php } ?>
</table>
<?php if($_SESSION['role']=='mahasiswa'){ ?>
</form>
<?php } ?>
</div>
</body>
</html>