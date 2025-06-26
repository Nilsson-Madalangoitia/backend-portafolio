import { Inject, Injectable } from "@decorators/di";
import { UseCase } from "@libs/contracts/use-case";
import { USER_REPOSITORY } from "@container/container";
import { UserRepository } from "@core/domain/repositories";

@Injectable()
export class UpdateUserUseCase implements UseCase<any, any, any, any> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository
  ) {}
  async execute(payload: any) {
    const project = await this.userRepository.get(payload.id);
    if (!project) {
      throw new Error(`El user con el id: ${payload.id} no se encuentra`);
    }
    return this.userRepository.update(payload.id, payload.data);
  }
}
