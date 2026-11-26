export interface RaceCollectionUseCase {
    execute: () => Promise<RaceCollectionOutput>
}

export interface RaceCollectionDetails {
    id: number;
    name: string;
    teaser: string;
    description: string;
    imageUrl: string;
    buttonImageUrl: string;
}

export type RaceCollectionOutput = RaceCollectionDetails[];
