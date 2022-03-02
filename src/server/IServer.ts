export interface IServer {
  start(): void;
  middlewaresAfter(): void;
  middlewaresBefore(): void;
  routes(): void;
  connectionDB(): void;
  initModels(): void;
  corsValidator(): void;
}
