import React, { useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface VerbConjugationState {
	pronoun: string;
	verb: string;
	tense: string;
	userInput: string;
	feedback: string;
	attempts: number;
	successes: number;
}

const VerbConjugationSlotMachineExercise: React.FC = () => {
	const { t } = useTranslation();
	const [state, setState] = useState<VerbConjugationState>({
		pronoun: "",
		verb: "",
		tense: "",
		userInput: "",
		feedback: "",
		attempts: 0,
		successes: 0,
	});

	const verbs = ["sein", "haben", "machen", "gehen", "kommen"];
	const tenses = ["Präsens", "Präteritum"];

	const randomizeSelection = useCallback(() => {
		const randomPronoun = pronouns[Math.floor(Math.random() * pronouns.length)];
		const randomVerb = verbs[Math.floor(Math.random() * verbs.length)];
		const randomTense = tenses[Math.floor(Math.random() * tenses.length)];
		setState((prevState) => ({ ...prevState, pronoun: randomPronoun, verb: randomVerb, tense: randomTense }));
	}, []);

	type Tense = "Präsens" | "Präteritum";
	type Pronoun = "ich" | "du" | "er" | "sie" | "es" | "wir" | "ihr" | "sie" | "Sie";
	type Conjugation = { pronoun: Pronoun; conjugation: string };
	type VerbConjugation = { verb: string; tense: Tense; conjugations: Conjugation[] };

	const pronouns: Pronoun[] = ["ich", "du", "er", "sie", "es", "wir", "ihr", "sie", "Sie"];

	function createVerbConjugation(verb: string, tense: Tense, conjugations: string[]): VerbConjugation {
		return {
			verb,
			tense,
			conjugations: pronouns.map((pronoun, index) => ({
				pronoun,
				conjugation: conjugations[index],
			})),
		};
	}

	const seinPrasens: string[] = ["bin", "bist", "ist", "ist", "ist", "sind", "seid", "sind", "sind"];
	const seinPrateritum: string[] = ["war", "warst", "war", "war", "war", "waren", "wart", "waren", "waren"];
	const habenPrasens: string[] = ["habe", "hast", "hat", "hat", "hat", "haben", "habt", "haben", "haben"];
	const habenPrateritum: string[] = ["hatte", "hattest", "hatte", "hatte", "hatte", "hatten", "hattet", "hatten", "hatten"];
	const werdenPrasens = ["werde", "wirst", "wird", "wird", "wird", "werden", "werdet", "werden", "werden"];
	const werdenPrateritum = ["wurde", "wurdest", "wurde", "wurde", "wurde", "wurden", "wurdet", "wurden", "wurden"];

	const sagenPrasens = ["sage", "sagst", "sagt", "sagt", "sagt", "sagen", "sagt", "sagen", "sagen"];
	const sagenPrateritum = ["sagte", "sagtest", "sagte", "sagte", "sagte", "sagten", "sagtet", "sagten", "sagten"];
	const nehmenPrasens = ["nehme", "nimmst", "nimmt", "nimmt", "nimmt", "nehmen", "nehmt", "nehmen", "nehmen"];
	const nehmenPrateritum = ["nahm", "nahmst", "nahm", "nahm", "nahm", "nahmen", "nahmt", "nahmen", "nahmen"];

	const sehenPrasens = ["sehe", "siehst", "sieht", "sieht", "sieht", "sehen", "seht", "sehen", "sehen"];
	const sehenPrateritum = ["sah", "sahst", "sah", "sah", "sah", "sahen", "saht", "sahen", "sahen"];

	const gebenPrasens = ["gebe", "gibst", "gibt", "gibt", "gibt", "geben", "gebt", "geben", "geben"];
	const gebenPrateritum = ["gab", "gabst", "gab", "gab", "gab", "gaben", "gabt", "gaben", "gaben"];
	const findenPrasens = ["finde", "findest", "findet", "findet", "findet", "finden", "findet", "finden", "finden"];
	const findenPrateritum = ["fand", "fandest", "fand", "fand", "fand", "fanden", "fandet", "fanden", "fanden"];

	const gehenPrasens = ["gehe", "gehst", "geht", "geht", "geht", "gehen", "geht", "gehen", "gehen"];
	const gehenPrateritum = ["ging", "gingst", "ging", "ging", "ging", "gingen", "gingt", "gingen", "gingen"];

	const machenPrasens = ["mache", "machst", "macht", "macht", "macht", "machen", "macht", "machen", "machen"];
	const machenPrateritum = ["machte", "machtest", "machte", "machte", "machte", "machten", "machtet", "machten", "machten"];
	const denkenPrasens = ["denke", "denkst", "denkt", "denkt", "denkt", "denken", "denkt", "denken", "denken"];
	const denkenPrateritum = ["dachte", "dachtest", "dachte", "dachte", "dachte", "dachten", "dachtet", "dachten", "dachten"];
	const kommenPrasens = ["komme", "kommst", "kommt", "kommt", "kommt", "kommen", "kommt", "kommen", "kommen"];
	const kommenPrateritum = ["kam", "kamst", "kam", "kam", "kam", "kamen", "kamt", "kamen", "kamen"];
	const wissenPrasens = ["weiß", "weißt", "weiß", "weiß", "weiß", "wissen", "wisst", "wissen", "wissen"];
	const wissenPrateritum = ["wusste", "wusstest", "wusste", "wusste", "wusste", "wussten", "wusstet", "wussten", "wussten"];
	const stehenPrasens = ["stehe", "stehst", "steht", "steht", "steht", "stehen", "steht", "stehen", "stehen"];
	const stehenPrateritum = ["stand", "standest", "stand", "stand", "stand", "standen", "standet", "standen", "standen"];

	const liegenPrasens = ["liege", "liegst", "liegt", "liegt", "liegt", "liegen", "liegt", "liegen", "liegen"];
	const liegenPrateritum = ["lag", "lagst", "lag", "lag", "lag", "lagen", "lagt", "lagen", "lagen"];
	const heissenPrasens = ["heiße", "heißt", "heißt", "heißt", "heißt", "heißen", "heißt", "heißen", "heißen"];
	const heissenPrateritum = ["hieß", "hießest", "hieß", "hieß", "hieß", "hießen", "hießt", "hießen", "hießen"];

	const fahrenPrasens = ["fahre", "fährst", "fährt", "fährt", "fährt", "fahren", "fahrt", "fahren", "fahren"];
	const fahrenPrateritum = ["fuhr", "fuhrst", "fuhr", "fuhr", "fuhr", "fuhren", "fuhrt", "fuhren", "fuhren"];
	const bleibenPrasens = ["bleibe", "bleibst", "bleibt", "bleibt", "bleibt", "bleiben", "bleibt", "bleiben", "bleiben"];
	const bleibenPrateritum = ["blieb", "bliebst", "blieb", "blieb", "blieb", "blieben", "bliebt", "blieben", "blieben"];

	const lassenPrasens = ["lasse", "lässt", "lässt", "lässt", "lässt", "lassen", "lasst", "lassen", "lassen"];
	const lassenPrateritum = ["ließ", "ließest", "ließ", "ließ", "ließ", "ließen", "ließt", "ließen", "ließen"];
	const sprechenPrasens = ["spreche", "sprichst", "spricht", "spricht", "spricht", "sprechen", "sprecht", "sprechen", "sprechen"];
	const sprechenPrateritum = ["sprach", "sprachst", "sprach", "sprach", "sprach", "sprachen", "spracht", "sprachen", "sprachen"];

	const bringenPrasens = ["bringe", "bringst", "bringt", "bringt", "bringt", "bringen", "bringt", "bringen", "bringen"];
	const bringenPrateritum = ["brachte", "brachtest", "brachte", "brachte", "brachte", "brachten", "brachtet", "brachten", "brachten"];

	const lebenPrasens = ["lebe", "lebst", "lebt", "lebt", "lebt", "leben", "lebt", "leben", "leben"];
	const lebenPrateritum = ["lebte", "lebtest", "lebte", "lebte", "lebte", "lebten", "lebtet", "lebten", "lebten"];
	const schreibenPrasens = ["schreibe", "schreibst", "schreibt", "schreibt", "schreibt", "schreiben", "schreibt", "schreiben", "schreiben"];
	const schreibenPrateritum = ["schrieb", "schriebst", "schrieb", "schrieb", "schrieb", "schrieben", "schriebt", "schrieben", "schrieben"];

	const laufenPrasens = ["laufe", "läufst", "läuft", "läuft", "läuft", "laufen", "lauft", "laufen", "laufen"];
	const laufenPrateritum = ["lief", "liefst", "lief", "lief", "lief", "liefen", "lieft", "liefen", "liefen"];

	const beginnenPrasens = ["beginne", "beginnst", "beginnt", "beginnt", "beginnt", "beginnen", "beginnt", "beginnen", "beginnen"];
	const beginnenPrateritum = ["begann", "begannst", "begann", "begann", "begann", "begannen", "begannet", "begannen", "begannen"];
	const trinkenPrasens = ["trinke", "trinkst", "trinkt", "trinkt", "trinkt", "trinken", "trinkt", "trinken", "trinken"];
	const trinkenPrateritum = ["trank", "trankst", "trank", "trank", "trank", "tranken", "trankt", "tranken", "tranken"];

	const essenPrasens = ["esse", "isst", "isst", "isst", "isst", "essen", "esst", "essen", "essen"];
	const essenPrateritum = ["aß", "aßt", "aß", "aß", "aß", "aßen", "aßt", "aßen", "aßen"];

	const spielenPrasens = ["spiele", "spielst", "spielt", "spielt", "spielt", "spielen", "spielt", "spielen", "spielen"];
	const spielenPrateritum = ["spielte", "spieltest", "spielte", "spielte", "spielte", "spielten", "spieltet", "spielten", "spielten"];
	const arbeitenPrasens = ["arbeite", "arbeitest", "arbeitet", "arbeitet", "arbeitet", "arbeiten", "arbeitet", "arbeiten", "arbeiten"];
	const arbeitenPrateritum = ["arbeitete", "arbeitetest", "arbeitete", "arbeitete", "arbeitete", "arbeiteten", "arbeitetet", "arbeiteten", "arbeiteten"];

	const brauchenPrasens = ["brauche", "brauchst", "braucht", "braucht", "braucht", "brauchen", "braucht", "brauchen", "brauchen"];
	const brauchenPrateritum = ["brauchte", "brauchtest", "brauchte", "brauchte", "brauchte", "brauchten", "brauchtet", "brauchten", "brauchten"];

	const hoerenPrasens = ["höre", "hörst", "hört", "hört", "hört", "hören", "hört", "hören", "hören"];
	const hoerenPrateritum = ["hörte", "hörtest", "hörte", "hörte", "hörte", "hörten", "hörtet", "hörten", "hörten"];
	const fuehlenPrasens = ["fühle", "fühlst", "fühlt", "fühlt", "fühlt", "fühlen", "fühlt", "fühlen", "fühlen"];
	const fuehlenPrateritum = ["fühlte", "fühltest", "fühlte", "fühlte", "fühlte", "fühlten", "fühltet", "fühlten", "fühlten"];

	const kaufenPrasens = ["kaufe", "kaufst", "kauft", "kauft", "kauft", "kaufen", "kauft", "kaufen", "kaufen"];
	const kaufenPrateritum = ["kaufte", "kauftest", "kaufte", "kaufte", "kaufte", "kauften", "kauftet", "kauften", "kauften"];

	const tragenPrasens = ["trage", "trägst", "trägt", "trägt", "trägt", "tragen", "tragt", "tragen", "tragen"];
	const tragenPrateritum = ["trug", "trugst", "trug", "trug", "trug", "trugen", "trugt", "trugen", "trugen"];
	const verstehenPrasens = ["verstehe", "verstehst", "versteht", "versteht", "versteht", "verstehen", "versteht", "verstehen", "verstehen"];
	const verstehenPrateritum = ["verstand", "verstandest", "verstand", "verstand", "verstand", "verstanden", "verstandet", "verstanden", "verstanden"];

	const lesenPrasens = ["lese", "liest", "liest", "liest", "liest", "lesen", "lest", "lesen", "lesen"];
	const lesenPrateritum = ["las", "last", "las", "las", "las", "lasen", "last", "lasen", "lasen"];

	const fliegenPrasens = ["fliege", "fliegst", "fliegt", "fliegt", "fliegt", "fliegen", "fliegt", "fliegen", "fliegen"];
	const fliegenPrateritum = ["flog", "flogst", "flog", "flog", "flog", "flogen", "flogt", "flogen", "flogen"];
	const fallenPrasens = ["falle", "fällst", "fällt", "fällt", "fällt", "fallen", "fallt", "fallen", "fallen"];
	const fallenPrateritum = ["fiel", "fielst", "fiel", "fiel", "fiel", "fielen", "fielt", "fielen", "fielen"];

	const singenPrasens = ["singe", "singst", "singt", "singt", "singt", "singen", "singt", "singen", "singen"];
	const singenPrateritum = ["sang", "sangst", "sang", "sang", "sang", "sangen", "sangt", "sangen", "sangen"];

	const schlafenPrasens = ["schlafe", "schläfst", "schläft", "schläft", "schläft", "schlafen", "schlaft", "schlafen", "schlafen"];
	const schlafenPrateritum = ["schlief", "schliefst", "schlief", "schlief", "schlief", "schliefen", "schlieft", "schliefen", "schliefen"];
	const zahlenPrasens = ["zahle", "zahlst", "zahlt", "zahlt", "zahlt", "zahlen", "zahlt", "zahlen", "zahlen"];
	const zahlenPrateritum = ["zahlte", "zahltest", "zahlte", "zahlte", "zahlte", "zahlten", "zahltet", "zahlten", "zahlten"];

	const suchenPrasens = ["suche", "suchst", "sucht", "sucht", "sucht", "suchen", "sucht", "suchen", "suchen"];
	const suchenPrateritum = ["suchte", "suchtest", "suchte", "suchte", "suchte", "suchten", "suchtet", "suchten", "suchten"];

	const wartenPrasens = ["warte", "wartest", "wartet", "wartet", "wartet", "warten", "wartet", "warten", "warten"];
	const wartenPrateritum = ["wartete", "wartetest", "wartete", "wartete", "wartete", "warteten", "wartetet", "warteten", "warteten"];

	const erzaehlenPrasens = ["erzähle", "erzählst", "erzählt", "erzählt", "erzählt", "erzählen", "erzählt", "erzählen", "erzählen"];
	const erzaehlenPrateritum = ["erzählte", "erzähltest", "erzählte", "erzählte", "erzählte", "erzählten", "erzähltet", "erzählten", "erzählten"];

	const schauenPrasens = ["schaue", "schaust", "schaut", "schaut", "schaut", "schauen", "schaut", "schauen", "schauen"];
	const schauenPrateritum = ["schaute", "schautest", "schaute", "schaute", "schaute", "schauten", "schautet", "schauten", "schauten"];
	const treffenPrasens = ["treffe", "triffst", "trifft", "trifft", "trifft", "treffen", "trefft", "treffen", "treffen"];
	const treffenPrateritum = ["traf", "trafst", "traf", "traf", "traf", "trafen", "traft", "trafen", "trafen"];

	const wohnenPrasens = ["wohne", "wohnst", "wohnt", "wohnt", "wohnt", "wohnen", "wohnt", "wohnen", "wohnen"];
	const wohnenPrateritum = ["wohnte", "wohntest", "wohnte", "wohnte", "wohnte", "wohnten", "wohntet", "wohnten", "wohnten"];

	const fragenPrasens = ["frage", "fragst", "fragt", "fragt", "fragt", "fragen", "fragt", "fragen", "fragen"];
	const fragenPrateritum = ["fragte", "fragtest", "fragte", "fragte", "fragte", "fragten", "fragtet", "fragten", "fragten"];

	const helfenPrasens = ["helfe", "hilfst", "hilft", "hilft", "hilft", "helfen", "helft", "helfen", "helfen"];
	const helfenPrateritum = ["half", "halfst", "half", "half", "half", "halfen", "halft", "halfen", "halfen"];

	const verbConjugations: VerbConjugation[] = [
		createVerbConjugation("sein", "Präsens", seinPrasens),
		createVerbConjugation("sein", "Präteritum", seinPrateritum),
		createVerbConjugation("haben", "Präsens", habenPrasens),
		createVerbConjugation("haben", "Präteritum", habenPrateritum),
		createVerbConjugation("werden", "Präsens", werdenPrasens),
		createVerbConjugation("werden", "Präteritum", werdenPrateritum),
		createVerbConjugation("sagen", "Präsens", sagenPrasens),
		createVerbConjugation("sagenn", "Präteritum", sagenPrateritum),
		createVerbConjugation("nehmen", "Präsens", nehmenPrasens),
		createVerbConjugation("nehmen", "Präteritum", nehmenPrateritum),
		createVerbConjugation("sehen", "Präsens", sehenPrasens),
		createVerbConjugation("sehenn", "Präteritum", sehenPrateritum),
		createVerbConjugation("geben", "Präsens", gebenPrasens),
		createVerbConjugation("gebenn", "Präteritum", gebenPrateritum),
		createVerbConjugation("finden", "Präsens", findenPrasens),
		createVerbConjugation("finden", "Präteritum", findenPrateritum),
		createVerbConjugation("gehen", "Präsens", gehenPrasens),
		createVerbConjugation("gehenn", "Präteritum", gehenPrateritum),
		createVerbConjugation("machen", "Präsens", machenPrasens),
		createVerbConjugation("machen", "Präteritum", machenPrateritum),
		createVerbConjugation("denken", "Präsens", denkenPrasens),
		createVerbConjugation("denken", "Präteritum", denkenPrateritum),
		createVerbConjugation("kommen", "Präsens", kommenPrasens),
		createVerbConjugation("kommen", "Präteritum", kommenPrateritum),
		createVerbConjugation("wissen", "Präsens", wissenPrasens),
		createVerbConjugation("wissen", "Präteritum", wissenPrateritum),
		createVerbConjugation("stehe", "Präsens", stehenPrasens),
		createVerbConjugation("stehe", "Präteritum", stehenPrateritum),
		createVerbConjugation("liege", "Präsens", liegenPrasens),
		createVerbConjugation("liege", "Präteritum", liegenPrateritum),
		createVerbConjugation("heisse", "Präsens", heissenPrasens),
		createVerbConjugation("heisse", "Präteritum", heissenPrateritum),
		createVerbConjugation("fahre", "Präsens", fahrenPrasens),
		createVerbConjugation("fahre", "Präteritum", fahrenPrateritum),
		createVerbConjugation("bleibe", "Präsens", bleibenPrasens),
		createVerbConjugation("bleibe", "Präteritum", bleibenPrateritum),
		createVerbConjugation("lasse", "Präsens", lassenPrasens),
		createVerbConjugation("lasse", "Präteritum", lassenPrateritum),
		createVerbConjugation("spreche", "Präsens", sprechenPrasens),
		createVerbConjugation("spreche", "Präteritum", sprechenPrateritum),
		createVerbConjugation("bringe", "Präsens", bringenPrasens),
		createVerbConjugation("bringe", "Präteritum", bringenPrateritum),
		createVerbConjugation("lebe", "Präsens", lebenPrasens),
		createVerbConjugation("lebe", "Präteritum", lebenPrateritum),
		createVerbConjugation("schreibe", "Präsens", schreibenPrasens),
		createVerbConjugation("schreibe", "Präteritum", schreibenPrateritum),
		createVerbConjugation("laufe", "Präsens", laufenPrasens),
		createVerbConjugation("laufe", "Präteritum", laufenPrateritum),
		createVerbConjugation("beginne", "Präsens", beginnenPrasens),
		createVerbConjugation("beginne", "Präteritum", beginnenPrateritum),
		createVerbConjugation("trinke", "Präsens", trinkenPrasens),
		createVerbConjugation("trinke", "Präteritum", trinkenPrateritum),
		createVerbConjugation("esse", "Präsens", essenPrasens),
		createVerbConjugation("esse", "Präteritum", essenPrateritum),
		createVerbConjugation("spiele", "Präsens", spielenPrasens),
		createVerbConjugation("spiele", "Präteritum", spielenPrateritum),
		createVerbConjugation("arbeite", "Präsens", arbeitenPrasens),
		createVerbConjugation("arbeite", "Präteritum", arbeitenPrateritum),
		createVerbConjugation("brauche", "Präsens", brauchenPrasens),
		createVerbConjugation("brauche", "Präteritum", brauchenPrateritum),
		createVerbConjugation("hoere", "Präsens", hoerenPrasens),
		createVerbConjugation("hoere", "Präteritum", hoerenPrateritum),
		createVerbConjugation("fuehle", "Präsens", fuehlenPrasens),
		createVerbConjugation("fuehle", "Präteritum", fuehlenPrateritum),
		createVerbConjugation("kaufe", "Präsens", kaufenPrasens),
		createVerbConjugation("kaufe", "Präteritum", kaufenPrateritum),
		createVerbConjugation("trage", "Präsens", tragenPrasens),
		createVerbConjugation("trage", "Präteritum", tragenPrateritum),
		createVerbConjugation("verstehe", "Präsens", verstehenPrasens),
		createVerbConjugation("verstehe", "Präteritum", verstehenPrateritum),
		createVerbConjugation("lese", "Präsens", lesenPrasens),
		createVerbConjugation("lese", "Präteritum", lesenPrateritum),
		createVerbConjugation("fliege", "Präsens", fliegenPrasens),
		createVerbConjugation("fliege", "Präteritum", fliegenPrateritum),
		createVerbConjugation("falle", "Präsens", fallenPrasens),
		createVerbConjugation("falle", "Präteritum", fallenPrateritum),
		createVerbConjugation("singe", "Präsens", singenPrasens),
		createVerbConjugation("singe", "Präteritum", singenPrateritum),
		createVerbConjugation("schlafe", "Präsens", schlafenPrasens),
		createVerbConjugation("schlafe", "Präteritum", schlafenPrateritum),
		createVerbConjugation("zahle", "Präsens", zahlenPrasens),
		createVerbConjugation("zahle", "Präteritum", zahlenPrateritum),
		createVerbConjugation("suche", "Präsens", suchenPrasens),
		createVerbConjugation("suche", "Präteritum", suchenPrateritum),
		createVerbConjugation("warte", "Präsens", wartenPrasens),
		createVerbConjugation("warte", "Präteritum", wartenPrateritum),
		createVerbConjugation("erzaehle", "Präsens", erzaehlenPrasens),
		createVerbConjugation("erzaehle", "Präteritum", erzaehlenPrateritum),
		createVerbConjugation("schaue", "Präsens", schauenPrasens),
		createVerbConjugation("schaue", "Präteritum", schauenPrateritum),
		createVerbConjugation("treffe", "Präsens", treffenPrasens),
		createVerbConjugation("treffe", "Präteritum", treffenPrateritum),
		createVerbConjugation("wohne", "Präsens", wohnenPrasens),
		createVerbConjugation("wohne", "Präteritum", wohnenPrateritum),
		createVerbConjugation("frage", "Präsens", fragenPrasens),
		createVerbConjugation("frage", "Präteritum", fragenPrateritum),
		createVerbConjugation("helfe", "Präsens", helfenPrasens),
		createVerbConjugation("helfe", "Präteritum", helfenPrateritum),
	];

	const checkAnswer = useCallback(() => {
		// Find the verb conjugation set for the selected verb and tense
		const conjugationSet = verbConjugations.find((vc) => vc.verb === state.verb && vc.tense === state.tense);

		if (!conjugationSet) {
			console.error("Conjugation set not found");
			return;
		}

		// Find the correct conjugation for the selected pronoun
		const correctConjugation = conjugationSet.conjugations.find((c) => c.pronoun === state.pronoun)?.conjugation;

		if (!correctConjugation) {
			console.error("Correct conjugation not found");
			return;
		}

		// Construct the correct sentence
		const correctSentence = `${state.pronoun} ${correctConjugation}`;

		// Compare the correct sentence with the user's input
		if (state.userInput.trim() === correctSentence) {
			setState((prevState) => ({
				...prevState,
				feedback: "Correct! Great job.",
				successes: prevState.successes + 1,
				userInput: "", // Optionally clear the input field
			}));
		} else {
			setState((prevState) => ({
				...prevState,
				feedback: `Incorrect. The correct answer is '${correctSentence}'.`,
				userInput: "", // Optionally clear the input field
			}));
		}

		randomizeSelection(); // Prepare for the next question
	}, [state, randomizeSelection]);

	useEffect(() => {
		randomizeSelection();
	}, []);

	return (
		<div className="p-4">
			<div className="text-center">
				<h1 className="text-2xl font-bold">{t("Verb Conjugation Slot Machine")}</h1>
			</div>
			<div className="mt-4">
				<div className="flex justify-center space-x-2">
					<div className="p-2 border-2">{state.pronoun}</div>
					<div className="p-2 border-2">{state.verb}</div>
					<div className="p-2 border-2">{state.tense}</div>
				</div>
				<div className="mt-4">
					<input type="text" className="border-2 p-2 w-full" placeholder="Type the correct sentence here" value={state.userInput} onChange={(e) => setState((prevState) => ({ ...prevState, userInput: e.target.value }))} />
					<button className="mt-2 p-2 bg-blue-500 text-white w-full" onClick={checkAnswer}>
						Submit
					</button>
				</div>
				{state.feedback && <div className="mt-4 p-2 border-2">{state.feedback}</div>}
			</div>
		</div>
	);
};

export default VerbConjugationSlotMachineExercise;
