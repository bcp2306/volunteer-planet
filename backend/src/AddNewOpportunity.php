<?php

require_once 'backend/utilities/dependencies.php';

class AddNewOpportunity
{
    private $dbConn;

    public function __construct()
    {
        $this->dbConn = new Database(DATABASE_PATH);
        try {
            $this->processRequest();
        } catch (Exception $e) {
            error_log($e->getMessage());
            Response::send(['error' => 'An unexpected error occurred'], 500);
        }
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

        if (!$this->validateOpportunityData($data)) {
            Response::send(['error' => 'Invalid input data'], 400);
            return;
        }

        $sql = "INSERT INTO job (title, description, category, longitude, latitude) VALUES (:title, :description, :category, :longitude, :latitude)";
        $stmt = $this->dbConn->getPDO()->prepare($sql);

        foreach (['title', 'description', 'category', 'longitude', 'latitude'] as $param) {
            $stmt->bindParam(":$param", $data[$param], PDO::PARAM_STR);
        }

        if ($stmt->execute()) {
            Response::send(['message' => 'Volunteer opportunity added successfully'], 201);
        } else {
            Response::send(['error' => 'Failed to add the volunteering opportunity'], 500);
        }
    }

    private function validateOpportunityData($data)
    {
        $requiredFields = ['title', 'description', 'category', 'longitude', 'latitude'];
        foreach ($requiredFields as $field) {
            if (empty($data[$field])) {
                return false;
            }
        }
        return true;
    }
}

new AddNewOpportunity();
