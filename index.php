<?php
include 'config.php';
if(isset($_POST['login'])){
    $u=$_POST['username'];
    $p=md5($_POST['password']);
    $q=$conn->query("SELECT * FROM users WHERE username='$u' AND password='$p'");
    if($q->num_rows>0){
        $d=$q->fetch_assoc();
        $_SESSION['login']=true;
        $_SESSION['role']=$d['role'];
        header("Location: dashboard.php");
    } else { $error="Login gagal"; }
}
?>
<!DOCTYPE html>
<html>
<head>
<title>Login</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
<div class="container mt-5 col-md-4">
<div class="card shadow">
<div class="card-header bg-primary text-white text-center">LOGIN</div>
<div class="card-body">
<?php if(isset($error)) echo "<div class='alert alert-danger'>$error</div>"; ?>
<form method="post">
<input class="form-control mb-2" name="username" placeholder="Username">
<input class="form-control mb-2" type="password" name="password" placeholder="Password">
<button name="login" class="btn btn-primary w-100">Login</button>
</form>
</div></div></div>
</body></html>