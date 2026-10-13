export default interface Character {
  id?: number;
  userId: number;
  name: string;
  race: string;
  sex: number;
  imageUrl: string;
  equipmentIds?: number[];
}
