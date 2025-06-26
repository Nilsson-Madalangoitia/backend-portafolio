import { Inject, Injectable } from "@decorators/di";
import { UseCase } from "@libs/contracts/use-case";
import { USER_REPOSITORY } from "@container/container";
import { UserRepository } from "@core/domain/repositories";

@Injectable()
export class DeleteUserUseCase implements UseCase<string | number, any, any, string> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository
  ) {}

  async execute(id: string | number): Promise<string> {
    const cliente = await this.userRepository.get(id);
    if (!cliente) {
      throw new Error(`El user con el id : ${id} no existe.`);
    }
    await this.userRepository.delete(id);
    return "Eliminado correctamente.";
  }
}
