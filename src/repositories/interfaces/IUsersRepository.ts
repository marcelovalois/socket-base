import { User } from "../../entities/User";
import { Participation } from "../../entities/Participation";

export interface IUsersRepository {
  findByName(username: string): Promise<User | null>;
  findById(id: number): Promise<User | null>;
  insertUser(user: User): Promise<User>;
  listAll(): Promise<User[]>;
  removeUser(id: number): Promise<User>;
  listActivitiesByUser(id: number): Promise<Participation[]>;
}
