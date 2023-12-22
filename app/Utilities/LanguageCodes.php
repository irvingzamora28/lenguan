<?php

namespace App\Utilities;

class LanguageCodes
{
    const COUNTRIES = [
        'BR' => 'Brazil',
        'CA' => 'Canada',
        'CN' => 'China',
        'FR' => 'France',
        'DE' => 'Germany',
        'IT' => 'Italy',
        'JP' => 'Japan',
        'MX' => 'Mexico',
        'RU' => 'Russia',
        'ES' => 'Spain',
        'GB' => 'United Kingdom',
        'US' => 'United States',
    ];

    const LANGUAGES = [
        'EN' => 'English',
        'DE' => 'German',
        'FR' => 'French',
        'ES' => 'Spanish',
        'IT' => 'Italian',
        'PT' => 'Portuguese',
        'RU' => 'Russian',
    ];

    const DEFAULTLANGUAGECOUNTRYCODE = 'EN-US';

    const DEFAULTLANGUAGECODE = 'EN';
    const DEFAULTCOUNTRYCODE = 'US';

    public static function getLanguageCodeFromCountry($language, $country)
    {
        $language = strtoupper($language);
        $country = strtoupper($country);
        $languageCode = array_search($language, self::LANGUAGES);
        $countryCode = array_search($country, self::COUNTRIES);

        if (!$languageCode || !$countryCode) {
            return self::DEFAULTLANGUAGECOUNTRYCODE;
        }
        return strtolower($languageCode) . '-' . $countryCode;
    }

    public static function getLanguageCodeCountryCode($languageCode, $countryCode)
    {
        $languageCode = strtoupper($languageCode);
        $countryCode = strtoupper($countryCode);
        if (!isset(self::LANGUAGES[$languageCode]) || !isset(self::COUNTRIES[$countryCode])) {
            return self::DEFAULTLANGUAGECOUNTRYCODE;
        }
        return strtolower($languageCode) . '-' . $countryCode;
    }

    public static function getLanguageName($code)
    {
        $code = strtoupper($code);
        return self::LANGUAGES[$code] ?? null;
    }

    public static function getCountryName($code)
    {
        $code = strtoupper($code);
        return self::COUNTRIES[$code] ?? null;
    }

    public static function countryCodeIsValid($code)
    {
        $code = strtoupper($code);
        return isset(self::COUNTRIES[$code]);
    }

    public static function languageCodeIsValid($code)
    {
        $code = strtoupper($code);
        return isset(self::LANGUAGES[$code]);
    }

    public static function getName($code)
    {
        $code = strtoupper($code); // Normalize to uppercase
        return self::LANGUAGES[$code] ?? null;
    }
}
