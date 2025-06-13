import { Inject, Injectable } from "@decorators/di";
import { UseCase } from "@libs/contracts/use-case";
import { ARCHIVO_REPOSITORY } from "@container/container";
import { ArchivoRepository } from "@core/domain/repositories";

@Injectable()
export class GetAllArchivoUseCase implements UseCase<any, any, any, any[]> {
  constructor(
    @Inject(ARCHIVO_REPOSITORY)
    private readonly archivoRepository: ArchivoRepository
  ) {}

  async execute(): Promise<any[]> {
    return this.archivoRepository.getAll();
  }
}