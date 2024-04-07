<?php
/**
 * Simple autoloader function. You do not have to convert this to a class.
 */
function autoloader($className) {
    $filename = "inclusion\\" . strtolower($className) . ".php";
    $filename = str_replace('\\', DIRECTORY_SEPARATOR, $filename);
    if (is_readable($filename)) {
        include_once $filename;
    } else {
        exit("File not found: " . $className . " (" . $filename . ")");
    }
}

?>