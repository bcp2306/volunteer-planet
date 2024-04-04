<?php

 /**
 * Response
 *
 * This class outputs headers and encodes data into JSON format.
 *
 * @author Bradley Pearson
 */

class Response
{
    public function __construct()
    {
        $this->outputHeaders();
    }

    private function outputHeaders()
    {
        header('Content-Type: application/json');
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');

        if(Request::method() === 'OPTIONS')
        {
            exit();
        }
    }

    public function outputJSON($data)
    {
        echo json_encode($data);
    }
}