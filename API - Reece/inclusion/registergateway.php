<?php

class RegisterGateway extends Gateway {
	
	public function __construct(){
		$this->setDatabase("users.sqlite");
	}
	
	public function verifyFields($username, $email, $password){
		//validation if you want
		$data['Response'] = "VALID";
		$this->setResult($data);
	}
	
	public function registerUser($username, $email, $password){
		$sql = "SELECT * FROM account WHERE username='".$username."'";
		$result = $this->getDatabase()->executeSQL($sql);
		
		
		if(sizeof($result) != 0){
			$data['Response'] = "DUPE";
			$this->setResult($data);
		}else{
			$sql = "INSERT INTO account(username, email, password, admin) VALUES ('".$username."', '".$email."', '".$password."', '0')";
			$this->getDatabase()->executeSQL($sql);
			
			$data['Response'] = "OK";
			$this->setResult($data);
		}
	}
}

?>