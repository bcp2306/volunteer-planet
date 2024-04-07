<?php

include "Database.php"; // Ensure this is the correct path to your Database connection setup

// If this is part of a class, make sure the constructor and other methods are correctly defined within the class context
public function __construct() {
    $this->setDatabase("../db/users.sqlite");
}

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $data = json_decode(file_get_contents('php://input'), true);

    
    $fullName = $data['fullName'];
    $dob = $data['dob'];
    $coverLetter = $data['coverLetter'];
    $jobTitle = $data['jobTitle'];
    $phone = $data['phone']; 

    // SQL statement specifies the 'Applications' table for inserting the data
    $sql = "INSERT INTO Applications (fullName, dob, coverLetter, jobTitle, phone) VALUES (:fullName, :dob, :coverLetter, :jobTitle, :phone)";
    $params = [
        ':fullName' => $fullName,
        ':dob' => $dob,
        ':coverLetter' => $coverLetter,
        ':jobTitle' => $jobTitle,
        ':phone' => $phone, // Adding phone to the parameters for SQL execution
    ];

    try {
        // Assuming executeSQL is a method in your Database class that handles prepared statements
        $result = $this->getDatabase()->executeSQL($sql, $params);
        if ($result) {
            echo json_encode(['message' => 'Application submitted successfully']);
        } else {
            // If insertion fails, respond with an error
            http_response_code(500);
            echo json_encode(['error' => 'Failed to submit application']);
        }
    } catch (Exception $e) {
        // Catch and report any exceptions thrown during the process
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
}
?>
