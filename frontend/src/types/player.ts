export interface Player {
	id: string;
	name: string;
	score: number;
}

export interface Players {
	[players: string]: Player;
};

export interface Word {
	word: string;
	gender: string;
	translation: string;
	difficulty_level: number;
	category: string;
};
