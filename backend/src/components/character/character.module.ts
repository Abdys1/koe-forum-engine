import CharacterController from "@src/components/character/character.controller";
import CharacterRepositoryImpl from "@src/components/character/repositories/character.repository";
import CharacterCollectionUseCaseImpl from "@src/components/character/usecases/collection/character-collection";
import CharacterEquipmentCollectionUseCaseImpl from "@src/components/character/usecases/equipment_collection/character-equipment-collection";
import CharacterEquipmentModificationUseCaseImpl from "@src/components/character/usecases/equipment_modification/character-equipment-modification";
import CharacterEquipmentValidationUseCaseImpl from "@src/components/character/usecases/equipment_validation/character-equipment-validation";
import CharacterRegistrationUseCaseImpl from "@src/components/character/usecases/registration/character-registration";
import CharacterUpdateValidatorUseCaseImpl from "@src/components/character/usecases/update_validator/character-update-validator";
import { repositoryProvider } from "@src/components/transaction/transaction.module";
import { asClass } from "awilix";

export const characterModule = {
    characterRepositories: repositoryProvider((client) => new CharacterRepositoryImpl(client)),
    characterCollection: asClass(CharacterCollectionUseCaseImpl).singleton(),
    characterEquipmentCollection: asClass(CharacterEquipmentCollectionUseCaseImpl).singleton(),
    characterEquipmentValidation: asClass(CharacterEquipmentValidationUseCaseImpl).singleton(),
    characterEquipmentModification: asClass(CharacterEquipmentModificationUseCaseImpl).singleton(),
    characterRegistration: asClass(CharacterRegistrationUseCaseImpl).singleton(),
    characterUpdateValidator: asClass(CharacterUpdateValidatorUseCaseImpl).singleton(),
    characterController: asClass(CharacterController).singleton(),
};
