<?php


$servername   = "localhost";
$username = "root";
$password = "";
$dbName = "ssip_final";

$conn = mysqli_connect($servername, $username, $password, $dbName); //ACHTUNG! INSECURE!!
//conn = new mysqli("localhost", "root", "")
//you may need to make your database first on replit
if ($conn->connect_error) { //can be replaced with if (!$conn){
    echo "Connection Failed: " . $conn->connect_error; //I usually use "die", but echo is always a good choice
} else {
    // mysqli_connect($conn, "yourDB"); //Assume the yuorDB database is already there!
}


function query($query)
{
    global $conn;
    $result = mysqli_query($conn, $query);
    $rows = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $rows[] = $row;
    }
    return $rows;
}
$query = "SELECT * FROM TABLE1";
$result = query($query);
$json = json_encode($result);

// echo $json;
//this line until the conn->close is for week 10
//You first need to recall the connection, then implement this variable
//this is to display everything
//this is to execute the query.

// var_dump($result);


$result2 = mysqli_query($conn, $query);

//keep in mind: this would require you to connect your database beforehand
//You may want to also learn how to show the result here!
//the gameplan would be modifying the $conn variable with:
//  $conn = new mysqli ($servername,$user,$pass,$dbName); //btw, this line must be BEFORE line 15 and you need to define all four variables
//of course, you can use any SQL query you've learnt beforehand

//Oh, btw, your entire class after reading this sauce code and slides would be entire day of free-practice.
//You may want to flex after 16.30 today (raid me in my cubicle)

if (isset($_GET['op'])) {
    $op = $_GET['op'];
} else {
    $op = "";
}
if (isset($_POST['save'])) { //create
    $name        = $_POST['name'];
    $username    = $_POST['username'];
    $email    = $_POST['email'];
    $address   = $_POST['address'];

    if ($name && $username && $email && $address) {
        if ($op == 'edit') { //update
            $id = $_GET['id'];
            $sql1       = "update table1 set name = '$name',username='$username',email = '$email',address='$address' where id = '$id'";
            $q1         = mysqli_query($conn, $sql1);
            if ($q1) {
                $success = "Successfully update data";
            } else {
                $error  = "Failed to update data";
            }
        } else { //insert
            $sql1   = "insert into table1(name,username,email,address) values ('$name','$username','$email','$address')";
            $q1     = mysqli_query($conn, $sql1);
            if ($q1) {
                $success     = "Successfully input data";
            } else {
                $error      = "Failed input data";
            }
        }
    } else {
        $error = "Please input all data!";
    }
    header("Refresh:0");
}

if ($op == 'edit') {
    $id         = $_GET['id'];
    $sql1       = "select * from table1 where id = '$id'";
    $q1         = mysqli_query($conn, $sql1);
    $r1         = mysqli_fetch_array($q1);
    $name        = $r1['name'];
    $username       = $r1['username'];
    $email     = $r1['email'];
    $address   = $r1['address'];
}

if ($op == 'delete') {
    $id         = $_GET['id'];
    $sql1       = "delete from table1 where id = '$id'";
    $q1         = mysqli_query($conn, $sql1);
    if ($q1) {
        $success = "Successfully deleted data";
        header("Refresh:0");
    } else {
        $error  = "Failed delete data";
    }
}


//always a good habit to close connection at the end of operation