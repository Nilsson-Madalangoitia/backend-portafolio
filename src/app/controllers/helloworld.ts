import { Inject } from "@decorators/di";
import { Controller, Get, Response, Request } from "@decorators/express";
import { HELLO_USE_CASE } from "@container/container";
import { HelloWorld } from "@core/use-case/helloworld";

@Controller("/")
export class HelloWorldController {
  constructor(
    @Inject(HELLO_USE_CASE)
    private readonly helloUseCase: HelloWorld
  ) {}

  @Get("")
  async getHello(@Response() res) {
    const message = await this.helloUseCase.execute();
    res.json(message);
  }
}
