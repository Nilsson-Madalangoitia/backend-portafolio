import { Inject, Injectable } from "@decorators/di";
import { UseCase } from "@libs/contracts/use-case";
import { ANIO_REPOSITORY } from "@container/container";
import { AnioRepository } from "@core/domain/repositories";

@Injectable()
export class UpdateAnioUseCase implements UseCase<any, any, any, any> {
  constructor(
    @Inject(ANIO_REPOSITORY)
    private readonly anioRepository: AnioRepository
  ) {}
  async execute(payload: any) {
    const data = await this.anioRepository.get(payload.id);
    if (!data) {
      throw new Error(`The año with the id: ${payload.id} does not found.`);
    }
    return this.anioRepository.update(payload.id, payload.data);
  }
}