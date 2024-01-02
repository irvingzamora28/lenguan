<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Lesson;
use App\Models\Level;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Goal;
use App\Models\Language;

class LessonSeeder extends Seeder
{
    public function run()
    {
        $goalsData = [
            'Business Communication',
            'Travel',
            'Academic Study',
            'Cultural Exploration',
            'Fundamentals',
            'Vocabulary',
            'Grammar',
            'Other'
        ];

        $goals = Goal::whereIn('name', $goalsData)->get()->keyBy('name');

        $lessonsData = [
            [
                'level' => 'German Level 1',
                'lessons' => [
                    [
                        'name' => 'Alphabet and Pronunciation',
                        'lesson_number' => 1,
                        'is_active' => true,
                        'description' => 'Learn the German alphabet and practice pronunciation.',
                        'goals' => ['Travel', 'Cultural Exploration'],
                    ],
                    [
                        'name' => 'Greetings and Introductions',
                        'lesson_number' => 2,
                        'is_active' => true,
                        'description' => 'Learn common greetings and how to introduce yourself.',
                        'goals' => ['Business Communication', 'Travel', 'Cultural Exploration'],
                    ],
                    [
                        'name' => 'Numbers and Counting',
                        'lesson_number' => 3,
                        'is_active' => true,
                        'description' => 'Learn to count and use numbers in everyday situations.',
                        'goals' => ['Travel', 'Other'],
                    ],
                    [
                        'name' => 'Basic Grammar - Nouns, Articles, and Pronouns in the Nominative Case',
                        'lesson_number' => 4,
                        'is_active' => true,
                        'description' => 'Understand the basics of German nouns, articles, and pronouns in the nominative case.',
                        'goals' => ['Academic Study', 'Other'],
                    ],
                    [
                        'name' => 'Basic Grammar - Verbs and Sentence Structure in the Present Tense',
                        'lesson_number' => 5,
                        'is_active' => true,
                        'description' => 'Learn basic verb conjugation and sentence structure in the present tense.',
                        'goals' => ['Academic Study', 'Other'],
                    ],
                    [
                        'name' => 'Family and Relationships',
                        'lesson_number' => 6,
                        'is_active' => true,
                        'description' => 'Learn vocabulary related to family members and relationships.',
                        'goals' => ['Cultural Exploration'],
                    ],
                    [
                        'name' => 'Food and Drink',
                        'lesson_number' => 7,
                        'is_active' => true,
                        'description' => 'Explore German cuisine and learn vocabulary related to food and drinks.',
                        'goals' => ['Travel', 'Cultural Exploration'],
                    ],
                    [
                        'name' => 'Directions and Travel',
                        'lesson_number' => 8,
                        'is_active' => true,
                        'description' => 'Learn to give and understand directions, and explore common travel phrases.',
                        'goals' => ['Travel'],
                    ],
                    [
                        'name' => 'Clothing and Appearance',
                        'lesson_number' => 9,
                        'is_active' => true,
                        'description' => 'Learn vocabulary related to clothing and describing appearance.',
                        'goals' => ['Cultural Exploration'],
                    ],
                    [
                        'name' => 'Holidays and Celebrations',
                        'lesson_number' => 10,
                        'is_active' => true,
                        'description' => 'Discover German holidays and celebrations, and learn related vocabulary.',
                        'goals' => ['Cultural Exploration'],
                    ],
                ],
            ],
            [
                'level' => 'German Level 2',
                'lessons' => [
                    [
                        'name' => 'Understanding German Cases',
                        'lesson_number' => 11,
                        'description' => 'Introduction to the four cases in German grammar, their uses, and examples.',
                        'goals' => ['Foundational Knowledge'],
                    ],
                    [
                        'name' => 'Building Sentences with Adjectives and Adverbs in Nominative and Accusative',
                        'lesson_number' => 12,
                        'description' => 'Learn to use adjectives and adverbs in the nominative and accusative cases with a solid understanding of when and how these cases are applied.',
                        'goals' => ['Academic Study'],
                    ],
                    [
                        'name' => 'Navigating Prepositions and Conjunctions in Accusative',
                        'lesson_number' => 13,
                        'description' => 'Understand the use of prepositions and conjunctions in the accusative case, building complex sentences.',
                        'goals' => ['Academic Study'],
                    ],
                    [
                        'name' => 'Mastery of the Dative Case',
                        'lesson_number' => 14,
                        'description' => 'Explore the nuances and uses of the dative case in German grammar.',
                        'goals' => ['Academic Study'],
                    ],
                    [
                        'name' => 'Mastery of the Genitive Case',
                        'lesson_number' => 15,
                        'description' => 'Delve into the genitive case, learning its uses and importance in showing possession and more.',
                        'goals' => ['Academic Study'],
                    ],
                    [
                        'name' => 'Vocabulary and Phrases for Home Life',
                        'lesson_number' => 16,
                        'description' => 'Learn vocabulary related to housing and everyday home life.',
                        'goals' => ['Cultural Exploration'],
                    ],
                    [
                        'name' => 'Navigating Shopping in German',
                        'lesson_number' => 17,
                        'description' => 'Explore shopping-related vocabulary and phrases to use in stores and markets.',
                        'goals' => ['Travel', 'Cultural Exploration'],
                    ],
                    [
                        'name' => 'Health Vocabulary and Conversations',
                        'lesson_number' => 18,
                        'description' => 'Learn vocabulary related to health, wellness, and visiting the doctor.',
                        'goals' => ['Other'],
                    ],
                    [
                        'name' => 'Academic Vocabulary and Contexts',
                        'lesson_number' => 19,
                        'description' => 'Discuss education and learning, and explore related vocabulary.',
                        'goals' => ['Academic Study'],
                    ],
                    [
                        'name' => 'German Media and Entertainment Landscape',
                        'lesson_number' => 20,
                        'description' => 'Learn vocabulary related to media, movies, music, and other forms of entertainment.',
                        'goals' => ['Cultural Exploration'],
                    ],
                    [
                        'name' => 'Business and Professional German',
                        'lesson_number' => 21,
                        'description' => 'Learn vocabulary and phrases for professional settings and business communication.',
                        'goals' => ['Business Communication'],
                    ],
                    [
                        'name' => 'History and Culture',
                        'lesson_number' => 22,
                        'description' => 'Explore German history and culture, and learn related vocabulary.',
                        'goals' => ['Cultural Exploration'],
                    ],
                    [
                        'name' => 'Environment and Sustainability',
                        'lesson_number' => 23,
                        'description' => 'Discuss environmental issues and sustainability, and learn related vocabulary.',
                        'goals' => ['Other'],
                    ],
                    [
                        'name' => 'Advanced Grammar - Complex Sentences and Subjunctive',
                        'lesson_number' => 24,
                        'description' => 'Learn how to construct complex sentences and understand the use of the subjunctive mood in German.',
                        'goals' => ['Academic Study'],
                    ],
                    [
                        'name' => 'Cultural Idioms and Expressions',
                        'lesson_number' => 25,
                        'description' => 'Dive into idiomatic expressions and phrases that are unique to German-speaking cultures.',
                        'goals' => ['Cultural Exploration'],
                    ],
                ],
            ],
            [
                'level' => 'German Level 3',
                'lessons' => [
                    [
                        'name' => 'Advanced Grammar - Tenses and Verb Conjugation in the Nominative, Accusative, and Dative Cases',
                        'lesson_number' => 26,
                        'description' => 'Master tenses and verb conjugation in the nominative, accusative, and dative cases.',
                        'goals' => ['Academic Study'],
                    ],
                    [
                        'name' => 'Advanced Grammar - Subjunctive Mood and Modal Verbs',
                        'lesson_number' => 27,
                        'description' => 'Learn the subjunctive mood, modal verbs, and their usage in advanced grammar.',
                        'goals' => ['Academic Study'],
                    ],
                    [
                        'name' => 'Politics and Current Affairs',
                        'lesson_number' => 28,
                        'description' => 'Discuss politics and current affairs in German, and learn related vocabulary.',
                        'goals' => ['Cultural Exploration', 'Other'],
                    ],
                    [
                        'name' => 'Science and Technology',
                        'lesson_number' => 29,
                        'description' => 'Explore scientific and technological topics, and learn related vocabulary.',
                        'goals' => ['Academic Study', 'Other'],
                    ],
                    [
                        'name' => 'Literature and the Arts',
                        'lesson_number' => 30,
                        'description' => 'Learn about German literature, art, and cultural works, and expand your vocabulary.',
                        'goals' => ['Cultural Exploration'],
                    ],
                    [
                        'name' => 'Advanced Vocabulary - Idioms and Colloquial Expressions',
                        'lesson_number' => 31,
                        'description' => 'Learn common idioms and colloquial expressions to enrich your German vocabulary.',
                        'goals' => ['Cultural Exploration', 'Other'],
                    ],
                    [
                        'name' => 'German for Academic Purposes',
                        'lesson_number' => 32,
                        'description' => 'Develop the language skills needed for academic studies and research in German.',
                        'goals' => ['Academic Study'],
                    ],
                    [
                        'name' => 'Advanced Communication Skills - Debate and Discussion',
                        'lesson_number' => 33,
                        'description' => 'Enhance your communication skills through debate and discussion on various topics.',
                        'goals' => ['Business Communication', 'Cultural Exploration'],
                    ],
                    [
                        'name' => 'Travel and Cultural Immersion',
                        'lesson_number' => 34,
                        'description' => 'Deepen your understanding of German culture and history through travel experiences.',
                        'goals' => ['Travel', 'Cultural Exploration'],
                    ],
                    [
                        'name' => 'Advanced Writing Skills - Composition and Analysis',
                        'lesson_number' => 35,
                        'description' => 'Improve your German writing skills through composition and analysis of texts.',
                        'goals' => ['Academic Study'],
                    ],
                ],
            ],
            [
                'level' => 'German Level 4',
                'lessons' => [
                    [
                        'name' => 'Complex Grammar - Passive Voice and Conditional Mood',
                        'lesson_number' => 31,
                        'description' => 'Master the passive voice and conditional mood in complex German grammar.',
                        'goals' => ['Academic Study'],
                    ],
                    [
                        'name' => 'Advanced Vocabulary - Word Formation and Synonyms',
                        'lesson_number' => 32,
                        'description' => 'Expand your vocabulary by learning word formation techniques and synonyms.',
                        'goals' => ['Cultural Exploration', 'Other'],
                    ],
                    [
                        'name' => 'Business and Professional German - Negotiation and Presentation',
                        'lesson_number' => 33,
                        'description' => 'Develop negotiation and presentation skills for business and professional settings.',
                        'goals' => ['Business Communication'],
                    ],
                    [
                        'name' => 'Culture and Society - Diversity and Integration',
                        'lesson_number' => 34,
                        'description' => 'Explore diversity and integration in German culture and society.',
                        'goals' => ['Cultural Exploration'],
                    ],
                    [
                        'name' => 'German for Academic Purposes - Research and Publication',
                        'lesson_number' => 35,
                        'description' => 'Learn the language skills needed for research and publication in academic German.',
                        'goals' => ['Academic Study'],
                    ],
                    [
                        'name' => 'Advanced Communication Skills - Social Interaction and Conflict Resolution',
                        'lesson_number' => 36,
                        'description' => 'Improve your social interaction and conflict resolution skills in German.',
                        'goals' => ['Business Communication', 'Cultural Exploration'],
                    ],
                    [
                        'name' => 'Travel and Cultural Immersion - Regional Diversity and Traditions',
                        'lesson_number' => 37,
                        'description' => 'Discover regional diversity and traditions in German-speaking countries through cultural immersion.',
                        'goals' => ['Travel', 'Cultural Exploration'],
                    ],
                    [
                        'name' => 'Advanced Writing Skills - Stylistic Devices and Advanced Structures',
                        'lesson_number' => 38,
                        'description' => 'Refine your writing skills by learning stylistic devices and advanced structures.',
                        'goals' => ['Academic Study'],
                    ],
                    [
                        'name' => 'Professional Certifications - Test Preparation and Practice',
                        'lesson_number' => 39,
                        'description' => 'Prepare for professional certifications with test preparation and practice exercises.',
                        'goals' => ['Business Communication', 'Academic Study'],
                    ],
                    [
                        'name' => 'Advanced Conversation and Debate - Cultural and Global Topics',
                        'lesson_number' => 40,
                        'description' => 'Engage in advanced conversation and debate on cultural and global topics in German.',
                        'goals' => ['Business Communication', 'Cultural Exploration'],
                    ],
                ],
            ],
        ];




        $germanCourse = Course::where('name', 'German for Beginners')->first();
        foreach ($lessonsData as $lessonData) {
            $level = Level::where('name', $lessonData['level'])->firstOrCreate(['name' => $lessonData['level']]);
            if ($level) {
                foreach ($lessonData['lessons'] as $data) {
                    $lesson = new Lesson([
                        'name' => $data['name'],
                        'lesson_number' => $data['lesson_number'],
                        'description' => $data['description'],
                        'is_active' => $data['is_active'] ?? false,
                        'course_id' => $germanCourse->id,
                        'content' => '',
                    ]);

                    $lesson->level()->associate($level);
                    $lesson->save();

                    foreach ($data['goals'] as $goalName) {
                        if (isset($goals[$goalName])) {
                            $lesson->goals()->attach(Goal::where('name', $goalName)->where('course_id', $germanCourse->id)->first()->id);
                        }
                    }
                }
                // Do the hasMany relationship for lesson and levels
                $level->course()->associate($germanCourse);
                $level->save();
                $germanCourse->levels()->attach($level);
            }
        }

        // Spanish course
        $spanishLessonsData = [
            [
                'level' => 'Spanish Level 1', // Beginner
                'lessons' => [
                    [
                        'name' => 'Alphabet and Pronunciation',
                        'lesson_number' => 1,
                        'is_active' => true,
                        'description' => 'Learn the Spanish alphabet and practice pronunciation.',
                        'goals' => ['Travel', 'Cultural Exploration', 'Fundamentals'],
                    ],
                    [
                        'name' => 'Specific Pronunciation Challenges',
                        'lesson_number' => 2,
                        'is_active' => true,
                        'description' => 'Tackle specific pronunciation challenges unique to Spanish, such as rolling Rs and the soft "c".',
                        'goals' => ['Academic Study', 'Fundamentals'],
                    ],
                    [
                        'name' => 'Basic Greetings and Introductions',
                        'lesson_number' => 3,
                        'is_active' => true,
                        'description' => 'Learn essential greetings and how to introduce yourself in Spanish.',
                        'goals' => ['Business Communication', 'Travel', 'Cultural Exploration'],
                    ],
                    [
                        'name' => 'Numbers and Basic Counting',
                        'lesson_number' => 4,
                        'is_active' => true,
                        'description' => 'Learn to count in Spanish and use numbers in everyday contexts.',
                        'goals' => ['Travel', 'Other', 'Vocabulary'],
                    ],
                    [
                        'name' => 'Basic Grammar - Nouns, Articles, and Pronouns',
                        'lesson_number' => 5,
                        'is_active' => true,
                        'description' => 'Understand the basics of Spanish nouns, articles, and pronouns.',
                        'goals' => ['Academic Study', 'Grammar'],
                    ],
                    [
                        'name' => 'Gender of Nouns',
                        'lesson_number' => 6,
                        'is_active' => true,
                        'description' => 'Understand the masculine and feminine gender in Spanish nouns and how it affects adjective agreement and overall sentence structure.',
                        'goals' => ['Academic Study', 'Grammar'],
                    ],
                    [
                        'name' => 'Basic Verbs and Present Tense',
                        'lesson_number' => 7,
                        'is_active' => true,
                        'description' => 'Learn basic verb conjugations and sentence structures in the present tense.',
                        'goals' => ['Academic Study', 'Grammar'],
                    ],
                    [
                        'name' => 'Family and Relationships Vocabulary',
                        'lesson_number' => 8,
                        'is_active' => true,
                        'description' => 'Learn vocabulary related to family members and relationships in Spanish.',
                        'goals' => ['Cultural Exploration', 'Vocabulary'],,
                    ],
                    [
                        'name' => 'Food and Drink in Spanish Culture',
                        'lesson_number' => 9,
                        'is_active' => true,
                        'description' => 'Explore Spanish cuisine and learn vocabulary related to food and drinks.',
                        'goals' => ['Travel', 'Cultural Exploration', 'Vocabulary'],,
                    ],
                    [
                        'name' => 'Asking for Directions',
                        'lesson_number' => 10,
                        'is_active' => true,
                        'description' => 'Learn to ask for and understand directions in Spanish.',
                        'goals' => ['Travel'],
                    ],
                    [
                        'name' => 'Describing Clothing and Appearance',
                        'lesson_number' => 11,
                        'is_active' => true,
                        'description' => 'Acquire vocabulary for clothing and describing appearance.',
                        'goals' => ['Cultural Exploration', 'Vocabulary'],
                    ],
                    [
                        'name' => 'Celebrations and Festivals',
                        'lesson_number' => 12,
                        'is_active' => true,
                        'description' => 'Learn about Spanish holidays and festivals, along with related vocabulary.',
                        'goals' => ['Cultural Exploration', ' Vocabulary'],
                    ],
                    [
                        'name' => 'Comparatives and Superlatives',
                        'lesson_number' => 13,
                        'is_active' => true,
                        'description' => 'Learn how to make comparisons and express extremes in Spanish.',
                        'goals' => ['Academic Study', 'Other'],
                    ],
                ],
            ],
            [
                'level' => 'Spanish Level 2', // Intermediate
                'lessons' => [
                    [
                        'name' => 'Intermediate Grammar - Adjectives and Adverbs',
                        'lesson_number' => 14,
                        'description' => 'Deepen your understanding of adjectives and adverbs in Spanish.',
                        'goals' => ['Academic Study', 'Grammar'],
                    ],
                    [
                        'name' => 'Intermediate Grammar - Prepositions and Conjunctions',
                        'lesson_number' => 15,
                        'description' => 'Learn the use of prepositions and conjunctions in Spanish.',
                        'goals' => ['Academic Study', 'Grammar'],
                    ],
                    [
                        'name' => 'Possessive Pronouns',
                        'lesson_number' => 16,
                        'description' => 'Learn to use possessive pronouns to indicate ownership in Spanish.',
                        'goals' => ['Academic Study', 'Grammar'],
                    ],
                    [
                        'name' => 'Direct and Indirect Object Pronouns',
                        'lesson_number' => 17,
                        'description' => 'Understand and practice using direct and indirect object pronouns in sentences.',
                        'goals' => ['Academic Study', 'Grammar'],
                    ],
                    [
                        'name' => 'Ser vs. Estar',
                        'lesson_number' => 18,
                        'description' => 'Dive deep into the uses of "ser" and "estar", two of the most important verbs in Spanish.',
                        'goals' => ['Academic Study', 'Grammar'],
                    ],
                    [
                        'name' => 'Daily Life and Routine',
                        'lesson_number' => 19,
                        'description' => 'Discuss daily life and routine in Spanish.',
                        'goals' => ['Cultural Exploration', 'Vocabulary'],
                    ],
                    [
                        'name' => 'Shopping in Spanish',
                        'lesson_number' => 20,
                        'description' => 'Gain vocabulary for shopping and consumer activities in Spanish-speaking countries.',
                        'goals' => ['Travel', 'Cultural Exploration', 'Vocabulary'],
                    ],
                    [
                        'name' => 'Healthcare and Medical Vocabulary',
                        'lesson_number' => 21,
                        'description' => 'Learn essential healthcare and medical terms in Spanish.',
                        'goals' => ['Other', 'Vocabulary'],
                    ],
                    [
                        'name' => 'Education System in Spanish-Speaking Countries',
                        'lesson_number' => 22,
                        'description' => 'Discuss the education system and academic life in Spanish-speaking countries.',
                        'goals' => ['Academic Study'],
                    ],
                    [
                        'name' => 'Media and Entertainment in Spanish',
                        'lesson_number' => 23,
                        'description' => 'Learn about media and entertainment in the Spanish-speaking world.',
                        'goals' => ['Cultural Exploration'],
                    ],
                    [
                        'name' => 'Environmental Issues',
                        'lesson_number' => 24,
                        'description' => 'Discuss environmental issues using Spanish vocabulary.',
                        'goals' => ['Other'],
                    ],
                    [
                        'name' => 'Business Spanish',
                        'lesson_number' => 25,
                        'description' => 'Acquire vocabulary for business and professional settings in Spanish.',
                        'goals' => ['Business Communication'],
                    ],
                    [
                        'name' => 'Spanish Culture and History',
                        'lesson_number' => 26,
                        'description' => 'Explore the rich history and culture of Spanish-speaking countries.',
                        'goals' => ['Cultural Exploration'],
                    ],
                    [
                        'name' => 'Reflexive Verbs and Daily Routines',
                        'lesson_number' => 27,
                        'description' => 'Learn about reflexive verbs and how they are used to describe daily routines.',
                        'goals' => ['Academic Study', 'Vocabulary', 'Grammar'],,
                    ],
                    [
                        'name' => 'Formal vs. Informal Communication',
                        'lesson_number' => 28,
                        'description' => 'Understand the differences and uses of formal and informal communication in Spanish.',
                        'goals' => ['Academic Study', 'Other'],
                    ],
                ],
            ],
            [
                'level' => 'Spanish Level 3', // Advanced
                'lessons' => [
                    [
                        'name' => 'Advanced Grammar - Complex Tenses and Moods',
                        'lesson_number' => 29,
                        'description' => 'Master complex tenses and moods in Spanish grammar.',
                        'goals' => ['Academic Study'],
                    ],
                    [
                        'name' => 'Advanced Grammar - Subjunctive and Conditional',
                        'lesson_number' => 30,
                        'description' => 'Learn about the subjunctive and conditional moods in Spanish.',
                        'goals' => ['Academic Study'],
                    ],
                    [
                        'name' => 'Politics and Current Events in the Spanish-Speaking World',
                        'lesson_number' => 31,
                        'description' => 'Discuss politics and current events in Spanish.',
                        'goals' => ['Cultural Exploration', 'Other'],
                    ],
                    [
                        'name' => 'Science and Technology in Spanish',
                        'lesson_number' => 32,
                        'description' => 'Explore scientific and technological topics in Spanish.',
                        'goals' => ['Academic Study', 'Other'],
                    ],
                    [
                        'name' => 'Spanish Literature and Arts',
                        'lesson_number' => 33,
                        'description' => 'Dive into Spanish literature and arts and expand your vocabulary.',
                        'goals' => ['Cultural Exploration'],
                    ],
                    [
                        'name' => 'Idioms and Colloquial Spanish',
                        'lesson_number' => 34,
                        'description' => 'Learn common idioms and colloquial expressions in Spanish.',
                        'goals' => ['Cultural Exploration', 'Other'],
                    ],
                    [
                        'name' => 'Spanish for Academic Purposes',
                        'lesson_number' => 35,
                        'description' => 'Develop language skills for academic studies and research in Spanish.',
                        'goals' => ['Academic Study'],
                    ],
                    [
                        'name' => 'Debate and Discussion in Spanish',
                        'lesson_number' => 36,
                        'description' => 'Enhance communication skills through debates and discussions.',
                        'goals' => ['Business Communication', 'Cultural Exploration'],
                    ],
                    [
                        'name' => 'Cultural Immersion and Travel Experiences',
                        'lesson_number' => 37,
                        'description' => 'Enhance understanding of Spanish culture through travel-related experiences.',
                        'goals' => ['Travel', 'Cultural Exploration'],
                    ],
                    [
                        'name' => 'Subjunctive Mood in More Depth',
                        'lesson_number' => 38,
                        'description' => 'Explore the uses and nuances of the subjunctive mood in Spanish.',
                        'goals' => ['Academic Study', 'Grammar'],
                    ],
                    [
                        'name' => 'Advanced Conversation and Discussion',
                        'lesson_number' => 39,
                        'description' => 'Develop advanced conversational skills in Spanish, discussing various topics.',
                        'goals' => ['Business Communication', 'Cultural Exploration'],
                    ],
                    [
                        'name' => 'Advanced Pronoun Usage',
                        'lesson_number' => 40,
                        'description' => 'Master the use of all types of pronouns, including reflexive, direct, and indirect object pronouns, in complex grammatical structures.',
                        'goals' => ['Academic Study', 'Grammar'],
                    ],
                ],
            ],
        ];

        $spanishCourse = Course::where('name', 'Spanish for Everyone')->first();
        foreach ($spanishLessonsData as $lessonData) {
            $level = Level::where('name', $lessonData['level'])->firstOrCreate(['name' => $lessonData['level']]);
            foreach ($lessonData['lessons'] as $data) {
                $lesson = new Lesson([
                    'name' => $data['name'],
                    'lesson_number' => $data['lesson_number'],
                    'description' => $data['description'],
                    'is_active' => $data['is_active'] ?? false,
                    'course_id' => $spanishCourse->id,
                    'content' => '',
                ]);

                $lesson->level()->associate($level);
                $lesson->save();

                foreach ($data['goals'] as $goalName) {
                    if (isset($goals[$goalName])) {
                        $lesson->goals()->attach(Goal::where('name', $goalName)->where('course_id', $spanishCourse->id)->first()->id);
                    }
                }
            }
            $level->course()->associate($spanishCourse);
            $level->save();
            $spanishCourse->levels()->attach($level);
        }

        // English course for spanish learners
        $englishCourseData = [
            [
                'level' => 'Inglés nivel 1', // Beginner
                'lessons' => [
                    [
                        'name' => 'Introducción al Alfabeto y Sonidos',
                        'lesson_number' => 1,
                        'is_active' => true,
                        'description' => 'Familiarízate con el alfabeto inglés y sus sonidos únicos.',
                        'goals' => ['Fundamentals'],
                    ],
                    [
                        'name' => 'Saludos y Expresiones de Cortesía',
                        'lesson_number' => 2,
                        'is_active' => true,
                        'description' => 'Aprende cómo saludar y las expresiones de cortesía básicas.',
                        'goals' => ['Travel'],
                    ],
                    [
                        'name' => 'Números, Colores y Formas',
                        'lesson_number' => 3,
                        'is_active' => true,
                        'description' => 'Domina los números, colores básicos y formas geométricas.',
                        'goals' => ['Fundamentals', 'Other'],
                    ],
                    [
                        'name' => 'Gramática Básica - Sustantivos, Artículos y Pronombres',
                        'lesson_number' => 4,
                        'is_active' => true,
                        'description' => 'Entiende los fundamentos de sustantivos, artículos y pronombres en inglés.',
                        'goals' => ['Grammar', 'Fundamentals'],
                    ],
                    [
                        'name' => 'Vocabulario de Familia y Amigos',
                        'lesson_number' => 5,
                        'is_active' => true,
                        'description' => 'Introduce palabras y frases para describir familia y amigos.',
                        'goals' => ['Vocabulary'],
                    ],
                    [
                        'name' => 'Verbos Comunes y el Presente Simple',
                        'lesson_number' => 6,
                        'is_active' => true,
                        'description' => 'Aprende los verbos más comunes y el uso del presente simple.',
                        'goals' => ['Grammar'],
                    ],
                    [
                        'name' => 'Objetos Cotidianos y Preposiciones de Lugar',
                        'lesson_number' => 7,
                        'is_active' => true,
                        'description' => 'Identifica objetos cotidianos y aprende a usar preposiciones de lugar.',
                        'goals' => ['Vocabulary', 'Grammar'],
                    ],
                    [
                        'name' => 'Comida y Bebidas',
                        'lesson_number' => 8,
                        'is_active' => true,
                        'description' => 'Aprende vocabulario para ordenar y hablar sobre comida y bebidas.',
                        'goals' => ['Vocabulary'],
                    ],
                    [
                        'name' => 'Ropa y Descripciones Físicas',
                        'lesson_number' => 9,
                        'is_active' => true,
                        'description' => 'Describe ropa y características físicas de las personas.',
                        'goals' => ['Vocabulary'],
                    ],
                    [
                        'name' => 'Hobbies y Pasatiempos',
                        'lesson_number' => 10,
                        'is_active' => true,
                        'description' => 'Conversa sobre hobbies y pasatiempos usando el presente simple.',
                        'goals' => ['Vocabulary'],
                    ],
                    [
                        'name' => 'Introducción a la Hora y el Calendario',
                        'lesson_number' => 11,
                        'is_active' => true,
                        'description' => 'Aprende a decir la hora, días de la semana y meses del año.',
                        'goals' => ['Travel', 'Vocabulary'],
                    ],
                    [
                        'name' => 'Pronombres y Adjetivos Posesivos',
                        'lesson_number' => 12,
                        'is_active' => true,
                        'description' => 'Entiende cómo y cuándo usar pronombres y adjetivos posesivos en inglés.',
                        'goals' => ['Grammar', 'Vocabulary'],
                    ],
                    [
                        'name' => 'Conectores y Transiciones',
                        'lesson_number' => 13,
                        'is_active' => true,
                        'description' => 'Aprende a enlazar ideas y oraciones usando conectores y transiciones básicos.',
                        'goals' => ['Grammar'],
                    ],
                ],
            ],
            [
                'level' => 'Inglés nivel 2', // Intermediate
                'lessons' => [
                    [
                        'name' => 'Gramática Intermedia - Adjetivos y Adverbios',
                        'lesson_number' => 14,
                        'description' => 'Profundiza tu entendimiento de adjetivos y adverbios en inglés.',
                        'goals' => ['Academic Study', 'Grammar'],
                    ],
                    [
                        'name' => 'Gramática Intermedia - Preposiciones y Conjunciones',
                        'lesson_number' => 15,
                        'description' => 'Aprende el uso de preposiciones y conjunciones en inglés.',
                        'goals' => ['Academic Study', 'Grammar'],
                    ],
                    [
                        'name' => 'Tiempo Pasado Simple y Continuo',
                        'lesson_number' => 16,
                        'description' => 'Aprende a narrar eventos en pasado usando el pasado simple y continuo.',
                        'goals' => ['Grammar'],
                    ],
                    [
                        'name' => 'Futuro con Will y Going to',
                        'lesson_number' => 17,
                        'description' => 'Planea y predice el futuro utilizando "will" y "going to".',
                        'goals' => ['Grammar'],
                    ],
                    [
                        'name' => 'Condiciones y Comparativos',
                        'lesson_number' => 18,
                        'description' => 'Comprende y usa estructuras condicionales y comparativos.',
                        'goals' => ['Grammar'],
                    ],
                    [
                        'name' => 'Alimentación y Cocina',
                        'lesson_number' => 19,
                        'description' => 'Expande tu vocabulario relacionado con alimentos y cocina.',
                        'goals' => ['Cultural Exploration', 'Vocabulary'],
                    ],
                    [
                        'name' => 'Salud y Cuerpo Humano',
                        'lesson_number' => 20,
                        'description' => 'Aprende vocabulario relacionado con la salud y el cuerpo humano.',
                        'goals' => ['Vocabulary'],
                    ],
                    [
                        'name' => 'Fiestas y Celebraciones',
                        'lesson_number' => 21,
                        'description' => 'Conoce las principales festividades y cómo celebrarlas en inglés.',
                        'goals' => ['Cultural Exploration', 'Vocabulary'],
                    ],
                    [
                        'name' => 'La Ciudad y el Transporte',
                        'lesson_number' => 22,
                        'description' => 'Navega por la ciudad y aprende sobre diferentes modos de transporte.',
                        'goals' => ['Travel', 'Vocabulary'],
                    ],
                    [
                        'name' => 'Naturaleza y Medio Ambiente',
                        'lesson_number' => 23,
                        'description' => 'Discute sobre la naturaleza y cuestiones medioambientales.',
                        'goals' => ['Travel', 'Vocabulary'],
                    ],
                    [
                        'name' => 'Arte y Cultura',
                        'lesson_number' => 24,
                        'description' => 'Explora el vocabulario relacionado con el arte y la cultura.',
                        'goals' => ['Cultural Exploration', 'Travel', 'Vocabulary'],
                    ],
                    [
                        'name' => 'Expresiones Idiomáticas y Lenguaje Coloquial',
                        'lesson_number' => 25,
                        'description' => 'Introdúcete al uso de expresiones idiomáticas y lenguaje coloquial en inglés.',
                        'goals' => ['Grammar', 'Cultural Exploration', 'Academic Study'],
                    ],
                ],
            ],
            [
                'level' => 'Inglés nivel 3', // Advanced
                'lessons' => [
                    [
                        'name' => 'Gramática Avanzada - Tiempos y Modos Complejos',
                        'lesson_number' => 26,
                        'description' => 'Domina tiempos y modos complejos en la gramática inglesa.',
                        'goals' => ['Academic Study', 'Grammar'],
                    ],
                    [
                        'name' => 'Gramática Avanzada - Subjuntivo y Condicional',
                        'lesson_number' => 27,
                        'description' => 'Aprende sobre los modos subjuntivo y condicional en inglés.',
                        'goals' => ['Academic Study', 'Grammar'],
                    ],
                    [
                        'name' => 'Narrativa Avanzada y Estilos Literarios',
                        'lesson_number' => 28,
                        'description' => 'Aprende a analizar y crear narrativas usando estilos literarios variados.',
                        'goals' => ['Academic Study', 'Cultural Exploration'],
                    ],
                    [
                        'name' => 'Inglés Académico y Técnico',
                        'lesson_number' => 29,
                        'description' => 'Desarrolla habilidades para entender y utilizar inglés en contextos académicos y técnicos.',
                        'goals' => ['Academic Study', 'Business Communication'],
                    ],
                    [
                        'name' => 'Debates y Persuasión',
                        'lesson_number' => 30,
                        'description' => 'Perfecciona tus habilidades para debatir y persuadir en .',
                        'goals' => ['Business Communication'],
                    ],
                    [
                        'name' => 'Modismos e Inglés Coloquial',
                        'lesson_number' => 31,
                        'description' => 'Aprende modismos y expresiones coloquiales comunes en inglés.',
                        'goals' => ['Cultural Exploration', 'Other', 'Vocabulary'],
                    ],
                    [
                        'name' => 'Innovación y Cambio',
                        'lesson_number' => 32,
                        'description' => 'Explora temas de innovación, cambio y el futuro en inglés.',
                        'goals' => ['Cultural Exploration'],
                    ],
                    [
                        'name' => 'Cultura Empresarial y Liderazgo',
                        'lesson_number' => 33,
                        'description' => 'Aprende sobre cultura empresarial, liderazgo y gestión en inglés.',
                        'goals' => ['Business Communication', 'Academic Study'],
                    ],
                    [
                        'name' => 'Artes Visuales y Performance',
                        'lesson_number' => 34,
                        'description' => 'Discute sobre artes visuales y performances, interpretando y describiendo obras artísticas.',
                        'goals' => ['Other', 'Cultural Exploration'],
                    ],
                    [
                        'name' => 'Ciencia Avanzada y Tecnología',
                        'lesson_number' => 35,
                        'description' => 'Explora desarrollos avanzados en ciencia y tecnología y su vocabulario asociado.',
                        'goals' => ['Other', 'Vocabulary'],
                    ],
                    [
                        'name' => 'Psicología y Filosofía',
                        'lesson_number' => 36,
                        'description' => 'Introdúcete a términos y debates en psicología y filosofía en inglés.',
                        'goals' => ['Vocabulary'],
                    ],
                    [
                        'name' => 'Inmersión Cultural y Experiencias de Viaje',
                        'lesson_number' => 37,
                        'description' => 'Mejora la comprensión de la cultura inglesa a través de experiencias relacionadas con viajes.',
                        'goals' => ['Travel', 'Cultural Exploration'],
                    ],
                    [
                        'name' => 'Conversación Avanzada y Discusión',
                        'lesson_number' => 38,
                        'description' => 'Desarrolla habilidades conversacionales avanzadas en inglés, discutiendo diversos temas.',
                        'goals' => ['Business Communication', 'Cultural Exploration'],
                    ],
                    [
                        'name' => 'Tendencias Globales y Cambio Social',
                        'lesson_number' => 39,
                        'description' => 'Analiza y debate sobre tendencias globales y cambio social.',
                        'goals' => ['Travel', 'Other', 'Cultural Exploration'],
                    ],
                    [
                        'name' => 'Voz Pasiva',
                        'lesson_number' => 40,
                        'description' => 'Aprende a formar y usar la voz pasiva en inglés para cambiar el foco en las oraciones.',
                        'goals' => ['Grammar'],
                    ],
                    [
                        'name' => 'Preguntas Indirectas y Reportadas',
                        'lesson_number' => 41,
                        'description' => 'Aprende a transformar preguntas directas en indirectas y reportar declaraciones o preguntas en inglés.',
                        'goals' => ['Grammar', 'Speaking'],
                    ],
                    [
                        'name' => 'Pronombres Reflexivos y Recíprocos',
                        'lesson_number' => 42,
                        'description' => 'Estudia y practica el uso de pronombres reflexivos y recíprocos en inglés.',
                        'goals' => ['Grammar'],
                    ],
                    [
                        'name' => 'Modismos y Frases Hechas Avanzadas',
                        'lesson_number' => 43,
                        'description' => 'Domina modismos y frases hechas para enriquecer tu expresión en inglés.',
                        'goals' => ['Vocabulary', 'Speaking'],
                    ],
                    [
                        'name' => 'Literatura y Análisis de Textos en Inglés',
                        'lesson_number' => 44,
                        'description' => 'Desarrolla habilidades para analizar textos literarios y de opinión en inglés.',
                        'goals' => ['Reading', 'Cultural Exploration'],
                    ],
                    [
                        'name' => 'Estrategias de Lectura y Comprensión',
                        'lesson_number' => 45,
                        'description' => 'Mejora tu comprensión lectora con estrategias específicas para textos en inglés.',
                        'goals' => ['Reading'],
                    ],
                ],
            ],
        ];

        $englishCourse = Course::where('name', 'Inglés para todos')->first();
        foreach ($englishCourseData as $lessonData) {
            $level = Level::where('name', $lessonData['level'])->firstOrCreate(['name' => $lessonData['level']]);

            foreach ($lessonData['lessons'] as $data) {
                $lesson = new Lesson([
                    'name' => $data['name'],
                    'lesson_number' => $data['lesson_number'],
                    'description' => $data['description'],
                    'is_active' => $data['is_active'] ?? false,
                    'course_id' => $englishCourse->id,
                    'content' => '',
                ]);

                $lesson->level()->associate($level);
                $lesson->save();

                foreach ($data['goals'] as $goalName) {
                    if (isset($goals[$goalName])) {
                        $lesson->goals()->attach(Goal::where('name', $goalName)->where('course_id', $englishCourse->id)->first()->id);
                    }
                }
            }
            $level->course()->associate($englishCourse);
            $level->save();
            $englishCourse->levels()->attach($level);
        }
    }
}
