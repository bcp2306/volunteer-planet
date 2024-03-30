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

require_once 'Database.php';
require_once 'ClientError.php';
require_once 'Request.php';
require_once 'Response.php';

class AddNewOpportunity
{
    private $dbConn;

    public function __construct()
    {
        $this->dbConn = new Database("../db/jobs.sqlite");
        $this->processRequest();
    }

    private function processRequest()
    {
        if (Request::method() === 'POST') {
            $this->addOpportunity();
        } else {

            throw new ClientError(405, 'Method Not Allowed');
        }
    }

    private function addOpportunity()
    {
        $data = json_decode(file_get_contents('php://input'), true); 

        $sql = "INSERT INTO job (title, description, category, longitude, latitude) VALUES (:title, :description, :category, :longitude, :latitude)";
        
        $stmt = $this->dbConn->getPDO()->prepare($sql);

        $stmt->bindParam(':title', $data['title'], PDO::PARAM_STR);
        $stmt->bindParam(':description', $data['description'], PDO::PARAM_STR);
        $stmt->bindParam(':category', $data['category'], PDO::PARAM_STR);
        $stmt->bindParam(':longitude', $data['longitude'], PDO::PARAM_STR);
        $stmt->bindParam(':latitude', $data['latitude'], PDO::PARAM_STR);

        if ($stmt->execute()) {

            Response::send(['message' => 'Volunteer opportunity added successfully']);
        } else {
            Response::send(['error' => 'Failed to add the volunteering opportunity'], 500);
        }
    }
}

new AddNewOpportunity();