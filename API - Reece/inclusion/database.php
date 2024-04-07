<?php

class Database{
	private $conn;
	
	public function __construct($databaseName){
		$this->setDatabase($databaseName);
	}
	
	private function setDatabase($databaseName){
		try{
			
			$this->conn = new PDO('sqlite:'.$databaseName);
			$this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			
		}catch (PDOException $e){
			
			exit();
		}
	}
	
	/**
     * Execute an SQL prepared statement
     *
     * This function executes the query and uses the PDO 'fetchAll' method with the
     * 'FETCH_ASSOC' flag set so that an associative array of results is returned.
     *
     * @param  string  $sql     An SQL statement
     * @param  array   $params  An associative array of parameters (default empty array) 
     * @return array            An associative array of the query results
     */
    public function executeSQL($sql, $params=[]) {
        $results = $this->conn->prepare($sql);
        $results->execute($params);

        return $results->fetchAll(PDO::FETCH_ASSOC);
    }
	
	public function executeSQLNoRe($sql) {
        $this->conn->exec($sql);
    }
}

?>