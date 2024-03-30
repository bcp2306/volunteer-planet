<?php

// CORS headers
header('Access-Control-Allow-Origin: http://localhost:5173'); // Allow your React app's origin
header('Access-Control-Allow-Methods: GET, POST, OPTIONS'); // Allowed request methods
header('Access-Control-Allow-Headers: Content-Type, Authorization'); // Allowed request headers

// Handle preflight requests for CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Exit early so the OPTIONS request is just a handshake
    exit();
}

 /**
 * MAIN 
 *
 * This class retreives data from endpoints and outputs 
 * data in JSON format
 *
 * @author Bradley Pearson
 */

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include "config/exceptionHandler.php";
set_exception_handler("exceptionHandler");

include 'config/autoloader.php';
spl_autoload_register('autoloader');

$response = new Response();

try 
{
    switch (Request::endpointName())
    {
        case '/':
        case '/jobs' :
        case '/jobs/' :
            $endpoint = new Jobs();
            break;
            // handling of the POST request for adding new volunteer opportunities
        case '/addOpportunity':
        case '/addOpportunity/':
            include 'AddNewOpportunity.php';
            return;
        default:
            throw new ClientError(404);
    }
} catch(ClientError $e) 
{
    $data['message'] = $e->getMessage();
    $endpoint = new Endpoint($data);
}


$data = $endpoint->getData();

$response->outputJSON($data);

