<?php
/**
 * CORS
 * Handling of the CORS setup & preflight requests
 * 
 *  
 *
 * @author Kevin Osminski
 */

require_once 'backend/config/config.php';

header('Access-Control-Allow-Origin: ' . CORS_DOMAIN);
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Content-Length: 0');
    header('Content-Type: text/plain');
    exit;
}
