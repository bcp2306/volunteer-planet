<?php
 
 /**
 * Exception handler
 *
 * Whenever an error is thrown it is handled by this class
 * 
 * @author Bradley Pearson
 */
function exceptionHandler($e) {
   http_response_code(500);
   $output['message'] = "Internal Server Error";
   $output['details']['exception'] = $e->getMessage();
   $output['details']['file'] = $e->getFile();
   $output['details']['line'] = $e->getLine();
   echo json_encode($output);
   exit();
}