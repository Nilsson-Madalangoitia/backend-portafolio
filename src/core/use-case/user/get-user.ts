import { Inject, Injectable } from "@decorators/di";
import { UseCase } from "@libs/contracts/use-case";
import { USER_REPOSITORY } from "@container/container";
import { UserRepository } from "@core/domain/repositories";

@Injectable()
export class GetUserUseCase implements UseCase<any, any, any, any> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository
  ) {}
  async execute(id: string | number) {
    
    const user = await this.userRepository.get(id);
    
    if (!user) {
      throw new Error(`El user con el id: ${id} no se encuentra`);
    }
    return user;
  }
}
