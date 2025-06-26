import { Inject, Injectable } from "@decorators/di";
import { UseCase } from "@libs/contracts/use-case";
import { ANIO_REPOSITORY } from "@container/container";
import { AnioRepository } from "@core/domain/repositories";

@Injectable()
export class CreateAnioUseCase implements UseCase<any, any, any, any> {
  constructor(
    @Inject(ANIO_REPOSITORY)
    private readonly anioRepository: AnioRepository
  ) {}

  async execute(data) {
    return this.anioRepository.create(data);
  }
}
