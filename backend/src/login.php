<?php 

	// gets the connection file
	include "Database.php"; //Add the connection file**

	public function __construct(){
        $this->setDatabase("../db/users.sqlite");
    }
	
	// checks if the page request method was via the form post
	if($_SERVER['REQUEST_METHOD'] == "POST"){
		// gets the username and password being submitted from the form
		$username = $_POST['username'];
		$password = $_POST['password'];
		
		// queries the database using the username to find a match
		$sql = "SELECT * FROM account WHERE username=:username"; 
		$result = $this->getDatabase()->executeSQL($sql);
		
		// checks all the results to see if the password_verify can find a match using the password input and the password hash from the db
		foreach($result as $row){
			if(password_verify($password, $row['password'])){
				// starts session if there is a match and saves the logged in users data in the session cache 
				session_start();
				$_SESSION['userID'] = $row['id'];
				$_SESSION['username'] = $row['username'];
				
				// redirects you to admin page.
				header("Location: Home.jsx");
				exit();
			}
		}
	}
?>
