<?php

namespace App\Exceptions;

use Exception;

class CourseNotFoundException extends Exception
{

    public function __construct($message = "Course not found.", $code = 404, $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }

    public function render($request)
    {
        return response()->json([
            'message' => $this->getMessage(),
        ], $this->getCode());
    }
}
