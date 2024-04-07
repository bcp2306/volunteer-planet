<?php

	class RegisterController extends Controller{
		protected function setGateway() {
			$this->gateway = new RegisterGateway();
		}
		
		protected function processRequest() {
			$username = $this->getRequest()->getParameter("username");
			$email = $this->getRequest()->getParameter("email");
			$password = $this->getRequest()->getParameter("password");
			$admin = 0;
			
			
			if(!(is_null($username)) && !(is_null($email)) && !(is_null($password))){
				$this->getGateway()->verifyFields($username, $email, $password);
				
				if($this->getGateway()->getResult()['Response'] == "VALID"){
					$hash = password_hash($password, PASSWORD_DEFAULT);
				
					$this->getGateway()->registerUser($username, $email, $hash);
					if($this->getGateway()->getResult()[0]['Response'] == "OK"){
						$data['Response'] = "OK";
						return $data;
					}else if($this->getGateway()->getResult()[0]['Response'] == "DUPE"){
						$data['Response'] = "DUPE";
						return $data;
					}
				}
				
			}else{
				$data['Error'] = "Invalid args, please provide username, email and password";
				return $data;
			}
			
			if(empty($this->getGateway()->getResult())){
				$data['Error'] = "No Data Found";
				return $data;
				
				//THROW EXCEPTION
			}else{
				return $this->getGateway()->getResult();
			}
		}
	}

?>