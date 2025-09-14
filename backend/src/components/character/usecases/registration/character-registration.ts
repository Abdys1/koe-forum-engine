import { CharacterRepository } from "@src/components/character/repositories/types";
import { fromInput } from "@src/components/character/usecases/registration/mapper";
import {
  CharacterRegistration,
  CreateCharacterInput,
  CreateCharacterOutput,
  CreateCharacterStatus,
} from "@src/components/character/usecases/registration/types";
import { CharacterEquipment } from "../../types";
import { EquipmentRepository } from "@src/components/equipment/repositories/types";
import { EquipmentEntity } from "@src/components/equipment/models/equipment";
import e from "express";

export default class CharacterRegistrationImpl implements CharacterRegistration {
  private characterRepository: CharacterRepository;
  private equipmentRepository: EquipmentRepository;

  constructor(characterDao: CharacterRepository, equipmentRepository: EquipmentRepository) {
    this.characterRepository = characterDao;
    this.equipmentRepository = equipmentRepository;
  }

  public execute = async (createCharacterDto: CreateCharacterInput): Promise<CreateCharacterOutput> => {
    const hasRegisteredCharName = await this.characterRepository.existsByCharacterName(createCharacterDto.name);
    if (hasRegisteredCharName) {
      return { status: CreateCharacterStatus.ALREADY_EXISTS };
    }
    
    const hasInvalidEquipment = await this.hasInvalidEquipment(createCharacterDto.equipment);
    if (hasInvalidEquipment) {
      return { status: CreateCharacterStatus.EQUIPMENT_NOT_EXISTS};
    }

    const character = fromInput(createCharacterDto);
    await this.characterRepository.create(character);
    return { status: CreateCharacterStatus.CREATED };
  };    

  private hasInvalidEquipment = async (equipment: CharacterEquipment): Promise<boolean> => {
    const equipmentIds: number[] = Object.values(equipment).filter((id) => id !== null);
    const equipmentsFromDb: EquipmentEntity[] = await this.equipmentRepository.findAllByIds(equipmentIds);
    return equipmentIds.length !== equipmentsFromDb.length;
  }
}
