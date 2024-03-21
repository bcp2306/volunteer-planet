<?php

 /**
 * Endpoint
 *
 * Parent class for all endpoints. Constructs data and checks for 
 * allowed parameters.
 *
 * @author Bradley Pearson
 */

class Endpoint
{
        private $data;
        protected $allowedParams = [];
       
        public function __construct($data = ["message" => []])
        {
            $this->setData($data);
        }

        protected function setData($data)
        {
            $this->data = $data;
        }

        public function getData()
        {
            return $this->data;
        }

        protected function checkAllowedParams()
    {
        // Iterate through each item in the $_REQUEST array (which is an
        // associative array so each item has a key and a value. The key
        // represents a parameter name so should match an allowed parameter�
        foreach (REQUEST::params() as $key => $value) 
        {
            // The in_array method looks for an item in an array and
            // returns true or false. We use it here to check if the 
            // key (representing a parameter used by the client) is allowed.
            if (!in_array($key, $this->allowedParams))
            {
                throw new ClientError(422);
            }
        }
    }
}