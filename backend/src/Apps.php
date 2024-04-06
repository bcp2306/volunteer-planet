<?php


 class  Apps extends Endpoint
 {
     public function __construct()
     {
         switch(Request::method())
         {
             case 'GET':
                 $this->getAllApps();
                 break;
             case 'POST':
                 $this->addApp();
                 break;
             default:
                 throw new ClientError(405, 'Method Not Allowed');
         }
         
         parent::__construct($data);
     }
 
     private function getAllApps()
     {
         $sql = "SELECT * FROM Applications";
         $dbConn = new Database("db/jobs.sqlite");
         $data = $dbConn->executeSQL($sql);
         $this->setData($data);
     }
 
     private function addApp()
     {
         $data = json_decode(file_get_contents('php://input'), true);
 
         if (!$this->validateData($data)) {
             throw new ClientError(422, 'Invalid input data');
         }
 
         $sql = "INSERT INTO Applications (Name, DOB, Phone, AppType) VALUES (:Name, :DOB, :Phone, :AppType)";
         $dbConn = new Database("db/jobs.sqlite");
         $params = [
             ':Name' => $data['Name'],
             ':DOB' => $data['DOB'],
             ':Phone' => $data['Phone'],
             ':AppType' => $data['AppType'],
             
         ];
         $dbConn->executeSQL($sql, $params);
 
         $this->setData(['message' => 'Application added successfully']);
     }
 
     private function validateData($data)
     {
         $requiredFields = ['Name', 'DOB', 'Phone', 'AppType'];
         foreach ($requiredFields as $field) {
             if (empty($data[$field])) {
                 return false;
             }
         }
         return true;
     }
 } 
