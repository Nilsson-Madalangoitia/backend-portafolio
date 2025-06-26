import { Inject, Injectable } from "@decorators/di";
import { UseCase } from "@libs/contracts/use-case";
import { USER_REPOSITORY } from "@container/container";
import { UserRepository } from "@core/domain/repositories";

@Injectable()
export class CreateUserUseCase implements UseCase<any, any, any, any> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository
  ) {}

  async execute(data) {
    return this.userRepository.create(data);
  }
}
