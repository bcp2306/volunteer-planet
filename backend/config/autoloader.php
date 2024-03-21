<?php

/**
 * Autoloader
 *
 * Autoloader class to automatically include class files from 
 * 'src' folder
 * 
 *
 * @author Bradley Pearson
 */
function autoloader($className) {
    $filename = "src\\" . $className . ".php";
    $filename = str_replace('\\', DIRECTORY_SEPARATOR, $filename);
    if (is_readable($filename)) {
        include_once $filename;
    } else {
        exit("File not found: " . $className . " (" . $filename . ")");
    }
}