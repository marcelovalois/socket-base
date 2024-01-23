import { User } from "../../entities/User";
import { Participation } from "../../entities/Participation";

export interface IUsersRepository {
  findByEmail(username: string): Promise<User | null>;
  findById(id: number): Promise<User | null>;
  insertUser(user: User): Promise<User>;
  updateUser(user: User): Promise<void>;
  listAll(): Promise<User[]>;
  removeUser(id: number): Promise<User>;
  listActivitiesByUser(id: number): Promise<Participation[]>;
}
