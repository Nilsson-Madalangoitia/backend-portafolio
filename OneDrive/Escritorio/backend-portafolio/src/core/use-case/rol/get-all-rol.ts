import { Inject, Injectable } from "@decorators/di";
import { UseCase } from "@libs/contracts/use-case";
import { ROL_REPOSITORY } from "@container/container";
import { RolRepository } from "@core/domain/repositories";

@Injectable()
export class GetAllRolUseCase implements UseCase<any, any, any, any[]> {
  constructor(
    @Inject(ROL_REPOSITORY)
    private readonly rolRepository: RolRepository
  ) {}

  async execute(): Promise<any[]> {
    return this.rolRepository.getAll();
  }
}