import { describe, it, expect } from "vitest";
import { Character, CreateCharacterDto } from "@src/components/character/types";
import { fromCreateDto, toDetails } from "@src/components/character/character.mapper";
import CharacterService from "@src/components/character/character.service";
import FakeCharacterDao from "../../../src/components/character/fake-character.dao";
import { generateUsername } from "@test/utils/test-data-generator";

describe('CharacterService', () => {
    let characterDao: FakeCharacterDao;
    let characterService: CharacterService;

    function addTestCharactersToDb(username: string): Character[] {
        const expectedCharacters: Character[] = [{
            owner: username,
            name: `${username}_character_name`,
            appearance: 'Teszt kinézet',
            story: 'Ez egy teszt karakter',
            imageUrl: '/teszt.jpg'
        }];
        return characterDao.addCharacters(username, expectedCharacters);
    }

    function createCreateCharacterDto(charName: string, username: string): CreateCharacterDto {
        return {
            username: username,
            charName: charName,
            appearance: 'Tünde kinézet',
            story: 'Tünde szeme mindent lát',
            imageUrl: '/legolas.jpg'
        };
    }

    beforeEach(() => {
        characterDao = new FakeCharacterDao();
        characterService = new CharacterService(characterDao);
    });

    describe('getCharactersByUsername()', () => {
        it('when user has not character then should return an empty array', async () => {
            const characterList = await characterService.getCharactersByUsername(generateUsername());

            expect(characterList).toBeInstanceOf(Array);
            expect(characterList.length).toBe(0);
        });

        it('when exist different users then should return different characters', async () => {
            const firstUser = generateUsername();
            const secondUser = generateUsername();
            const expectedCharacters1 = addTestCharactersToDb(firstUser).map(toDetails);
            const expectedCharacters2 = addTestCharactersToDb(secondUser).map(toDetails);
            
            const actualCharacters1 = await characterService.getCharactersByUsername(firstUser);
            const actualCharacters2 = await characterService.getCharactersByUsername(secondUser);

            expect(actualCharacters1).toBeInstanceOf(Array);
            expect(actualCharacters1).toStrictEqual(expectedCharacters1);
            expect(actualCharacters2).toBeInstanceOf(Array);
            expect(actualCharacters2).toStrictEqual(expectedCharacters2);
            expect(actualCharacters1).not.toStrictEqual(actualCharacters2);
        });
    });

    describe('addNewCharacter()', () => {
        it('when character was added to character list then should return true', async () => {
            const newCharacter = createCreateCharacterDto('Legolas', generateUsername());

            expect(await characterService.addNewCharacter(newCharacter)).toBe(true);
        });

        it('when add new character then should save to character list', async () => {
            const username = generateUsername();
            const oldCharacters = addTestCharactersToDb(username);
            const newCharacter = createCreateCharacterDto('Aragorn', username);
            const expectedCharacters: Character[] = [...oldCharacters, fromCreateDto(newCharacter)];

            expect(await characterService.addNewCharacter(newCharacter)).toBe(true);
            expect(await characterDao.findAllCharacterByUsername(username)).toStrictEqual(expectedCharacters);
        });

        it('when character name already exists in all character list then should return false', async () => {
            const username = generateUsername();
            const characters = addTestCharactersToDb(username);
            const newCharacter = createCreateCharacterDto(characters[0].name, username);

            expect(await characterService.addNewCharacter(newCharacter)).toBe(false);
            expect(await characterDao.findAllCharacterByUsername(username)).toStrictEqual(characters);
        });
    });
});