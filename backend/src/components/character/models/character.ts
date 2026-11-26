export interface CharacterRace {
  id: number;
  name: string;
}

export default interface Character {
  id: number;
  userId: number;
  name: string;
  race: CharacterRace;
  sex: number;
  imageUrl: string;
}

export interface NewCharacter {
  userId: number;
  name: string;
  raceId: number;
  sex: number;
  imageUrl: string;
}
