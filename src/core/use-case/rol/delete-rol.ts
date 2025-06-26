import { Inject, Injectable } from "@decorators/di";
import { UseCase } from "@libs/contracts/use-case";
import { ROL_REPOSITORY } from "@container/container";
import { RolRepository } from "@core/domain/repositories";
import { Status } from '@infrastructure/helpers/status';

@Injectable()
export class DeleteRolUseCase implements UseCase<string | number, any, any, string> {
  constructor(
    @Inject(ROL_REPOSITORY)
    private readonly rolRepository: RolRepository
  ) {}

  async execute(id: string | number): Promise<string> {
    const rol = await this.rolRepository.get(id);
    if (!rol) {
      throw new Error(`The role with the id: ${id} does not found.`);
    }

    await this.rolRepository.update(id, Status);

    return "Successfully deleted.";
  }
}
