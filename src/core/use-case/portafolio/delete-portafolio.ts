import { Inject, Injectable } from "@decorators/di";
import { UseCase } from "@libs/contracts/use-case";
import { PORTAFOLIO_REPOSITORY } from "@container/container";
import { PortafolioRepository } from "@core/domain/repositories";
import { Status } from '@infrastructure/helpers/status';

@Injectable()
export class DeletePortafolioUseCase implements UseCase<string | number, any, any, string> {
  constructor(
    @Inject(PORTAFOLIO_REPOSITORY)
    private readonly portafolioRepository: PortafolioRepository
  ) {}

  async execute(id: string | number): Promise<string> {
    const portafolio = await this.portafolioRepository.get(id);
    if (!portafolio) {
      throw new Error(`The portafolio with the id: ${id} does not found.`);
    }

    await this.portafolioRepository.update(id, Status);

    return "Successfully deleted.";
  }
}
