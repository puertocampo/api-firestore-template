import { User } from "../../domain/models/User";
import { IUserRepository } from "../repositories/IUserRepository";
import moment from "moment-timezone";

export class UpdateUser {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async execute(id: string, name: string) {
    let user = await this.userRepository.find(id);
    user.name = name;
    user.updatedAt = moment();
    return this.userRepository.update(user);
  }
}
