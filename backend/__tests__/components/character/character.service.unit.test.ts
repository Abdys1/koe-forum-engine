import { describe, it, expect, beforeEach } from "vitest";
import { Character, CharacterService, CreateCharacterDto, CreateCharacterStatus, Sex } from "@src/components/character/types";
import { fromCreateDto, toDetails } from "@src/components/character/character.mapper";
import { generateUsername } from "@test/utils/test-data-generator";
import CharacterServiceImpl from "@src/components/character/character.service";
import FakeCharacterDao from "@test/components/character/utils/fake-character.dao";

describe('CharacterService', () => {
    let characterDao: FakeCharacterDao;
    let characterService: CharacterService;

    function addTestCharactersToDb(username: string): Character[] {
        return characterDao.addCharacters(username, [{
            id: '1',
            owner: username,
            name: `${username}_character_name`,
            sex: Sex.FEMALE,
            race: 'elf',
            imageUrl: '/teszt.jpg'
        }]);
    }

    function createCreateCharacterDto(charName: string, username: string): CreateCharacterDto {
        return {
            owner: username,
            name: charName,
            sex: Sex.FEMALE,
            race: 'elf',
            imageUrl: '/legolas.jpg'
        };
    }

    beforeEach(() => {
        characterDao = new FakeCharacterDao();
        characterService = new CharacterServiceImpl(characterDao);
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

    describe('createCharacter()', () => {
        it('when character was added to character list then should return character created status', async () => {
            const newCharacter = createCreateCharacterDto('Legolas', generateUsername());

            expect(await characterService.createCharacter(newCharacter)).toStrictEqual({ status: CreateCharacterStatus.CREATED });
        });

        it('when add new character then should save to character list', async () => {
            const username = generateUsername();
            const oldCharacters = addTestCharactersToDb(username);
            const newCharacter = createCreateCharacterDto('Aragorn', username);
            const expectedCharacters: Character[] = [...oldCharacters, fromCreateDto(newCharacter)];

            expect(await characterService.createCharacter(newCharacter)).toStrictEqual({ status: CreateCharacterStatus.CREATED });
            expect(await characterDao.findAllCharacterByUsername(username)).toStrictEqual(expectedCharacters);
        });

        it('when character name already exists in all character list then should return already exists status', async () => {
            const username = generateUsername();
            const characters = addTestCharactersToDb(username);
            const newCharacter = createCreateCharacterDto(characters[0].name, username);

            expect(await characterService.createCharacter(newCharacter)).toStrictEqual({ status: CreateCharacterStatus.ALREADY_EXISTS });
            expect(await characterDao.findAllCharacterByUsername(username)).toStrictEqual(characters);
        });
    });
});