<?php

class Request {

    private $basepath = BASEPATH;
    private $path;
  
    public function __construct() {
        $this->path = parse_url($_SERVER["REQUEST_URI"])['path'];
        $this->path = strtolower(str_replace($this->basepath, "", $this->path));
        $this->path = trim($this->path,"/");

    }

    public function getPath() {
        return $this->path;
    }
	
	/** 
     * This method will get and sanitise the given parameter. This approach 
     * will return null if the parameter does not exist or false if the filter
     * is triggered (which may restrict what parameters are possible).
     *
     * @return value OR null OR false
     */
    public function getParameter($param) {
        // Note that if the filter is triggered this will return 'false'
        $param = filter_input(INPUT_GET, $param, FILTER_SANITIZE_SPECIAL_CHARS);
      
        return $param;
    }
	
	
}

?>