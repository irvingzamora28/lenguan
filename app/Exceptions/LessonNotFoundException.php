<?php

namespace App\Exceptions;

use Exception;

class LessonNotFoundException extends Exception
{
    public function __construct($message = "Lesson not found.", $code = 404, $previous = null)
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
