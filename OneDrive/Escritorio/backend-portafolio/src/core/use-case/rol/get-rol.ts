import { Inject, Injectable } from "@decorators/di";
import { UseCase } from "@libs/contracts/use-case";
import { ROL_REPOSITORY } from "@container/container";
import { RolRepository } from "@core/domain/repositories";

@Injectable()
export class GetRolUseCase implements UseCase<string | number, any, any, any> {
  constructor(
    @Inject(ROL_REPOSITORY)
    private readonly rolRepository: RolRepository
  ) {}

  async execute(id: string | number): Promise<any> {
    const rol = await this.rolRepository.get(id);
    if (!rol) {
      throw new Error(`The role with the id: ${id} does not found.`);
    }
    return rol;
  }
}