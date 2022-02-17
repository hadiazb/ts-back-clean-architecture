export interface IUserRepository {
  findAll(): Promise<string>;
  findOne(id: string): Promise<string>;
  deleteOne(id: string): Promise<string>;
  createOne(): Promise<string>;
  updateOne(id: string): Promise<string>;
}
