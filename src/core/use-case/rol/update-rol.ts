import { Inject, Injectable } from "@decorators/di";
import { UseCase } from "@libs/contracts/use-case";
import { ROL_REPOSITORY } from "@container/container";
import { RolRepository } from "@core/domain/repositories";

@Injectable()
export class UpdateRolUseCase implements UseCase<any, any, any, any> {
  constructor(
    @Inject(ROL_REPOSITORY)
    private readonly rolRepository: RolRepository
  ) {}
  async execute(payload: any) {
    const rol = await this.rolRepository.get(payload.id);
    if (!rol) {
      throw new Error(`The role with the id: ${payload.id} does not found.`);
    }
    return this.rolRepository.update(payload.id, payload.data);
  }
}