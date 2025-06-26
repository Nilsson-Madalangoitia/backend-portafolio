import { Injectable } from "@decorators/di";
import { UseCase } from "@libs/contracts/use-case";

@Injectable()
export class HelloWorld implements UseCase<null, any, any, string>{
    async execute(port?: null): Promise<string> {
        return "Hello world";  
    }
}