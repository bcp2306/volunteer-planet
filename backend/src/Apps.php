<?php

class Applications extends Endpoint {
    public function __construct() {
        $data = null;

        switch (Request::method()) {
            case 'GET':
                $this->getAllApplications();
                break;
            case 'POST':
                $this->addApplication();
                break;
            default:
                throw new ClientError(405, 'Method Not Allowed');
        }

        parent::__construct($data);
    }

    private function getAllApplications() {
        // Assuming database connection and SQL execution are handled similarly to Jobs
        $sql = "SELECT * FROM applications";
        $data = $this->getDatabase()->executeSQL($sql);
        $this->setData($data);
    }

    private function addApplication() {
        $data = json_decode(file_get_contents('php://input'), true);

        if (!$this->validateApplicationData($data)) {
            throw new ClientError(422, 'Invalid input data');
        }

        // Adapt this SQL statement to match your applications table structure
        $sql = "INSERT INTO applications (fullName, dob, coverLetter, jobTitle, phone, appType) VALUES (?, ?, ?, ?, ?, ?)";
        $params = [
            $data['fullName'], $data['dob'], $data['coverLetter'], $data['jobTitle'], $data['phone'], $data['appType']
        ];

        // Assuming executeSQL handles parameter binding for prepared statements
        $result = $this->getDatabase()->executeSQL($sql, $params);

        if ($result) {
            $this->setData(['message' => 'Application added successfully']);
        } else {
            // If insertion fails, consider how you'll manage and report errors
            http_response_code(500);
            $this->setData(['error' => 'Failed to submit application']);
        }
    }

    private function validateApplicationData($data) {
        $requiredFields = ['fullName', 'dob', 'coverLetter', 'jobTitle', 'phone', 'appType'];

        foreach ($requiredFields as $field) {
            if (empty($data[$field])) {
                return false;
            }
        }
        return true;
    }
}

// The implementation assumes Request::method(), ClientError, and the parent::__construct($data)
// are defined and behave as expected within your framework or setup.

new Applications();
