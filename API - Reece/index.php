<?php
	include('autoloader.php');
	spl_autoload_register("autoloader");
	define('BASEPATH', '/API/');
	define('PASS_HASH', 'reece');
	error_reporting(E_ALL ^ E_WARNING);
	
	$request = new Request();
	
	$response = (substr($request->getPath(), 0, 3) == "api") ? new JSONResponse() : new HTMLResponse();
	
	switch($request->getPath()){
		case 'api/login':
			$controller = new LoginController($request, $response);
			break;
		case 'api/register':
			$controller = new RegisterController($request, $response);
			break;
		default:
			echo 'Error';
			echo BASEPATH;
			break;
		
	}
	
	echo $response->getData();
?>