<?php

namespace Database\Seeders;

use App\Models\Lesson;
use App\Models\Level;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Goal;

class LessonsSeeder extends Seeder
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
                        'description' => 'Learn the German alphabet and practice pronunciation.',
                        'goals' => ['Travel', 'Cultural Exploration'],
                    ],
                    [
                        'name' => 'Greetings and Introductions',
                        'description' => 'Learn common greetings and how to introduce yourself.',
                        'goals' => ['Business Communication', 'Travel', 'Cultural Exploration'],
                    ],
                    [
                        'name' => 'Numbers and Counting',
                        'description' => 'Learn to count and use numbers in everyday situations.',
                        'goals' => ['Travel', 'Other'],
                    ],
                    [
                        'name' => 'Basic Grammar - Nouns, Articles, and Pronouns in the Nominative Case',
                        'description' => 'Understand the basics of German nouns, articles, and pronouns in the nominative case.',
                        'goals' => ['Academic Study', 'Other'],
                    ],
                    [
                        'name' => 'Basic Grammar - Verbs and Sentence Structure in the Present Tense',
                        'description' => 'Learn basic verb conjugation and sentence structure in the present tense.',
                        'goals' => ['Academic Study', 'Other'],
                    ],
                    [
                        'name' => 'Family and Relationships',
                        'description' => 'Learn vocabulary related to family members and relationships.',
                        'goals' => ['Cultural Exploration'],
                    ],
                    [
                        'name' => 'Food and Drink',
                        'description' => 'Explore German cuisine and learn vocabulary related to food and drinks.',
                        'goals' => ['Travel', 'Cultural Exploration'],
                    ],
                    [
                        'name' => 'Directions and Travel',
                        'description' => 'Learn to give and understand directions, and explore common travel phrases.',
                        'goals' => ['Travel'],
                    ],
                    [
                        'name' => 'Clothing and Appearance',
                        'description' => 'Learn vocabulary related to clothing and describing appearance.',
                        'goals' => ['Cultural Exploration'],
                    ],
                    [
                        'name' => 'Holidays and Celebrations',
                        'description' => 'Discover German holidays and celebrations, and learn related vocabulary.',
                        'goals' => ['Cultural Exploration'],
                    ],
                ],
            ],
            [
                'level' => 'Level 2',
                'lessons' => [
                    [
                        'name' => 'Intermediate Grammar - Adjectives and Adverbs in the Nominative and Accusative Cases',
                        'description' => 'Learn to use adjectives and adverbs in the nominative and accusative cases.',
                        'goals' => ['Academic Study'],
                    ],
                    [
                        'name' => 'Intermediate Grammar - Prepositions and Conjunctions with the Accusative Case',
                        'description' => 'Understand the use of prepositions and conjunctions in the accusative case.',
                        'goals' => ['Academic Study'],
                    ],
                    [
                        'name' => 'Housing and Home Life',
                        'description' => 'Learn vocabulary related to housing and everyday home life.',
                        'goals' => ['Cultural Exploration'],
                    ],
                    [
                        'name' => 'Shopping and Consumerism',
                        'description' => 'Explore shopping-related vocabulary and phrases to use in stores and markets.',
                        'goals' => ['Travel', 'Cultural Exploration'],
                    ],
                    [
                        'name' => 'Health and Well-being',
                        'description' => 'Learn vocabulary related to health, wellness, and visiting the doctor.',
                        'goals' => ['Other'],
                    ],
                    [
                        'name' => 'Education and Learning',
                        'description' => 'Discuss education and learning, and explore related vocabulary.',
                        'goals' => ['Academic Study'],
                    ],
                    [
                        'name' => 'Media and Entertainment',
                        'description' => 'Learn vocabulary related to media, movies, music, and other forms of entertainment.',
                        'goals' => ['Cultural Exploration'],
                    ],
                    [
                        'name' => 'Environment and Sustainability',
                        'description' => 'Discuss environmental issues and sustainability, and learn related vocabulary.',
                        'goals' => ['Other'],
                    ],
                    [
                        'name' => 'Business and Professional German',
                        'description' => 'Learn vocabulary and phrases for professional settings and business communication.',
                        'goals' => ['Business Communication'],
                    ],
                    [
                        'name' => 'History and Culture',
                        'description' => 'Explore German history and culture, and learn related vocabulary.',
                        'goals' => ['Cultural Exploration'],
                    ],
                ],
            ],
            [
                'level' => 'Level 3',
                'lessons' => [
                    [
                        'name' => 'Advanced Grammar - Tenses and Verb Conjugation in the Nominative, Accusative, and Dative Cases',
                        'description' => 'Master tenses and verb conjugation in the nominative, accusative, and dative cases.',
                        'goals' => ['Academic Study'],
                    ],
                    [
                        'name' => 'Advanced Grammar - Subjunctive Mood and Modal Verbs',
                        'description' => 'Learn the subjunctive mood, modal verbs, and their usage in advanced grammar.',
                        'goals' => ['Academic Study'],
                    ],
                    [
                        'name' => 'Politics and Current Affairs',
                        'description' => 'Discuss politics and current affairs in German, and learn related vocabulary.',
                        'goals' => ['Cultural Exploration', 'Other'],
                    ],
                    [
                        'name' => 'Science and Technology',
                        'description' => 'Explore scientific and technological topics, and learn related vocabulary.',
                        'goals' => ['Academic Study', 'Other'],
                    ],
                    [
                        'name' => 'Literature and the Arts',
                        'description' => 'Learn about German literature, art, and cultural works, and expand your vocabulary.',
                        'goals' => ['Cultural Exploration'],
                    ],
                    [
                        'name' => 'Advanced Vocabulary - Idioms and Colloquial Expressions',
                        'description' => 'Learn common idioms and colloquial expressions to enrich your German vocabulary.',
                        'goals' => ['Cultural Exploration', 'Other'],
                    ],
                    [
                        'name' => 'German for Academic Purposes',
                        'description' => 'Develop the language skills needed for academic studies and research in German.',
                        'goals' => ['Academic Study'],
                    ],
                    [
                        'name' => 'Advanced Communication Skills - Debate and Discussion',
                        'description' => 'Enhance your communication skills through debate and discussion on various topics.',
                        'goals' => ['Business Communication', 'Cultural Exploration'],
                    ],
                    [
                        'name' => 'Travel and Cultural Immersion',
                        'description' => 'Deepen your understanding of German culture and history through travel experiences.',
                        'goals' => ['Travel', 'Cultural Exploration'],
                    ],
                    [
                        'name' => 'Advanced Writing Skills - Composition and Analysis',
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
                        'description' => 'Master the passive voice and conditional mood in complex German grammar.',
                        'goals' => ['Academic Study'],
                    ],
                    [
                        'name' => 'Advanced Vocabulary - Word Formation and Synonyms',
                        'description' => 'Expand your vocabulary by learning word formation techniques and synonyms.',
                        'goals' => ['Cultural Exploration', 'Other'],
                    ],
                    [
                        'name' => 'Business and Professional German - Negotiation and Presentation',
                        'description' => 'Develop negotiation and presentation skills for business and professional settings.',
                        'goals' => ['Business Communication'],
                    ],
                    [
                        'name' => 'Culture and Society - Diversity and Integration',
                        'description' => 'Explore diversity and integration in German culture and society.',
                        'goals' => ['Cultural Exploration'],
                    ],
                    [
                        'name' => 'German for Academic Purposes - Research and Publication',
                        'description' => 'Learn the language skills needed for research and publication in academic German.',
                        'goals' => ['Academic Study'],
                    ],
                    [
                        'name' => 'Advanced Communication Skills - Social Interaction and Conflict Resolution',
                        'description' => 'Improve your social interaction and conflict resolution skills in German.',
                        'goals' => ['Business Communication', 'Cultural Exploration'],
                    ],
                    [
                        'name' => 'Travel and Cultural Immersion - Regional Diversity and Traditions',
                        'description' => 'Discover regional diversity and traditions in German-speaking countries through cultural immersion.',
                        'goals' => ['Travel', 'Cultural Exploration'],
                    ],
                    [
                        'name' => 'Advanced Writing Skills - Stylistic Devices and Advanced Structures',
                        'description' => 'Refine your writing skills by learning stylistic devices and advanced structures.',
                        'goals' => ['Academic Study'],
                    ],
                    [
                        'name' => 'Professional Certifications - Test Preparation and Practice',
                        'description' => 'Prepare for professional certifications with test preparation and practice exercises.',
                        'goals' => ['Business Communication', 'Academic Study'],
                    ],
                    [
                        'name' => 'Advanced Conversation and Debate - Cultural and Global Topics',
                        'description' => 'Engage in advanced conversation and debate on cultural and global topics in German.',
                        'goals' => ['Business Communication', 'Cultural Exploration'],
                    ],
                ],
            ],
        ];





        foreach ($lessonsData as $levelData) {
            $level = Level::where('name', $levelData['level'])->first();

            if ($level) {
                foreach ($levelData['lessons'] as $lessonData) {
                    $lesson = new Lesson([
                        'name' => $lessonData['name'],
                        'description' => $lessonData['description'], // Add description if needed
                        'content' => '', // Add content if needed
                    ]);

                    $lesson->level()->associate($level);
                    $lesson->save();

                    foreach ($lessonData['goals'] as $goalName) {
                        if (isset($goals[$goalName])) {
                            $lesson->goals()->attach($goals[$goalName]);
                        }
                    }
                }
            }
        }
    }
}
