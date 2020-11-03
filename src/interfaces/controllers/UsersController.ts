import { UserSerializer } from "../serializers/UserSerializer";
import { UserRepository } from "../database/UserRepository";
import { ListUsers } from "../../application/usecases/ListUsers";
import { CreateUser } from "../../application/usecases/CreateUser";
import { GetUser } from "../../application/usecases/GetUser";
import { UpdateUser } from "../../application/usecases/UpdateUser";
// import { DeleteUser } from '../../application/usecases/DeleteUser'
import { IDBConnection } from "../database/IDBConnection";
import { Request, Response, NextFunction } from "express";

export class UsersController {
  private userSerializer: UserSerializer;
  private userRepository: UserRepository;

  constructor(dbConnection: IDBConnection) {
    this.userSerializer = new UserSerializer();
    this.userRepository = new UserRepository(dbConnection);
  }

  findAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const useCase = new ListUsers(this.userRepository);
      const results = await useCase.execute();
      res.json(this.userSerializer.serialize(results));
    } catch (err) {
      next(err);
    }
  };

  createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name } = req.body;
      const useCase = new CreateUser(this.userRepository);
      const result = await useCase.execute(name);
      res.json(this.userSerializer.serialize(result));
    } catch (err) {
      next(err);
    }
  };

  findUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const useCase = new GetUser(this.userRepository);

      const result = await useCase.execute(id);
      res.json(this.userSerializer.serialize(result));
    } catch (err) {
      next(err);
    }
  };

  updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const { name } = req.body;
      const useCase = new UpdateUser(this.userRepository);
      const result = await useCase.execute(id, name);
      res.json(this.userSerializer.serialize(result));
    } catch (err) {
      next(err);
    }
  };

  //   async deleteUser(req: any, res: any) {
  //     const id = req.params.id
  //     const useCase = new DeleteUser(this.userRepository)
  //     let result = await useCase.execute(id)
  //     return this.userSerializer.serialize(result)
  //   }
}
