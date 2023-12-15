<?php

namespace App\Exceptions;

use Exception;

class InvalidAPIParameterException extends Exception
{
    public function __construct($message = "Invalid API parameter.", $code = 400, $previous = null)
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
