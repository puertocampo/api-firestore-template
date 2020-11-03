import { User } from "../../domain/models/User";

export abstract class IUserRepository {
  abstract async findAll(): Promise<Array<User>>;
  abstract async create(user: User): Promise<User>;
  abstract async find(id: string): Promise<User>;
  abstract async update(user: User): Promise<User>;
}
