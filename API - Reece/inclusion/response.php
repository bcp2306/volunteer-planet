<?php

abstract class Response 
{
    protected $data;

    public function __construct() {
        $this->headers();
    }

    protected function headers() {

    }

    public function setData($data) {
        $this->data = $data;
    }    

    public function getData() {
        return $this->data;
    }
}

?>