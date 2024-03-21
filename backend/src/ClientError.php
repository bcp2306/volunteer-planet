<?php 
 
 /**
 * Client Error
 *
 * This class will return http response codes for certain errors.
 *
 * @author Bradley Pearson
 */

class ClientError extends Exception
{
    public function __construct($code)
    {
        parent::__construct($this->errorResponses($code));
    }
 
    public function errorResponses($code)
    {
        switch ($code) {
            case 404:
                http_response_code(404);
                $message = 'Endpoint Not Found';
                break;
            case 405:
                http_response_code(405);
                $message = 'Method Not Allowed';
                break;
            case 422:
                http_response_code(422);
                $message = 'Unprocessable Entity';
                break;
            case 401:
                http_response_code(401);
                $message = 'Unauthorized';
                break;
            default:
                throw new Exception('Internal Server Error');
        }
        return $message;
    }
}