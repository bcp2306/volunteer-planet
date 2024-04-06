<?php 

include "Database.php";

$db = new Database();
$connection = $db->connect();

if($_SERVER['REQUEST_METHOD'] == "POST"){
    $username = $_POST['username'];
    $password = $_POST['password'];

    $stmt = $connection->prepare("SELECT * FROM users WHERE username = :username");
    $stmt->bindParam(':username', $username, PDO::PARAM_STR);
    $stmt->execute();

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['password'])){
        $_SESSION['userID'] = $user['id'];
        $_SESSION['username'] = $user['username'];
        $_SESSION['isAdmin'] = $user['admin'];

        header("Location: Home.jsx");
        exit();
    } else {

        header("Location: Home.jsx");
        exit();
    }
}

?>
        
