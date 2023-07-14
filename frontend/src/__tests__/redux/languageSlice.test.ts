import { LanguageState } from "../../types/redux";
import { languageSlice } from "./../../redux/languageSlice";

describe('languageSlice', () => {
  let initialState: LanguageState;

  beforeEach(() => {
    initialState = {
      selectedLanguage: null,
      courseProgress: {},
    };
  });

  it('should handle setLanguage', () => {
    const actual = languageSlice.reducer(initialState, languageSlice.actions.setLanguage('fr'));
    expect(actual.selectedLanguage).toEqual('fr');
  });

  it('should handle setCourseProgress', () => {
    const actual = languageSlice.reducer(initialState, languageSlice.actions.setCourseProgress({ courseId: '1', progress: 70 }));
    expect(actual.courseProgress['1']).toEqual(70);
  });
});
