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
            'Other'
        ];

        $goals = Goal::whereIn('name', $goalsData)->get()->keyBy('name');

        $lessonsData = [
            [
                'level' => 'Level 1',
                'lessons' => [
                    [
                        'name' => 'Alphabet and Pronunciation',
                        'lesson_number' => 1,
                        'description' => 'Learn the German alphabet and practice pronunciation.',
                        'goals' => ['Travel', 'Cultural Exploration'],
                    ],
                    [
                        'name' => 'Greetings and Introductions',
                        'lesson_number' => 2,
                        'description' => 'Learn common greetings and how to introduce yourself.',
                        'goals' => ['Business Communication', 'Travel', 'Cultural Exploration'],
                    ],
                    [
                        'name' => 'Numbers and Counting',
                        'lesson_number' => 3,
                        'description' => 'Learn to count and use numbers in everyday situations.',
                        'goals' => ['Travel', 'Other'],
                    ],
                    [
                        'name' => 'Basic Grammar - Nouns, Articles, and Pronouns in the Nominative Case',
                        'lesson_number' => 4,
                        'description' => 'Understand the basics of German nouns, articles, and pronouns in the nominative case.',
                        'goals' => ['Academic Study', 'Other'],
                    ],
                    [
                        'name' => 'Basic Grammar - Verbs and Sentence Structure in the Present Tense',
                        'lesson_number' => 5,
                        'description' => 'Learn basic verb conjugation and sentence structure in the present tense.',
                        'goals' => ['Academic Study', 'Other'],
                    ],
                    [
                        'name' => 'Family and Relationships',
                        'lesson_number' => 6,
                        'description' => 'Learn vocabulary related to family members and relationships.',
                        'goals' => ['Cultural Exploration'],
                    ],
                    [
                        'name' => 'Food and Drink',
                        'lesson_number' => 7,
                        'description' => 'Explore German cuisine and learn vocabulary related to food and drinks.',
                        'goals' => ['Travel', 'Cultural Exploration'],
                    ],
                    [
                        'name' => 'Directions and Travel',
                        'lesson_number' => 8,
                        'description' => 'Learn to give and understand directions, and explore common travel phrases.',
                        'goals' => ['Travel'],
                    ],
                    [
                        'name' => 'Clothing and Appearance',
                        'lesson_number' => 9,
                        'description' => 'Learn vocabulary related to clothing and describing appearance.',
                        'goals' => ['Cultural Exploration'],
                    ],
                    [
                        'name' => 'Holidays and Celebrations',
                        'lesson_number' => 10,
                        'description' => 'Discover German holidays and celebrations, and learn related vocabulary.',
                        'goals' => ['Cultural Exploration'],
                    ],
                ],
            ],
            [
                'level' => 'Level 2',
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
                'level' => 'Level 3',
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
                'level' => 'Level 4',
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




        $course = Course::where('name', 'German for Beginners')->first();
        foreach ($lessonsData as $levelData) {
            $level = Level::where('name', $levelData['level'])->first();

            if ($level) {
                foreach ($levelData['lessons'] as $lessonData) {
                    $lesson = new Lesson([
                        'name' => $lessonData['name'],
                        'lesson_number' => $lessonData['lesson_number'],
                        'description' => $lessonData['description'],
                        'course_id' => $course->id,
                        'content' => '',
                    ]);

                    $lesson->level()->associate($level);
                    $lesson->save();

                    foreach ($lessonData['goals'] as $goalName) {
                        if (isset($goals[$goalName])) {
                            $lesson->goals()->attach($goals[$goalName]);
                        }
                    }
                }
                $course->levels()->attach($level);
            }
        }

        // Spanish course
        $spanishLessonsData = [
            [
                'level' => 'Level 1', // Beginner
                'lessons' => [
                    [
                        'name' => 'Alphabet and Pronunciation',
                        'lesson_number' => 1,
                        'description' => 'Learn the Spanish alphabet and practice pronunciation.',
                        'goals' => ['Travel', 'Cultural Exploration'],
                    ],
                    [
                        'name' => 'Basic Greetings and Introductions',
                        'lesson_number' => 2,
                        'description' => 'Learn essential greetings and how to introduce yourself in Spanish.',
                        'goals' => ['Business Communication', 'Travel', 'Cultural Exploration'],
                    ],
                    [
                        'name' => 'Numbers and Basic Counting',
                        'lesson_number' => 3,
                        'description' => 'Learn to count in Spanish and use numbers in everyday contexts.',
                        'goals' => ['Travel', 'Other'],
                    ],
                    [
                        'name' => 'Basic Grammar - Nouns, Articles, and Pronouns',
                        'lesson_number' => 4,
                        'description' => 'Understand the basics of Spanish nouns, articles, and pronouns.',
                        'goals' => ['Academic Study', 'Other'],
                    ],
                    [
                        'name' => 'Basic Verbs and Present Tense',
                        'lesson_number' => 5,
                        'description' => 'Learn basic verb conjugations and sentence structures in the present tense.',
                        'goals' => ['Academic Study', 'Other'],
                    ],
                    [
                        'name' => 'Family and Relationships Vocabulary',
                        'lesson_number' => 6,
                        'description' => 'Learn vocabulary related to family members and relationships in Spanish.',
                        'goals' => ['Cultural Exploration'],
                    ],
                    [
                        'name' => 'Food and Drink in Spanish Culture',
                        'lesson_number' => 7,
                        'description' => 'Explore Spanish cuisine and learn vocabulary related to food and drinks.',
                        'goals' => ['Travel', 'Cultural Exploration'],
                    ],
                    [
                        'name' => 'Asking for Directions',
                        'lesson_number' => 8,
                        'description' => 'Learn to ask for and understand directions in Spanish.',
                        'goals' => ['Travel'],
                    ],
                    [
                        'name' => 'Describing Clothing and Appearance',
                        'lesson_number' => 9,
                        'description' => 'Acquire vocabulary for clothing and describing appearance.',
                        'goals' => ['Cultural Exploration'],
                    ],
                    [
                        'name' => 'Celebrations and Festivals',
                        'lesson_number' => 10,
                        'description' => 'Learn about Spanish holidays and festivals, along with related vocabulary.',
                        'goals' => ['Cultural Exploration'],
                    ],
                ],
            ],
            [
                'level' => 'Level 2', // Intermediate
                'lessons' => [
                    [
                        'name' => 'Intermediate Grammar - Adjectives and Adverbs',
                        'lesson_number' => 11,
                        'description' => 'Deepen your understanding of adjectives and adverbs in Spanish.',
                        'goals' => ['Academic Study'],
                    ],
                    [
                        'name' => 'Intermediate Grammar - Prepositions and Conjunctions',
                        'lesson_number' => 12,
                        'description' => 'Learn the use of prepositions and conjunctions in Spanish.',
                        'goals' => ['Academic Study'],
                    ],
                    [
                        'name' => 'Daily Life and Routine',
                        'lesson_number' => 13,
                        'description' => 'Discuss daily life and routine in Spanish.',
                        'goals' => ['Cultural Exploration'],
                    ],
                    [
                        'name' => 'Shopping in Spanish',
                        'lesson_number' => 14,
                        'description' => 'Gain vocabulary for shopping and consumer activities in Spanish-speaking countries.',
                        'goals' => ['Travel', 'Cultural Exploration'],
                    ],
                    [
                        'name' => 'Healthcare and Medical Vocabulary',
                        'lesson_number' => 15,
                        'description' => 'Learn essential healthcare and medical terms in Spanish.',
                        'goals' => ['Other'],
                    ],
                    [
                        'name' => 'Education System in Spanish-Speaking Countries',
                        'lesson_number' => 16,
                        'description' => 'Discuss the education system and academic life in Spanish-speaking countries.',
                        'goals' => ['Academic Study'],
                    ],
                    [
                        'name' => 'Media and Entertainment in Spanish',
                        'lesson_number' => 17,
                        'description' => 'Learn about media and entertainment in the Spanish-speaking world.',
                        'goals' => ['Cultural Exploration'],
                    ],
                    [
                        'name' => 'Environmental Issues',
                        'lesson_number' => 18,
                        'description' => 'Discuss environmental issues using Spanish vocabulary.',
                        'goals' => ['Other'],
                    ],
                    [
                        'name' => 'Business Spanish',
                        'lesson_number' => 19,
                        'description' => 'Acquire vocabulary for business and professional settings in Spanish.',
                        'goals' => ['Business Communication'],
                    ],
                    [
                        'name' => 'Spanish Culture and History',
                        'lesson_number' => 20,
                        'description' => 'Explore the rich history and culture of Spanish-speaking countries.',
                        'goals' => ['Cultural Exploration'],
                    ],
                ],
            ],
            [
                'level' => 'Level 3', // Advanced
                'lessons' => [
                    [
                        'name' => 'Advanced Grammar - Complex Tenses and Moods',
                        'lesson_number' => 21,
                        'description' => 'Master complex tenses and moods in Spanish grammar.',
                        'goals' => ['Academic Study'],
                    ],
                    [
                        'name' => 'Advanced Grammar - Subjunctive and Conditional',
                        'lesson_number' => 22,
                        'description' => 'Learn about the subjunctive and conditional moods in Spanish.',
                        'goals' => ['Academic Study'],
                    ],
                    [
                        'name' => 'Politics and Current Events in the Spanish-Speaking World',
                        'lesson_number' => 23,
                        'description' => 'Discuss politics and current events in Spanish.',
                        'goals' => ['Cultural Exploration', 'Other'],
                    ],
                    [
                        'name' => 'Science and Technology in Spanish',
                        'lesson_number' => 24,
                        'description' => 'Explore scientific and technological topics in Spanish.',
                        'goals' => ['Academic Study', 'Other'],
                    ],
                    [
                        'name' => 'Spanish Literature and Arts',
                        'lesson_number' => 25,
                        'description' => 'Dive into Spanish literature and arts and expand your vocabulary.',
                        'goals' => ['Cultural Exploration'],
                    ],
                    [
                        'name' => 'Idioms and Colloquial Spanish',
                        'lesson_number' => 26,
                        'description' => 'Learn common idioms and colloquial expressions in Spanish.',
                        'goals' => ['Cultural Exploration', 'Other'],
                    ],
                    [
                        'name' => 'Spanish for Academic Purposes',
                        'lesson_number' => 27,
                        'description' => 'Develop language skills for academic studies and research in Spanish.',
                        'goals' => ['Academic Study'],
                    ],
                    [
                        'name' => 'Debate and Discussion in Spanish',
                        'lesson_number' => 28,
                        'description' => 'Enhance communication skills through debates and discussions.',
                        'goals' => ['Business Communication', 'Cultural Exploration'],
                    ],
                    [
                        'name' => 'Cultural Immersion and Travel Experiences',
                        'lesson_number' => 29,
                        'description' => 'Enhance understanding of Spanish culture through travel-related experiences.',
                        'goals' => ['Travel', 'Cultural Exploration'],
                    ],
                    [
                        'name' => 'Advanced Conversation and Discussion',
                        'lesson_number' => 30,
                        'description' => 'Develop advanced conversational skills in Spanish, discussing various topics.',
                        'goals' => ['Business Communication', 'Cultural Exploration'],
                    ],
                ],
            ],
        ];

        $spanishCourse = Course::where('name', 'Spanish for Everyone')->first();
        foreach ($spanishLessonsData as $levelData) {
            $level = Level::where('name', $levelData['level'])->firstOrCreate(['name' => $levelData['level']]);

            foreach ($levelData['lessons'] as $lessonData) {
                $lesson = new Lesson([
                    'name' => $lessonData['name'],
                    'lesson_number' => $lessonData['lesson_number'],
                    'description' => $lessonData['description'],
                    'course_id' => $course->id,
                    'content' => '',
                ]);

                $lesson->level()->associate($level);
                $lesson->save();

                foreach ($lessonData['goals'] as $goalName) {
                    if (isset($goals[$goalName])) {
                        $lesson->goals()->attach($goals[$goalName]);
                    }
                }
            }
            $spanishCourse->levels()->attach($level);
        }
    }
}
