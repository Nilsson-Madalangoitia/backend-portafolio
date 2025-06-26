export interface UseCase<TUseCasePort, TUseCasePort2, TUseCasePort3, TUseCaseResult> {
  execute(port?: TUseCasePort, port2?: TUseCasePort2, port3?: TUseCasePort3): Promise<TUseCaseResult>;
}