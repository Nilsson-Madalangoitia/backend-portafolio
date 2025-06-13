import { Inject, Injectable } from "@decorators/di";
import { UseCase } from "@libs/contracts/use-case";
import { ANIO_REPOSITORY } from "@container/container";
import { AnioRepository } from "@core/domain/repositories";
import { Status } from '@infrastructure/helpers/status';

@Injectable()
export class DeleteAnioUseCase implements UseCase<string | number, any, any, string> {
  constructor(
    @Inject(ANIO_REPOSITORY)
    private readonly anioRepository: AnioRepository
  ) {}

  async execute(id: string | number): Promise<string> {
    const data = await this.anioRepository.get(id);
    if (!data) {
      throw new Error(`The año with the id: ${id} does not found.`);
    }

    await this.anioRepository.update(id, Status);

    return "Successfully deleted.";
  }
}
