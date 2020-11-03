import { User } from "../../domain/models/User";
import { IUserRepository } from "../repositories/IUserRepository";

export class GetUser {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  execute(id: string) {
    return this.userRepository.find(id);
  }
}
