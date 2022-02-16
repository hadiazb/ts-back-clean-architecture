export interface IServer {
  start(): void;
  middlewares(): void;
  routes(): void;
}
