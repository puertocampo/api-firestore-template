import { User } from "../../domain/models/User";
import moment from "moment-timezone";

const _serializeSingleUser = (user: User) => {
  return {
    id: user.id,
    name: user.name,
    createdAt: moment(user.createdAt).tz("Asia/Tokyo").format(),
    updatedAt: moment(user.updatedAt).tz("Asia/Tokyo").format()
  };
};

export class UserSerializer {
  serialize(data: any) {
    if (!data) {
      throw new Error("expect data to be not undefined nor null");
    }
    if (Array.isArray(data)) {
      return data.map(_serializeSingleUser);
    }
    return _serializeSingleUser(data);
  }
}
