<?php

namespace App\Utilities;

class LanguageCodes
{
    const LANGUAGES = [
        'EN' => 'English',
        'DE' => 'German',
        'FR' => 'French',
        'ES' => 'Spanish',
        'IT' => 'Italian',
        'PT' => 'Portuguese',
        'RU' => 'Russian',
    ];

    public static function getName($code)
    {
        $code = strtoupper($code); // Normalize to uppercase
        return self::LANGUAGES[$code] ?? null;
    }
}
