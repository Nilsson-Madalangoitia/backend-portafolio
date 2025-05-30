import { Inject, Injectable } from "@decorators/di";
import { UseCase } from "@libs/contracts/use-case";
import { ANIO_REPOSITORY } from "@container/container";
import { AnioRepository } from "@core/domain/repositories";

@Injectable()
export class GetAnioUseCase implements UseCase<string | number, any> {
  constructor(
    @Inject(ANIO_REPOSITORY)
    private readonly anioRepository: AnioRepository
  ) {}

  async execute(id: string | number): Promise<any> {
    const data = await this.anioRepository.get(id);
    if (!data) {
      throw new Error(`The anio with the id: ${id} does not found.`);
    }
    return data;
  }
}