export interface IServer {
  start(): void;
  config(): void;
  routes(): void;
}
