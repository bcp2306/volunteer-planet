<?php

/**
 * Jobs endpoint
 * 
 * Returns information for all jobs in jobs
 * database
 * 
 * @author Bradley Pearson
 */

 class Jobs extends Endpoint
 {
     public function __construct()
     {
         switch(Request::method())
         {
             case 'GET':
                 $this->getAllJobs();
                 break;
             case 'POST':
                 $this->addJob();
                 break;
             default:
                 throw new ClientError(405, 'Method Not Allowed');
         }
         
         parent::__construct($data);
     }
 
     private function getAllJobs()
     {
         $sql = "SELECT * FROM job";
         $dbConn = new Database("db/jobs.sqlite");
         $data = $dbConn->executeSQL($sql);
         $this->setData($data);
     }
 
     private function addJob()
     {
         $data = json_decode(file_get_contents('php://input'), true);
 
         if (!$this->validateJobData($data)) {
             throw new ClientError(422, 'Invalid input data');
         }
 
         $sql = "INSERT INTO job (title, description, category, longitude, latitude) VALUES (:title, :description, :category, :longitude, :latitude)";
         $dbConn = new Database("db/jobs.sqlite");
         $params = [
             ':title' => $data['title'],
             ':description' => $data['description'],
             ':category' => $data['category'],
             ':longitude' => $data['longitude'],
             ':latitude' => $data['latitude'],
         ];
         $dbConn->executeSQL($sql, $params);
 
         $this->setData(['message' => 'Job added successfully']);
     }
 
     private function validateJobData($data)
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