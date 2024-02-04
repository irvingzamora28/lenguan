<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Exercise;
use App\Models\TenseConjugation;
use App\Models\VerbConjugationExercise;
use Illuminate\Database\Seeder;

class VerbConjugationExerciseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // List of german verbs
        // 1. sein -> to be
        // 2. haben -> to have
        // 3. werden -> to become
        // 4. können -> can, to be able to
        // 5. müssen -> must, to have to
        // 6. sagen -> to say
        // 7. machen -> to do, make
        // 8. geben -> to give
        // 9. kommen -> to come
        // 10. sollen -> should, ought to
        // 11. wollen -> to want
        // 12. gehen -> to go
        // 13. wissen -> to know
        // 14. sehen -> to see
        // 15. lassen -> to let, allow, have done
        // 16. stehen -> to stand
        // 17. finden -> to find
        // 18. bleiben -> to stay, remain
        // 19. liegen -> to lie, be lying
        // 20. heißen -> to be called
        // 21. denken -> to think
        // 22. nehmen  -> to take
        // 23. tun -> to do
        // 24. dürfen -> may, to be allowed
        // 25. glauben -> to believe
        // 26. halten -> to stop, hold
        // 27. nennen -> to name, to call (a name)
        // 28. mögen -> to like
        // 29. zeigen -> to show
        // 30. führen -> to lead
        // 31. sprechen -> to speak
        // 32. bringen -> to bring, take
        // 33. leben -> to live
        // 34. fahren -> to drive, ride, go
        // 35. meine ->  to think, have an opinion
        // 36. fragen -> to ask
        // 37. kennen -> to know
        // 38. gelten -> to be valid
        // 39. stellen -> to place, set
        // 40. spiele ->  to play
        // 41. arbeiten -> to work
        // 42. brauchen -> to need
        // 43. folgen -> to follow
        // 44. lerne ->  to learn
        // 45. bestehen -> to exist, insist, pass (an exam)
        // 46. verstehen -> to understand
        // 47. setzen -> to set, put, place
        // 48. bekommen -> to get, receive
        // 49. beginnen -> to begin
        // 50. erzählen -> to narrate, tell
        // 51. versuchen -> to try, attempt
        // 52. schreiben -> to write
        // 53. laufe ->  to run
        // 54. erklären -> to explain
        // 55. entsprechen -> to correspond
        // 56. sitzen -> to sit
        // 57. ziehen -> to pull, move
        // 58. scheinen -> to shine, seem, appear
        // 59. fallen -> to fall
        // 60. gehören -> to belong
        // 61. entstehen -> to originate, develop
        // 62. erhalten -> to receive
        // 63. treffen -> to meet
        // 64. suche ->  to search, look for 
        // 65. legen -> to lay, put
        // 66. vor·stelle ->  to introduce, imagine
        // 67. handeln -> to deal, trade
        // 68. erreiche ->  to achieve, reach
        // 69. tragen -> to carry, wear
        // 70. schaffen -> to manage, create
        // 71. lesen -> to read
        // 72. verliere ->  to lose
        // 73. dar·stelle ->  to depict, portray
        // 74. erkennen -> to recognize, admit
        // 75. entwickeln -> to develop
        // 76. reden -> to talk
        // 77. aus·sehe ->  to appear, look (a certain way)
        // 78. erscheinen -> to appear
        // 79. bilde ->  to form, educate
        // 80. an·fange ->  to begin
        // 81. erwarten -> to expect
        // 82. wohne ->  to live
        // 83. betreffen -> to affect, concern
        // 84. warten -> to wait
        // 85. vergehen -> to elapse; to decay
        // 86. helfe ->  to help
        // 87. gewinnen -> to win
        // 88. schließen -> to close
        // 89. fühlen -> to feel
        // 90. bieten -> to offer
        // 91. interessiere -> to interest 
        // 92. erinnern -> to remember
        // 93. ergeben -> to result in
        // 94. an·bieten -> to offer
        // 95. studieren -> to study
        // 96. verbinde ->  to connect, link
        // 97. an·sehen -> to look at, watch
        // 98. fehlen -> to lack, be missing, be absent
        // 99. bedeute ->  to mean
        // 100. vergleichen -> to compare

        $germanVerbConjugations = [
            [
                'verb' => 'sein',
                'tense' => 'Präsens',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => "bin"],
                    ['pronoun' => 'du', 'conjugation' => "bist"],
                    ['pronoun' => 'er', 'conjugation' => "ist"],
                    ['pronoun' => 'sie (she)', 'conjugation' => "ist"],
                    ['pronoun' => 'es', 'conjugation' => "ist"],
                    ['pronoun' => 'wir', 'conjugation' => "sind"],
                    ['pronoun' => 'ihr', 'conjugation' => "seid"],
                    ['pronoun' => 'sie (they)', 'conjugation' => "sind"],
                    ['pronoun' => 'Sie', 'conjugation' => "sind"]
                ],
            ],
            [
                'verb' => 'sein',
                'tense' => 'Präteritum',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => "war"],
                    ['pronoun' => 'du', 'conjugation' => "warst"],
                    ['pronoun' => 'er', 'conjugation' => "war"],
                    ['pronoun' => 'sie (she)', 'conjugation' => "war"],
                    ['pronoun' => 'es', 'conjugation' => "war"],
                    ['pronoun' => 'wir', 'conjugation' => "waren"],
                    ['pronoun' => 'ihr', 'conjugation' => "wart"],
                    ['pronoun' => 'sie (they)', 'conjugation' => "waren"],
                    ['pronoun' => 'Sie', 'conjugation' => "waren"]
                ]
            ],
            [
                'verb' => 'sein',
                'tense' => 'Perfekt',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => "bin gewesen"],
                    ['pronoun' => 'du', 'conjugation' => "bist gewesen"],
                    ['pronoun' => 'er', 'conjugation' => "ist gewesen"],
                    ['pronoun' => 'sie (she)', 'conjugation' => "ist gewesen"],
                    ['pronoun' => 'es', 'conjugation' => "ist gewesen"],
                    ['pronoun' => 'wir', 'conjugation' => "sind gewesen"],
                    ['pronoun' => 'ihr', 'conjugation' => "seid gewesen"],
                    ['pronoun' => 'sie (they)', 'conjugation' => "sind gewesen"],
                    ['pronoun' => 'Sie', 'conjugation' => "sind gewesen"]
                ]
            ],
            [
                'verb' => 'haben',
                'tense' => 'Präsens',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => "habe"],
                    ['pronoun' => 'du', 'conjugation' => "hast"],
                    ['pronoun' => 'er', 'conjugation' => "hat"],
                    ['pronoun' => 'sie (she)', 'conjugation' => "hat"],
                    ['pronoun' => 'es', 'conjugation' => "hat"],
                    ['pronoun' => 'wir', 'conjugation' => "haben"],
                    ['pronoun' => 'ihr', 'conjugation' => "habt"],
                    ['pronoun' => 'sie (they)', 'conjugation' => "haben"],
                    ['pronoun' => 'Sie', 'conjugation' => "haben"]
                ]
            ],
            [
                'verb' => 'haben',
                'tense' => 'Präteritum',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => "hatte"],
                    ['pronoun' => 'du', 'conjugation' => "hattest"],
                    ['pronoun' => 'er', 'conjugation' => "hatte"],
                    ['pronoun' => 'sie (she)', 'conjugation' => "hatte"],
                    ['pronoun' => 'es', 'conjugation' => "hatte"],
                    ['pronoun' => 'wir', 'conjugation' => "hatten"],
                    ['pronoun' => 'ihr', 'conjugation' => "hattet"],
                    ['pronoun' => 'sie (they)', 'conjugation' => "hatten"],
                    ['pronoun' => 'Sie', 'conjugation' => "hatten"]
                ]
            ],
            [
                'verb' => 'haben',
                'tense' => 'Perfekt',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => "habe gehabt"],
                    ['pronoun' => 'du', 'conjugation' => "hast gehabt"],
                    ['pronoun' => 'er', 'conjugation' => "hat gehabt"],
                    ['pronoun' => 'sie (she)', 'conjugation' => "hat gehabt"],
                    ['pronoun' => 'es', 'conjugation' => "hat gehabt"],
                    ['pronoun' => 'wir', 'conjugation' => "haben gehabt"],
                    ['pronoun' => 'ihr', 'conjugation' => "habt gehabt"],
                    ['pronoun' => 'sie (they)', 'conjugation' => "haben gehabt"],
                    ['pronoun' => 'Sie', 'conjugation' => "haben gehabt"]
                ]
            ],
            [
                'verb' => 'machen',
                'tense' => 'Präsens',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => "mache"],
                    ['pronoun' => 'du', 'conjugation' => "machst"],
                    ['pronoun' => 'er', 'conjugation' => "macht"],
                    ['pronoun' => 'sie (she)', 'conjugation' => "macht"],
                    ['pronoun' => 'es', 'conjugation' => "macht"],
                    ['pronoun' => 'wir', 'conjugation' => "machen"],
                    ['pronoun' => 'ihr', 'conjugation' => "macht"],
                    ['pronoun' => 'sie (they)', 'conjugation' => "machen"],
                    ['pronoun' => 'Sie', 'conjugation' => "machen"]
                ]
            ],
            [
                'verb' => 'machen',
                'tense' => 'Präteritum',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => "machte"],
                    ['pronoun' => 'du', 'conjugation' => "machtest"],
                    ['pronoun' => 'er', 'conjugation' => "machte"],
                    ['pronoun' => 'sie (she)', 'conjugation' => "machte"],
                    ['pronoun' => 'es', 'conjugation' => "machte"],
                    ['pronoun' => 'wir', 'conjugation' => "machten"],
                    ['pronoun' => 'ihr', 'conjugation' => "machtet"],
                    ['pronoun' => 'sie (they)', 'conjugation' => "machten"],
                    ['pronoun' => 'Sie', 'conjugation' => "machten"]
                ]
            ],
            [
                'verb' => 'machen',
                'tense' => 'Perfekt',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => "habe gemacht"],
                    ['pronoun' => 'du', 'conjugation' => "hast gemacht"],
                    ['pronoun' => 'er', 'conjugation' => "hat gemacht"],
                    ['pronoun' => 'sie (she)', 'conjugation' => "hat gemacht"],
                    ['pronoun' => 'es', 'conjugation' => "hat gemacht"],
                    ['pronoun' => 'wir', 'conjugation' => "haben gemacht"],
                    ['pronoun' => 'ihr', 'conjugation' => "habt gemacht"],
                    ['pronoun' => 'sie (they)', 'conjugation' => "haben gemacht"],
                    ['pronoun' => 'Sie', 'conjugation' => "haben gemacht"]
                ]
            ],
            [
                'verb' => 'gehen',
                'tense' => 'Präsens',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => "gehe"],
                    ['pronoun' => 'du', 'conjugation' => "gehst"],
                    ['pronoun' => 'er', 'conjugation' => "geht"],
                    ['pronoun' => 'sie (she)', 'conjugation' => "geht"],
                    ['pronoun' => 'es', 'conjugation' => "geht"],
                    ['pronoun' => 'wir', 'conjugation' => "gehen"],
                    ['pronoun' => 'ihr', 'conjugation' => "geht"],
                    ['pronoun' => 'sie (they)', 'conjugation' => "gehen"],
                    ['pronoun' => 'Sie', 'conjugation' => "gehen"]
                ]
            ],
            [
                'verb' => 'gehen',
                'tense' => 'Präteritum',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => "ging"],
                    ['pronoun' => 'du', 'conjugation' => "gingst"],
                    ['pronoun' => 'er', 'conjugation' => "ging"],
                    ['pronoun' => 'sie (she)', 'conjugation' => "ging"],
                    ['pronoun' => 'es', 'conjugation' => "ging"],
                    ['pronoun' => 'wir', 'conjugation' => "gingen"],
                    ['pronoun' => 'ihr', 'conjugation' => "gingt"],
                    ['pronoun' => 'sie (they)', 'conjugation' => "gingen"],
                    ['pronoun' => 'Sie', 'conjugation' => "gingen"]
                ]
            ],
            [
                'verb' => 'gehen',
                'tense' => 'Perfekt',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => "bin gegangen"],
                    ['pronoun' => 'du', 'conjugation' => "bist gegangen"],
                    ['pronoun' => 'er', 'conjugation' => "ist gegangen"],
                    ['pronoun' => 'sie (she)', 'conjugation' => "ist gegangen"],
                    ['pronoun' => 'es', 'conjugation' => "ist gegangen"],
                    ['pronoun' => 'wir', 'conjugation' => "sind gegangen"],
                    ['pronoun' => 'ihr', 'conjugation' => "seid gegangen"],
                    ['pronoun' => 'sie (they)', 'conjugation' => "sind gegangen"],
                    ['pronoun' => 'Sie', 'conjugation' => "sind gegangen"]
                ]
            ],
            [
                'verb' => 'kommen',
                'tense' => 'Präsens',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => "komme"],
                    ['pronoun' => 'du', 'conjugation' => "kommst"],
                    ['pronoun' => 'er', 'conjugation' => "kommt"],
                    ['pronoun' => 'sie (she)', 'conjugation' => "kommt"],
                    ['pronoun' => 'es', 'conjugation' => "kommt"],
                    ['pronoun' => 'wir', 'conjugation' => "kommen"],
                    ['pronoun' => 'ihr', 'conjugation' => "kommt"],
                    ['pronoun' => 'sie (they)', 'conjugation' => "kommen"],
                    ['pronoun' => 'Sie', 'conjugation' => "kommen"]
                ]
            ],
            [
                'verb' => 'kommen',
                'tense' => 'Präteritum',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => "kam"],
                    ['pronoun' => 'du', 'conjugation' => "kamst"],
                    ['pronoun' => 'er', 'conjugation' => "kam"],
                    ['pronoun' => 'sie (she)', 'conjugation' => "kam"],
                    ['pronoun' => 'es', 'conjugation' => "kam"],
                    ['pronoun' => 'wir', 'conjugation' => "kamen"],
                    ['pronoun' => 'ihr', 'conjugation' => "kamt"],
                    ['pronoun' => 'sie (they)', 'conjugation' => "kamen"],
                    ['pronoun' => 'Sie', 'conjugation' => "kamen"]
                ]
            ],
            [
                'verb' => 'kommen',
                'tense' => 'Perfekt',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => "bin gekommen"],
                    ['pronoun' => 'du', 'conjugation' => "bist gekommen"],
                    ['pronoun' => 'er', 'conjugation' => "ist gekommen"],
                    ['pronoun' => 'sie (she)', 'conjugation' => "ist gekommen"],
                    ['pronoun' => 'es', 'conjugation' => "ist gekommen"],
                    ['pronoun' => 'wir', 'conjugation' => "sind gekommen"],
                    ['pronoun' => 'ihr', 'conjugation' => "seid gekommen"],
                    ['pronoun' => 'sie (they)', 'conjugation' => "sind gekommen"],
                    ['pronoun' => 'Sie', 'conjugation' => "sind gekommen"]
                ]
            ],
            [
                'tense' => 'Präsens',
                'verb' => 'sprechen',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => 'spreche'],
                    ['pronoun' => 'du', 'conjugation' => 'sprichst'],
                    ['pronoun' => 'er', 'conjugation' => 'spricht'],
                    ['pronoun' => 'sie (she)', 'conjugation' => 'spricht'],
                    ['pronoun' => 'es', 'conjugation' => 'spricht'],
                    ['pronoun' => 'wir', 'conjugation' => 'sprechen'],
                    ['pronoun' => 'ihr', 'conjugation' => 'sprecht'],
                    ['pronoun' => 'sie (they)', 'conjugation' => 'sprechen'],
                    ['pronoun' => 'Sie', 'conjugation' => 'sprechen'],
                ],
            ],
            [
                'tense' => 'Präteritum',
                'verb' => 'sprechen',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => 'sprach'],
                    ['pronoun' => 'du', 'conjugation' => 'sprachst'],
                    ['pronoun' => 'er', 'conjugation' => 'sprach'],
                    ['pronoun' => 'sie (she)', 'conjugation' => 'sprach'],
                    ['pronoun' => 'es', 'conjugation' => 'sprach'],
                    ['pronoun' => 'wir', 'conjugation' => 'sprachen'],
                    ['pronoun' => 'ihr', 'conjugation' => 'spracht'],
                    ['pronoun' => 'sie (they)', 'conjugation' => 'sprachen'],
                    ['pronoun' => 'Sie', 'conjugation' => 'sprachen']
                ]
            ],
            [
                'tense' => 'Perfekt',
                'verb' => 'sprechen',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => 'habe gesprochen'],
                    ['pronoun' => 'du', 'conjugation' => 'hast gesprochen'],
                    ['pronoun' => 'er', 'conjugation' => 'hat gesprochen'],
                    ['pronoun' => 'sie (she)', 'conjugation' => 'hat gesprochen'],
                    ['pronoun' => 'es', 'conjugation' => 'hat gesprochen'],
                    ['pronoun' => 'wir', 'conjugation' => 'haben gesprochen'],
                    ['pronoun' => 'ihr', 'conjugation' => 'habt gesprochen'],
                    ['pronoun' => 'sie (they)', 'conjugation' => 'haben gesprochen'],
                    ['pronoun' => 'Sie', 'conjugation' => 'haben gesprochen']
                ]
            ],
            [
                'tense' => 'Plusquamperfekt',
                'verb' => 'sprechen',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => 'hatte gesprochen'],
                    ['pronoun' => 'du', 'conjugation' => 'hattest gesprochen'],
                    ['pronoun' => 'er', 'conjugation' => 'hatte gesprochen'],
                    ['pronoun' => 'sie (she)', 'conjugation' => 'hatte gesprochen'],
                    ['pronoun' => 'es', 'conjugation' => 'hatte gesprochen'],
                    ['pronoun' => 'wir', 'conjugation' => 'hatten gesprochen'],
                    ['pronoun' => 'ihr', 'conjugation' => 'hattet gesprochen'],
                    ['pronoun' => 'sie (they)', 'conjugation' => 'hatten gesprochen'],
                    ['pronoun' => 'Sie', 'conjugation' => 'hatten gesprochen']
                ]
            ],
            [
                'tense' => 'Präsens',
                'verb' => 'sehen',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => 'sehe'],
                    ['pronoun' => 'du', 'conjugation' => 'siehst'],
                    ['pronoun' => 'er', 'conjugation' => 'sieht'],
                    ['pronoun' => 'sie (she)', 'conjugation' => 'sieht'],
                    ['pronoun' => 'es', 'conjugation' => 'sieht'],
                    ['pronoun' => 'wir', 'conjugation' => 'sehen'],
                    ['pronoun' => 'ihr', 'conjugation' => 'seht'],
                    ['pronoun' => 'sie (they)', 'conjugation' => 'sehen'],
                    ['pronoun' => 'Sie', 'conjugation' => 'sehen'],
                ],
            ],
            [
                'tense' => 'Präteritum',
                'verb' => 'sehen',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => 'sah'],
                    ['pronoun' => 'du', 'conjugation' => 'sahst'],
                    ['pronoun' => 'er', 'conjugation' => 'sah'],
                    ['pronoun' => 'sie (she)', 'conjugation' => 'sah'],
                    ['pronoun' => 'es', 'conjugation' => 'sah'],
                    ['pronoun' => 'wir', 'conjugation' => 'sahen'],
                    ['pronoun' => 'ihr', 'conjugation' => 'saht'],
                    ['pronoun' => 'sie (they)', 'conjugation' => 'sahen'],
                    ['pronoun' => 'Sie', 'conjugation' => 'sahen']
                ],
            ],
            [
                'tense' => 'Perfekt',
                'verb' => 'sehen',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => 'habe gesehen'],
                    ['pronoun' => 'du', 'conjugation' => 'hast gesehen'],
                    ['pronoun' => 'er', 'conjugation' => 'hat gesehen'],
                    ['pronoun' => 'sie (she)', 'conjugation' => 'hat gesehen'],
                    ['pronoun' => 'es', 'conjugation' => 'hat gesehen'],
                    ['pronoun' => 'wir', 'conjugation' => 'haben gesehen'],
                    ['pronoun' => 'ihr', 'conjugation' => 'habt gesehen'],
                    ['pronoun' => 'sie (they)', 'conjugation' => 'haben gesehen'],
                    ['pronoun' => 'Sie', 'conjugation' => 'haben gesehen']
                ],
            ],
            [
                'tense' => 'Plusquamperfekt',
                'verb' => 'sehen',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => 'hatte gesehen'],
                    ['pronoun' => 'du', 'conjugation' => 'hattest gesehen'],
                    ['pronoun' => 'er', 'conjugation' => 'hatte gesehen'],
                    ['pronoun' => 'sie (she)', 'conjugation' => 'hatte gesehen'],
                    ['pronoun' => 'es', 'conjugation' => 'hatte gesehen'],
                    ['pronoun' => 'wir', 'conjugation' => 'hatten gesehen'],
                    ['pronoun' => 'ihr', 'conjugation' => 'hattet gesehen'],
                    ['pronoun' => 'sie (they)', 'conjugation' => 'hatten gesehen'],
                    ['pronoun' => 'Sie', 'conjugation' => 'hatten gesehen']
                ],
            ],
            [
                'tense' => 'Präsens',
                'verb' => 'bleiben',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => 'bleibe'],
                    ['pronoun' => 'du', 'conjugation' => 'bleibst'],
                    ['pronoun' => 'er', 'conjugation' => 'bleibt'],
                    ['pronoun' => 'sie (she)', 'conjugation' => 'bleibt'],
                    ['pronoun' => 'es', 'conjugation' => 'bleibt'],
                    ['pronoun' => 'wir', 'conjugation' => 'bleiben'],
                    ['pronoun' => 'ihr', 'conjugation' => 'bleibt'],
                    ['pronoun' => 'sie (they)', 'conjugation' => 'bleiben'],
                    ['pronoun' => 'Sie', 'conjugation' => 'bleiben'],
                ],
            ],
            [
                'tense' => 'Präteritum',
                'verb' => 'bleiben',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => 'blieb'],
                    ['pronoun' => 'du', 'conjugation' => 'bliebst'],
                    ['pronoun' => 'er', 'conjugation' => 'blieb'],
                    ['pronoun' => 'sie (she)', 'conjugation' => 'blieb'],
                    ['pronoun' => 'es', 'conjugation' => 'blieb'],
                    ['pronoun' => 'wir', 'conjugation' => 'blieben'],
                    ['pronoun' => 'ihr', 'conjugation' => 'bliebt'],
                    ['pronoun' => 'sie (they)', 'conjugation' => 'blieben'],
                    ['pronoun' => 'Sie', 'conjugation' => 'blieben'],
                ],
            ],
            [
                'tense' => 'Perfekt',
                'verb' => 'bleiben',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => 'bin geblieben'],
                    ['pronoun' => 'du', 'conjugation' => 'bist geblieben'],
                    ['pronoun' => 'er', 'conjugation' => 'ist geblieben'],
                    ['pronoun' => 'sie (she)', 'conjugation' => 'ist geblieben'],
                    ['pronoun' => 'es', 'conjugation' => 'ist geblieben'],
                    ['pronoun' => 'wir', 'conjugation' => 'sind geblieben'],
                    ['pronoun' => 'ihr', 'conjugation' => 'seid geblieben'],
                    ['pronoun' => 'sie (they)', 'conjugation' => 'sind geblieben'],
                    ['pronoun' => 'Sie', 'conjugation' => 'sind geblieben'],
                ],
            ],
            [
                'tense' => 'Plusquamperfekt',
                'verb' => 'bleiben',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => 'war geblieben'],
                    ['pronoun' => 'du', 'conjugation' => 'warst geblieben'],
                    ['pronoun' => 'er', 'conjugation' => 'war geblieben'],
                    ['pronoun' => 'sie (she)', 'conjugation' => 'war geblieben'],
                    ['pronoun' => 'es', 'conjugation' => 'war geblieben'],
                    ['pronoun' => 'wir', 'conjugation' => 'waren geblieben'],
                    ['pronoun' => 'ihr', 'conjugation' => 'wart geblieben'],
                    ['pronoun' => 'sie (they)', 'conjugation' => 'waren geblieben'],
                    ['pronoun' => 'Sie', 'conjugation' => 'waren geblieben'],
                ],
            ],
            [
                'tense' => 'Präsens',
                'verb' => 'sagen',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => 'sage'],
                    ['pronoun' => 'du', 'conjugation' => 'sagst'],
                    ['pronoun' => 'er', 'conjugation' => 'sagt'],
                    ['pronoun' => 'sie (she)', 'conjugation' => 'sagt'],
                    ['pronoun' => 'es', 'conjugation' => 'sagt'],
                    ['pronoun' => 'wir', 'conjugation' => 'sagen'],
                    ['pronoun' => 'ihr', 'conjugation' => 'sagt'],
                    ['pronoun' => 'sie (they)', 'conjugation' => 'sagen'],
                    ['pronoun' => 'Sie', 'conjugation' => 'sagen'],
                ],
            ],
            [
                'tense' => 'Präteritum',
                'verb' => 'sagen',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => 'sagte'],
                    ['pronoun' => 'du', 'conjugation' => 'sagtest'],
                    ['pronoun' => 'er', 'conjugation' => 'sagte'],
                    ['pronoun' => 'sie (she)', 'conjugation' => 'sagte'],
                    ['pronoun' => 'es', 'conjugation' => 'sagte'],
                    ['pronoun' => 'wir', 'conjugation' => 'sagten'],
                    ['pronoun' => 'ihr', 'conjugation' => 'sagtet'],
                    ['pronoun' => 'sie (they)', 'conjugation' => 'sagten'],
                    ['pronoun' => 'Sie', 'conjugation' => 'sagten'],
                ],
            ],
            [
                'tense' => 'Perfekt',
                'verb' => 'sagen',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => 'habe gesagt'],
                    ['pronoun' => 'du', 'conjugation' => 'hast gesagt'],
                    ['pronoun' => 'er', 'conjugation' => 'hat gesagt'],
                    ['pronoun' => 'sie (she)', 'conjugation' => 'hat gesagt'],
                    ['pronoun' => 'es', 'conjugation' => 'hat gesagt'],
                    ['pronoun' => 'wir', 'conjugation' => 'haben gesagt'],
                    ['pronoun' => 'ihr', 'conjugation' => 'habt gesagt'],
                    ['pronoun' => 'sie (they)', 'conjugation' => 'haben gesagt'],
                    ['pronoun' => 'Sie', 'conjugation' => 'haben gesagt'],
                ],
            ],
            [
                'tense' => 'Plusquamperfekt',
                'verb' => 'sagen',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => 'hatte gesagt'],
                    ['pronoun' => 'du', 'conjugation' => 'hattest gesagt'],
                    ['pronoun' => 'er', 'conjugation' => 'hatte gesagt'],
                    ['pronoun' => 'sie (she)', 'conjugation' => 'hatte gesagt'],
                    ['pronoun' => 'es', 'conjugation' => 'hatte gesagt'],
                    ['pronoun' => 'wir', 'conjugation' => 'hatten gesagt'],
                    ['pronoun' => 'ihr', 'conjugation' => 'hattet gesagt'],
                    ['pronoun' => 'sie (they)', 'conjugation' => 'hatten gesagt'],
                    ['pronoun' => 'Sie', 'conjugation' => 'hatten gesagt'],
                ],
            ],
            [
                'tense' => 'Präsens',
                'verb' => 'geben',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => 'gebe'],
                    ['pronoun' => 'du', 'conjugation' => 'gibst'],
                    ['pronoun' => 'er', 'conjugation' => 'gibt'],
                    ['pronoun' => 'sie (she)', 'conjugation' => 'gibt'],
                    ['pronoun' => 'es', 'conjugation' => 'gibt'],
                    ['pronoun' => 'wir', 'conjugation' => 'geben'],
                    ['pronoun' => 'ihr', 'conjugation' => 'gebt'],
                    ['pronoun' => 'sie (they)', 'conjugation' => 'geben'],
                    ['pronoun' => 'Sie', 'conjugation' => 'geben'],
                ],
            ],
            [
                'tense' => 'Präteritum',
                'verb' => 'geben',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => 'gab'],
                    ['pronoun' => 'du', 'conjugation' => 'gabst'],
                    ['pronoun' => 'er', 'conjugation' => 'gab'],
                    ['pronoun' => 'sie (she)', 'conjugation' => 'gab'],
                    ['pronoun' => 'es', 'conjugation' => 'gab'],
                    ['pronoun' => 'wir', 'conjugation' => 'gaben'],
                    ['pronoun' => 'ihr', 'conjugation' => 'gabt'],
                    ['pronoun' => 'sie (they)', 'conjugation' => 'gaben'],
                    ['pronoun' => 'Sie', 'conjugation' => 'gaben'],
                ],
            ],
            [
                'tense' => 'Perfekt',
                'verb' => 'geben',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => 'habe gegeben'],
                    ['pronoun' => 'du', 'conjugation' => 'hast gegeben'],
                    ['pronoun' => 'er', 'conjugation' => 'hat gegeben'],
                    ['pronoun' => 'sie (she)', 'conjugation' => 'hat gegeben'],
                    ['pronoun' => 'es', 'conjugation' => 'hat gegeben'],
                    ['pronoun' => 'wir', 'conjugation' => 'haben gegeben'],
                    ['pronoun' => 'ihr', 'conjugation' => 'habt gegeben'],
                    ['pronoun' => 'sie (they)', 'conjugation' => 'haben gegeben'],
                    ['pronoun' => 'Sie', 'conjugation' => 'haben gegeben'],
                ],
            ],
            [
                'tense' => 'Plusquamperfekt',
                'verb' => 'geben',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => 'hatte gegeben'],
                    ['pronoun' => 'du', 'conjugation' => 'hattest gegeben'],
                    ['pronoun' => 'er', 'conjugation' => 'hatte gegeben'],
                    ['pronoun' => 'sie (she)', 'conjugation' => 'hatte gegeben'],
                    ['pronoun' => 'es', 'conjugation' => 'hatte gegeben'],
                    ['pronoun' => 'wir', 'conjugation' => 'hatten gegeben'],
                    ['pronoun' => 'ihr', 'conjugation' => 'hattet gegeben'],
                    ['pronoun' => 'sie (they)', 'conjugation' => 'hatten gegeben'],
                    ['pronoun' => 'Sie', 'conjugation' => 'hatten gegeben'],
                ],
            ],
            [
                'tense' => 'Präsens',
                'verb' => 'verstehen',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => 'verstehe'],
                    ['pronoun' => 'du', 'conjugation' => 'verstehst'],
                    ['pronoun' => 'er', 'conjugation' => 'versteht'],
                    ['pronoun' => 'sie (she)', 'conjugation' => 'versteht'],
                    ['pronoun' => 'es', 'conjugation' => 'versteht'],
                    ['pronoun' => 'wir', 'conjugation' => 'verstehen'],
                    ['pronoun' => 'ihr', 'conjugation' => 'versteht'],
                    ['pronoun' => 'sie (they)', 'conjugation' => 'verstehen'],
                    ['pronoun' => 'Sie', 'conjugation' => 'verstehen'],
                ],
            ],
            [
                'tense' => 'Präteritum',
                'verb' => 'verstehen',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => 'verstand'],
                    ['pronoun' => 'du', 'conjugation' => 'verstandest'],
                    ['pronoun' => 'er', 'conjugation' => 'verstand'],
                    ['pronoun' => 'sie (she)', 'conjugation' => 'verstand'],
                    ['pronoun' => 'es', 'conjugation' => 'verstand'],
                    ['pronoun' => 'wir', 'conjugation' => 'verstanden'],
                    ['pronoun' => 'ihr', 'conjugation' => 'verstandet'],
                    ['pronoun' => 'sie (they)', 'conjugation' => 'verstanden'],
                    ['pronoun' => 'Sie', 'conjugation' => 'verstanden'],
                ],
            ],
            [
                'tense' => 'Perfekt',
                'verb' => 'verstehen',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => 'habe verstanden'],
                    ['pronoun' => 'du', 'conjugation' => 'hast verstanden'],
                    ['pronoun' => 'er', 'conjugation' => 'hat verstanden'],
                    ['pronoun' => 'sie (she)', 'conjugation' => 'hat verstanden'],
                    ['pronoun' => 'es', 'conjugation' => 'hat verstanden'],
                    ['pronoun' => 'wir', 'conjugation' => 'haben verstanden'],
                    ['pronoun' => 'ihr', 'conjugation' => 'habt verstanden'],
                    ['pronoun' => 'sie (they)', 'conjugation' => 'haben verstanden'],
                    ['pronoun' => 'Sie', 'conjugation' => 'haben verstanden'],
                ],
            ],
            [
                'tense' => 'Plusquamperfekt',
                'verb' => 'verstehen',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => 'hatte verstanden'],
                    ['pronoun' => 'du', 'conjugation' => 'hattest verstanden'],
                    ['pronoun' => 'er', 'conjugation' => 'hatte verstanden'],
                    ['pronoun' => 'sie (she)', 'conjugation' => 'hatte verstanden'],
                    ['pronoun' => 'es', 'conjugation' => 'hatte verstanden'],
                    ['pronoun' => 'wir', 'conjugation' => 'hatten verstanden'],
                    ['pronoun' => 'ihr', 'conjugation' => 'hattet verstanden'],
                    ['pronoun' => 'sie (they)', 'conjugation' => 'hatten verstanden'],
                    ['pronoun' => 'Sie', 'conjugation' => 'hatten verstanden'],
                ],
            ],
            [
                'tense' => 'Präsens',
                'verb' => 'wissen',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => 'weiß'],
                    ['pronoun' => 'du', 'conjugation' => 'weißt'],
                    ['pronoun' => 'er', 'conjugation' => 'weiß'],
                    ['pronoun' => 'sie (she)', 'conjugation' => 'weiß'],
                    ['pronoun' => 'es', 'conjugation' => 'weiß'],
                    ['pronoun' => 'wir', 'conjugation' => 'wissen'],
                    ['pronoun' => 'ihr', 'conjugation' => 'wisst'],
                    ['pronoun' => 'sie (they)', 'conjugation' => 'wissen'],
                    ['pronoun' => 'Sie', 'conjugation' => 'wissen'],
                ],
            ],
            [
                'tense' => 'Präteritum',
                'verb' => 'wissen',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => 'wusste'],
                    ['pronoun' => 'du', 'conjugation' => 'wusstest'],
                    ['pronoun' => 'er', 'conjugation' => 'wusste'],
                    ['pronoun' => 'sie (she)', 'conjugation' => 'wusste'],
                    ['pronoun' => 'es', 'conjugation' => 'wusste'],
                    ['pronoun' => 'wir', 'conjugation' => 'wussten'],
                    ['pronoun' => 'ihr', 'conjugation' => 'wusstet'],
                    ['pronoun' => 'sie (they)', 'conjugation' => 'wussten'],
                    ['pronoun' => 'Sie', 'conjugation' => 'wussten'],
                ],
            ],
            [
                'tense' => 'Perfekt',
                'verb' => 'wissen',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => 'habe gewusst'],
                    ['pronoun' => 'du', 'conjugation' => 'hast gewusst'],
                    ['pronoun' => 'er', 'conjugation' => 'hat gewusst'],
                    ['pronoun' => 'sie (she)', 'conjugation' => 'hat gewusst'],
                    ['pronoun' => 'es', 'conjugation' => 'hat gewusst'],
                    ['pronoun' => 'wir', 'conjugation' => 'haben gewusst'],
                    ['pronoun' => 'ihr', 'conjugation' => 'habt gewusst'],
                    ['pronoun' => 'sie (they)', 'conjugation' => 'haben gewusst'],
                    ['pronoun' => 'Sie', 'conjugation' => 'haben gewusst'],
                ],
            ],
            [
                'tense' => 'Plusquamperfekt',
                'verb' => 'wissen',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => 'hatte gewusst'],
                    ['pronoun' => 'du', 'conjugation' => 'hattest gewusst'],
                    ['pronoun' => 'er', 'conjugation' => 'hatte gewusst'],
                    ['pronoun' => 'sie (she)', 'conjugation' => 'hatte gewusst'],
                    ['pronoun' => 'es', 'conjugation' => 'hatte gewusst'],
                    ['pronoun' => 'wir', 'conjugation' => 'hatten gewusst'],
                    ['pronoun' => 'ihr', 'conjugation' => 'hattet gewusst'],
                    ['pronoun' => 'sie (they)', 'conjugation' => 'hatten gewusst'],
                    ['pronoun' => 'Sie', 'conjugation' => 'hatten gewusst'],
                ],
            ],
            [
                'tense' => 'Präsens',
                'verb' => 'sollen',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => 'soll'],
                    ['pronoun' => 'du', 'conjugation' => 'sollst'],
                    ['pronoun' => 'er', 'conjugation' => 'soll'],
                    ['pronoun' => 'sie (she)', 'conjugation' => 'soll'],
                    ['pronoun' => 'es', 'conjugation' => 'soll'],
                    ['pronoun' => 'wir', 'conjugation' => 'sollen'],
                    ['pronoun' => 'ihr', 'conjugation' => 'sollt'],
                    ['pronoun' => 'sie (they)', 'conjugation' => 'sollen'],
                    ['pronoun' => 'Sie', 'conjugation' => 'sollen'],
                ],
            ],
            [
                'tense' => 'Präteritum',
                'verb' => 'sollen',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => 'sollte'],
                    ['pronoun' => 'du', 'conjugation' => 'solltest'],
                    ['pronoun' => 'er', 'conjugation' => 'sollte'],
                    ['pronoun' => 'sie (she)', 'conjugation' => 'sollte'],
                    ['pronoun' => 'es', 'conjugation' => 'sollte'],
                    ['pronoun' => 'wir', 'conjugation' => 'sollten'],
                    ['pronoun' => 'ihr', 'conjugation' => 'solltet'],
                    ['pronoun' => 'sie (they)', 'conjugation' => 'sollten'],
                    ['pronoun' => 'Sie', 'conjugation' => 'sollten'],
                ],
            ],
            [
                'tense' => 'Perfekt',
                'verb' => 'sollen',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => 'habe gesollt'],
                    ['pronoun' => 'du', 'conjugation' => 'hast gesollt'],
                    ['pronoun' => 'er', 'conjugation' => 'hat gesollt'],
                    ['pronoun' => 'sie (she)', 'conjugation' => 'hat gesollt'],
                    ['pronoun' => 'es', 'conjugation' => 'hat gesollt'],
                    ['pronoun' => 'wir', 'conjugation' => 'haben gesollt'],
                    ['pronoun' => 'ihr', 'conjugation' => 'habt gesollt'],
                    ['pronoun' => 'sie (they)', 'conjugation' => 'haben gesollt'],
                    ['pronoun' => 'Sie', 'conjugation' => 'haben gesollt'],
                ],
            ],
            [
                'tense' => 'Plusquamperfekt',
                'verb' => 'sollen',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => 'hatte gesollt'],
                    ['pronoun' => 'du', 'conjugation' => 'hattest gesollt'],
                    ['pronoun' => 'er', 'conjugation' => 'hatte gesollt'],
                    ['pronoun' => 'sie (she)', 'conjugation' => 'hatte gesollt'],
                    ['pronoun' => 'es', 'conjugation' => 'hatte gesollt'],
                    ['pronoun' => 'wir', 'conjugation' => 'hatten gesollt'],
                    ['pronoun' => 'ihr', 'conjugation' => 'hattet gesollt'],
                    ['pronoun' => 'sie (they)', 'conjugation' => 'hatten gesollt'],
                    ['pronoun' => 'Sie', 'conjugation' => 'hatten gesollt'],
                ],
            ],
            [
                'tense' => 'Präsens',
                'verb' => 'wollen',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => 'will'],
                    ['pronoun' => 'du', 'conjugation' => 'willst'],
                    ['pronoun' => 'er', 'conjugation' => 'will'],
                    ['pronoun' => 'sie (she)', 'conjugation' => 'will'],
                    ['pronoun' => 'es', 'conjugation' => 'will'],
                    ['pronoun' => 'wir', 'conjugation' => 'wollen'],
                    ['pronoun' => 'ihr', 'conjugation' => 'wollt'],
                    ['pronoun' => 'sie (they)', 'conjugation' => 'wollen'],
                    ['pronoun' => 'Sie', 'conjugation' => 'wollen'],
                ],
            ],
            [
                'tense' => 'Präteritum',
                'verb' => 'wollen',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => 'wollte'],
                    ['pronoun' => 'du', 'conjugation' => 'wolltest'],
                    ['pronoun' => 'er', 'conjugation' => 'wollte'],
                    ['pronoun' => 'sie (she)', 'conjugation' => 'wollte'],
                    ['pronoun' => 'es', 'conjugation' => 'wollte'],
                    ['pronoun' => 'wir', 'conjugation' => 'wollten'],
                    ['pronoun' => 'ihr', 'conjugation' => 'wolltet'],
                    ['pronoun' => 'sie (they)', 'conjugation' => 'wollten'],
                    ['pronoun' => 'Sie', 'conjugation' => 'wollten'],
                ],
            ],
            [
                'tense' => 'Perfekt',
                'verb' => 'wollen',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => 'habe gewollt'],
                    ['pronoun' => 'du', 'conjugation' => 'hast gewollt'],
                    ['pronoun' => 'er', 'conjugation' => 'hat gewollt'],
                    ['pronoun' => 'sie (she)', 'conjugation' => 'hat gewollt'],
                    ['pronoun' => 'es', 'conjugation' => 'hat gewollt'],
                    ['pronoun' => 'wir', 'conjugation' => 'haben gewollt'],
                    ['pronoun' => 'ihr', 'conjugation' => 'habt gewollt'],
                    ['pronoun' => 'sie (they)', 'conjugation' => 'haben gewollt'],
                    ['pronoun' => 'Sie', 'conjugation' => 'haben gewollt'],
                ],
            ],
            [
                'tense' => 'Plusquamperfekt',
                'verb' => 'wollen',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => 'hatte gewollt'],
                    ['pronoun' => 'du', 'conjugation' => 'hattest gewollt'],
                    ['pronoun' => 'er', 'conjugation' => 'hatte gewollt'],
                    ['pronoun' => 'sie (she)', 'conjugation' => 'hatte gewollt'],
                    ['pronoun' => 'es', 'conjugation' => 'hatte gewollt'],
                    ['pronoun' => 'wir', 'conjugation' => 'hatten gewollt'],
                    ['pronoun' => 'ihr', 'conjugation' => 'hattet gewollt'],
                    ['pronoun' => 'sie (they)', 'conjugation' => 'hatten gewollt'],
                    ['pronoun' => 'Sie', 'conjugation' => 'hatten gewollt'],
                ],
            ],
            [
                'tense' => 'Präsens',
                'verb' => 'lassen',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => 'lasse'],
                    ['pronoun' => 'du', 'conjugation' => 'lässt'],
                    ['pronoun' => 'er', 'conjugation' => 'lässt'],
                    ['pronoun' => 'sie (she)', 'conjugation' => 'lässt'],
                    ['pronoun' => 'es', 'conjugation' => 'lässt'],
                    ['pronoun' => 'wir', 'conjugation' => 'lassen'],
                    ['pronoun' => 'ihr', 'conjugation' => 'lasst'],
                    ['pronoun' => 'sie (they)', 'conjugation' => 'lassen'],
                    ['pronoun' => 'Sie', 'conjugation' => 'lassen'],
                ],
            ],
            [
                'tense' => 'Präteritum',
                'verb' => 'lassen',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => 'ließ'],
                    ['pronoun' => 'du', 'conjugation' => 'ließest'],
                    ['pronoun' => 'er', 'conjugation' => 'ließ'],
                    ['pronoun' => 'sie (she)', 'conjugation' => 'ließ'],
                    ['pronoun' => 'es', 'conjugation' => 'ließ'],
                    ['pronoun' => 'wir', 'conjugation' => 'ließen'],
                    ['pronoun' => 'ihr', 'conjugation' => 'ließt'],
                    ['pronoun' => 'sie (they)', 'conjugation' => 'ließen'],
                    ['pronoun' => 'Sie', 'conjugation' => 'ließen'],
                ],
            ],
            [
                'tense' => 'Perfekt',
                'verb' => 'lassen',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => 'habe gelassen'],
                    ['pronoun' => 'du', 'conjugation' => 'hast gelassen'],
                    ['pronoun' => 'er', 'conjugation' => 'hat gelassen'],
                    ['pronoun' => 'sie (she)', 'conjugation' => 'hat gelassen'],
                    ['pronoun' => 'es', 'conjugation' => 'hat gelassen'],
                    ['pronoun' => 'wir', 'conjugation' => 'haben gelassen'],
                    ['pronoun' => 'ihr', 'conjugation' => 'habt gelassen'],
                    ['pronoun' => 'sie (they)', 'conjugation' => 'haben gelassen'],
                    ['pronoun' => 'Sie', 'conjugation' => 'haben gelassen'],
                ],
            ],
            [
                'tense' => 'Plusquamperfekt',
                'verb' => 'lassen',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => 'hatte gelassen'],
                    ['pronoun' => 'du', 'conjugation' => 'hattest gelassen'],
                    ['pronoun' => 'er', 'conjugation' => 'hatte gelassen'],
                    ['pronoun' => 'sie (she)', 'conjugation' => 'hatte gelassen'],
                    ['pronoun' => 'es', 'conjugation' => 'hatte gelassen'],
                    ['pronoun' => 'wir', 'conjugation' => 'hatten gelassen'],
                    ['pronoun' => 'ihr', 'conjugation' => 'hattet gelassen'],
                    ['pronoun' => 'sie (they)', 'conjugation' => 'hatten gelassen'],
                    ['pronoun' => 'Sie', 'conjugation' => 'hatten gelassen'],
                ],
            ],
            [
                'tense' => 'Präsens',
                'verb' => 'tragen',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => 'trage'],
                    ['pronoun' => 'du', 'conjugation' => 'trägst'],
                    ['pronoun' => 'er', 'conjugation' => 'trägt'],
                    ['pronoun' => 'sie (she)', 'conjugation' => 'trägt'],
                    ['pronoun' => 'es', 'conjugation' => 'trägt'],
                    ['pronoun' => 'wir', 'conjugation' => 'tragen'],
                    ['pronoun' => 'ihr', 'conjugation' => 'tragt'],
                    ['pronoun' => 'sie (they)', 'conjugation' => 'tragen'],
                    ['pronoun' => 'Sie', 'conjugation' => 'tragen'],
                ],
            ],
            [
                'tense' => 'Präteritum',
                'verb' => 'tragen',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => 'trug'],
                    ['pronoun' => 'du', 'conjugation' => 'trugst'],
                    ['pronoun' => 'er', 'conjugation' => 'trug'],
                    ['pronoun' => 'sie (she)', 'conjugation' => 'trug'],
                    ['pronoun' => 'es', 'conjugation' => 'trug'],
                    ['pronoun' => 'wir', 'conjugation' => 'trugen'],
                    ['pronoun' => 'ihr', 'conjugation' => 'trugt'],
                    ['pronoun' => 'sie (they)', 'conjugation' => 'trugen'],
                    ['pronoun' => 'Sie', 'conjugation' => 'trugen'],
                ],
            ],
            [
                'tense' => 'Perfekt',
                'verb' => 'tragen',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => 'habe getragen'],
                    ['pronoun' => 'du', 'conjugation' => 'hast getragen'],
                    ['pronoun' => 'er', 'conjugation' => 'hat getragen'],
                    ['pronoun' => 'sie (she)', 'conjugation' => 'hat getragen'],
                    ['pronoun' => 'es', 'conjugation' => 'hat getragen'],
                    ['pronoun' => 'wir', 'conjugation' => 'haben getragen'],
                    ['pronoun' => 'ihr', 'conjugation' => 'habt getragen'],
                    ['pronoun' => 'sie (they)', 'conjugation' => 'haben getragen'],
                    ['pronoun' => 'Sie', 'conjugation' => 'haben getragen'],
                ],
            ],
            [
                'tense' => 'Plusquamperfekt',
                'verb' => 'tragen',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => 'hatte getragen'],
                    ['pronoun' => 'du', 'conjugation' => 'hattest getragen'],
                    ['pronoun' => 'er', 'conjugation' => 'hatte getragen'],
                    ['pronoun' => 'sie (she)', 'conjugation' => 'hatte getragen'],
                    ['pronoun' => 'es', 'conjugation' => 'hatte getragen'],
                    ['pronoun' => 'wir', 'conjugation' => 'hatten getragen'],
                    ['pronoun' => 'ihr', 'conjugation' => 'hattet getragen'],
                    ['pronoun' => 'sie (they)', 'conjugation' => 'hatten getragen'],
                    ['pronoun' => 'Sie', 'conjugation' => 'hatten getragen'],
                ],
            ],
            [
                'tense' => 'Präsens',
                'verb' => 'passen',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => 'passe'],
                    ['pronoun' => 'du', 'conjugation' => 'passt'],
                    ['pronoun' => 'er', 'conjugation' => 'passt'],
                    ['pronoun' => 'sie (she)', 'conjugation' => 'passt'],
                    ['pronoun' => 'es', 'conjugation' => 'passt'],
                    ['pronoun' => 'wir', 'conjugation' => 'passen'],
                    ['pronoun' => 'ihr', 'conjugation' => 'passt'],
                    ['pronoun' => 'sie (they)', 'conjugation' => 'passen'],
                    ['pronoun' => 'Sie', 'conjugation' => 'passen'],
                ],
            ],
            [
                'tense' => 'Präteritum',
                'verb' => 'passen',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => 'passte'],
                    ['pronoun' => 'du', 'conjugation' => 'passtest'],
                    ['pronoun' => 'er', 'conjugation' => 'passte'],
                    ['pronoun' => 'sie (she)', 'conjugation' => 'passte'],
                    ['pronoun' => 'es', 'conjugation' => 'passte'],
                    ['pronoun' => 'wir', 'conjugation' => 'passten'],
                    ['pronoun' => 'ihr', 'conjugation' => 'passtet'],
                    ['pronoun' => 'sie (they)', 'conjugation' => 'passten'],
                    ['pronoun' => 'Sie', 'conjugation' => 'passten'],
                ],
            ],
            [
                'tense' => 'Perfekt',
                'verb' => 'passen',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => 'habe gepasst'],
                    ['pronoun' => 'du', 'conjugation' => 'hast gepasst'],
                    ['pronoun' => 'er', 'conjugation' => 'hat gepasst'],
                    ['pronoun' => 'sie (she)', 'conjugation' => 'hat gepasst'],
                    ['pronoun' => 'es', 'conjugation' => 'hat gepasst'],
                    ['pronoun' => 'wir', 'conjugation' => 'haben gepasst'],
                    ['pronoun' => 'ihr', 'conjugation' => 'habt gepasst'],
                    ['pronoun' => 'sie (they)', 'conjugation' => 'haben gepasst'],
                    ['pronoun' => 'Sie', 'conjugation' => 'haben gepasst'],
                ],
            ],
            [
                'tense' => 'Plusquamperfekt',
                'verb' => 'passen',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => 'hatte gepasst'],
                    ['pronoun' => 'du', 'conjugation' => 'hattest gepasst'],
                    ['pronoun' => 'er', 'conjugation' => 'hatte gepasst'],
                    ['pronoun' => 'sie (she)', 'conjugation' => 'hatte gepasst'],
                    ['pronoun' => 'es', 'conjugation' => 'hatte gepasst'],
                    ['pronoun' => 'wir', 'conjugation' => 'hatten gepasst'],
                    ['pronoun' => 'ihr', 'conjugation' => 'hattet gepasst'],
                    ['pronoun' => 'sie (they)', 'conjugation' => 'hatten gepasst'],
                    ['pronoun' => 'Sie', 'conjugation' => 'hatten gepasst'],
                ],
            ],
            [
                'tense' => 'Präsens',
                'verb' => 'kaufen',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => 'kaufe'],
                    ['pronoun' => 'du', 'conjugation' => 'kaufst'],
                    ['pronoun' => 'er', 'conjugation' => 'kauft'],
                    ['pronoun' => 'sie (she)', 'conjugation' => 'kauft'],
                    ['pronoun' => 'es', 'conjugation' => 'kauft'],
                    ['pronoun' => 'wir', 'conjugation' => 'kaufen'],
                    ['pronoun' => 'ihr', 'conjugation' => 'kauft'],
                    ['pronoun' => 'sie (they)', 'conjugation' => 'kaufen'],
                    ['pronoun' => 'Sie', 'conjugation' => 'kaufen'],
                ],
            ],
            [
                'tense' => 'Präteritum',
                'verb' => 'kaufen',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => 'kaufte'],
                    ['pronoun' => 'du', 'conjugation' => 'kauftest'],
                    ['pronoun' => 'er', 'conjugation' => 'kaufte'],
                    ['pronoun' => 'sie (she)', 'conjugation' => 'kaufte'],
                    ['pronoun' => 'es', 'conjugation' => 'kaufte'],
                    ['pronoun' => 'wir', 'conjugation' => 'kauften'],
                    ['pronoun' => 'ihr', 'conjugation' => 'kauftet'],
                    ['pronoun' => 'sie (they)', 'conjugation' => 'kauften'],
                    ['pronoun' => 'Sie', 'conjugation' => 'kauften'],
                ],
            ],
            [
                'tense' => 'Perfekt',
                'verb' => 'kaufen',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => 'habe gekauft'],
                    ['pronoun' => 'du', 'conjugation' => 'hast gekauft'],
                    ['pronoun' => 'er', 'conjugation' => 'hat gekauft'],
                    ['pronoun' => 'sie (she)', 'conjugation' => 'hat gekauft'],
                    ['pronoun' => 'es', 'conjugation' => 'hat gekauft'],
                    ['pronoun' => 'wir', 'conjugation' => 'haben gekauft'],
                    ['pronoun' => 'ihr', 'conjugation' => 'habt gekauft'],
                    ['pronoun' => 'sie (they)', 'conjugation' => 'haben gekauft'],
                    ['pronoun' => 'Sie', 'conjugation' => 'haben gekauft'],
                ],
            ],
            [
                'tense' => 'Plusquamperfekt',
                'verb' => 'kaufen',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => 'hatte gekauft'],
                    ['pronoun' => 'du', 'conjugation' => 'hattest gekauft'],
                    ['pronoun' => 'er', 'conjugation' => 'hatte gekauft'],
                    ['pronoun' => 'sie (she)', 'conjugation' => 'hatte gekauft'],
                    ['pronoun' => 'es', 'conjugation' => 'hatte gekauft'],
                    ['pronoun' => 'wir', 'conjugation' => 'hatten gekauft'],
                    ['pronoun' => 'ihr', 'conjugation' => 'hattet gekauft'],
                    ['pronoun' => 'sie (they)', 'conjugation' => 'hatten gekauft'],
                    ['pronoun' => 'Sie', 'conjugation' => 'hatten gekauft'],
                ],
            ],
            [
                'tense' => 'Präsens',
                'verb' => 'waschen',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => 'wasche'],
                    ['pronoun' => 'du', 'conjugation' => 'wäschst'],
                    ['pronoun' => 'er', 'conjugation' => 'wäscht'],
                    ['pronoun' => 'sie (she)', 'conjugation' => 'wäscht'],
                    ['pronoun' => 'es', 'conjugation' => 'wäscht'],
                    ['pronoun' => 'wir', 'conjugation' => 'waschen'],
                    ['pronoun' => 'ihr', 'conjugation' => 'wascht'],
                    ['pronoun' => 'sie (they)', 'conjugation' => 'waschen'],
                    ['pronoun' => 'Sie', 'conjugation' => 'waschen'],
                ],
            ],
            [
                'tense' => 'Präteritum',
                'verb' => 'waschen',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => 'wusch'],
                    ['pronoun' => 'du', 'conjugation' => 'wuschest'],
                    ['pronoun' => 'er', 'conjugation' => 'wusch'],
                    ['pronoun' => 'sie (she)', 'conjugation' => 'wusch'],
                    ['pronoun' => 'es', 'conjugation' => 'wusch'],
                    ['pronoun' => 'wir', 'conjugation' => 'wuschen'],
                    ['pronoun' => 'ihr', 'conjugation' => 'wuscht'],
                    ['pronoun' => 'sie (they)', 'conjugation' => 'wuschen'],
                    ['pronoun' => 'Sie', 'conjugation' => 'wuschen'],
                ],
            ],
            [
                'tense' => 'Perfekt',
                'verb' => 'waschen',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => 'habe gewaschen'],
                    ['pronoun' => 'du', 'conjugation' => 'hast gewaschen'],
                    ['pronoun' => 'er', 'conjugation' => 'hat gewaschen'],
                    ['pronoun' => 'sie (she)', 'conjugation' => 'hat gewaschen'],
                    ['pronoun' => 'es', 'conjugation' => 'hat gewaschen'],
                    ['pronoun' => 'wir', 'conjugation' => 'haben gewaschen'],
                    ['pronoun' => 'ihr', 'conjugation' => 'habt gewaschen'],
                    ['pronoun' => 'sie (they)', 'conjugation' => 'haben gewaschen'],
                    ['pronoun' => 'Sie', 'conjugation' => 'haben gewaschen'],
                ],
            ],
            [
                'tense' => 'Plusquamperfekt',
                'verb' => 'waschen',
                'conjugations' => [
                    ['pronoun' => 'ich', 'conjugation' => 'hatte gewaschen'],
                    ['pronoun' => 'du', 'conjugation' => 'hattest gewaschen'],
                    ['pronoun' => 'er', 'conjugation' => 'hatte gewaschen'],
                    ['pronoun' => 'sie (she)', 'conjugation' => 'hatte gewaschen'],
                    ['pronoun' => 'es', 'conjugation' => 'hatte gewaschen'],
                    ['pronoun' => 'wir', 'conjugation' => 'hatten gewaschen'],
                    ['pronoun' => 'ihr', 'conjugation' => 'hattet gewaschen'],
                    ['pronoun' => 'sie (they)', 'conjugation' => 'hatten gewaschen'],
                    ['pronoun' => 'Sie', 'conjugation' => 'hatten gewaschen'],
                ],
            ],

        ];
        foreach ($germanVerbConjugations as $conjugation) {
            TenseConjugation::create($conjugation);
        }

        $germanVerbConjugationsExercises = [
            [
                "verbs" => ['sein', 'haben', 'machen', 'gehen', 'kommen', 'sprechen', 'sehen'],
                "course_name" => "German for Beginners",
                "lesson_number" => 5,
                "tenses" => ['Präsens'],
                "pronouns" => ['ich', 'du', 'er', 'sie (she)', 'es', 'wir', 'ihr', 'sie (they)', 'Sie'],
            ],
            [
                "verbs" => ['sein', 'haben', 'machen', 'gehen', 'kommen', 'sprechen', 'sehen', 'tragen', 'passen', 'kaufen', 'waschen'],
                "course_name" => "German for Beginners",
                "lesson_number" => 9,
                "tenses" => ['Präsens'],
                "pronouns" => ['ich', 'du', 'er', 'sie (she)', 'es', 'wir', 'ihr', 'sie (they)', 'Sie'],
            ],
            [
                "verbs" => ['sein', 'haben', 'machen', 'gehen', 'kommen', 'sprechen', 'sehen', 'bleiben', 'sagen', 'geben', 'verstehen'],
                "course_name" => "German for Beginners",
                "lesson_number" => 11,
                "tenses" => ['Präsens'],
                "pronouns" => ['ich', 'du', 'er', 'sie (she)', 'es', 'wir', 'ihr', 'sie (they)', 'Sie'],
            ],
            [
                "verbs" => ['sein', 'haben', 'machen', 'gehen', 'kommen', 'sprechen', 'sehen', 'bleiben', 'sagen', 'geben', 'verstehen', 'wissen', 'sollen', 'wollen', 'lassen'],
                "course_name" => "German for Beginners",
                "lesson_number" => 15,
                "tenses" => ['Präsens'],
                "pronouns" => ['ich', 'du', 'er', 'sie (she)', 'es', 'wir', 'ihr', 'sie (they)', 'Sie'],
            ],
        ];


        foreach ($germanVerbConjugationsExercises as $item) {
            // Retrieve course and lesson by name and number
            $course = Course::where('name', $item['course_name'])->first();
            if (!$course) {
                continue; // Skip if course not found
            }

            $lesson = $course->lessons()->where('lesson_number', $item['lesson_number'])->first();
            if (!$lesson) {
                continue; // Skip if lesson not found
            }

            foreach ($item["verbs"] as $verb) {

                // Create verb conjugation exercise
                $exercise = VerbConjugationExercise::create([
                    'verb' => $verb,
                    'tenses' => $item['tenses'],
                    'pronouns' => $item['pronouns'],
                    'lesson_id' => $lesson->id,
                ]);

                $exerciseForVerbConjugation = Exercise::create([
                    'exerciseable_id' => $exercise->id,
                    'exerciseable_type' => get_class($exercise),
                    'lesson_id' => $lesson->id
                ]);

                // Attach conjugations based on verb and tenses
                foreach ($item['tenses'] as $tense) {
                    $conjugation = TenseConjugation::where('verb', $verb)
                        ->where('tense', $tense)
                        ->first();
                    $exercise->tenseConjugations()->attach($conjugation->id);
                }
            }
        }

        // List of spanish verbs
        // 1. ser -> to be
        // 2. estar -> to be
        // 3. tener -> to have
        // 4. hacer -> to do, make
        // 5. poder -> to be able
        // 6. decir -> to say, tell
        // 7. ir -> to go
        // 8. ver -> to see
        // 9. dar -> to give
        // 10. saber -> to know
        // 11. querer -> to want
        // 12. llegar -> to arrive
        // 13. pasar -> to pass, happen
        // 14. deber -> to owe, should
        // 15. poner -> to put
        // 16. parecer -> to seem, appear
        // 17. quedar -> to stay
        // 18. creer -> to believe
        // 19. hablar -> to speak
        // 20. llevar -> to carry, wear
        // 21. dejar -> to leave, let
        // 22. seguir -> to follow, continue
        // 23. encontrar -> to find
        // 24. llamar -> to call
        // 25. venir -> to come
        // 26. pensar -> to think
        // 27. salir -> to leave
        // 28. volver -> to return
        // 29. tomar -> to take, have
        // 30. conocer -> to know
        // 31. vivir -> to live
        // 32. sentir -> to feel
        // 33. recibir -> to receive
        // 34. mirar -> to watch
        // 35. contar -> to tell, count
        // 36. empezar -> to begin
        // 37. esperar -> to wait, hope
        // 38. buscar -> to look for
        // 39. traducir -> to translate
        // 40. entrar -> to enter
        // 41. trabajar -> to work
        // 42. escribir -> to write
        // 43. perder -> to lose
        // 44. existir -> to exist
        // 45. ocurrir -> to occur
        // 46. viajar -> to travel
        // 47. pedir -> to ask for
        // 48. destruir -> to destroy
        // 49. recordar -> to remember
        // 50. terminar -> to finish
        // 51. permitir -> to allow
        // 52. morir -> to die
        // 53. conseguir -> to get
        // 54. comenzar -> to begin
        // 55. servir -> to serve
        // 56. sacar -> to take out
        // 57. necesitar -> to need
        // 58. descansar -> to rest
        // 59. asistir -> to attend
        // 60. leer -> to read
        // 61. caer -> to fall
        // 62. cambiar -> to change
        // 63. aprender -> to learn
        // 64. crear -> to create
        // 65. abrir -> to open
        // 66. apagar -> to turn off
        // 67. oír -> to hear
        // 68. enseñar -> to teach
        // 69. conducir -> to drive
        // 70. ganar -> to win, earn
        // 71. regresar -> to return
        // 72. traer -> to bring
        // 73. limpiar -> to clean
        // 74. morir -> to die
        // 75. lavar -> to wash
        // 76. sentarse -> to sit
        // 77. divertirse -> to have fun
        // 78. comprender -> to understand
        // 79. despertarse -> to wake up
        // 80. explicar -> to explain
        // 81. preguntar -> to ask
        // 82. tocar -> to touch, play
        // 83. mejorar -> to improve
        // 84. estudiar -> to study
        // 85. acostar(se) -> to go to bed
        // 86. nacer -> to be born
        // 87. mandar -> to send
        // 88. correr -> to run
        // 89. preocupar(se) -> to worry
        // 90. pagar -> to pay
        // 91. ayudar -> to help
        // 92. gustar -> to like
        // 93. jugar -> to play
        // 94. escuchar -> to listen
        // 95. cumplir -> to complete
        // 96. ofrecer -> to offer
        // 97. devolver -> to discover
        // 98. levantar(se) -> to get up
        // 99. romper -> to break
        // 100. usar -> to use

        $spanishVerbConjugations = [
            [
                'tense' => 'Presente',
                'verb' => 'ser',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'soy'],
                    ['pronoun' => 'tú', 'conjugation' => 'eres'],
                    ['pronoun' => 'él', 'conjugation' => 'es'],
                    ['pronoun' => 'ella', 'conjugation' => 'es'],
                    ['pronoun' => 'eso', 'conjugation' => 'es'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'son'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'somos'],
                    ['pronoun' => 'ellos', 'conjugation' => 'son'],
                    ['pronoun' => 'eso', 'conjugation' => 'es'],
                ],
            ],
            [
                'tense' => 'Pretérito Imperfecto',
                'verb' => 'ser',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'era'],
                    ['pronoun' => 'tú', 'conjugation' => 'eras'],
                    ['pronoun' => 'él', 'conjugation' => 'era'],
                    ['pronoun' => 'ella', 'conjugation' => 'era'],
                    ['pronoun' => 'eso', 'conjugation' => 'era'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'eran'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'éramos'],
                    ['pronoun' => 'ellos', 'conjugation' => 'eran'],
                    ['pronoun' => 'eso', 'conjugation' => 'era'],
                ],
            ],
            [
                'tense' => 'Pretérito Perfecto',
                'verb' => 'ser',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'he sido'],
                    ['pronoun' => 'tú', 'conjugation' => 'has sido'],
                    ['pronoun' => 'él', 'conjugation' => 'ha sido'],
                    ['pronoun' => 'ella', 'conjugation' => 'ha sido'],
                    ['pronoun' => 'eso', 'conjugation' => 'ha sido'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'han sido'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'hemos sido'],
                    ['pronoun' => 'ellos', 'conjugation' => 'han sido'],
                    ['pronoun' => 'eso', 'conjugation' => 'ha sido'],
                ],
            ],
            [
                'tense' => 'Futuro',
                'verb' => 'ser',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'seré'],
                    ['pronoun' => 'tú', 'conjugation' => 'serás'],
                    ['pronoun' => 'él', 'conjugation' => 'será'],
                    ['pronoun' => 'ella', 'conjugation' => 'será'],
                    ['pronoun' => 'eso', 'conjugation' => 'será'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'serán'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'seremos'],
                    ['pronoun' => 'ellos', 'conjugation' => 'serán'],
                    ['pronoun' => 'eso', 'conjugation' => 'será'],
                ],
            ],
            [
                'tense' => 'Presente',
                'verb' => 'estar',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'estoy'],
                    ['pronoun' => 'tú', 'conjugation' => 'estás'],
                    ['pronoun' => 'él', 'conjugation' => 'está'],
                    ['pronoun' => 'ella', 'conjugation' => 'está'],
                    ['pronoun' => 'eso', 'conjugation' => 'está'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'están'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'estamos'],
                    ['pronoun' => 'ellos', 'conjugation' => 'están'],
                    ['pronoun' => 'eso', 'conjugation' => 'está'],
                ],
            ],
            [
                'tense' => 'Pretérito Imperfecto',
                'verb' => 'estar',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'estaba'],
                    ['pronoun' => 'tú', 'conjugation' => 'estabas'],
                    ['pronoun' => 'él', 'conjugation' => 'estaba'],
                    ['pronoun' => 'ella', 'conjugation' => 'estaba'],
                    ['pronoun' => 'eso', 'conjugation' => 'estaba'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'estaban'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'estábamos'],
                    ['pronoun' => 'ellos', 'conjugation' => 'estaban'],
                    ['pronoun' => 'eso', 'conjugation' => 'estaba'],
                ],
            ],
            [
                'tense' => 'Pretérito Perfecto',
                'verb' => 'estar',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'he estado'],
                    ['pronoun' => 'tú', 'conjugation' => 'has estado'],
                    ['pronoun' => 'él', 'conjugation' => 'ha estado'],
                    ['pronoun' => 'ella', 'conjugation' => 'ha estado'],
                    ['pronoun' => 'eso', 'conjugation' => 'ha estado'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'han estado'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'hemos estado'],
                    ['pronoun' => 'ellos', 'conjugation' => 'han estado'],
                    ['pronoun' => 'eso', 'conjugation' => 'ha estado'],
                ],
            ],
            [
                'tense' => 'Futuro',
                'verb' => 'estar',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'estaré'],
                    ['pronoun' => 'tú', 'conjugation' => 'estarás'],
                    ['pronoun' => 'él', 'conjugation' => 'estará'],
                    ['pronoun' => 'ella', 'conjugation' => 'estará'],
                    ['pronoun' => 'eso', 'conjugation' => 'estará'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'estarán'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'estaremos'],
                    ['pronoun' => 'ellos', 'conjugation' => 'estarán'],
                    ['pronoun' => 'eso', 'conjugation' => 'estará'],
                ],
            ],
            [
                'tense' => 'Presente',
                'verb' => 'ir',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'voy'],
                    ['pronoun' => 'tú', 'conjugation' => 'vas'],
                    ['pronoun' => 'él', 'conjugation' => 'va'],
                    ['pronoun' => 'ella', 'conjugation' => 'va'],
                    ['pronoun' => 'eso', 'conjugation' => 'va'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'van'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'vamos'],
                    ['pronoun' => 'ellos', 'conjugation' => 'van'],
                    ['pronoun' => 'eso', 'conjugation' => 'va'],
                ],
            ],
            [
                'tense' => 'Pretérito Imperfecto',
                'verb' => 'ir',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'iba'],
                    ['pronoun' => 'tú', 'conjugation' => 'ibas'],
                    ['pronoun' => 'él', 'conjugation' => 'iba'],
                    ['pronoun' => 'ella', 'conjugation' => 'iba'],
                    ['pronoun' => 'eso', 'conjugation' => 'iba'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'iban'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'íbamos'],
                    ['pronoun' => 'ellos', 'conjugation' => 'iban'],
                    ['pronoun' => 'eso', 'conjugation' => 'iba'],
                ],
            ],
            [
                'tense' => 'Pretérito Perfecto',
                'verb' => 'ir',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'he ido'],
                    ['pronoun' => 'tú', 'conjugation' => 'has ido'],
                    ['pronoun' => 'él', 'conjugation' => 'ha ido'],
                    ['pronoun' => 'ella', 'conjugation' => 'ha ido'],
                    ['pronoun' => 'eso', 'conjugation' => 'ha ido'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'han ido'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'hemos ido'],
                    ['pronoun' => 'ellos', 'conjugation' => 'han ido'],
                    ['pronoun' => 'eso', 'conjugation' => 'ha ido'],
                ],
            ],
            [
                'tense' => 'Futuro',
                'verb' => 'ir',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'iré'],
                    ['pronoun' => 'tú', 'conjugation' => 'irás'],
                    ['pronoun' => 'él', 'conjugation' => 'irá'],
                    ['pronoun' => 'ella', 'conjugation' => 'irá'],
                    ['pronoun' => 'eso', 'conjugation' => 'irá'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'irán'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'iremos'],
                    ['pronoun' => 'ellos', 'conjugation' => 'irán'],
                    ['pronoun' => 'eso', 'conjugation' => 'irá'],
                ],
            ],
            [
                'tense' => 'Presente',
                'verb' => 'ver',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'veo'],
                    ['pronoun' => 'tú', 'conjugation' => 'ves'],
                    ['pronoun' => 'él', 'conjugation' => 've'],
                    ['pronoun' => 'ella', 'conjugation' => 've'],
                    ['pronoun' => 'eso', 'conjugation' => 've'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'ven'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'vemos'],
                    ['pronoun' => 'ellos', 'conjugation' => 'ven'],
                    ['pronoun' => 'eso', 'conjugation' => 've'],
                ],
            ],
            [
                'tense' => 'Pretérito Imperfecto',
                'verb' => 'ver',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'veía'],
                    ['pronoun' => 'tú', 'conjugation' => 'veías'],
                    ['pronoun' => 'él', 'conjugation' => 'veía'],
                    ['pronoun' => 'ella', 'conjugation' => 'veía'],
                    ['pronoun' => 'eso', 'conjugation' => 'veía'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'veían'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'veíamos'],
                    ['pronoun' => 'ellos', 'conjugation' => 'veían'],
                    ['pronoun' => 'eso', 'conjugation' => 'veía'],
                ],
            ],
            [
                'tense' => 'Pretérito Perfecto',
                'verb' => 'ver',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'he visto'],
                    ['pronoun' => 'tú', 'conjugation' => 'has visto'],
                    ['pronoun' => 'él', 'conjugation' => 'ha visto'],
                    ['pronoun' => 'ella', 'conjugation' => 'ha visto'],
                    ['pronoun' => 'eso', 'conjugation' => 'ha visto'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'han visto'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'hemos visto'],
                    ['pronoun' => 'ellos', 'conjugation' => 'han visto'],
                    ['pronoun' => 'eso', 'conjugation' => 'ha visto'],
                ],
            ],
            [
                'tense' => 'Futuro',
                'verb' => 'ver',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'veré'],
                    ['pronoun' => 'tú', 'conjugation' => 'verás'],
                    ['pronoun' => 'él', 'conjugation' => 'verá'],
                    ['pronoun' => 'ella', 'conjugation' => 'verá'],
                    ['pronoun' => 'eso', 'conjugation' => 'verá'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'verán'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'veremos'],
                    ['pronoun' => 'ellos', 'conjugation' => 'verán'],
                    ['pronoun' => 'eso', 'conjugation' => 'verá'],
                ],
            ],
            [
                'tense' => 'Presente',
                'verb' => 'dar',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'doy'],
                    ['pronoun' => 'tú', 'conjugation' => 'das'],
                    ['pronoun' => 'él', 'conjugation' => 'da'],
                    ['pronoun' => 'ella', 'conjugation' => 'da'],
                    ['pronoun' => 'eso', 'conjugation' => 'da'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'dan'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'damos'],
                    ['pronoun' => 'ellos', 'conjugation' => 'dan'],
                    ['pronoun' => 'eso', 'conjugation' => 'da'],
                ],
            ],
            [
                'tense' => 'Pretérito Imperfecto',
                'verb' => 'dar',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'daba'],
                    ['pronoun' => 'tú', 'conjugation' => 'dabas'],
                    ['pronoun' => 'él', 'conjugation' => 'daba'],
                    ['pronoun' => 'ella', 'conjugation' => 'daba'],
                    ['pronoun' => 'eso', 'conjugation' => 'daba'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'daban'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'dábamos'],
                    ['pronoun' => 'ellos', 'conjugation' => 'daban'],
                    ['pronoun' => 'eso', 'conjugation' => 'daba'],
                ],
            ],
            [
                'tense' => 'Pretérito Perfecto',
                'verb' => 'dar',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'he dado'],
                    ['pronoun' => 'tú', 'conjugation' => 'has dado'],
                    ['pronoun' => 'él', 'conjugation' => 'ha dado'],
                    ['pronoun' => 'ella', 'conjugation' => 'ha dado'],
                    ['pronoun' => 'eso', 'conjugation' => 'ha dado'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'han dado'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'hemos dado'],
                    ['pronoun' => 'ellos', 'conjugation' => 'han dado'],
                    ['pronoun' => 'eso', 'conjugation' => 'ha dado'],
                ],
            ],
            [
                'tense' => 'Futuro',
                'verb' => 'dar',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'daré'],
                    ['pronoun' => 'tú', 'conjugation' => 'darás'],
                    ['pronoun' => 'él', 'conjugation' => 'dará'],
                    ['pronoun' => 'ella', 'conjugation' => 'dará'],
                    ['pronoun' => 'eso', 'conjugation' => 'dará'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'darán'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'daremos'],
                    ['pronoun' => 'ellos', 'conjugation' => 'darán'],
                    ['pronoun' => 'eso', 'conjugation' => 'dará'],
                ],
            ],
            [
                'tense' => 'Presente',
                'verb' => 'saber',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'sé'],
                    ['pronoun' => 'tú', 'conjugation' => 'sabes'],
                    ['pronoun' => 'él', 'conjugation' => 'sabe'],
                    ['pronoun' => 'ella', 'conjugation' => 'sabe'],
                    ['pronoun' => 'eso', 'conjugation' => 'sabe'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'saben'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'sabemos'],
                    ['pronoun' => 'ellos', 'conjugation' => 'saben'],
                    ['pronoun' => 'eso', 'conjugation' => 'sabe'],
                ],
            ],
            [
                'tense' => 'Pretérito Imperfecto',
                'verb' => 'saber',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'sabía'],
                    ['pronoun' => 'tú', 'conjugation' => 'sabías'],
                    ['pronoun' => 'él', 'conjugation' => 'sabía'],
                    ['pronoun' => 'ella', 'conjugation' => 'sabía'],
                    ['pronoun' => 'eso', 'conjugation' => 'sabía'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'sabían'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'sabíamos'],
                    ['pronoun' => 'ellos', 'conjugation' => 'sabían'],
                    ['pronoun' => 'eso', 'conjugation' => 'sabía'],
                ],
            ],
            [
                'tense' => 'Pretérito Perfecto',
                'verb' => 'saber',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'he sabido'],
                    ['pronoun' => 'tú', 'conjugation' => 'has sabido'],
                    ['pronoun' => 'él', 'conjugation' => 'ha sabido'],
                    ['pronoun' => 'ella', 'conjugation' => 'ha sabido'],
                    ['pronoun' => 'eso', 'conjugation' => 'ha sabido'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'han sabido'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'hemos sabido'],
                    ['pronoun' => 'ellos', 'conjugation' => 'han sabido'],
                    ['pronoun' => 'eso', 'conjugation' => 'ha sabido'],
                ],
            ],
            [
                'tense' => 'Futuro',
                'verb' => 'saber',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'sabré'],
                    ['pronoun' => 'tú', 'conjugation' => 'sabrás'],
                    ['pronoun' => 'él', 'conjugation' => 'sabrá'],
                    ['pronoun' => 'ella', 'conjugation' => 'sabrá'],
                    ['pronoun' => 'eso', 'conjugation' => 'sabrá'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'sabrán'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'sabremos'],
                    ['pronoun' => 'ellos', 'conjugation' => 'sabrán'],
                    ['pronoun' => 'eso', 'conjugation' => 'sabrá'],
                ],
            ],
            [
                'tense' => 'Presente',
                'verb' => 'querer',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'quiero'],
                    ['pronoun' => 'tú', 'conjugation' => 'quieres'],
                    ['pronoun' => 'él', 'conjugation' => 'quiere'],
                    ['pronoun' => 'ella', 'conjugation' => 'quiere'],
                    ['pronoun' => 'eso', 'conjugation' => 'quiere'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'quieren'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'queremos'],
                    ['pronoun' => 'ellos', 'conjugation' => 'quieren'],
                    ['pronoun' => 'eso', 'conjugation' => 'quiere'],
                ],
            ],
            [
                'tense' => 'Pretérito Imperfecto',
                'verb' => 'querer',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'quería'],
                    ['pronoun' => 'tú', 'conjugation' => 'querías'],
                    ['pronoun' => 'él', 'conjugation' => 'quería'],
                    ['pronoun' => 'ella', 'conjugation' => 'quería'],
                    ['pronoun' => 'eso', 'conjugation' => 'quería'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'querían'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'queríamos'],
                    ['pronoun' => 'ellos', 'conjugation' => 'querían'],
                    ['pronoun' => 'eso', 'conjugation' => 'quería'],
                ],
            ],
            [
                'tense' => 'Pretérito Perfecto',
                'verb' => 'querer',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'he querido'],
                    ['pronoun' => 'tú', 'conjugation' => 'has querido'],
                    ['pronoun' => 'él', 'conjugation' => 'ha querido'],
                    ['pronoun' => 'ella', 'conjugation' => 'ha querido'],
                    ['pronoun' => 'eso', 'conjugation' => 'ha querido'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'han querido'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'hemos querido'],
                    ['pronoun' => 'ellos', 'conjugation' => 'han querido'],
                    ['pronoun' => 'eso', 'conjugation' => 'ha querido'],
                ],
            ],
            [
                'tense' => 'Futuro',
                'verb' => 'querer',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'querré'],
                    ['pronoun' => 'tú', 'conjugation' => 'querrás'],
                    ['pronoun' => 'él', 'conjugation' => 'querrá'],
                    ['pronoun' => 'ella', 'conjugation' => 'querrá'],
                    ['pronoun' => 'eso', 'conjugation' => 'querrá'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'querrán'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'querremos'],
                    ['pronoun' => 'ellos', 'conjugation' => 'querrán'],
                    ['pronoun' => 'eso', 'conjugation' => 'querrá'],
                ],
            ],
            [
                'tense' => 'Presente',
                'verb' => 'llegar',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'llego'],
                    ['pronoun' => 'tú', 'conjugation' => 'llegas'],
                    ['pronoun' => 'él', 'conjugation' => 'llega'],
                    ['pronoun' => 'ella', 'conjugation' => 'llega'],
                    ['pronoun' => 'eso', 'conjugation' => 'llega'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'llegan'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'llegamos'],
                    ['pronoun' => 'ellos', 'conjugation' => 'llegan'],
                    ['pronoun' => 'eso', 'conjugation' => 'llega'],
                ],
            ],
            [
                'tense' => 'Pretérito Imperfecto',
                'verb' => 'llegar',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'llegaba'],
                    ['pronoun' => 'tú', 'conjugation' => 'llegabas'],
                    ['pronoun' => 'él', 'conjugation' => 'llegaba'],
                    ['pronoun' => 'ella', 'conjugation' => 'llegaba'],
                    ['pronoun' => 'eso', 'conjugation' => 'llegaba'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'llegaban'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'llegábamos'],
                    ['pronoun' => 'ellos', 'conjugation' => 'llegaban'],
                    ['pronoun' => 'eso', 'conjugation' => 'llegaba'],
                ],
            ],
            [
                'tense' => 'Pretérito Perfecto',
                'verb' => 'llegar',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'he llegado'],
                    ['pronoun' => 'tú', 'conjugation' => 'has llegado'],
                    ['pronoun' => 'él', 'conjugation' => 'ha llegado'],
                    ['pronoun' => 'ella', 'conjugation' => 'ha llegado'],
                    ['pronoun' => 'eso', 'conjugation' => 'ha llegado'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'han llegado'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'hemos llegado'],
                    ['pronoun' => 'ellos', 'conjugation' => 'han llegado'],
                    ['pronoun' => 'eso', 'conjugation' => 'ha llegado'],
                ],
            ],
            [
                'tense' => 'Futuro',
                'verb' => 'llegar',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'llegaré'],
                    ['pronoun' => 'tú', 'conjugation' => 'llegarás'],
                    ['pronoun' => 'él', 'conjugation' => 'llegará'],
                    ['pronoun' => 'ella', 'conjugation' => 'llegará'],
                    ['pronoun' => 'eso', 'conjugation' => 'llegará'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'llegarán'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'llegaremos'],
                    ['pronoun' => 'ellos', 'conjugation' => 'llegarán'],
                    ['pronoun' => 'eso', 'conjugation' => 'llegará'],
                ],
            ],
            [
                'tense' => 'Presente',
                'verb' => 'pasar',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'paso'],
                    ['pronoun' => 'tú', 'conjugation' => 'pasas'],
                    ['pronoun' => 'él', 'conjugation' => 'pasa'],
                    ['pronoun' => 'ella', 'conjugation' => 'pasa'],
                    ['pronoun' => 'eso', 'conjugation' => 'pasa'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'pasan'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'pasamos'],
                    ['pronoun' => 'ellos', 'conjugation' => 'pasan'],
                    ['pronoun' => 'eso', 'conjugation' => 'pasa'],
                ],
            ],
            [
                'tense' => 'Pretérito Imperfecto',
                'verb' => 'pasar',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'pasaba'],
                    ['pronoun' => 'tú', 'conjugation' => 'pasabas'],
                    ['pronoun' => 'él', 'conjugation' => 'pasaba'],
                    ['pronoun' => 'ella', 'conjugation' => 'pasaba'],
                    ['pronoun' => 'eso', 'conjugation' => 'pasaba'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'pasaban'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'pasábamos'],
                    ['pronoun' => 'ellos', 'conjugation' => 'pasaban'],
                    ['pronoun' => 'eso', 'conjugation' => 'pasaba'],
                ],
            ],
            [
                'tense' => 'Pretérito Perfecto',
                'verb' => 'pasar',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'he pasado'],
                    ['pronoun' => 'tú', 'conjugation' => 'has pasado'],
                    ['pronoun' => 'él', 'conjugation' => 'ha pasado'],
                    ['pronoun' => 'ella', 'conjugation' => 'ha pasado'],
                    ['pronoun' => 'eso', 'conjugation' => 'ha pasado'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'han pasado'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'hemos pasado'],
                    ['pronoun' => 'ellos', 'conjugation' => 'han pasado'],
                    ['pronoun' => 'eso', 'conjugation' => 'ha pasado'],
                ],
            ],
            [
                'tense' => 'Futuro',
                'verb' => 'pasar',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'pasaré'],
                    ['pronoun' => 'tú', 'conjugation' => 'pasarás'],
                    ['pronoun' => 'él', 'conjugation' => 'pasará'],
                    ['pronoun' => 'ella', 'conjugation' => 'pasará'],
                    ['pronoun' => 'eso', 'conjugation' => 'pasará'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'pasarán'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'pasaremos'],
                    ['pronoun' => 'ellos', 'conjugation' => 'pasarán'],
                    ['pronoun' => 'eso', 'conjugation' => 'pasará'],
                ],
            ],
            [
                'tense' => 'Presente',
                'verb' => 'deber',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'debo'],
                    ['pronoun' => 'tú', 'conjugation' => 'debes'],
                    ['pronoun' => 'él', 'conjugation' => 'debe'],
                    ['pronoun' => 'ella', 'conjugation' => 'debe'],
                    ['pronoun' => 'eso', 'conjugation' => 'debe'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'deben'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'debemos'],
                    ['pronoun' => 'ellos', 'conjugation' => 'deben'],
                    ['pronoun' => 'eso', 'conjugation' => 'debe'],
                ],
            ],
            [
                'tense' => 'Pretérito Imperfecto',
                'verb' => 'deber',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'debía'],
                    ['pronoun' => 'tú', 'conjugation' => 'debías'],
                    ['pronoun' => 'él', 'conjugation' => 'debía'],
                    ['pronoun' => 'ella', 'conjugation' => 'debía'],
                    ['pronoun' => 'eso', 'conjugation' => 'debía'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'debían'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'debíamos'],
                    ['pronoun' => 'ellos', 'conjugation' => 'debían'],
                    ['pronoun' => 'eso', 'conjugation' => 'debía'],
                ],
            ],
            [
                'tense' => 'Pretérito Perfecto',
                'verb' => 'deber',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'he debido'],
                    ['pronoun' => 'tú', 'conjugation' => 'has debido'],
                    ['pronoun' => 'él', 'conjugation' => 'ha debido'],
                    ['pronoun' => 'ella', 'conjugation' => 'ha debido'],
                    ['pronoun' => 'eso', 'conjugation' => 'ha debido'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'han debido'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'hemos debido'],
                    ['pronoun' => 'ellos', 'conjugation' => 'han debido'],
                    ['pronoun' => 'eso', 'conjugation' => 'ha debido'],
                ],
            ],
            [
                'tense' => 'Futuro',
                'verb' => 'deber',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'deberé'],
                    ['pronoun' => 'tú', 'conjugation' => 'deberás'],
                    ['pronoun' => 'él', 'conjugation' => 'deberá'],
                    ['pronoun' => 'ella', 'conjugation' => 'deberá'],
                    ['pronoun' => 'eso', 'conjugation' => 'deberá'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'deberán'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'deberemos'],
                    ['pronoun' => 'ellos', 'conjugation' => 'deberán'],
                    ['pronoun' => 'eso', 'conjugation' => 'deberá'],
                ],
            ],
            [
                'tense' => 'Presente',
                'verb' => 'poner',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'pongo'],
                    ['pronoun' => 'tú', 'conjugation' => 'pones'],
                    ['pronoun' => 'él', 'conjugation' => 'pone'],
                    ['pronoun' => 'ella', 'conjugation' => 'pone'],
                    ['pronoun' => 'eso', 'conjugation' => 'pone'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'ponen'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'ponemos'],
                    ['pronoun' => 'ellos', 'conjugation' => 'ponen'],
                    ['pronoun' => 'eso', 'conjugation' => 'pone'],
                ],
            ],
            [
                'tense' => 'Pretérito Imperfecto',
                'verb' => 'poner',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'ponía'],
                    ['pronoun' => 'tú', 'conjugation' => 'ponías'],
                    ['pronoun' => 'él', 'conjugation' => 'ponía'],
                    ['pronoun' => 'ella', 'conjugation' => 'ponía'],
                    ['pronoun' => 'eso', 'conjugation' => 'ponía'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'ponían'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'poníamos'],
                    ['pronoun' => 'ellos', 'conjugation' => 'ponían'],
                    ['pronoun' => 'eso', 'conjugation' => 'ponía'],
                ],
            ],
            [
                'tense' => 'Pretérito Perfecto',
                'verb' => 'poner',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'he puesto'],
                    ['pronoun' => 'tú', 'conjugation' => 'has puesto'],
                    ['pronoun' => 'él', 'conjugation' => 'ha puesto'],
                    ['pronoun' => 'ella', 'conjugation' => 'ha puesto'],
                    ['pronoun' => 'eso', 'conjugation' => 'ha puesto'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'han puesto'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'hemos puesto'],
                    ['pronoun' => 'ellos', 'conjugation' => 'han puesto'],
                    ['pronoun' => 'eso', 'conjugation' => 'ha puesto'],
                ],
            ],
            [
                'tense' => 'Futuro',
                'verb' => 'poner',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'pondré'],
                    ['pronoun' => 'tú', 'conjugation' => 'pondrás'],
                    ['pronoun' => 'él', 'conjugation' => 'pondrá'],
                    ['pronoun' => 'ella', 'conjugation' => 'pondrá'],
                    ['pronoun' => 'eso', 'conjugation' => 'pondrá'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'pondrán'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'pondremos'],
                    ['pronoun' => 'ellos', 'conjugation' => 'pondrán'],
                    ['pronoun' => 'eso', 'conjugation' => 'pondrá'],
                ],
            ],
            [
                'tense' => 'Presente',
                'verb' => 'hablar',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'hablo'],
                    ['pronoun' => 'tú', 'conjugation' => 'hablas'],
                    ['pronoun' => 'él', 'conjugation' => 'habla'],
                    ['pronoun' => 'ella', 'conjugation' => 'habla'],
                    ['pronoun' => 'eso', 'conjugation' => 'habla'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'hablan'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'hablamos'],
                    ['pronoun' => 'ellos', 'conjugation' => 'hablan'],
                    ['pronoun' => 'eso', 'conjugation' => 'habla'],
                ],
            ],
            [
                'tense' => 'Pretérito Imperfecto',
                'verb' => 'hablar',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'hablaba'],
                    ['pronoun' => 'tú', 'conjugation' => 'hablabas'],
                    ['pronoun' => 'él', 'conjugation' => 'hablaba'],
                    ['pronoun' => 'ella', 'conjugation' => 'hablaba'],
                    ['pronoun' => 'eso', 'conjugation' => 'hablaba'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'hablaban'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'hablábamos'],
                    ['pronoun' => 'ellos', 'conjugation' => 'hablaban'],
                    ['pronoun' => 'eso', 'conjugation' => 'hablaba'],
                ],
            ],
            [
                'tense' => 'Pretérito Perfecto',
                'verb' => 'hablar',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'he hablado'],
                    ['pronoun' => 'tú', 'conjugation' => 'has hablado'],
                    ['pronoun' => 'él', 'conjugation' => 'ha hablado'],
                    ['pronoun' => 'ella', 'conjugation' => 'ha hablado'],
                    ['pronoun' => 'eso', 'conjugation' => 'ha hablado'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'han hablado'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'hemos hablado'],
                    ['pronoun' => 'ellos', 'conjugation' => 'han hablado'],
                    ['pronoun' => 'eso', 'conjugation' => 'ha hablado'],
                ],
            ],
            [
                'tense' => 'Futuro',
                'verb' => 'hablar',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'hablaré'],
                    ['pronoun' => 'tú', 'conjugation' => 'hablarás'],
                    ['pronoun' => 'él', 'conjugation' => 'hablará'],
                    ['pronoun' => 'ella', 'conjugation' => 'hablará'],
                    ['pronoun' => 'eso', 'conjugation' => 'hablará'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'hablarán'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'hablaremos'],
                    ['pronoun' => 'ellos', 'conjugation' => 'hablarán'],
                    ['pronoun' => 'eso', 'conjugation' => 'hablará'],
                ],
            ],
            [
                'tense' => 'Presente',
                'verb' => 'comer',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'como'],
                    ['pronoun' => 'tú', 'conjugation' => 'comes'],
                    ['pronoun' => 'él', 'conjugation' => 'come'],
                    ['pronoun' => 'ella', 'conjugation' => 'come'],
                    ['pronoun' => 'eso', 'conjugation' => 'come'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'comen'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'comemos'],
                    ['pronoun' => 'ellos', 'conjugation' => 'comen'],
                    ['pronoun' => 'eso', 'conjugation' => 'come'],
                ],
            ],
            [
                'tense' => 'Pretérito Imperfecto',
                'verb' => 'comer',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'comía'],
                    ['pronoun' => 'tú', 'conjugation' => 'comías'],
                    ['pronoun' => 'él', 'conjugation' => 'comía'],
                    ['pronoun' => 'ella', 'conjugation' => 'comía'],
                    ['pronoun' => 'eso', 'conjugation' => 'comía'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'comían'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'comíamos'],
                    ['pronoun' => 'ellos', 'conjugation' => 'comían'],
                    ['pronoun' => 'eso', 'conjugation' => 'comía'],
                ],
            ],
            [
                'tense' => 'Pretérito Perfecto',
                'verb' => 'comer',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'he comido'],
                    ['pronoun' => 'tú', 'conjugation' => 'has comido'],
                    ['pronoun' => 'él', 'conjugation' => 'ha comido'],
                    ['pronoun' => 'ella', 'conjugation' => 'ha comido'],
                    ['pronoun' => 'eso', 'conjugation' => 'ha comido'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'han comido'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'hemos comido'],
                    ['pronoun' => 'ellos', 'conjugation' => 'han comido'],
                    ['pronoun' => 'eso', 'conjugation' => 'ha comido'],
                ],
            ],
            [
                'tense' => 'Futuro',
                'verb' => 'comer',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'comeré'],
                    ['pronoun' => 'tú', 'conjugation' => 'comerás'],
                    ['pronoun' => 'él', 'conjugation' => 'comerá'],
                    ['pronoun' => 'ella', 'conjugation' => 'comerá'],
                    ['pronoun' => 'eso', 'conjugation' => 'comerá'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'comerán'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'comeremos'],
                    ['pronoun' => 'ellos', 'conjugation' => 'comerán'],
                    ['pronoun' => 'eso', 'conjugation' => 'comerá'],
                ],
            ],
            [
                'tense' => 'Presente',
                'verb' => 'vivir',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'vivo'],
                    ['pronoun' => 'tú', 'conjugation' => 'vives'],
                    ['pronoun' => 'él', 'conjugation' => 'vive'],
                    ['pronoun' => 'ella', 'conjugation' => 'vive'],
                    ['pronoun' => 'eso', 'conjugation' => 'vive'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'viven'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'vivimos'],
                    ['pronoun' => 'ellos', 'conjugation' => 'viven'],
                    ['pronoun' => 'eso', 'conjugation' => 'vive'],
                ],
            ],
            [
                'tense' => 'Pretérito Imperfecto',
                'verb' => 'vivir',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'vivía'],
                    ['pronoun' => 'tú', 'conjugation' => 'vivías'],
                    ['pronoun' => 'él', 'conjugation' => 'vivía'],
                    ['pronoun' => 'ella', 'conjugation' => 'vivía'],
                    ['pronoun' => 'eso', 'conjugation' => 'vivía'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'vivían'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'vivíamos'],
                    ['pronoun' => 'ellos', 'conjugation' => 'vivían'],
                    ['pronoun' => 'eso', 'conjugation' => 'vivía'],
                ],
            ],
            [
                'tense' => 'Pretérito Perfecto',
                'verb' => 'vivir',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'he vivido'],
                    ['pronoun' => 'tú', 'conjugation' => 'has vivido'],
                    ['pronoun' => 'él', 'conjugation' => 'ha vivido'],
                    ['pronoun' => 'ella', 'conjugation' => 'ha vivido'],
                    ['pronoun' => 'eso', 'conjugation' => 'ha vivido'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'han vivido'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'hemos vivido'],
                    ['pronoun' => 'ellos', 'conjugation' => 'han vivido'],
                    ['pronoun' => 'eso', 'conjugation' => 'ha vivido'],
                ],
            ],
            [
                'tense' => 'Futuro',
                'verb' => 'vivir',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'viviré'],
                    ['pronoun' => 'tú', 'conjugation' => 'vivirás'],
                    ['pronoun' => 'él', 'conjugation' => 'vivirá'],
                    ['pronoun' => 'ella', 'conjugation' => 'vivirá'],
                    ['pronoun' => 'eso', 'conjugation' => 'vivirá'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'vivirán'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'viviremos'],
                    ['pronoun' => 'ellos', 'conjugation' => 'vivirán'],
                    ['pronoun' => 'eso', 'conjugation' => 'vivirá'],
                ],
            ],
            [
                'tense' => 'Presente',
                'verb' => 'tener',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'tengo'],
                    ['pronoun' => 'tú', 'conjugation' => 'tienes'],
                    ['pronoun' => 'él', 'conjugation' => 'tiene'],
                    ['pronoun' => 'ella', 'conjugation' => 'tiene'],
                    ['pronoun' => 'eso', 'conjugation' => 'tiene'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'tienen'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'tenemos'],
                    ['pronoun' => 'ellos', 'conjugation' => 'tienen'],
                    ['pronoun' => 'eso', 'conjugation' => 'tiene'],
                ],
            ],
            [
                'tense' => 'Pretérito Imperfecto',
                'verb' => 'tener',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'tenía'],
                    ['pronoun' => 'tú', 'conjugation' => 'tenías'],
                    ['pronoun' => 'él', 'conjugation' => 'tenía'],
                    ['pronoun' => 'ella', 'conjugation' => 'tenía'],
                    ['pronoun' => 'eso', 'conjugation' => 'tenía'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'tenían'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'teníamos'],
                    ['pronoun' => 'ellos', 'conjugation' => 'tenían'],
                    ['pronoun' => 'eso', 'conjugation' => 'tenía'],
                ],
            ],
            [
                'tense' => 'Pretérito Perfecto',
                'verb' => 'tener',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'he tenido'],
                    ['pronoun' => 'tú', 'conjugation' => 'has tenido'],
                    ['pronoun' => 'él', 'conjugation' => 'ha tenido'],
                    ['pronoun' => 'ella', 'conjugation' => 'ha tenido'],
                    ['pronoun' => 'eso', 'conjugation' => 'ha tenido'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'han tenido'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'hemos tenido'],
                    ['pronoun' => 'ellos', 'conjugation' => 'han tenido'],
                    ['pronoun' => 'eso', 'conjugation' => 'ha tenido'],
                ],
            ],
            [
                'tense' => 'Futuro',
                'verb' => 'tener',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'tendré'],
                    ['pronoun' => 'tú', 'conjugation' => 'tendrás'],
                    ['pronoun' => 'él', 'conjugation' => 'tendrá'],
                    ['pronoun' => 'ella', 'conjugation' => 'tendrá'],
                    ['pronoun' => 'eso', 'conjugation' => 'tendrá'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'tendrán'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'tendremos'],
                    ['pronoun' => 'ellos', 'conjugation' => 'tendrán'],
                    ['pronoun' => 'eso', 'conjugation' => 'tendrá'],
                ],
            ],
            [
                'tense' => 'Presente',
                'verb' => 'hacer',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'hago'],
                    ['pronoun' => 'tú', 'conjugation' => 'haces'],
                    ['pronoun' => 'él', 'conjugation' => 'hace'],
                    ['pronoun' => 'ella', 'conjugation' => 'hace'],
                    ['pronoun' => 'eso', 'conjugation' => 'hace'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'hacen'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'hacemos'],
                    ['pronoun' => 'ellos', 'conjugation' => 'hacen'],
                    ['pronoun' => 'eso', 'conjugation' => 'hace'],
                ],
            ],
            [
                'tense' => 'Pretérito Imperfecto',
                'verb' => 'hacer',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'hacía'],
                    ['pronoun' => 'tú', 'conjugation' => 'hacías'],
                    ['pronoun' => 'él', 'conjugation' => 'hacía'],
                    ['pronoun' => 'ella', 'conjugation' => 'hacía'],
                    ['pronoun' => 'eso', 'conjugation' => 'hacía'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'hacían'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'hacíamos'],
                    ['pronoun' => 'ellos', 'conjugation' => 'hacían'],
                    ['pronoun' => 'eso', 'conjugation' => 'hacía'],
                ],
            ],
            [
                'tense' => 'Pretérito Perfecto',
                'verb' => 'hacer',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'he hecho'],
                    ['pronoun' => 'tú', 'conjugation' => 'has hecho'],
                    ['pronoun' => 'él', 'conjugation' => 'ha hecho'],
                    ['pronoun' => 'ella', 'conjugation' => 'ha hecho'],
                    ['pronoun' => 'eso', 'conjugation' => 'ha hecho'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'han hecho'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'hemos hecho'],
                    ['pronoun' => 'ellos', 'conjugation' => 'han hecho'],
                    ['pronoun' => 'eso', 'conjugation' => 'ha hecho'],
                ],
            ],
            [
                'tense' => 'Futuro',
                'verb' => 'hacer',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'haré'],
                    ['pronoun' => 'tú', 'conjugation' => 'harás'],
                    ['pronoun' => 'él', 'conjugation' => 'hará'],
                    ['pronoun' => 'ella', 'conjugation' => 'hará'],
                    ['pronoun' => 'eso', 'conjugation' => 'hará'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'harán'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'haremos'],
                    ['pronoun' => 'ellos', 'conjugation' => 'harán'],
                    ['pronoun' => 'eso', 'conjugation' => 'hará'],
                ],
            ],
            [
                'tense' => 'Presente',
                'verb' => 'decir',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'digo'],
                    ['pronoun' => 'tú', 'conjugation' => 'dices'],
                    ['pronoun' => 'él', 'conjugation' => 'dice'],
                    ['pronoun' => 'ella', 'conjugation' => 'dice'],
                    ['pronoun' => 'eso', 'conjugation' => 'dice'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'dicen'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'decimos'],
                    ['pronoun' => 'ellos', 'conjugation' => 'dicen'],
                    ['pronoun' => 'eso', 'conjugation' => 'dice'],
                ],
            ],
            [
                'tense' => 'Pretérito Imperfecto',
                'verb' => 'decir',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'decía'],
                    ['pronoun' => 'tú', 'conjugation' => 'decías'],
                    ['pronoun' => 'él', 'conjugation' => 'decía'],
                    ['pronoun' => 'ella', 'conjugation' => 'decía'],
                    ['pronoun' => 'eso', 'conjugation' => 'decía'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'decían'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'decíamos'],
                    ['pronoun' => 'ellos', 'conjugation' => 'decían'],
                    ['pronoun' => 'eso', 'conjugation' => 'decía'],
                ],
            ],
            [
                'tense' => 'Pretérito Perfecto',
                'verb' => 'decir',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'he dicho'],
                    ['pronoun' => 'tú', 'conjugation' => 'has dicho'],
                    ['pronoun' => 'él', 'conjugation' => 'ha dicho'],
                    ['pronoun' => 'ella', 'conjugation' => 'ha dicho'],
                    ['pronoun' => 'eso', 'conjugation' => 'ha dicho'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'han dicho'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'hemos dicho'],
                    ['pronoun' => 'ellos', 'conjugation' => 'han dicho'],
                    ['pronoun' => 'eso', 'conjugation' => 'ha dicho'],
                ],
            ],
            [
                'tense' => 'Futuro',
                'verb' => 'decir',
                'conjugations' => [
                    ['pronoun' => 'yo', 'conjugation' => 'diré'],
                    ['pronoun' => 'tú', 'conjugation' => 'dirás'],
                    ['pronoun' => 'él', 'conjugation' => 'dirá'],
                    ['pronoun' => 'ella', 'conjugation' => 'dirá'],
                    ['pronoun' => 'eso', 'conjugation' => 'dirá'],
                    ['pronoun' => 'ustedes', 'conjugation' => 'dirán'],
                    ['pronoun' => 'nosotros', 'conjugation' => 'diremos'],
                    ['pronoun' => 'ellos', 'conjugation' => 'dirán'],
                    ['pronoun' => 'eso', 'conjugation' => 'dirá'],
                ],
            ],

        ];

        foreach ($spanishVerbConjugations as $conjugation) {
            TenseConjugation::create($conjugation);
        }

        $spanishVerbConjugationsExercises = [
            [
                "verbs" => ['ser', 'estar', 'ir', 'saber', 'llegar', 'hablar', 'comer', 'vivir', 'tener', 'hacer', 'decir'],
                "course_name" => "Spanish for Everyone",
                "lesson_number" => 7,
                "tenses" => ['Presente'],
                "pronouns" => ["yo", "tú", "él", "ella", "eso", "ustedes", "nosotros", "ellos", "eso"],

            ],
            // TODO: Add imperative verbs
            [
                "verbs" => ['ser', 'estar', 'ir', 'ver', 'dar', 'saber', 'querer', 'llegar', 'pasar', 'deber', 'poner'],
                "course_name" => "Spanish for Everyone",
                "lesson_number" => 14,
                "tenses" => ['Presente'],
                "pronouns" => ["yo", "tú", "él", "ella", "eso", "ustedes", "nosotros", "ellos", "eso"],
            ],
        ];


        foreach ($spanishVerbConjugationsExercises as $item) {
            // Retrieve course and lesson by name and number
            $course = Course::where('name', $item['course_name'])->first();
            if (!$course) {
                continue; // Skip if course not found
            }

            $lesson = $course->lessons()->where('lesson_number', $item['lesson_number'])->first();
            if (!$lesson) {
                continue; // Skip if lesson not found
            }

            foreach ($item["verbs"] as $verb) {

                // Create verb conjugation exercise
                $exercise = VerbConjugationExercise::create([
                    'verb' => $verb,
                    'tenses' => $item['tenses'],
                    'pronouns' => $item['pronouns'],
                    'lesson_id' => $lesson->id,
                ]);

                $exerciseForVerbConjugation = Exercise::create([
                    'exerciseable_id' => $exercise->id,
                    'exerciseable_type' => get_class($exercise),
                    'lesson_id' => $lesson->id
                ]);

                $exerciseForVerbConjugation = Exercise::create([
                    'exerciseable_id' => $exercise->id,
                    'exerciseable_type' => get_class($exercise),
                    'lesson_id' => $lesson->id
                ]);

                // Attach conjugations based on verb and tenses
                foreach ($item['tenses'] as $tense) {
                    $conjugation = TenseConjugation::where('verb', $verb)
                        ->where('tense', $tense)
                        ->first();
                    $exercise->tenseConjugations()->attach($conjugation->id);
                }
            }
        }

        // List of english verbs
        // 1.  be
        // 2.  have
        // 3.  do
        // 4.  say
        // 5.  go
        // 6.  can
        // 7.  get
        // 8.  would XXXX
        // 9.  make
        // 10. know
        // 11. will
        // 12. think
        // 13. take
        // 14. see
        // 15. come
        // 16. could
        // 17. want
        // 18. look
        // 19. use
        // 20. find
        // 21. give
        // 22. tell
        // 23. work
        // 24. may
        // 25. should
        // 26. call
        // 27. try
        // 28. ask
        // 29. need
        // 30. feel
        // 31. become
        // 32. leave
        // 33. put
        // 34. mean
        // 35. keep
        // 36. let
        // 37. begin
        // 38. seem
        // 39. help
        // 40. talk
        // 41. turn
        // 42. start
        // 43. might
        // 44. show
        // 45. hear
        // 46. play
        // 47. run
        // 48. move
        // 49. like
        // 50. live
        // 51. believe
        // 52. hold
        // 53. bring
        // 54. happen
        // 55. must
        // 56. write
        // 57. provide
        // 58. sit
        // 59. stand
        // 60. lose
        // 61. pay
        // 62. meet
        // 63. include
        // 64. continue
        // 65. set
        // 66. learn
        // 67. change
        // 68. lead
        // 69. understand
        // 70. watch
        // 71. follow
        // 72. stop
        // 73. create
        // 74. speak
        // 75. read
        // 76. allow
        // 77. add
        // 78. spend
        // 79. grow
        // 80. open
        // 81. walk
        // 82. win
        // 83. offer
        // 84. remember
        // 85. love
        // 86. consider
        // 87. appear
        // 88. buy
        // 89. wait
        // 90. serve
        // 91. die
        // 92. send
        // 93. expect
        // 94. build
        // 95. stay
        // 96. fall
        // 97. cut
        // 98. reach
        // 99. kill
        // 100. remain

        $englishVerbConjugations = [
            [
                'tense' => 'Present',
                'verb' => 'be',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'am'],
                    ['pronoun' => 'you', 'conjugation' => 'are'],
                    ['pronoun' => 'he', 'conjugation' => 'is'],
                    ['pronoun' => 'she', 'conjugation' => 'is'],
                    ['pronoun' => 'it', 'conjugation' => 'is'],
                    ['pronoun' => 'we', 'conjugation' => 'are'],
                    ['pronoun' => 'you', 'conjugation' => 'are'],
                    ['pronoun' => 'they', 'conjugation' => 'are'],
                ],
            ],
            [
                'tense' => 'Preterite',
                'verb' => 'be',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'was'],
                    ['pronoun' => 'you', 'conjugation' => 'were'],
                    ['pronoun' => 'he', 'conjugation' => 'was'],
                    ['pronoun' => 'she', 'conjugation' => 'was'],
                    ['pronoun' => 'it', 'conjugation' => 'was'],
                    ['pronoun' => 'we', 'conjugation' => 'were'],
                    ['pronoun' => 'you', 'conjugation' => 'were'],
                    ['pronoun' => 'they', 'conjugation' => 'were'],
                ],
            ],
            [
                'tense' => 'Present Perfect',
                'verb' => 'be',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'have been'],
                    ['pronoun' => 'you', 'conjugation' => 'have been'],
                    ['pronoun' => 'he', 'conjugation' => 'has been'],
                    ['pronoun' => 'she', 'conjugation' => 'has been'],
                    ['pronoun' => 'it', 'conjugation' => 'has been'],
                    ['pronoun' => 'we', 'conjugation' => 'have been'],
                    ['pronoun' => 'you', 'conjugation' => 'have been'],
                    ['pronoun' => 'they', 'conjugation' => 'have been'],
                ],
            ],
            [
                'tense' => 'Future',
                'verb' => 'be',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'will be'],
                    ['pronoun' => 'you', 'conjugation' => 'will be'],
                    ['pronoun' => 'he', 'conjugation' => 'will be'],
                    ['pronoun' => 'she', 'conjugation' => 'will be'],
                    ['pronoun' => 'it', 'conjugation' => 'will be'],
                    ['pronoun' => 'we', 'conjugation' => 'will be'],
                    ['pronoun' => 'you', 'conjugation' => 'will be'],
                    ['pronoun' => 'they', 'conjugation' => 'will be'],
                ],
            ],
            [
                'tense' => 'Present',
                'verb' => 'have',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'have'],
                    ['pronoun' => 'you', 'conjugation' => 'have'],
                    ['pronoun' => 'he', 'conjugation' => 'has'],
                    ['pronoun' => 'she', 'conjugation' => 'has'],
                    ['pronoun' => 'it', 'conjugation' => 'has'],
                    ['pronoun' => 'we', 'conjugation' => 'have'],
                    ['pronoun' => 'you', 'conjugation' => 'have'],
                    ['pronoun' => 'they', 'conjugation' => 'have'],
                ],
            ],
            [
                'tense' => 'Preterite',
                'verb' => 'have',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'had'],
                    ['pronoun' => 'you', 'conjugation' => 'had'],
                    ['pronoun' => 'he', 'conjugation' => 'had'],
                    ['pronoun' => 'she', 'conjugation' => 'had'],
                    ['pronoun' => 'it', 'conjugation' => 'had'],
                    ['pronoun' => 'we', 'conjugation' => 'had'],
                    ['pronoun' => 'you', 'conjugation' => 'had'],
                    ['pronoun' => 'they', 'conjugation' => 'had'],
                ],
            ],
            [
                'tense' => 'Present Perfect',
                'verb' => 'have',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'have had'],
                    ['pronoun' => 'you', 'conjugation' => 'have had'],
                    ['pronoun' => 'he', 'conjugation' => 'has had'],
                    ['pronoun' => 'she', 'conjugation' => 'has had'],
                    ['pronoun' => 'it', 'conjugation' => 'has had'],
                    ['pronoun' => 'we', 'conjugation' => 'have had'],
                    ['pronoun' => 'you', 'conjugation' => 'have had'],
                    ['pronoun' => 'they', 'conjugation' => 'have had'],
                ],
            ],
            [
                'tense' => 'Future',
                'verb' => 'have',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'will have'],
                    ['pronoun' => 'you', 'conjugation' => 'will have'],
                    ['pronoun' => 'he', 'conjugation' => 'will have'],
                    ['pronoun' => 'she', 'conjugation' => 'will have'],
                    ['pronoun' => 'it', 'conjugation' => 'will have'],
                    ['pronoun' => 'we', 'conjugation' => 'will have'],
                    ['pronoun' => 'you', 'conjugation' => 'will have'],
                    ['pronoun' => 'they', 'conjugation' => 'will have'],
                ],
            ],
            [
                'tense' => 'Present',
                'verb' => 'do',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'do'],
                    ['pronoun' => 'you', 'conjugation' => 'do'],
                    ['pronoun' => 'he', 'conjugation' => 'does'],
                    ['pronoun' => 'she', 'conjugation' => 'does'],
                    ['pronoun' => 'it', 'conjugation' => 'does'],
                    ['pronoun' => 'we', 'conjugation' => 'do'],
                    ['pronoun' => 'you', 'conjugation' => 'do'],
                    ['pronoun' => 'they', 'conjugation' => 'do'],
                ],
            ],
            [
                'tense' => 'Preterite',
                'verb' => 'do',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'did'],
                    ['pronoun' => 'you', 'conjugation' => 'did'],
                    ['pronoun' => 'he', 'conjugation' => 'did'],
                    ['pronoun' => 'she', 'conjugation' => 'did'],
                    ['pronoun' => 'it', 'conjugation' => 'did'],
                    ['pronoun' => 'we', 'conjugation' => 'did'],
                    ['pronoun' => 'you', 'conjugation' => 'did'],
                    ['pronoun' => 'they', 'conjugation' => 'did'],
                ],
            ],
            [
                'tense' => 'Present Perfect',
                'verb' => 'do',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'have done'],
                    ['pronoun' => 'you', 'conjugation' => 'have done'],
                    ['pronoun' => 'he', 'conjugation' => 'has done'],
                    ['pronoun' => 'she', 'conjugation' => 'has done'],
                    ['pronoun' => 'it', 'conjugation' => 'has done'],
                    ['pronoun' => 'we', 'conjugation' => 'have done'],
                    ['pronoun' => 'you', 'conjugation' => 'have done'],
                    ['pronoun' => 'they', 'conjugation' => 'have done'],
                ],
            ],
            [
                'tense' => 'Future',
                'verb' => 'do',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'will do'],
                    ['pronoun' => 'you', 'conjugation' => 'will do'],
                    ['pronoun' => 'he', 'conjugation' => 'will do'],
                    ['pronoun' => 'she', 'conjugation' => 'will do'],
                    ['pronoun' => 'it', 'conjugation' => 'will do'],
                    ['pronoun' => 'we', 'conjugation' => 'will do'],
                    ['pronoun' => 'you', 'conjugation' => 'will do'],
                    ['pronoun' => 'they', 'conjugation' => 'will do'],
                ],
            ],
            [
                'tense' => 'Present',
                'verb' => 'say',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'say'],
                    ['pronoun' => 'you', 'conjugation' => 'say'],
                    ['pronoun' => 'he', 'conjugation' => 'says'],
                    ['pronoun' => 'she', 'conjugation' => 'says'],
                    ['pronoun' => 'it', 'conjugation' => 'says'],
                    ['pronoun' => 'we', 'conjugation' => 'say'],
                    ['pronoun' => 'you', 'conjugation' => 'say'],
                    ['pronoun' => 'they', 'conjugation' => 'say'],
                ],
            ],
            [
                'tense' => 'Preterite',
                'verb' => 'say',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'said'],
                    ['pronoun' => 'you', 'conjugation' => 'said'],
                    ['pronoun' => 'he', 'conjugation' => 'said'],
                    ['pronoun' => 'she', 'conjugation' => 'said'],
                    ['pronoun' => 'it', 'conjugation' => 'said'],
                    ['pronoun' => 'we', 'conjugation' => 'said'],
                    ['pronoun' => 'you', 'conjugation' => 'said'],
                    ['pronoun' => 'they', 'conjugation' => 'said'],
                ],
            ],
            [
                'tense' => 'Present Perfect',
                'verb' => 'say',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'have said'],
                    ['pronoun' => 'you', 'conjugation' => 'have said'],
                    ['pronoun' => 'he', 'conjugation' => 'has said'],
                    ['pronoun' => 'she', 'conjugation' => 'has said'],
                    ['pronoun' => 'it', 'conjugation' => 'has said'],
                    ['pronoun' => 'we', 'conjugation' => 'have said'],
                    ['pronoun' => 'you', 'conjugation' => 'have said'],
                    ['pronoun' => 'they', 'conjugation' => 'have said'],
                ],
            ],
            [
                'tense' => 'Future',
                'verb' => 'say',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'will say'],
                    ['pronoun' => 'you', 'conjugation' => 'will say'],
                    ['pronoun' => 'he', 'conjugation' => 'will say'],
                    ['pronoun' => 'she', 'conjugation' => 'will say'],
                    ['pronoun' => 'it', 'conjugation' => 'will say'],
                    ['pronoun' => 'we', 'conjugation' => 'will say'],
                    ['pronoun' => 'you', 'conjugation' => 'will say'],
                    ['pronoun' => 'they', 'conjugation' => 'will say'],
                ],
            ],
            [
                'tense' => 'Present',
                'verb' => 'go',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'go'],
                    ['pronoun' => 'you', 'conjugation' => 'go'],
                    ['pronoun' => 'he', 'conjugation' => 'goes'],
                    ['pronoun' => 'she', 'conjugation' => 'goes'],
                    ['pronoun' => 'it', 'conjugation' => 'goes'],
                    ['pronoun' => 'we', 'conjugation' => 'go'],
                    ['pronoun' => 'you', 'conjugation' => 'go'],
                    ['pronoun' => 'they', 'conjugation' => 'go'],
                ],
            ],
            [
                'tense' => 'Preterite',
                'verb' => 'go',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'went'],
                    ['pronoun' => 'you', 'conjugation' => 'went'],
                    ['pronoun' => 'he', 'conjugation' => 'went'],
                    ['pronoun' => 'she', 'conjugation' => 'went'],
                    ['pronoun' => 'it', 'conjugation' => 'went'],
                    ['pronoun' => 'we', 'conjugation' => 'went'],
                    ['pronoun' => 'you', 'conjugation' => 'went'],
                    ['pronoun' => 'they', 'conjugation' => 'went'],
                ],
            ],
            [
                'tense' => 'Present Perfect',
                'verb' => 'go',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'have gone'],
                    ['pronoun' => 'you', 'conjugation' => 'have gone'],
                    ['pronoun' => 'he', 'conjugation' => 'has gone'],
                    ['pronoun' => 'she', 'conjugation' => 'has gone'],
                    ['pronoun' => 'it', 'conjugation' => 'has gone'],
                    ['pronoun' => 'we', 'conjugation' => 'have gone'],
                    ['pronoun' => 'you', 'conjugation' => 'have gone'],
                    ['pronoun' => 'they', 'conjugation' => 'have gone'],
                ],
            ],
            [
                'tense' => 'Future',
                'verb' => 'go',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'will go'],
                    ['pronoun' => 'you', 'conjugation' => 'will go'],
                    ['pronoun' => 'he', 'conjugation' => 'will go'],
                    ['pronoun' => 'she', 'conjugation' => 'will go'],
                    ['pronoun' => 'it', 'conjugation' => 'will go'],
                    ['pronoun' => 'we', 'conjugation' => 'will go'],
                    ['pronoun' => 'you', 'conjugation' => 'will go'],
                    ['pronoun' => 'they', 'conjugation' => 'will go'],
                ],
            ],
            [
                'tense' => 'Present',
                'verb' => 'can',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'can'],
                    ['pronoun' => 'you', 'conjugation' => 'can'],
                    ['pronoun' => 'he', 'conjugation' => 'can'],
                    ['pronoun' => 'she', 'conjugation' => 'can'],
                    ['pronoun' => 'it', 'conjugation' => 'can'],
                    ['pronoun' => 'we', 'conjugation' => 'can'],
                    ['pronoun' => 'you', 'conjugation' => 'can'],
                    ['pronoun' => 'they', 'conjugation' => 'can'],
                ],
            ],
            [
                'tense' => 'Preterite',
                'verb' => 'can',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'could'],
                    ['pronoun' => 'you', 'conjugation' => 'could'],
                    ['pronoun' => 'he', 'conjugation' => 'could'],
                    ['pronoun' => 'she', 'conjugation' => 'could'],
                    ['pronoun' => 'it', 'conjugation' => 'could'],
                    ['pronoun' => 'we', 'conjugation' => 'could'],
                    ['pronoun' => 'you', 'conjugation' => 'could'],
                    ['pronoun' => 'they', 'conjugation' => 'could'],
                ],
            ],
            [
                'tense' => 'Present Perfect',
                'verb' => 'can',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'have been able to'],
                    ['pronoun' => 'you', 'conjugation' => 'have been able to'],
                    ['pronoun' => 'he', 'conjugation' => 'has been able to'],
                    ['pronoun' => 'she', 'conjugation' => 'has been able to'],
                    ['pronoun' => 'it', 'conjugation' => 'has been able to'],
                    ['pronoun' => 'we', 'conjugation' => 'have been able to'],
                    ['pronoun' => 'you', 'conjugation' => 'have been able to'],
                    ['pronoun' => 'they', 'conjugation' => 'have been able to'],
                ],
            ],
            [
                'tense' => 'Future',
                'verb' => 'can',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'will be able to'],
                    ['pronoun' => 'you', 'conjugation' => 'will be able to'],
                    ['pronoun' => 'he', 'conjugation' => 'will be able to'],
                    ['pronoun' => 'she', 'conjugation' => 'will be able to'],
                    ['pronoun' => 'it', 'conjugation' => 'will be able to'],
                    ['pronoun' => 'we', 'conjugation' => 'will be able to'],
                    ['pronoun' => 'you', 'conjugation' => 'will be able to'],
                    ['pronoun' => 'they', 'conjugation' => 'will be able to'],
                ],
            ],
            [
                'tense' => 'Present',
                'verb' => 'get',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'get'],
                    ['pronoun' => 'you', 'conjugation' => 'get'],
                    ['pronoun' => 'he', 'conjugation' => 'gets'],
                    ['pronoun' => 'she', 'conjugation' => 'gets'],
                    ['pronoun' => 'it', 'conjugation' => 'gets'],
                    ['pronoun' => 'we', 'conjugation' => 'get'],
                    ['pronoun' => 'you', 'conjugation' => 'get'],
                    ['pronoun' => 'they', 'conjugation' => 'get'],
                ],
            ],
            [
                'tense' => 'Preterite',
                'verb' => 'get',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'got'],
                    ['pronoun' => 'you', 'conjugation' => 'got'],
                    ['pronoun' => 'he', 'conjugation' => 'got'],
                    ['pronoun' => 'she', 'conjugation' => 'got'],
                    ['pronoun' => 'it', 'conjugation' => 'got'],
                    ['pronoun' => 'we', 'conjugation' => 'got'],
                    ['pronoun' => 'you', 'conjugation' => 'got'],
                    ['pronoun' => 'they', 'conjugation' => 'got'],
                ],
            ],
            [
                'tense' => 'Present Perfect',
                'verb' => 'get',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'have gotten'],
                    ['pronoun' => 'you', 'conjugation' => 'have gotten'],
                    ['pronoun' => 'he', 'conjugation' => 'has gotten'],
                    ['pronoun' => 'she', 'conjugation' => 'has gotten'],
                    ['pronoun' => 'it', 'conjugation' => 'has gotten'],
                    ['pronoun' => 'we', 'conjugation' => 'have gotten'],
                    ['pronoun' => 'you', 'conjugation' => 'have gotten'],
                    ['pronoun' => 'they', 'conjugation' => 'have gotten'],
                ],
            ],
            [
                'tense' => 'Future',
                'verb' => 'get',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'will get'],
                    ['pronoun' => 'you', 'conjugation' => 'will get'],
                    ['pronoun' => 'he', 'conjugation' => 'will get'],
                    ['pronoun' => 'she', 'conjugation' => 'will get'],
                    ['pronoun' => 'it', 'conjugation' => 'will get'],
                    ['pronoun' => 'we', 'conjugation' => 'will get'],
                    ['pronoun' => 'you', 'conjugation' => 'will get'],
                    ['pronoun' => 'they', 'conjugation' => 'will get'],
                ],
            ],
            [
                'tense' => 'Present',
                'verb' => 'make',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'make'],
                    ['pronoun' => 'you', 'conjugation' => 'make'],
                    ['pronoun' => 'he', 'conjugation' => 'makes'],
                    ['pronoun' => 'she', 'conjugation' => 'makes'],
                    ['pronoun' => 'it', 'conjugation' => 'makes'],
                    ['pronoun' => 'we', 'conjugation' => 'make'],
                    ['pronoun' => 'you', 'conjugation' => 'make'],
                    ['pronoun' => 'they', 'conjugation' => 'make'],
                ],
            ],
            [
                'tense' => 'Preterite',
                'verb' => 'make',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'made'],
                    ['pronoun' => 'you', 'conjugation' => 'made'],
                    ['pronoun' => 'he', 'conjugation' => 'made'],
                    ['pronoun' => 'she', 'conjugation' => 'made'],
                    ['pronoun' => 'it', 'conjugation' => 'made'],
                    ['pronoun' => 'we', 'conjugation' => 'made'],
                    ['pronoun' => 'you', 'conjugation' => 'made'],
                    ['pronoun' => 'they', 'conjugation' => 'made'],
                ],
            ],
            [
                'tense' => 'Present Perfect',
                'verb' => 'make',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'have made'],
                    ['pronoun' => 'you', 'conjugation' => 'have made'],
                    ['pronoun' => 'he', 'conjugation' => 'has made'],
                    ['pronoun' => 'she', 'conjugation' => 'has made'],
                    ['pronoun' => 'it', 'conjugation' => 'has made'],
                    ['pronoun' => 'we', 'conjugation' => 'have made'],
                    ['pronoun' => 'you', 'conjugation' => 'have made'],
                    ['pronoun' => 'they', 'conjugation' => 'have made'],
                ],
            ],
            [
                'tense' => 'Future',
                'verb' => 'make',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'will make'],
                    ['pronoun' => 'you', 'conjugation' => 'will make'],
                    ['pronoun' => 'he', 'conjugation' => 'will make'],
                    ['pronoun' => 'she', 'conjugation' => 'will make'],
                    ['pronoun' => 'it', 'conjugation' => 'will make'],
                    ['pronoun' => 'we', 'conjugation' => 'will make'],
                    ['pronoun' => 'you', 'conjugation' => 'will make'],
                    ['pronoun' => 'they', 'conjugation' => 'will make'],
                ],
            ],
            [
                'tense' => 'Present',
                'verb' => 'know',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'know'],
                    ['pronoun' => 'you', 'conjugation' => 'know'],
                    ['pronoun' => 'he', 'conjugation' => 'knows'],
                    ['pronoun' => 'she', 'conjugation' => 'knows'],
                    ['pronoun' => 'it', 'conjugation' => 'knows'],
                    ['pronoun' => 'we', 'conjugation' => 'know'],
                    ['pronoun' => 'you', 'conjugation' => 'know'],
                    ['pronoun' => 'they', 'conjugation' => 'know'],
                ],
            ],
            [
                'tense' => 'Preterite',
                'verb' => 'know',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'knew'],
                    ['pronoun' => 'you', 'conjugation' => 'knew'],
                    ['pronoun' => 'he', 'conjugation' => 'knew'],
                    ['pronoun' => 'she', 'conjugation' => 'knew'],
                    ['pronoun' => 'it', 'conjugation' => 'knew'],
                    ['pronoun' => 'we', 'conjugation' => 'knew'],
                    ['pronoun' => 'you', 'conjugation' => 'knew'],
                    ['pronoun' => 'they', 'conjugation' => 'knew'],
                ],
            ],
            [
                'tense' => 'Present Perfect',
                'verb' => 'know',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'have known'],
                    ['pronoun' => 'you', 'conjugation' => 'have known'],
                    ['pronoun' => 'he', 'conjugation' => 'has known'],
                    ['pronoun' => 'she', 'conjugation' => 'has known'],
                    ['pronoun' => 'it', 'conjugation' => 'has known'],
                    ['pronoun' => 'we', 'conjugation' => 'have known'],
                    ['pronoun' => 'you', 'conjugation' => 'have known'],
                    ['pronoun' => 'they', 'conjugation' => 'have known'],
                ],
            ],
            [
                'tense' => 'Future',
                'verb' => 'know',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'will know'],
                    ['pronoun' => 'you', 'conjugation' => 'will know'],
                    ['pronoun' => 'he', 'conjugation' => 'will know'],
                    ['pronoun' => 'she', 'conjugation' => 'will know'],
                    ['pronoun' => 'it', 'conjugation' => 'will know'],
                    ['pronoun' => 'we', 'conjugation' => 'will know'],
                    ['pronoun' => 'you', 'conjugation' => 'will know'],
                    ['pronoun' => 'they', 'conjugation' => 'will know'],
                ],
            ],
            [
                'tense' => 'Present',
                'verb' => 'think',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'think'],
                    ['pronoun' => 'you', 'conjugation' => 'think'],
                    ['pronoun' => 'he', 'conjugation' => 'thinks'],
                    ['pronoun' => 'she', 'conjugation' => 'thinks'],
                    ['pronoun' => 'it', 'conjugation' => 'thinks'],
                    ['pronoun' => 'we', 'conjugation' => 'think'],
                    ['pronoun' => 'you', 'conjugation' => 'think'],
                    ['pronoun' => 'they', 'conjugation' => 'think'],
                ],
            ],
            [
                'tense' => 'Preterite',
                'verb' => 'think',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'thought'],
                    ['pronoun' => 'you', 'conjugation' => 'thought'],
                    ['pronoun' => 'he', 'conjugation' => 'thought'],
                    ['pronoun' => 'she', 'conjugation' => 'thought'],
                    ['pronoun' => 'it', 'conjugation' => 'thought'],
                    ['pronoun' => 'we', 'conjugation' => 'thought'],
                    ['pronoun' => 'you', 'conjugation' => 'thought'],
                    ['pronoun' => 'they', 'conjugation' => 'thought'],
                ],
            ],
            [
                'tense' => 'Present Perfect',
                'verb' => 'think',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'have thought'],
                    ['pronoun' => 'you', 'conjugation' => 'have thought'],
                    ['pronoun' => 'he', 'conjugation' => 'has thought'],
                    ['pronoun' => 'she', 'conjugation' => 'has thought'],
                    ['pronoun' => 'it', 'conjugation' => 'has thought'],
                    ['pronoun' => 'we', 'conjugation' => 'have thought'],
                    ['pronoun' => 'you', 'conjugation' => 'have thought'],
                    ['pronoun' => 'they', 'conjugation' => 'have thought'],
                ],
            ],
            [
                'tense' => 'Future',
                'verb' => 'think',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'will think'],
                    ['pronoun' => 'you', 'conjugation' => 'will think'],
                    ['pronoun' => 'he', 'conjugation' => 'will think'],
                    ['pronoun' => 'she', 'conjugation' => 'will think'],
                    ['pronoun' => 'it', 'conjugation' => 'will think'],
                    ['pronoun' => 'we', 'conjugation' => 'will think'],
                    ['pronoun' => 'you', 'conjugation' => 'will think'],
                    ['pronoun' => 'they', 'conjugation' => 'will think'],
                ],
            ],
            [
                'tense' => 'Present',
                'verb' => 'take',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'take'],
                    ['pronoun' => 'you', 'conjugation' => 'take'],
                    ['pronoun' => 'he', 'conjugation' => 'takes'],
                    ['pronoun' => 'she', 'conjugation' => 'takes'],
                    ['pronoun' => 'it', 'conjugation' => 'takes'],
                    ['pronoun' => 'we', 'conjugation' => 'take'],
                    ['pronoun' => 'you', 'conjugation' => 'take'],
                    ['pronoun' => 'they', 'conjugation' => 'take'],
                ],
            ],
            [
                'tense' => 'Preterite',
                'verb' => 'take',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'took'],
                    ['pronoun' => 'you', 'conjugation' => 'took'],
                    ['pronoun' => 'he', 'conjugation' => 'took'],
                    ['pronoun' => 'she', 'conjugation' => 'took'],
                    ['pronoun' => 'it', 'conjugation' => 'took'],
                    ['pronoun' => 'we', 'conjugation' => 'took'],
                    ['pronoun' => 'you', 'conjugation' => 'took'],
                    ['pronoun' => 'they', 'conjugation' => 'took'],
                ],
            ],
            [
                'tense' => 'Present Perfect',
                'verb' => 'take',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'have taken'],
                    ['pronoun' => 'you', 'conjugation' => 'have taken'],
                    ['pronoun' => 'he', 'conjugation' => 'has taken'],
                    ['pronoun' => 'she', 'conjugation' => 'has taken'],
                    ['pronoun' => 'it', 'conjugation' => 'has taken'],
                    ['pronoun' => 'we', 'conjugation' => 'have taken'],
                    ['pronoun' => 'you', 'conjugation' => 'have taken'],
                    ['pronoun' => 'they', 'conjugation' => 'have taken'],
                ],
            ],
            [
                'tense' => 'Future',
                'verb' => 'take',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'will take'],
                    ['pronoun' => 'you', 'conjugation' => 'will take'],
                    ['pronoun' => 'he', 'conjugation' => 'will take'],
                    ['pronoun' => 'she', 'conjugation' => 'will take'],
                    ['pronoun' => 'it', 'conjugation' => 'will take'],
                    ['pronoun' => 'we', 'conjugation' => 'will take'],
                    ['pronoun' => 'you', 'conjugation' => 'will take'],
                    ['pronoun' => 'they', 'conjugation' => 'will take'],
                ],
            ],
            [
                'tense' => 'Present',
                'verb' => 'see',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'see'],
                    ['pronoun' => 'you', 'conjugation' => 'see'],
                    ['pronoun' => 'he', 'conjugation' => 'sees'],
                    ['pronoun' => 'she', 'conjugation' => 'sees'],
                    ['pronoun' => 'it', 'conjugation' => 'sees'],
                    ['pronoun' => 'we', 'conjugation' => 'see'],
                    ['pronoun' => 'you', 'conjugation' => 'see'],
                    ['pronoun' => 'they', 'conjugation' => 'see'],
                ],
            ],
            [
                'tense' => 'Preterite',
                'verb' => 'see',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'saw'],
                    ['pronoun' => 'you', 'conjugation' => 'saw'],
                    ['pronoun' => 'he', 'conjugation' => 'saw'],
                    ['pronoun' => 'she', 'conjugation' => 'saw'],
                    ['pronoun' => 'it', 'conjugation' => 'saw'],
                    ['pronoun' => 'we', 'conjugation' => 'saw'],
                    ['pronoun' => 'you', 'conjugation' => 'saw'],
                    ['pronoun' => 'they', 'conjugation' => 'saw'],
                ],
            ],
            [
                'tense' => 'Present Perfect',
                'verb' => 'see',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'have seen'],
                    ['pronoun' => 'you', 'conjugation' => 'have seen'],
                    ['pronoun' => 'he', 'conjugation' => 'has seen'],
                    ['pronoun' => 'she', 'conjugation' => 'has seen'],
                    ['pronoun' => 'it', 'conjugation' => 'has seen'],
                    ['pronoun' => 'we', 'conjugation' => 'have seen'],
                    ['pronoun' => 'you', 'conjugation' => 'have seen'],
                    ['pronoun' => 'they', 'conjugation' => 'have seen'],
                ],
            ],
            [
                'tense' => 'Future',
                'verb' => 'see',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'will see'],
                    ['pronoun' => 'you', 'conjugation' => 'will see'],
                    ['pronoun' => 'he', 'conjugation' => 'will see'],
                    ['pronoun' => 'she', 'conjugation' => 'will see'],
                    ['pronoun' => 'it', 'conjugation' => 'will see'],
                    ['pronoun' => 'we', 'conjugation' => 'will see'],
                    ['pronoun' => 'you', 'conjugation' => 'will see'],
                    ['pronoun' => 'they', 'conjugation' => 'will see'],
                ],
            ],
            [
                'tense' => 'Present',
                'verb' => 'come',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'come'],
                    ['pronoun' => 'you', 'conjugation' => 'come'],
                    ['pronoun' => 'he', 'conjugation' => 'comes'],
                    ['pronoun' => 'she', 'conjugation' => 'comes'],
                    ['pronoun' => 'it', 'conjugation' => 'comes'],
                    ['pronoun' => 'we', 'conjugation' => 'come'],
                    ['pronoun' => 'you', 'conjugation' => 'come'],
                    ['pronoun' => 'they', 'conjugation' => 'come'],
                ],
            ],
            [
                'tense' => 'Preterite',
                'verb' => 'come',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'came'],
                    ['pronoun' => 'you', 'conjugation' => 'came'],
                    ['pronoun' => 'he', 'conjugation' => 'came'],
                    ['pronoun' => 'she', 'conjugation' => 'came'],
                    ['pronoun' => 'it', 'conjugation' => 'came'],
                    ['pronoun' => 'we', 'conjugation' => 'came'],
                    ['pronoun' => 'you', 'conjugation' => 'came'],
                    ['pronoun' => 'they', 'conjugation' => 'came'],
                ],
            ],
            [
                'tense' => 'Present Perfect',
                'verb' => 'come',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'have come'],
                    ['pronoun' => 'you', 'conjugation' => 'have come'],
                    ['pronoun' => 'he', 'conjugation' => 'has come'],
                    ['pronoun' => 'she', 'conjugation' => 'has come'],
                    ['pronoun' => 'it', 'conjugation' => 'has come'],
                    ['pronoun' => 'we', 'conjugation' => 'have come'],
                    ['pronoun' => 'you', 'conjugation' => 'have come'],
                    ['pronoun' => 'they', 'conjugation' => 'have come'],
                ],
            ],
            [
                'tense' => 'Future',
                'verb' => 'come',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'will come'],
                    ['pronoun' => 'you', 'conjugation' => 'will come'],
                    ['pronoun' => 'he', 'conjugation' => 'will come'],
                    ['pronoun' => 'she', 'conjugation' => 'will come'],
                    ['pronoun' => 'it', 'conjugation' => 'will come'],
                    ['pronoun' => 'we', 'conjugation' => 'will come'],
                    ['pronoun' => 'you', 'conjugation' => 'will come'],
                    ['pronoun' => 'they', 'conjugation' => 'will come'],
                ],
            ],
            [
                'tense' => 'Present',
                'verb' => 'look',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'look'],
                    ['pronoun' => 'you', 'conjugation' => 'look'],
                    ['pronoun' => 'he', 'conjugation' => 'looks'],
                    ['pronoun' => 'she', 'conjugation' => 'looks'],
                    ['pronoun' => 'it', 'conjugation' => 'looks'],
                    ['pronoun' => 'we', 'conjugation' => 'look'],
                    ['pronoun' => 'you', 'conjugation' => 'look'],
                    ['pronoun' => 'they', 'conjugation' => 'look'],
                ],
            ],
            [
                'tense' => 'Preterite',
                'verb' => 'look',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'looked'],
                    ['pronoun' => 'you', 'conjugation' => 'looked'],
                    ['pronoun' => 'he', 'conjugation' => 'looked'],
                    ['pronoun' => 'she', 'conjugation' => 'looked'],
                    ['pronoun' => 'it', 'conjugation' => 'looked'],
                    ['pronoun' => 'we', 'conjugation' => 'looked'],
                    ['pronoun' => 'you', 'conjugation' => 'looked'],
                    ['pronoun' => 'they', 'conjugation' => 'looked'],
                ],
            ],
            [
                'tense' => 'Present Perfect',
                'verb' => 'look',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'have looked'],
                    ['pronoun' => 'you', 'conjugation' => 'have looked'],
                    ['pronoun' => 'he', 'conjugation' => 'has looked'],
                    ['pronoun' => 'she', 'conjugation' => 'has looked'],
                    ['pronoun' => 'it', 'conjugation' => 'has looked'],
                    ['pronoun' => 'we', 'conjugation' => 'have looked'],
                    ['pronoun' => 'you', 'conjugation' => 'have looked'],
                    ['pronoun' => 'they', 'conjugation' => 'have looked'],
                ],
            ],
            [
                'tense' => 'Future',
                'verb' => 'look',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'will look'],
                    ['pronoun' => 'you', 'conjugation' => 'will look'],
                    ['pronoun' => 'he', 'conjugation' => 'will look'],
                    ['pronoun' => 'she', 'conjugation' => 'will look'],
                    ['pronoun' => 'it', 'conjugation' => 'will look'],
                    ['pronoun' => 'we', 'conjugation' => 'will look'],
                    ['pronoun' => 'you', 'conjugation' => 'will look'],
                    ['pronoun' => 'they', 'conjugation' => 'will look'],
                ],
            ],
            [
                'tense' => 'Present',
                'verb' => 'want',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'want'],
                    ['pronoun' => 'you', 'conjugation' => 'want'],
                    ['pronoun' => 'he', 'conjugation' => 'wants'],
                    ['pronoun' => 'she', 'conjugation' => 'wants'],
                    ['pronoun' => 'it', 'conjugation' => 'wants'],
                    ['pronoun' => 'we', 'conjugation' => 'want'],
                    ['pronoun' => 'you', 'conjugation' => 'want'],
                    ['pronoun' => 'they', 'conjugation' => 'want'],
                ],
            ],
            [
                'tense' => 'Preterite',
                'verb' => 'want',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'wanted'],
                    ['pronoun' => 'you', 'conjugation' => 'wanted'],
                    ['pronoun' => 'he', 'conjugation' => 'wanted'],
                    ['pronoun' => 'she', 'conjugation' => 'wanted'],
                    ['pronoun' => 'it', 'conjugation' => 'wanted'],
                    ['pronoun' => 'we', 'conjugation' => 'wanted'],
                    ['pronoun' => 'you', 'conjugation' => 'wanted'],
                    ['pronoun' => 'they', 'conjugation' => 'wanted'],
                ],
            ],
            [
                'tense' => 'Present Perfect',
                'verb' => 'want',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'have wanted'],
                    ['pronoun' => 'you', 'conjugation' => 'have wanted'],
                    ['pronoun' => 'he', 'conjugation' => 'has wanted'],
                    ['pronoun' => 'she', 'conjugation' => 'has wanted'],
                    ['pronoun' => 'it', 'conjugation' => 'has wanted'],
                    ['pronoun' => 'we', 'conjugation' => 'have wanted'],
                    ['pronoun' => 'you', 'conjugation' => 'have wanted'],
                    ['pronoun' => 'they', 'conjugation' => 'have wanted'],
                ],
            ],
            [
                'tense' => 'Future',
                'verb' => 'want',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'will want'],
                    ['pronoun' => 'you', 'conjugation' => 'will want'],
                    ['pronoun' => 'he', 'conjugation' => 'will want'],
                    ['pronoun' => 'she', 'conjugation' => 'will want'],
                    ['pronoun' => 'it', 'conjugation' => 'will want'],
                    ['pronoun' => 'we', 'conjugation' => 'will want'],
                    ['pronoun' => 'you', 'conjugation' => 'will want'],
                    ['pronoun' => 'they', 'conjugation' => 'will want'],
                ],
            ],
            [
                'tense' => 'Present',
                'verb' => 'use',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'use'],
                    ['pronoun' => 'you', 'conjugation' => 'use'],
                    ['pronoun' => 'he', 'conjugation' => 'uses'],
                    ['pronoun' => 'she', 'conjugation' => 'uses'],
                    ['pronoun' => 'it', 'conjugation' => 'uses'],
                    ['pronoun' => 'we', 'conjugation' => 'use'],
                    ['pronoun' => 'you', 'conjugation' => 'use'],
                    ['pronoun' => 'they', 'conjugation' => 'use'],
                ],
            ],
            [
                'tense' => 'Preterite',
                'verb' => 'use',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'used'],
                    ['pronoun' => 'you', 'conjugation' => 'used'],
                    ['pronoun' => 'he', 'conjugation' => 'used'],
                    ['pronoun' => 'she', 'conjugation' => 'used'],
                    ['pronoun' => 'it', 'conjugation' => 'used'],
                    ['pronoun' => 'we', 'conjugation' => 'used'],
                    ['pronoun' => 'you', 'conjugation' => 'used'],
                    ['pronoun' => 'they', 'conjugation' => 'used'],
                ],
            ],
            [
                'tense' => 'Present Perfect',
                'verb' => 'use',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'have used'],
                    ['pronoun' => 'you', 'conjugation' => 'have used'],
                    ['pronoun' => 'he', 'conjugation' => 'has used'],
                    ['pronoun' => 'she', 'conjugation' => 'has used'],
                    ['pronoun' => 'it', 'conjugation' => 'has used'],
                    ['pronoun' => 'we', 'conjugation' => 'have used'],
                    ['pronoun' => 'you', 'conjugation' => 'have used'],
                    ['pronoun' => 'they', 'conjugation' => 'have used'],
                ],
            ],
            [
                'tense' => 'Future',
                'verb' => 'use',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'will use'],
                    ['pronoun' => 'you', 'conjugation' => 'will use'],
                    ['pronoun' => 'he', 'conjugation' => 'will use'],
                    ['pronoun' => 'she', 'conjugation' => 'will use'],
                    ['pronoun' => 'it', 'conjugation' => 'will use'],
                    ['pronoun' => 'we', 'conjugation' => 'will use'],
                    ['pronoun' => 'you', 'conjugation' => 'will use'],
                    ['pronoun' => 'they', 'conjugation' => 'will use'],
                ],
            ],
            [
                'tense' => 'Present',
                'verb' => 'find',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'find'],
                    ['pronoun' => 'you', 'conjugation' => 'find'],
                    ['pronoun' => 'he', 'conjugation' => 'finds'],
                    ['pronoun' => 'she', 'conjugation' => 'finds'],
                    ['pronoun' => 'it', 'conjugation' => 'finds'],
                    ['pronoun' => 'we', 'conjugation' => 'find'],
                    ['pronoun' => 'you', 'conjugation' => 'find'],
                    ['pronoun' => 'they', 'conjugation' => 'find'],
                ],
            ],
            [
                'tense' => 'Preterite',
                'verb' => 'find',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'found'],
                    ['pronoun' => 'you', 'conjugation' => 'found'],
                    ['pronoun' => 'he', 'conjugation' => 'found'],
                    ['pronoun' => 'she', 'conjugation' => 'found'],
                    ['pronoun' => 'it', 'conjugation' => 'found'],
                    ['pronoun' => 'we', 'conjugation' => 'found'],
                    ['pronoun' => 'you', 'conjugation' => 'found'],
                    ['pronoun' => 'they', 'conjugation' => 'found'],
                ],
            ],
            [
                'tense' => 'Present Perfect',
                'verb' => 'find',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'have found'],
                    ['pronoun' => 'you', 'conjugation' => 'have found'],
                    ['pronoun' => 'he', 'conjugation' => 'has found'],
                    ['pronoun' => 'she', 'conjugation' => 'has found'],
                    ['pronoun' => 'it', 'conjugation' => 'has found'],
                    ['pronoun' => 'we', 'conjugation' => 'have found'],
                    ['pronoun' => 'you', 'conjugation' => 'have found'],
                    ['pronoun' => 'they', 'conjugation' => 'have found'],
                ],
            ],
            [
                'tense' => 'Future',
                'verb' => 'find',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'will find'],
                    ['pronoun' => 'you', 'conjugation' => 'will find'],
                    ['pronoun' => 'he', 'conjugation' => 'will find'],
                    ['pronoun' => 'she', 'conjugation' => 'will find'],
                    ['pronoun' => 'it', 'conjugation' => 'will find'],
                    ['pronoun' => 'we', 'conjugation' => 'will find'],
                    ['pronoun' => 'you', 'conjugation' => 'will find'],
                    ['pronoun' => 'they', 'conjugation' => 'will find'],
                ],
            ],
            [
                'tense' => 'Present',
                'verb' => 'give',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'give'],
                    ['pronoun' => 'you', 'conjugation' => 'give'],
                    ['pronoun' => 'he', 'conjugation' => 'gives'],
                    ['pronoun' => 'she', 'conjugation' => 'gives'],
                    ['pronoun' => 'it', 'conjugation' => 'gives'],
                    ['pronoun' => 'we', 'conjugation' => 'give'],
                    ['pronoun' => 'you', 'conjugation' => 'give'],
                    ['pronoun' => 'they', 'conjugation' => 'give'],
                ],
            ],
            [
                'tense' => 'Preterite',
                'verb' => 'give',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'gave'],
                    ['pronoun' => 'you', 'conjugation' => 'gave'],
                    ['pronoun' => 'he', 'conjugation' => 'gave'],
                    ['pronoun' => 'she', 'conjugation' => 'gave'],
                    ['pronoun' => 'it', 'conjugation' => 'gave'],
                    ['pronoun' => 'we', 'conjugation' => 'gave'],
                    ['pronoun' => 'you', 'conjugation' => 'gave'],
                    ['pronoun' => 'they', 'conjugation' => 'gave'],
                ],
            ],
            [
                'tense' => 'Present Perfect',
                'verb' => 'give',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'have given'],
                    ['pronoun' => 'you', 'conjugation' => 'have given'],
                    ['pronoun' => 'he', 'conjugation' => 'has given'],
                    ['pronoun' => 'she', 'conjugation' => 'has given'],
                    ['pronoun' => 'it', 'conjugation' => 'has given'],
                    ['pronoun' => 'we', 'conjugation' => 'have given'],
                    ['pronoun' => 'you', 'conjugation' => 'have given'],
                    ['pronoun' => 'they', 'conjugation' => 'have given'],
                ],
            ],
            [
                'tense' => 'Future',
                'verb' => 'give',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'will give'],
                    ['pronoun' => 'you', 'conjugation' => 'will give'],
                    ['pronoun' => 'he', 'conjugation' => 'will give'],
                    ['pronoun' => 'she', 'conjugation' => 'will give'],
                    ['pronoun' => 'it', 'conjugation' => 'will give'],
                    ['pronoun' => 'we', 'conjugation' => 'will give'],
                    ['pronoun' => 'you', 'conjugation' => 'will give'],
                    ['pronoun' => 'they', 'conjugation' => 'will give'],
                ],
            ],
            [
                'tense' => 'Present',
                'verb' => 'tell',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'tell'],
                    ['pronoun' => 'you', 'conjugation' => 'tell'],
                    ['pronoun' => 'he', 'conjugation' => 'tells'],
                    ['pronoun' => 'she', 'conjugation' => 'tells'],
                    ['pronoun' => 'it', 'conjugation' => 'tells'],
                    ['pronoun' => 'we', 'conjugation' => 'tell'],
                    ['pronoun' => 'you', 'conjugation' => 'tell'],
                    ['pronoun' => 'they', 'conjugation' => 'tell'],
                ],
            ],
            [
                'tense' => 'Preterite',
                'verb' => 'tell',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'told'],
                    ['pronoun' => 'you', 'conjugation' => 'told'],
                    ['pronoun' => 'he', 'conjugation' => 'told'],
                    ['pronoun' => 'she', 'conjugation' => 'told'],
                    ['pronoun' => 'it', 'conjugation' => 'told'],
                    ['pronoun' => 'we', 'conjugation' => 'told'],
                    ['pronoun' => 'you', 'conjugation' => 'told'],
                    ['pronoun' => 'they', 'conjugation' => 'told'],
                ],
            ],
            [
                'tense' => 'Present Perfect',
                'verb' => 'tell',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'have told'],
                    ['pronoun' => 'you', 'conjugation' => 'have told'],
                    ['pronoun' => 'he', 'conjugation' => 'has told'],
                    ['pronoun' => 'she', 'conjugation' => 'has told'],
                    ['pronoun' => 'it', 'conjugation' => 'has told'],
                    ['pronoun' => 'we', 'conjugation' => 'have told'],
                    ['pronoun' => 'you', 'conjugation' => 'have told'],
                    ['pronoun' => 'they', 'conjugation' => 'have told'],
                ],
            ],
            [
                'tense' => 'Future',
                'verb' => 'tell',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'will tell'],
                    ['pronoun' => 'you', 'conjugation' => 'will tell'],
                    ['pronoun' => 'he', 'conjugation' => 'will tell'],
                    ['pronoun' => 'she', 'conjugation' => 'will tell'],
                    ['pronoun' => 'it', 'conjugation' => 'will tell'],
                    ['pronoun' => 'we', 'conjugation' => 'will tell'],
                    ['pronoun' => 'you', 'conjugation' => 'will tell'],
                    ['pronoun' => 'they', 'conjugation' => 'will tell'],
                ],
            ],
            [
                'tense' => 'Present',
                'verb' => 'read',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'read'],
                    ['pronoun' => 'you', 'conjugation' => 'read'],
                    ['pronoun' => 'he', 'conjugation' => 'reads'],
                    ['pronoun' => 'she', 'conjugation' => 'reads'],
                    ['pronoun' => 'it', 'conjugation' => 'reads'],
                    ['pronoun' => 'we', 'conjugation' => 'read'],
                    ['pronoun' => 'you', 'conjugation' => 'read'],
                    ['pronoun' => 'they', 'conjugation' => 'read'],
                ],
            ],
            [
                'tense' => 'Preterite',
                'verb' => 'read',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'read'], // Pronounced as "red"
                    ['pronoun' => 'you', 'conjugation' => 'read'], // Pronounced as "red"
                    ['pronoun' => 'he', 'conjugation' => 'read'], // Pronounced as "red"
                    ['pronoun' => 'she', 'conjugation' => 'read'], // Pronounced as "red"
                    ['pronoun' => 'it', 'conjugation' => 'read'], // Pronounced as "red"
                    ['pronoun' => 'we', 'conjugation' => 'read'], // Pronounced as "red"
                    ['pronoun' => 'you', 'conjugation' => 'read'], // Pronounced as "red"
                    ['pronoun' => 'they', 'conjugation' => 'read'], // Pronounced as "red"
                ],
            ],
            [
                'tense' => 'Present Perfect',
                'verb' => 'read',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'have read'], // Pronounced as "red"
                    ['pronoun' => 'you', 'conjugation' => 'have read'], // Pronounced as "red"
                    ['pronoun' => 'he', 'conjugation' => 'has read'], // Pronounced as "red"
                    ['pronoun' => 'she', 'conjugation' => 'has read'], // Pronounced as "red"
                    ['pronoun' => 'it', 'conjugation' => 'has read'], // Pronounced as "red"
                    ['pronoun' => 'we', 'conjugation' => 'have read'], // Pronounced as "red"
                    ['pronoun' => 'you', 'conjugation' => 'have read'], // Pronounced as "red"
                    ['pronoun' => 'they', 'conjugation' => 'have read'], // Pronounced as "red"
                ],
            ],
            [
                'tense' => 'Future',
                'verb' => 'read',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'will read'],
                    ['pronoun' => 'you', 'conjugation' => 'will read'],
                    ['pronoun' => 'he', 'conjugation' => 'will read'],
                    ['pronoun' => 'she', 'conjugation' => 'will read'],
                    ['pronoun' => 'it', 'conjugation' => 'will read'],
                    ['pronoun' => 'we', 'conjugation' => 'will read'],
                    ['pronoun' => 'you', 'conjugation' => 'will read'],
                    ['pronoun' => 'they', 'conjugation' => 'will read'],
                ],
            ],
            [
                'tense' => 'Present',
                'verb' => 'swim',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'swim'],
                    ['pronoun' => 'you', 'conjugation' => 'swim'],
                    ['pronoun' => 'he', 'conjugation' => 'swims'],
                    ['pronoun' => 'she', 'conjugation' => 'swims'],
                    ['pronoun' => 'it', 'conjugation' => 'swims'],
                    ['pronoun' => 'we', 'conjugation' => 'swim'],
                    ['pronoun' => 'you', 'conjugation' => 'swim'],
                    ['pronoun' => 'they', 'conjugation' => 'swim'],
                ],
            ],
            [
                'tense' => 'Preterite',
                'verb' => 'swim',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'swam'],
                    ['pronoun' => 'you', 'conjugation' => 'swam'],
                    ['pronoun' => 'he', 'conjugation' => 'swam'],
                    ['pronoun' => 'she', 'conjugation' => 'swam'],
                    ['pronoun' => 'it', 'conjugation' => 'swam'],
                    ['pronoun' => 'we', 'conjugation' => 'swam'],
                    ['pronoun' => 'you', 'conjugation' => 'swam'],
                    ['pronoun' => 'they', 'conjugation' => 'swam'],
                ],
            ],
            [
                'tense' => 'Present Perfect',
                'verb' => 'swim',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'have swum'],
                    ['pronoun' => 'you', 'conjugation' => 'have swum'],
                    ['pronoun' => 'he', 'conjugation' => 'has swum'],
                    ['pronoun' => 'she', 'conjugation' => 'has swum'],
                    ['pronoun' => 'it', 'conjugation' => 'has swum'],
                    ['pronoun' => 'we', 'conjugation' => 'have swum'],
                    ['pronoun' => 'you', 'conjugation' => 'have swum'],
                    ['pronoun' => 'they', 'conjugation' => 'have swum'],
                ],
            ],
            [
                'tense' => 'Future',
                'verb' => 'swim',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'will swim'],
                    ['pronoun' => 'you', 'conjugation' => 'will swim'],
                    ['pronoun' => 'he', 'conjugation' => 'will swim'],
                    ['pronoun' => 'she', 'conjugation' => 'will swim'],
                    ['pronoun' => 'it', 'conjugation' => 'will swim'],
                    ['pronoun' => 'we', 'conjugation' => 'will swim'],
                    ['pronoun' => 'you', 'conjugation' => 'will swim'],
                    ['pronoun' => 'they', 'conjugation' => 'will swim'],
                ],
            ],
            [
                'tense' => 'Present',
                'verb' => 'paint',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'paint'],
                    ['pronoun' => 'you', 'conjugation' => 'paint'],
                    ['pronoun' => 'he', 'conjugation' => 'paints'],
                    ['pronoun' => 'she', 'conjugation' => 'paints'],
                    ['pronoun' => 'it', 'conjugation' => 'paints'],
                    ['pronoun' => 'we', 'conjugation' => 'paint'],
                    ['pronoun' => 'you', 'conjugation' => 'paint'],
                    ['pronoun' => 'they', 'conjugation' => 'paint'],
                ],
            ],
            [
                'tense' => 'Preterite',
                'verb' => 'paint',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'painted'],
                    ['pronoun' => 'you', 'conjugation' => 'painted'],
                    ['pronoun' => 'he', 'conjugation' => 'painted'],
                    ['pronoun' => 'she', 'conjugation' => 'painted'],
                    ['pronoun' => 'it', 'conjugation' => 'painted'],
                    ['pronoun' => 'we', 'conjugation' => 'painted'],
                    ['pronoun' => 'you', 'conjugation' => 'painted'],
                    ['pronoun' => 'they', 'conjugation' => 'painted'],
                ],
            ],
            [
                'tense' => 'Present Perfect',
                'verb' => 'paint',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'have painted'],
                    ['pronoun' => 'you', 'conjugation' => 'have painted'],
                    ['pronoun' => 'he', 'conjugation' => 'has painted'],
                    ['pronoun' => 'she', 'conjugation' => 'has painted'],
                    ['pronoun' => 'it', 'conjugation' => 'has painted'],
                    ['pronoun' => 'we', 'conjugation' => 'have painted'],
                    ['pronoun' => 'you', 'conjugation' => 'have painted'],
                    ['pronoun' => 'they', 'conjugation' => 'have painted'],
                ],
            ],
            [
                'tense' => 'Future',
                'verb' => 'paint',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'will paint'],
                    ['pronoun' => 'you', 'conjugation' => 'will paint'],
                    ['pronoun' => 'he', 'conjugation' => 'will paint'],
                    ['pronoun' => 'she', 'conjugation' => 'will paint'],
                    ['pronoun' => 'it', 'conjugation' => 'will paint'],
                    ['pronoun' => 'we', 'conjugation' => 'will paint'],
                    ['pronoun' => 'you', 'conjugation' => 'will paint'],
                    ['pronoun' => 'they', 'conjugation' => 'will paint'],
                ],
            ],
            [
                'tense' => 'Present',
                'verb' => 'travel',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'travel'],
                    ['pronoun' => 'you', 'conjugation' => 'travel'],
                    ['pronoun' => 'he', 'conjugation' => 'travels'],
                    ['pronoun' => 'she', 'conjugation' => 'travels'],
                    ['pronoun' => 'it', 'conjugation' => 'travels'],
                    ['pronoun' => 'we', 'conjugation' => 'travel'],
                    ['pronoun' => 'you', 'conjugation' => 'travel'],
                    ['pronoun' => 'they', 'conjugation' => 'travel'],
                ],
            ],
            [
                'tense' => 'Preterite',
                'verb' => 'travel',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'traveled'],
                    ['pronoun' => 'you', 'conjugation' => 'traveled'],
                    ['pronoun' => 'he', 'conjugation' => 'traveled'],
                    ['pronoun' => 'she', 'conjugation' => 'traveled'],
                    ['pronoun' => 'it', 'conjugation' => 'traveled'],
                    ['pronoun' => 'we', 'conjugation' => 'traveled'],
                    ['pronoun' => 'you', 'conjugation' => 'traveled'],
                    ['pronoun' => 'they', 'conjugation' => 'traveled'],
                ],
            ],
            [
                'tense' => 'Present Perfect',
                'verb' => 'travel',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'have traveled'],
                    ['pronoun' => 'you', 'conjugation' => 'have traveled'],
                    ['pronoun' => 'he', 'conjugation' => 'has traveled'],
                    ['pronoun' => 'she', 'conjugation' => 'has traveled'],
                    ['pronoun' => 'it', 'conjugation' => 'has traveled'],
                    ['pronoun' => 'we', 'conjugation' => 'have traveled'],
                    ['pronoun' => 'you', 'conjugation' => 'have traveled'],
                    ['pronoun' => 'they', 'conjugation' => 'have traveled'],
                ],
            ],
            [
                'tense' => 'Future',
                'verb' => 'travel',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'will travel'],
                    ['pronoun' => 'you', 'conjugation' => 'will travel'],
                    ['pronoun' => 'he', 'conjugation' => 'will travel'],
                    ['pronoun' => 'she', 'conjugation' => 'will travel'],
                    ['pronoun' => 'it', 'conjugation' => 'will travel'],
                    ['pronoun' => 'we', 'conjugation' => 'will travel'],
                    ['pronoun' => 'you', 'conjugation' => 'will travel'],
                    ['pronoun' => 'they', 'conjugation' => 'will travel'],
                ],
            ],
            [
                'tense' => 'Present',
                'verb' => 'cook',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'cook'],
                    ['pronoun' => 'you', 'conjugation' => 'cook'],
                    ['pronoun' => 'he', 'conjugation' => 'cooks'],
                    ['pronoun' => 'she', 'conjugation' => 'cooks'],
                    ['pronoun' => 'it', 'conjugation' => 'cooks'],
                    ['pronoun' => 'we', 'conjugation' => 'cook'],
                    ['pronoun' => 'you', 'conjugation' => 'cook'],
                    ['pronoun' => 'they', 'conjugation' => 'cook'],
                ],
            ],
            [
                'tense' => 'Preterite',
                'verb' => 'cook',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'cooked'],
                    ['pronoun' => 'you', 'conjugation' => 'cooked'],
                    ['pronoun' => 'he', 'conjugation' => 'cooked'],
                    ['pronoun' => 'she', 'conjugation' => 'cooked'],
                    ['pronoun' => 'it', 'conjugation' => 'cooked'],
                    ['pronoun' => 'we', 'conjugation' => 'cooked'],
                    ['pronoun' => 'you', 'conjugation' => 'cooked'],
                    ['pronoun' => 'they', 'conjugation' => 'cooked'],
                ],
            ],
            [
                'tense' => 'Present Perfect',
                'verb' => 'cook',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'have cooked'],
                    ['pronoun' => 'you', 'conjugation' => 'have cooked'],
                    ['pronoun' => 'he', 'conjugation' => 'has cooked'],
                    ['pronoun' => 'she', 'conjugation' => 'has cooked'],
                    ['pronoun' => 'it', 'conjugation' => 'has cooked'],
                    ['pronoun' => 'we', 'conjugation' => 'have cooked'],
                    ['pronoun' => 'you', 'conjugation' => 'have cooked'],
                    ['pronoun' => 'they', 'conjugation' => 'have cooked'],
                ],
            ],
            [
                'tense' => 'Future',
                'verb' => 'cook',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'will cook'],
                    ['pronoun' => 'you', 'conjugation' => 'will cook'],
                    ['pronoun' => 'he', 'conjugation' => 'will cook'],
                    ['pronoun' => 'she', 'conjugation' => 'will cook'],
                    ['pronoun' => 'it', 'conjugation' => 'will cook'],
                    ['pronoun' => 'we', 'conjugation' => 'will cook'],
                    ['pronoun' => 'you', 'conjugation' => 'will cook'],
                    ['pronoun' => 'they', 'conjugation' => 'will cook'],
                ],
            ],
            [
                'tense' => 'Present',
                'verb' => 'play',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'play'],
                    ['pronoun' => 'you', 'conjugation' => 'play'],
                    ['pronoun' => 'he', 'conjugation' => 'plays'],
                    ['pronoun' => 'she', 'conjugation' => 'plays'],
                    ['pronoun' => 'it', 'conjugation' => 'plays'],
                    ['pronoun' => 'we', 'conjugation' => 'play'],
                    ['pronoun' => 'you', 'conjugation' => 'play'],
                    ['pronoun' => 'they', 'conjugation' => 'play'],
                ],
            ],
            [
                'tense' => 'Preterite',
                'verb' => 'play',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'played'],
                    ['pronoun' => 'you', 'conjugation' => 'played'],
                    ['pronoun' => 'he', 'conjugation' => 'played'],
                    ['pronoun' => 'she', 'conjugation' => 'played'],
                    ['pronoun' => 'it', 'conjugation' => 'played'],
                    ['pronoun' => 'we', 'conjugation' => 'played'],
                    ['pronoun' => 'you', 'conjugation' => 'played'],
                    ['pronoun' => 'they', 'conjugation' => 'played'],
                ],
            ],
            [
                'tense' => 'Present Perfect',
                'verb' => 'play',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'have played'],
                    ['pronoun' => 'you', 'conjugation' => 'have played'],
                    ['pronoun' => 'he', 'conjugation' => 'has played'],
                    ['pronoun' => 'she', 'conjugation' => 'has played'],
                    ['pronoun' => 'it', 'conjugation' => 'has played'],
                    ['pronoun' => 'we', 'conjugation' => 'have played'],
                    ['pronoun' => 'you', 'conjugation' => 'have played'],
                    ['pronoun' => 'they', 'conjugation' => 'have played'],
                ],
            ],
            [
                'tense' => 'Future',
                'verb' => 'play',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'will play'],
                    ['pronoun' => 'you', 'conjugation' => 'will play'],
                    ['pronoun' => 'he', 'conjugation' => 'will play'],
                    ['pronoun' => 'she', 'conjugation' => 'will play'],
                    ['pronoun' => 'it', 'conjugation' => 'will play'],
                    ['pronoun' => 'we', 'conjugation' => 'will play'],
                    ['pronoun' => 'you', 'conjugation' => 'will play'],
                    ['pronoun' => 'they', 'conjugation' => 'will play'],
                ],
            ],
            [
                'tense' => 'Present',
                'verb' => 'dance',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'dance'],
                    ['pronoun' => 'you', 'conjugation' => 'dance'],
                    ['pronoun' => 'he', 'conjugation' => 'dances'],
                    ['pronoun' => 'she', 'conjugation' => 'dances'],
                    ['pronoun' => 'it', 'conjugation' => 'dances'],
                    ['pronoun' => 'we', 'conjugation' => 'dance'],
                    ['pronoun' => 'you', 'conjugation' => 'dance'],
                    ['pronoun' => 'they', 'conjugation' => 'dance'],
                ],
            ],
            [
                'tense' => 'Preterite',
                'verb' => 'dance',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'danced'],
                    ['pronoun' => 'you', 'conjugation' => 'danced'],
                    ['pronoun' => 'he', 'conjugation' => 'danced'],
                    ['pronoun' => 'she', 'conjugation' => 'danced'],
                    ['pronoun' => 'it', 'conjugation' => 'danced'],
                    ['pronoun' => 'we', 'conjugation' => 'danced'],
                    ['pronoun' => 'you', 'conjugation' => 'danced'],
                    ['pronoun' => 'they', 'conjugation' => 'danced'],
                ],
            ],
            [
                'tense' => 'Present Perfect',
                'verb' => 'dance',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'have danced'],
                    ['pronoun' => 'you', 'conjugation' => 'have danced'],
                    ['pronoun' => 'he', 'conjugation' => 'has danced'],
                    ['pronoun' => 'she', 'conjugation' => 'has danced'],
                    ['pronoun' => 'it', 'conjugation' => 'has danced'],
                    ['pronoun' => 'we', 'conjugation' => 'have danced'],
                    ['pronoun' => 'you', 'conjugation' => 'have danced'],
                    ['pronoun' => 'they', 'conjugation' => 'have danced'],
                ],
            ],
            [
                'tense' => 'Future',
                'verb' => 'dance',
                'conjugations' => [
                    ['pronoun' => 'I', 'conjugation' => 'will dance'],
                    ['pronoun' => 'you', 'conjugation' => 'will dance'],
                    ['pronoun' => 'he', 'conjugation' => 'will dance'],
                    ['pronoun' => 'she', 'conjugation' => 'will dance'],
                    ['pronoun' => 'it', 'conjugation' => 'will dance'],
                    ['pronoun' => 'we', 'conjugation' => 'will dance'],
                    ['pronoun' => 'you', 'conjugation' => 'will dance'],
                    ['pronoun' => 'they', 'conjugation' => 'will dance'],
                ],
            ],
        ];

        foreach ($englishVerbConjugations as $conjugation) {
            TenseConjugation::create($conjugation);
        }

        $englishVerbConjugationsExercises = [
            [
                "verbs" => ['be', 'have', 'do', 'say', 'go', 'get', 'make', 'know', 'think', 'take', 'see', 'come', 'look', 'use', 'find', 'give', 'tell'],
                "course_name" => "Inglés para todos",
                "lesson_number" => 6,
                "tenses" => ['Present'],
                "pronouns" => ['I', 'you', 'he', 'she', 'it', 'we', 'you', 'they'],

            ],
            [
                "verbs" => ['can', 'get', 'make', 'know', 'think', 'take', 'see', 'come', 'look', 'want', 'read', 'swim', 'paint', 'travel', 'cook', 'play', 'dance'],
                "course_name" => "Inglés para todos",
                "lesson_number" => 10,
                "tenses" => ['Present'],
                "pronouns" => ['I', 'you', 'he', 'she', 'it', 'we', 'you', 'they'],
            ],
        ];


        foreach ($englishVerbConjugationsExercises as $item) {
            // Retrieve course and lesson by name and number
            $course = Course::where('name', $item['course_name'])->first();
            if (!$course) {
                continue; // Skip if course not found
            }

            $lesson = $course->lessons()->where('lesson_number', $item['lesson_number'])->first();
            if (!$lesson) {
                continue; // Skip if lesson not found
            }

            foreach ($item["verbs"] as $verb) {

                // Create verb conjugation exercise
                $exercise = VerbConjugationExercise::create([
                    'verb' => $verb,
                    'tenses' => $item['tenses'],
                    'pronouns' => $item['pronouns'],
                    'lesson_id' => $lesson->id,
                ]);

                $exerciseForVerbConjugation = Exercise::create([
                    'exerciseable_id' => $exercise->id,
                    'exerciseable_type' => get_class($exercise),
                    'lesson_id' => $lesson->id
                ]);

                // Attach conjugations based on verb and tenses
                foreach ($item['tenses'] as $tense) {
                    $conjugation = TenseConjugation::where('verb', $verb)
                        ->where('tense', $tense)
                        ->first();
                    $exercise->tenseConjugations()->attach($conjugation->id);
                }
            }
        }
    }
}
