import InMemoryCharacterRepository from "@src/components/character/repositories/in-memory-character.repository";
import { Sex } from "@src/components/character/types";
import CharacterRegistrationImpl from "@src/components/character/usecases/registration/character-registration";
import { CharacterRegistration, CreateCharacterInput, CreateCharacterStatus } from "@src/components/character/usecases/registration/types";
import { createCharacterEntity } from "@test/components/character/character-test-helper";
import { beforeEach, describe, expect, it } from "vitest";

describe('Character registration usecase', () => {
    let characterRepository: InMemoryCharacterRepository;
    let characterRegistrationUseCase: CharacterRegistration;

    beforeEach(() => {
        characterRepository = new InMemoryCharacterRepository();
        characterRegistrationUseCase = new CharacterRegistrationImpl(characterRepository);
    });

    it('when character registration executed with unique name then should save character', async () => {
        const charName = 'Aragorn';
        expect(characterRepository.characters.length).toBe(0);

        const testCharacter = createCharacterRegistrationInput(charName);
        const result = await characterRegistrationUseCase.execute(testCharacter);

        expect(result.status).toBe(CreateCharacterStatus.CREATED);
        const savedCharacter = characterRepository.characters[0];
        expect(characterRepository.characters.length).toBe(1);
        expect(savedCharacter.name).toBe(charName);
        expect(savedCharacter.sex).toBe(testCharacter.sex);
        expect(savedCharacter.race).toBe(testCharacter.race);
        expect(savedCharacter.imageUrl).toBe(testCharacter.imageUrl);
        expect(savedCharacter.helmet).toBe(testCharacter.equipement.helmet);
        expect(savedCharacter.primaryWeapon).toBe(testCharacter.equipement.primaryWeapon);
        expect(savedCharacter.secondaryWeapon).toBe(testCharacter.equipement.secondaryWeapon);
        expect(savedCharacter.bodyArmor).toBe(testCharacter.equipement.bodyArmor);
        expect(savedCharacter.secondaryArmor).toBe(testCharacter.equipement.secondaryArmor);
        expect(savedCharacter.shield).toBe(testCharacter.equipement.shield);
        expect(savedCharacter.userId).toBe(testCharacter.owner.id);
    });

    it('when character registration executed with the same name then should return character already exists', async () => {
        const charName = 'Legolas';
        characterRepository.create(createCharacterEntity(charName, 1));
        expect(characterRepository.characters.length).toBe(1);
        const result = await characterRegistrationUseCase.execute(createCharacterRegistrationInput(charName));
        expect(result.status).toBe(CreateCharacterStatus.ALREADY_EXISTS);
        expect(characterRepository.characters.length).toBe(1);
        expect(characterRepository.characters[0].name).toBe(charName);
    });

    function createCharacterRegistrationInput(characterName: string): CreateCharacterInput {
        return {
            name: characterName,
            sex: Sex.MALE,
            race: 'elf',
            imageUrl: 'legolas.jpg',
            equipement: {
                helmet: 'cap',
                primaryWeapon: 'bow',
                secondaryWeapon: 'dagger',
                bodyArmor: 'leatherArmor',
                secondaryArmor: 'wrist',
                shield: 'wooden'
            },
            owner: { id: 1, username: 'legolas' }
        }
    }
});