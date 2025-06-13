import { Inject, Injectable } from "@decorators/di";
import { UseCase } from "@libs/contracts/use-case";
import { ARCHIVO_REPOSITORY } from "@container/container";
import { ArchivoRepository } from "@core/domain/repositories";

@Injectable()
export class UpdateArchivoUseCase implements UseCase<any, any, any, any> {
  constructor(
    @Inject(ARCHIVO_REPOSITORY)
    private readonly archivoRepository: ArchivoRepository
  ) {}
  async execute(payload: any) {
    const archivo = await this.archivoRepository.get(payload.id);
    if (!archivo) {
      throw new Error(`The archivo with the id: ${payload.id} does not found.`);
    }
    return this.archivoRepository.update(payload.id, payload.data);
  }
}