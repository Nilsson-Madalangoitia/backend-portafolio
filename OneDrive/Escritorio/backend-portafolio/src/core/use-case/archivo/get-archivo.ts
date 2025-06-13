import { Inject, Injectable } from "@decorators/di";
import { UseCase } from "@libs/contracts/use-case";
import { ARCHIVO_REPOSITORY } from "@container/container";
import { ArchivoRepository } from "@core/domain/repositories";

@Injectable()
export class GetArchivoUseCase implements UseCase<string | number, any, any, any> {
  constructor(
    @Inject(ARCHIVO_REPOSITORY)
    private readonly archivoRepository: ArchivoRepository
  ) {}

  async execute(id: string | number): Promise<any> {
    const archivo = await this.archivoRepository.get(id);
    if (!archivo) {
      throw new Error(`The archivo with the id: ${id} does not found.`);
    }
    return archivo;
  }
}