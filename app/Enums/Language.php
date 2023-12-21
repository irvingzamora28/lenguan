<?php

namespace App\Enums;

enum Language: string
{
    case EN = 'English';
    case DE = 'German';
    case FR = 'French';
    case ES = 'Spanish';
    case IT = 'Italian';
    case PT = 'Portuguese';
    case RU = 'Russian';

    public function name(): string
    {
        return $this->value;
    }
}
