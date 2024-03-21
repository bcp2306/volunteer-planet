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
                $this->checkAllowedParams();
                $sql = "SELECT * FROM job";
                $dbConn = new Database("db/jobs.sqlite");
                $data = $dbConn->executeSQL($sql);
                break;
            default:
                throw new ClientError(405);
        }
        
        parent::__construct($data);
    }
}