import { User } from "../../domain/models/User";
import { IUserRepository } from "../repositories/IUserRepository";
import moment from "moment-timezone";

export class CreateUser {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  execute(name: string) {
    let user = new User(name);
    user.createdAt = moment();
    user.updatedAt = moment();
    return this.userRepository.create(user);
  }
}
