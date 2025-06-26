import { Inject, Injectable } from "@decorators/di";
import { UseCase } from "@libs/contracts/use-case";
import { ARCHIVO_REPOSITORY } from "@container/container";
import { ArchivoRepository } from "@core/domain/repositories";
import { Status } from '@infrastructure/helpers/status';

@Injectable()
export class DeleteArchivoUseCase implements UseCase<string | number, any, any, string> {
  constructor(
    @Inject(ARCHIVO_REPOSITORY)
    private readonly archivoRepository: ArchivoRepository
  ) {}

  async execute(id: string | number): Promise<string> {
    const archivo = await this.archivoRepository.get(id);
    if (!archivo) {
      throw new Error(`The archivo with the id: ${id} does not found.`);
    }

    await this.archivoRepository.update(id, Status);

    return "Successfully deleted.";
  }
}
