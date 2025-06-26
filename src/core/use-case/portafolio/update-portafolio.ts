import { Inject, Injectable } from "@decorators/di";
import { UseCase } from "@libs/contracts/use-case";
import { PORTAFOLIO_REPOSITORY } from "@container/container";
import { PortafolioRepository } from "@core/domain/repositories";

@Injectable()
export class UpdatePortafolioUseCase implements UseCase<any, any, any, any> {
  constructor(
    @Inject(PORTAFOLIO_REPOSITORY)
    private readonly portafolioRepository: PortafolioRepository
  ) {}
  async execute(payload: any) {
    const portafolio = await this.portafolioRepository.get(payload.id);
    if (!portafolio) {
      throw new Error(`The portafolio with the id: ${payload.id} does not found.`);
    }
    return this.portafolioRepository.update(payload.id, payload.data);
  }
}