import { User } from "../../domain/models/User";
import { IUserRepository } from "../../application/repositories/IUserRepository";
import { IDBConnection } from "./IDBConnection";
import moment from "moment-timezone";
import { userErrors } from "../../errors/user";

export class UserRepository extends IUserRepository {
  private connection: IDBConnection;

  constructor(connection: IDBConnection) {
    super();
    this.connection = connection;
  }

  private convertModel(r: any) {
    let user = new User();

    user.id = r.id;
    user.name = r.name;
    user.createdAt = moment.tz(r.created_at, "UTC");
    user.updatedAt = moment.tz(r.updated_at, "UTC");

    return user;
  }

  async findAll(): Promise<Array<User>> {
    const usersRef = this.connection;
    let allUsers = [];
    await usersRef.get().then(usersSnapshot => {
      usersSnapshot.forEach(userSnapshot => {
        allUsers.push(this.convertModel({ id: userSnapshot.id, ...userSnapshot.data() }));
      });
    });
    return allUsers;
  }

  async create(user: User): Promise<any> {
    const res = await this.connection.add({
      name: user.name
    });
    return {
      id: res.id
    };
  }

  async find(id: string): Promise<User> {
    const userRef = this.connection.doc(id);
    const userSnapshot = await userRef.get();
    if (!userSnapshot.exists) {
      throw userErrors.userNotFound;
    }
    return this.convertModel({ id: userSnapshot.id, ...userSnapshot.data() });
  }

  async update(user: User): Promise<User> {
    const userRef = this.connection.doc(user.id);
    await userRef.set({
      name: user.name
    });
    return user;
  }

  //   async delete(user: User): Promise<User> {
  //     let queryResults = await this.connection.execute(
  //       'delete from users where id = ?',
  //       user.id
  //     )
  //     return this.convertModel(user)
  //   }
}
