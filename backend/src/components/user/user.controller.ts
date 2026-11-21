import { ActiveCharacterSelectionResult, ActiveCharacterSelectionUseCase } from "@src/components/user/usecases/active_character_selection/types";
import { CurrentUserResult, CurrentUserUseCase } from "@src/components/user/usecases/current_user/types";
import { ErrorMessages } from "@src/messages";
import { Request, Response } from "express";

export default class UserController {
    constructor(
        private readonly currentUser: CurrentUserUseCase,
        private readonly activeCharacterSelection: ActiveCharacterSelectionUseCase
    ) {}

    getCurrentUser = async (req: Request, res: Response): Promise<void> => {
        const { status, user } = await this.currentUser.execute({ userId: req.user.id });
        if (status === CurrentUserResult.NOT_FOUND) {
            res.status(404).json({ errorCode: ErrorMessages.USER_NOT_EXISTS });
            return;
        }
        res.status(200).send(user);
    }

    setActiveCharacter = async (req: Request, res: Response): Promise<void> => {
        const { status } = await this.activeCharacterSelection.execute({
            userId: req.user.id,
            characterId: req.body.characterId
        });

        switch (status) {
            case ActiveCharacterSelectionResult.NOT_FOUND:
                res.status(404).json({ errorCode: ErrorMessages.CHARACTER_NOT_EXISTS });
                return;
            case ActiveCharacterSelectionResult.NOT_OWNED:
                res.status(403).json({ errorCode: ErrorMessages.CHARACTER_NOT_OWNED });
                return;
            default:
                res.status(204).send();
        }
    }
}
