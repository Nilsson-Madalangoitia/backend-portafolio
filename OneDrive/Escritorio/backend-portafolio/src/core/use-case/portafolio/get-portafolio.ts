import { Inject, Injectable } from "@decorators/di";
import { UseCase } from "@libs/contracts/use-case";
import { PORTAFOLIO_REPOSITORY } from "@container/container";
import { PortafolioRepository } from "@core/domain/repositories";

@Injectable()
export class GetPortafolioUseCase implements UseCase<string | number, any, any, any> {
  constructor(
    @Inject(PORTAFOLIO_REPOSITORY)
    private readonly portafolioRepository: PortafolioRepository
  ) {}

  async execute(id: string | number): Promise<any> {
    const portafolio = await this.portafolioRepository.get(id);
    if (!portafolio) {
      throw new Error(`The portafolio with the id: ${id} does not found.`);
    }
    return portafolio;
  }
}