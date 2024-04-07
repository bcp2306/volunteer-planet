<?php

class LoginGateway extends Gateway {
	
	public function __construct(){
		$this->setDatabase("users.sqlite");
	}
	
	public function getPassword($username){
		
		$sql = "SELECT * FROM account WHERE username='".$username."'";
		
		$result = $this->getDatabase()->executeSQL($sql);
		$this->setResult($result);
	}
}

?>