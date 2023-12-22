<?php

namespace App\Services;

use App\Utilities\LanguageCodes;

class LanguageCodeService
{
    public function isValidLanguageCode(string $languageCode): bool
    {
        return LanguageCodes::languageCodeIsValid($languageCode);
    }

    public function isValidCountryCode(string $countryCode): bool
    {
        return LanguageCodes::countryCodeIsValid($countryCode);
    }

    public function getLanguageName(string $languageCode): ?string
    {
        return LanguageCodes::getName($languageCode);
    }

    public function getLanguageCodeCountryCode(string $languageCode, string $countryCode): string
    {
        return LanguageCodes::getLanguageCodeCountryCode($languageCode, $countryCode);
    }
}
