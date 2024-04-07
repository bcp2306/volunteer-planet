<?php 

class JSONResponse extends Response
{
    protected function headers() {
        header("Access-Control-Allow-Origin: *");
        header("Content-Type: application/json; charset=UTF-8");
    }

    public function getData() {
        return json_encode($this->data);
    }
}

?>