<?php

namespace App\Http\Requests;

use App\Models\Lesson;
use App\Models\VerbConjugationExercise;
use Illuminate\Foundation\Http\FormRequest;

class LessonExerciseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules()
    {
        return [
            'course_id' => 'required|exists:courses,_id',
        ];
    }

    // This method gets called after the validation rules pass
    protected function passedValidation()
    {
        $lesson = Lesson::where(['course_id' => $this->course_id, 'lesson_number' => (int)$this->lesson_number])
            ->with(['exercises' => function ($query) {
                $query->select(['_id', 'exerciseable_id', 'exerciseable_type', 'lesson_id'])
                    ->with(['exerciseable' => function ($query) {
                        $query->select(['_id', 'prompt', 'answer', 'lesson_id']);
                    }]);
            }])
            ->select(['_id', 'name', 'lesson_number', 'description', 'is_active', 'course_id', 'content', 'level_id', 'goal_ids'])
            ->first();

        if ($lesson) {
            // Collect IDs for VerbConjugationExercises
            $verbConjugationExerciseIds = $lesson->exercises
                ->where('exerciseable_type', VerbConjugationExercise::class)
                ->pluck('exerciseable_id')
                ->all();

            // Batch load tenseConjugations for these IDs
            $verbConjugationExercisesWithTense = VerbConjugationExercise::whereIn('_id', $verbConjugationExerciseIds)
                ->with('tenseConjugations')
                ->get()
                ->keyBy('_id');

            // Merge the loaded tenseConjugations into the lesson exercises
            foreach ($lesson->exercises as $exercise) {
                if ($exercise->exerciseable_type === VerbConjugationExercise::class) {
                    $exerciseableId = $exercise->exerciseable_id;
                    if (isset($verbConjugationExercisesWithTense[$exerciseableId])) {
                        $exercise->setRelation('exerciseable', $verbConjugationExercisesWithTense[$exerciseableId]);
                    }
                }
            }
        } else {
            $this->customFailedValidation('lesson_number', 'The selected lesson number is invalid for the specified course.');
        }

        // Store the lesson in the request object for easy access in the controller
        $this->request->add(['lesson' => $lesson]);
    }

    private function customFailedValidation($field, $message)
    {
        abort(response()->json(['errors' => [$field => $message]], 422));
    }
}
