import { User } from "../../domain/models/User";
import { IUserRepository } from "../repositories/IUserRepository";

export class ListUsers {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  execute() {
    return this.userRepository.findAll();
  }
}
