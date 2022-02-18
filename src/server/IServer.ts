export interface IServer {
  start(): void;
  middlewaresAfter(): void;
  middlewaresBefore(): void;
  routes(): void;
}
