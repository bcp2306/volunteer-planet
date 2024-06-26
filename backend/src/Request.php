<?php

/**
 * Abstract class to get information about the http request.
 * 
 * The methods in this class are static so they can be called
 * without creating an instance of the class. This will be useful
 * for the endpoint classes.
 * 
 * @author Bradley Pearson
 */

abstract class Request 
{
    public static function method()
    {
        return $_SERVER['REQUEST_METHOD'];
    }
 
    /**
     * Endpoint
     * 
     * Return the name of the requested endpoint. 
     */
    public static function endpointName()
    {
        $url = $_SERVER["REQUEST_URI"];
        $path = parse_url($url)['path'];
        return str_replace("/team-project/backend", "", $path);
    }
 
    public static function params()
    {
        return $_REQUEST;
    }
    
}