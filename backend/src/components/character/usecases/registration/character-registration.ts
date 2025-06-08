import { CharacterRepository } from "@src/components/character/repositories/types";
import { fromInput } from "@src/components/character/usecases/registration/mapper";
import { CharacterRegistration, CreateCharacterInput, CreateCharacterOutput, CreateCharacterStatus } from "@src/components/character/usecases/registration/types";

export default class CharacterRegistrationImpl implements CharacterRegistration {

    private characterRepository: CharacterRepository;

    constructor(characterDao: CharacterRepository) {
        this.characterRepository = characterDao;
    }

    execute = async (createCharacterDto: CreateCharacterInput): Promise<CreateCharacterOutput> => {
        const hasRegisteredCharName = await this.characterRepository.existsByCharacterName(createCharacterDto.name);
        if (hasRegisteredCharName) {
            return { status: CreateCharacterStatus.ALREADY_EXISTS };
        }
        const character = fromInput(createCharacterDto);
        await this.characterRepository.save(character);
        return { status: CreateCharacterStatus.CREATED };
    }
}