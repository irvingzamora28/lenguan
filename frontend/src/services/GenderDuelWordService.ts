import api from "../utils/api.ts";

interface Word {
  word: string;
  gender: string;
  translation: string;
  difficulty_level: number;
  category: string;
}

export class GenderDuelWordService {

    static hello() {
        return "hello";
    }

}
