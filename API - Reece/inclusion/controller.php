<?php

abstract class Controller{
	
	private $request;
	private $response;
	protected $gateway;
	
	public function __construct($request, $response){
		// Sets gateway from the child class
		$this->setGateway();
        $this->setRequest($request);
        $this->setResponse($response);

		// Gets the data from the child class and passes it to the respective class (HTML/JSON)
        $data = $this->processRequest();
        $this->getResponse()->setData($data);
	}
	
	private function setRequest($request) {
        $this->request = $request;
    }

    protected function getRequest() {
        return $this->request;
    }

    private function setResponse($response) {
        $this->response = $response;
    }

    private function getResponse() {
        return $this->response;
    }

	// Used to set the gateway in the child class
    protected function setGateway() {

    }

    protected function getGateway() {
        return $this->gateway;
    }
	
}

?>