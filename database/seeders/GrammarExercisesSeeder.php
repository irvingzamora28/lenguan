<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Course;
use App\Models\Exercise;
use App\Models\Lesson;
use App\Models\GrammarExercise;

class GrammarExercisesSeeder extends Seeder
{
    public function run()
    {
        // Structured array of exercises
        $grammarExercises = [
            [
                'course_name' => "German for Beginners",
                'lesson_number' => 4,
                'exercises' => [
                    [
                        'prompt' => "Der Mann ist eine Lehrerin.",
                        'answer' => "Der Mann ist ein Lehrer.",
                        'explanation' => "Correct 'eine Lehrerin' (feminine) to 'ein Lehrer' (masculine) to match the masculine noun 'Mann'."
                    ],
                    [
                        'prompt' => "Eine Katze laufen schnell.",
                        'answer' => "Eine Katze läuft schnell.",
                        'explanation' => "Correct the verb 'laufen' to 'läuft' to agree with the singular subject 'Katze'."
                    ],
                    [
                        'prompt' => "Das Kinder spielen im Park.",
                        'answer' => "Die Kinder spielen im Park.",
                        'explanation' => "Correct the article 'das' to 'die' for the plural noun 'Kinder'."
                    ],
                    [
                        'prompt' => "Ein Frau liest ein Buch.",
                        'answer' => "Eine Frau liest ein Buch.",
                        'explanation' => "Correct 'Ein Frau' to 'Eine Frau', using the correct feminine indefinite article 'eine'."
                    ],
                    [
                        'prompt' => "Das Auto ist groß und schnell.",
                        'answer' => "Das Auto ist groß und schnell.",
                        'explanation' => "Trick question, the sentence is already correct."
                    ],
                ],
            ],
            [
                'course_name' => "German for Beginners",
                'lesson_number' => 5,
                'exercises' => [
                    [
                        'prompt' => "Du isst ein Apfel.",
                        'answer' => "Du isst einen Apfel.",
                        'explanation' => "Correct 'ein Apfel' to 'einen Apfel', using the correct masculine accusative article 'einen'.",
                    ],
                    [
                        'prompt' => "Sie trinken Wasser.",
                        'answer' => "Sie trinkt Wasser.",
                        'explanation' => "Correct the verb 'trinken' to 'trinkt' to agree with the singular subject 'Sie'.",
                    ],
                    [
                        'prompt' => "Ich höre Musik gerne.",
                        'answer' => "Ich höre gerne Musik.",
                        'explanation' => "Reorder the sentence to 'Ich höre gerne Musik' for the correct sentence structure.",
                    ],
                    [
                        'prompt' => "Er laufe in den Park.",
                        'answer' => "Er läuft in den Park.",
                        'explanation' => "Correct the verb 'laufe' to 'läuft' to match the singular subject 'Er'.",
                    ],
                    [
                        'prompt' => "Wir spricht Deutsch.",
                        'answer' => "Wir sprechen Deutsch.",
                        'explanation' => "Correct the verb 'spricht' to 'sprechen' for the plural subject 'Wir'.",
                    ],
                ],
            ],
            [
                'course_name' => "German for Beginners",
                'lesson_number' => 11,
                'exercises' => [
                    [
                        'prompt' => "Ich habe einen Buch.",
                        'answer' => "Ich habe ein Buch.",
                        'explanation' => "Correct 'einen Buch' to 'ein Buch', using the correct neuter accusative article 'ein' for 'Buch'.",
                    ],
                    [
                        'prompt' => "Der Hund folgt dem Frau.",
                        'answer' => "Der Hund folgt der Frau.",
                        'explanation' => "Correct 'dem Frau' to 'der Frau', using the correct feminine dative article 'der'.",
                    ],
                    [
                        'prompt' => "Wir antworten den Lehrer.",
                        'answer' => "Wir antworten dem Lehrer.",
                        'explanation' => "Correct 'den Lehrer' to 'dem Lehrer', using the correct masculine dative article 'dem'.",
                    ],
                    [
                        'prompt' => "Das Geschenk ist für das Kind.",
                        'answer' => "Das Geschenk ist für das Kind.",
                        'explanation' => "Trick question, the sentence is already correct.",
                    ],
                    [
                        'prompt' => "Er kommt aus der Universität.",
                        'answer' => "Er kommt aus der Universität.",
                        'explanation' => "Trick question, the sentence is already correct.",
                    ],
                ],
            ],
            [
                'course_name' => "German for Beginners",
                'lesson_number' => 12,
                'exercises' => [
                    [
                        'prompt' => "Die schnelle Mann läuft in den Park.",
                        'answer' => "Der schnelle Mann läuft in den Park.",
                        'explanation' => "Correct 'Die schnelle Mann' to 'Der schnelle Mann', using the correct masculine nominative article 'der'.",
                    ],
                    [
                        'prompt' => "Ich sehe eine großen Hund.",
                        'answer' => "Ich sehe einen großen Hund.",
                        'explanation' => "Correct 'eine großen Hund' to 'einen großen Hund', using the correct masculine accusative article 'einen'.",
                    ],
                    [
                        'prompt' => "Sie hat ein rote Tasche gekauft.",
                        'answer' => "Sie hat eine rote Tasche gekauft.",
                        'explanation' => "Correct 'ein rote Tasche' to 'eine rote Tasche', using the correct feminine accusative article 'eine'.",
                    ],
                    [
                        'prompt' => "Der alte Mann und die junge Frau ist Freunde.",
                        'answer' => "Der alte Mann und die junge Frau sind Freunde.",
                        'explanation' => "Correct 'ist' to 'sind' to agree with the plural subject 'Der alte Mann und die junge Frau'.",
                    ],
                    [
                        'prompt' => "Wir essen frisch Brot.",
                        'answer' => "Wir essen frisches Brot.",
                        'explanation' => "Add the correct adjective ending 'frisches' to match the neuter noun 'Brot'.",
                    ],
                ],
            ],
            [
                'course_name' => "German for Beginners",
                'lesson_number' => 13,
                'exercises' => [
                    [
                        'prompt' => "Ich warte auf dem Bus.",
                        'answer' => "Ich warte auf den Bus.",
                        'explanation' => "Correct 'auf dem Bus' to 'auf den Bus', using the correct masculine accusative article 'den' for 'Bus'.",
                    ],
                    [
                        'prompt' => "Er geht durch die Park.",
                        'answer' => "Er geht durch den Park.",
                        'explanation' => "Correct 'durch die Park' to 'durch den Park', using the correct masculine accusative article 'den'.",
                    ],
                    [
                        'prompt' => "Wir fahren über die Brücke.",
                        'answer' => "Wir fahren über die Brücke.",
                        'explanation' => "Trick question, the sentence is already correct.",
                    ],
                    [
                        'prompt' => "Sie laufen gegen der Mauer.",
                        'answer' => "Sie laufen gegen die Mauer.",
                        'explanation' => "Correct 'gegen der Mauer' to 'gegen die Mauer', using the correct feminine accusative article 'die'.",
                    ],
                    [
                        'prompt' => "Das Kind spielt neben das Auto.",
                        'answer' => "Das Kind spielt neben dem Auto.",
                        'explanation' => "Correct 'neben das Auto' to 'neben dem Auto', using the correct neuter dative article 'dem' for 'Auto'.",
                    ],
                ],
            ],
            [
                'course_name' => "German for Beginners",
                'lesson_number' => 14,
                'exercises' => [
                    [
                        'prompt' => "Ich gebe das Buch zu mein Bruder.",
                        'answer' => "Ich gebe das Buch meinem Bruder.",
                        'explanation' => "Correct 'zu mein Bruder' to 'meinem Bruder', using the correct dative form 'meinem'.",
                    ],
                    [
                        'prompt' => "Der Hund liegt unter das Bett.",
                        'answer' => "Der Hund liegt unter dem Bett.",
                        'explanation' => "Correct 'unter das Bett' to 'unter dem Bett', using the correct neuter dative article 'dem' for 'Bett'.",
                    ],
                    [
                        'prompt' => "Sie spricht mit der Lehrerin.",
                        'answer' => "Sie spricht mit der Lehrerin.",
                        'explanation' => "Trick question, the sentence is already correct.",
                    ],
                    [
                        'prompt' => "Wir stehen vor das Kino.",
                        'answer' => "Wir stehen vor dem Kino.",
                        'explanation' => "Correct 'vor das Kino' to 'vor dem Kino', using the correct neuter dative article 'dem' for 'Kino'.",
                    ],
                    [
                        'prompt' => "Das Geschenk ist von meine Eltern.",
                        'answer' => "Das Geschenk ist von meinen Eltern.",
                        'explanation' => "Correct 'von meine Eltern' to 'von meinen Eltern', using the correct dative plural form 'meinen'.",
                    ],
                ],
            ],
            [
                "course_name" => "Spanish for Everyone",
                "lesson_number" => 3,
                "exercises" => [
                    [
                        "prompt" => "Hola, me llamo es Juan.",
                        "answer" => "Hola, me llamo Juan.",
                        "explanation" => "Remove 'es' after 'llamo' for the correct introduction phrase."
                    ],
                    [
                        "prompt" => "Buenos dias, como estas hoy?",
                        "answer" => "Buenos días, ¿cómo estás hoy?",
                        "explanation" => "Add the accent on 'días' and 'cómo', and include the opening question mark."
                    ],
                    [
                        "prompt" => "Mucho gusto en conocerte.",
                        "answer" => "Mucho gusto en conocerte.",
                        "explanation" => "Trick question, the sentence is already correct."
                    ],
                    [
                        "prompt" => "Adios, hasta luego.",
                        "answer" => "Adiós, hasta luego.",
                        "explanation" => "Add the accent on 'Adiós'."
                    ],
                    [
                        "prompt" => "Buenas noches, señor.",
                        "answer" => "Buenas noches, señor.",
                        "explanation" => "Trick question, the sentence is already correct."
                    ],
                ],
            ],
            [
                'course_name' => "Spanish for Everyone",
                'lesson_number' => 5,
                'exercises' => [
                    [
                        'prompt' => "El niña es alto.",
                        'answer' => "La niña es alta.",
                        'explanation' => "Correct 'El niña' to 'La niña' and match the adjective 'alta' to the feminine noun.",
                    ],
                    [
                        'prompt' => "Un gatos negros.",
                        'answer' => "Unos gatos negros.",
                        'explanation' => "Correct 'Un gatos' to 'Unos gatos' for plural masculine nouns.",
                    ],
                    [
                        'prompt' => "Ella es mi amigo.",
                        'answer' => "Ella es mi amiga.",
                        'explanation' => "Correct 'amigo' to 'amiga' to match the feminine pronoun 'Ella'.",
                    ],
                    [
                        'prompt' => "El hombres son fuertes.",
                        'answer' => "Los hombres son fuertes.",
                        'explanation' => "Correct 'El hombres' to 'Los hombres' for the plural masculine noun.",
                    ],
                    [
                        'prompt' => "Eso es su libro.",
                        'answer' => "Ese es su libro.",
                        'explanation' => "Correct 'Eso' to 'Ese' to match the masculine noun 'libro'.",
                    ],
                ],
            ],
            [
                "course_name" => "Spanish for Everyone",
                "lesson_number" => 6,
                "exercises" => [
                    [
                        "prompt" => "El mesa es grande.",
                        "answer" => "La mesa es grande.",
                        "explanation" => "Correct 'El mesa' to 'La mesa', adjusting the article to match the feminine noun 'mesa'."
                    ],
                    [
                        "prompt" => "Un libro interesante.",
                        "answer" => "Un libro interesante.",
                        "explanation" => "Trick question, the sentence is already correct."
                    ],
                    [
                        "prompt" => "La gato duerme en el sofá.",
                        "answer" => "El gato duerme en el sofá.",
                        "explanation" => "Correct 'La gato' to 'El gato', adjusting the article to match the masculine noun 'gato'."
                    ],
                    [
                        "prompt" => "El agua es frío.",
                        "answer" => "El agua es fría.",
                        "explanation" => "Correct 'frío' to 'fría', adjusting the adjective to match the feminine noun 'agua'."
                    ],
                    [
                        "prompt" => "Una problema difícil.",
                        "answer" => "Un problema difícil.",
                        "explanation" => "Correct 'Una problema' to 'Un problema', using the masculine article 'un' for the masculine noun 'problema'."
                    ],
                ],
            ],
            [
                'course_name' => "Spanish for Everyone",
                'lesson_number' => 7,
                'exercises' => [
                    [
                        'prompt' => "Nosotros come en la escuela.",
                        'answer' => "Nosotros comemos en la escuela.",
                        'explanation' => "Correct the verb 'come' to 'comemos' to match the subject 'Nosotros'.",
                    ],
                    [
                        'prompt' => "Ellos bebe agua.",
                        'answer' => "Ellos beben agua.",
                        'explanation' => "Correct 'bebe' to 'beben' for the plural subject 'Ellos'.",
                    ],
                    [
                        'prompt' => "Yo corre todos los días.",
                        'answer' => "Yo corro todos los días.",
                        'explanation' => "Correct the verb 'corre' to 'corro' for the first person singular 'Yo'.",
                    ],
                    [
                        'prompt' => "Tú escribir una carta.",
                        'answer' => "Tú escribes una carta.",
                        'explanation' => "Correct 'escribir' to 'escribes' to agree with the subject 'Tú'.",
                    ],
                    [
                        'prompt' => "Ella habla con su madre.",
                        'answer' => "Ella habla con su madre.",
                        'explanation' => "Trick question, the sentence is already correct.",
                    ],
                ],
            ],
            [
                "course_name" => "Spanish for Everyone",
                "lesson_number" => 13,
                "exercises" => [
                    [
                        "prompt" => "Este libro es más interesante que el otro libro.",
                        "answer" => "Este libro es más interesante que el otro libro.",
                        "explanation" => "Trick question, the sentence is already correct."
                    ],
                    [
                        "prompt" => "Ella es tan alta como su hermano.",
                        "answer" => "Ella es tan alta como su hermano.",
                        "explanation" => "Trick question, the sentence is already correct."
                    ],
                    [
                        "prompt" => "Él es más mayor que su prima.",
                        "answer" => "Él es mayor que su prima.",
                        "explanation" => "Remove the redundant 'más' from 'más mayor' since 'mayor' already implies comparison."
                    ],
                    [
                        "prompt" => "Esta casa es la más grande de la ciudad.",
                        "answer" => "Esta casa es la más grande de la ciudad.",
                        "explanation" => "Trick question, the sentence is already correct."
                    ],
                    [
                        "prompt" => "Mi perro es más pequeño que tu gato.",
                        "answer" => "Mi perro es más pequeño que tu gato.",
                        "explanation" => "Trick question, the sentence is already correct."
                    ],
                ],
            ],
            [
                "course_name" => "Spanish for Everyone",
                "lesson_number" => 14,
                "exercises" => [
                    [
                        "prompt" => "Hablas más despacio.",
                        "answer" => "Habla más despacio.",
                        "explanation" => "Correct 'Hablas' to 'Habla' for the imperative form addressing 'you' (tú) in a formal context."
                    ],
                    [
                        "prompt" => "No corre en el pasillo.",
                        "answer" => "No corras en el pasillo.",
                        "explanation" => "Correct 'corre' to 'corras' for the negative imperative form addressing 'you' (tú)."
                    ],
                    [
                        "prompt" => "Escuchen con atención.",
                        "answer" => "Escuchen con atención.",
                        "explanation" => "Trick question, the sentence is already correct."
                    ],
                    [
                        "prompt" => "Venir aquí ahora.",
                        "answer" => "Ven aquí ahora.",
                        "explanation" => "Correct 'Venir' to 'Ven', using the imperative form of 'venir' for 'you' (tú)."
                    ],
                    [
                        "prompt" => "No tocas ese botón.",
                        "answer" => "No toques ese botón.",
                        "explanation" => "Correct 'tocas' to 'toques' for the negative imperative form addressing 'you' (tú)."
                    ],
                ],
            ],
            [
                "course_name" => "Spanish for Everyone",
                "lesson_number" => 15,
                "exercises" => [
                    [
                        "prompt" => "Ella es un persona muy simpática.",
                        "answer" => "Ella es una persona muy simpática.",
                        "explanation" => "Correct 'un persona' to 'una persona', using the correct feminine article 'una' for the feminine noun 'persona'."
                    ],
                    [
                        "prompt" => "Mi hermano es más alto que yo.",
                        "answer" => "Mi hermano es más alto que yo.",
                        "explanation" => "Trick question, the sentence is already correct."
                    ],
                    [
                        "prompt" => "Tu padre parece cansado siempre.",
                        "answer" => "Tu padre parece siempre cansado.",
                        "explanation" => "Reposition 'siempre' to before 'cansado' for the correct sentence structure."
                    ],
                    [
                        "prompt" => "Ellos son inteligente y amable.",
                        "answer" => "Ellos son inteligentes y amables.",
                        "explanation" => "Correct 'inteligente y amable' to 'inteligentes y amables', agreeing with the plural subject 'ellos'."
                    ],
                    [
                        "prompt" => "Esa mujer tiene los ojos azul.",
                        "answer" => "Esa mujer tiene los ojos azules.",
                        "explanation" => "Correct 'azul' to 'azules', using the plural form of the adjective to match 'ojos'."
                    ],
                ],
            ],
            [
                "course_name" => "Spanish for Everyone",
                "lesson_number" => 16,
                "exercises" => [
                    [
                        "prompt" => "Como se llama tu?",
                        "answer" => "¿Cómo te llamas tú?",
                        "explanation" => "Add the accent on 'Cómo' and the opening question mark to form a correct question. Use 'te llamas' for the second person singular 'tú' instead of 'se llama' which is for third person singular."
                    ],
                    [
                        "prompt" => "El es de Espana.",
                        "answer" => "Él es de España.",
                        "explanation" => "Correct 'El' to 'Él' for the pronoun and add the tilde on 'España'."
                    ],
                    [
                        "prompt" => "Te gustaria comer algo",
                        "answer" => "¿Te gustaría comer algo?",
                        "explanation" => "Add the accent on 'gustaría' and include both opening and closing question marks."
                    ],
                    [
                        "prompt" => "Ella esta feliz.",
                        "answer" => "Ella está feliz.",
                        "explanation" => "Add the accent on 'está' to distinguish it as the verb 'to be'."
                    ],
                    [
                        "prompt" => "El niño se llama Andrés.",
                        "answer" => "El niño se llama Andrés.",
                        "explanation" => "Trick question, the sentence is already correct."
                    ],
                ],
            ],
            [
                "course_name" => "Inglés para todos",
                "lesson_number" => 4,
                "exercises" => [
                    [
                        "prompt" => "A cat are under the table.",
                        "answer" => "A cat is under the table.",
                        "explanation" => "Corrige 'are' a 'is' para concordar con el sustantivo singular 'cat'."
                    ],
                    [
                        "prompt" => "She have a red book.",
                        "answer" => "She has a red book.",
                        "explanation" => "Corrige 'have' a 'has' para coincidir con el pronombre singular de tercera persona 'She'."
                    ],
                    [
                        "prompt" => "They is my friends.",
                        "answer" => "They are my friends.",
                        "explanation" => "Corrige 'is' a 'are' para el pronombre plural 'They'."
                    ],
                    [
                        "prompt" => "This is an apples.",
                        "answer" => "This is an apple.",
                        "explanation" => "Corrige 'apples' a 'apple' para coincidir con el artículo singular 'an'."
                    ],
                    [
                        "prompt" => "He like the blue car.",
                        "answer" => "He likes the blue car.",
                        "explanation" => "Añade 's' a 'like' para formar 'likes', coincidiendo con el sujeto singular de tercera persona 'He'."
                    ],
                ],
            ],
            [
                "course_name" => "Inglés para todos",
                "lesson_number" => 6,
                "exercises" => [
                    [
                        "prompt" => "I goes to school every day.",
                        "answer" => "I go to school every day.",
                        "explanation" => "Corrige 'goes' a 'go' para coincidir con el sujeto singular de primera persona 'I'."
                    ],
                    [
                        "prompt" => "She drink coffee in the morning.",
                        "answer" => "She drinks coffee in the morning.",
                        "explanation" => "Añade 's' a 'drink' para formar 'drinks', coincidiendo con el sujeto singular de tercera persona 'She'."
                    ],
                    [
                        "prompt" => "We walks to the park.",
                        "answer" => "We walk to the park.",
                        "explanation" => "Corrige 'walks' a 'walk' para el sujeto plural 'We'."
                    ],
                    [
                        "prompt" => "He do his homework every night.",
                        "answer" => "He does his homework every night.",
                        "explanation" => "Corrige 'do' a 'does' para concordar con el sujeto singular de tercera persona 'He'."
                    ],
                    [
                        "prompt" => "They plays football on Saturdays.",
                        "answer" => "They play football on Saturdays.",
                        "explanation" => "Corrige 'plays' a 'play' para el sujeto plural 'They'."
                    ],
                ],
            ],
            [
                "course_name" => "Inglés para todos",
                "lesson_number" => 7,
                "exercises" => [
                    [
                        "prompt" => "The book is on front of the computer.",
                        "answer" => "The book is in front of the computer.",
                        "explanation" => "Corrige 'on front of' a 'in front of' para usar la frase preposicional correcta."
                    ],
                    [
                        "prompt" => "She sits next the window.",
                        "answer" => "She sits next to the window.",
                        "explanation" => "Añade 'to' después de 'next' para completar la frase preposicional 'next to'."
                    ],
                    [
                        "prompt" => "There is a cat under the table.",
                        "answer" => "There is a cat under the table.",
                        "explanation" => "Pregunta trampa, la oración ya es correcta."
                    ],
                    [
                        "prompt" => "The keys are above the shelf.",
                        "answer" => "The keys are on the shelf.",
                        "explanation" => "Corrige 'above the shelf' a 'on the shelf' para la posición correcta."
                    ],
                    [
                        "prompt" => "My phone is beside of my bed.",
                        "answer" => "My phone is beside my bed.",
                        "explanation" => "Elimina 'of' después de 'beside' para el uso correcto de la preposición."
                    ],
                ],
            ],
            [
                "course_name" => "Inglés para todos",
                "lesson_number" => 12,
                "exercises" => [
                    [
                        "prompt" => "This is her book and that is you book.",
                        "answer" => "This is her book and that is your book.",
                        "explanation" => "Corrige 'you book' a 'your book' para usar el adjetivo posesivo correcto."
                    ],
                    [
                        "prompt" => "They are looking for its ball.",
                        "answer" => "They are looking for their ball.",
                        "explanation" => "Corrige 'its' a 'their' para coincidir con el sujeto plural 'They'."
                    ],
                    [
                        "prompt" => "Is this yours pen?",
                        "answer" => "Is this your pen?",
                        "explanation" => "Corrige 'yours pen' a 'your pen' para usar el adjetivo posesivo correcto."
                    ],
                    [
                        "prompt" => "Her bag is the same color as me.",
                        "answer" => "Her bag is the same color as mine.",
                        "explanation" => "Corrige 'me' a 'mine' para usar el pronombre posesivo."
                    ],
                    [
                        "prompt" => "Our house is bigger than they.",
                        "answer" => "Our house is bigger than theirs.",
                        "explanation" => "Corrige 'they' a 'theirs' para usar el pronombre posesivo."
                    ],
                ],
            ],
            [
                "course_name" => "Inglés para todos",
                "lesson_number" => 9,
                "exercises" => [
                    [
                        "prompt" => "He wears a blue jeans and a red shirt.",
                        "answer" => "He wears blue jeans and a red shirt.",
                        "explanation" => "Corrige 'a blue jeans' a 'blue jeans', ya que 'jeans' se usa como un sustantivo plural."
                    ],
                    [
                        "prompt" => "She have long, curly hair and green eyes.",
                        "answer" => "She has long, curly hair and green eyes.",
                        "explanation" => "Corrige 'have' a 'has' para concordar con el sujeto singular de tercera persona 'She'."
                    ],
                    [
                        "prompt" => "They are wearing a matching shoes.",
                        "answer" => "They are wearing matching shoes.",
                        "explanation" => "Elimina 'a' antes de 'matching shoes', ya que 'shoes' es plural."
                    ],
                    [
                        "prompt" => "The man with the glasses are tall.",
                        "answer" => "The man with the glasses is tall.",
                        "explanation" => "Corrige 'are' a 'is' para concordar con el sustantivo singular 'man'."
                    ],
                    [
                        "prompt" => "She's got a black and white scarf.",
                        "answer" => "She's got a black and white scarf.",
                        "explanation" => "Pregunta trampa, la oración ya es correcta."
                    ],
                ],
            ],
            [
                "course_name" => "Inglés para todos",
                "lesson_number" => 10,
                "exercises" => [
                    [
                        "prompt" => "I likes reading books and playing guitar.",
                        "answer" => "I like reading books and playing guitar.",
                        "explanation" => "Corrige 'likes' a 'like' para coincidir con el sujeto singular de primera persona 'I'."
                    ],
                    [
                        "prompt" => "They enjoys playing football on weekends.",
                        "answer" => "They enjoy playing football on weekends.",
                        "explanation" => "Corrige 'enjoys' a 'enjoy' para el sujeto plural 'They'."
                    ],
                    [
                        "prompt" => "He go to the gym every morning.",
                        "answer" => "He goes to the gym every morning.",
                        "explanation" => "Corrige 'go' a 'goes' para concordar con el sujeto singular de tercera persona 'He'."
                    ],
                    [
                        "prompt" => "We plays chess in the evenings.",
                        "answer" => "We play chess in the evenings.",
                        "explanation" => "Corrige 'plays' a 'play' para el sujeto plural 'We'."
                    ],
                    [
                        "prompt" => "She is interested in collect stamps.",
                        "answer" => "She is interested in collecting stamps.",
                        "explanation" => "Cambia 'collect' a 'collecting' para usar la forma de gerundio después de la preposición 'in'."
                    ],
                ],
            ],
            [
                "course_name" => "Inglés para todos",
                "lesson_number" => 12,
                "exercises" => [
                    [
                        "prompt" => "Her book is more interesting than my.",
                        "answer" => "Her book is more interesting than mine.",
                        "explanation" => "Corrige 'my' a 'mine' para usar el pronombre posesivo correcto."
                    ],
                    [
                        "prompt" => "This is its ball.",
                        "answer" => "This is its ball.",
                        "explanation" => "Pregunta trampa, la oración ya es correcta."
                    ],
                    [
                        "prompt" => "Their car is bigger than our.",
                        "answer" => "Their car is bigger than ours.",
                        "explanation" => "Corrige 'our' a 'ours' para utilizar el pronombre posesivo correcto."
                    ],
                    [
                        "prompt" => "Is this you pen?",
                        "answer" => "Is this your pen?",
                        "explanation" => "Corrige 'you' a 'your' para usar el adjetivo posesivo correcto."
                    ],
                    [
                        "prompt" => "His shoes are different from her.",
                        "answer" => "His shoes are different from hers.",
                        "explanation" => "Corrige 'her' a 'hers' para usar el pronombre posesivo correcto."
                    ],
                ],
            ],
        ];

        foreach ($grammarExercises as $item) {
            // Retrieve course by name
            $course = Course::where('name', $item['course_name'])->first();
            if (!$course) {
                continue; // Skip if course not found
            }

            // Retrieve lesson by number within the course
            $lesson = $lesson = $course->lessons()->where('lesson_number', $item['lesson_number'])->first();
            if (!$lesson) {
                continue; // Skip if lesson not found
            }

            foreach ($item['exercises'] as $exerciseData) {
                // Create a new grammar exercise
                $exercise = new GrammarExercise();
                $exercise->prompt = $exerciseData['prompt'];
                $exercise->answer = $exerciseData['answer'];
                $exercise->explanation = $exerciseData['explanation'];
                $exercise->lesson_id = $lesson->id;

                // Save the exercise
                $exercise->save();
                $exerciseForGrammar = Exercise::create([
                    'exerciseable_id' => $exercise->id,
                    'exerciseable_type' => get_class($exercise),
                    'lesson_id' => $lesson->id

                ]);
            }
        }
    }
}
