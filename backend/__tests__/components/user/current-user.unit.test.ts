import { UserRepository } from '@src/components/user/repositories/types';
import CurrentUserUseCaseImpl from '@src/components/user/usecases/current_user/current-user';
import { CurrentUserResult, CurrentUserUseCase } from '@src/components/user/usecases/current_user/types';
import { fakeRepositoryProvider } from '@test/utils/fake-repository-provider';
import { beforeEach, describe, expect, it, Mocked, vi } from 'vitest';

describe('CurrentUserUseCase', () => {
    let userRepository: Mocked<UserRepository>;
    let currentUser: CurrentUserUseCase;

    beforeEach(() => {
        userRepository = {
            findProfileById: vi.fn().mockResolvedValue({ id: 7, username: 'aragorn', activeCharacterId: 3 }),
            setActiveCharacter: vi.fn(),
        };
        currentUser = new CurrentUserUseCaseImpl(fakeRepositoryProvider(userRepository));
    });

    describe('execute()', () => {
        it('should return the profile of the user', async () => {
            const result = await currentUser.execute({ userId: 7 });

            expect(result).toEqual({
                status: CurrentUserResult.FOUND,
                user: { id: 7, username: 'aragorn', activeCharacterId: 3 }
            });
            expect(userRepository.findProfileById).toHaveBeenCalledWith(7);
        });

        it('should return NOT_FOUND when the user does not exist', async () => {
            userRepository.findProfileById.mockResolvedValue(null);

            const result = await currentUser.execute({ userId: 7 });

            expect(result).toEqual({ status: CurrentUserResult.NOT_FOUND });
        });
    });
});
