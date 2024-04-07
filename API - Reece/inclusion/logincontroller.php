<?php

	class LoginController extends Controller{
		protected function setGateway() {
			$this->gateway = new LoginGateway();
		}
		
		protected function processRequest() {
			$username = $this->getRequest()->getParameter("username");
			$password = $this->getRequest()->getParameter("password");
			$admin = null;
			
			
			if(!(is_null($username)) && !(is_null($password))){
				$this->getGateway()->getPassword($username);
				$hash = $this->getGateway()->getResult()[0]['password'];
				if(password_verify($password, $hash)){
					
					$data['valid'] = true;
					
					if($this->getGateway()->getResult()[0]['admin'] == 1){
						$admin = true;
					}else{
						$admin = false;
					}
					
					
					$data['admin'] = $admin;
					return $data;
				}else{
					$data['valid'] = false;
					return $data;
				
					//THROW EXCEPTION
				}
				
			}else{
				$data['Error'] = "Invalid args, please provide username and password";
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