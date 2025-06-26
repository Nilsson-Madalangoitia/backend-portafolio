import { Inject, Injectable } from "@decorators/di";
import { UseCase } from "@libs/contracts/use-case";
import { PORTAFOLIO_REPOSITORY } from "@container/container";
import { PortafolioRepository } from "@core/domain/repositories";

@Injectable()
export class GetPortafolioByUserUseCase implements UseCase<any, any, any, any[]> {
  constructor(
    @Inject(PORTAFOLIO_REPOSITORY)
    private readonly portafolioRepository: PortafolioRepository
  ) {}

  async execute(userid: string | number): Promise<any[]> {
    return this.portafolioRepository.getPortafolioByUser(userid);
  }
}