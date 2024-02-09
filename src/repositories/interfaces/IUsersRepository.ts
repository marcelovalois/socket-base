import { User } from "../../entities/User";
import { Participation } from "../../entities/Participation";

export interface IUsersRepository {
  insertUser(user: User): Promise<User>;
  loginWithEmail(email: string): Promise<User | null>;
  authToken(token: string): Promise<User | null>;
  updateUser(user: User): Promise<void>;
  findByEmail(username: string): Promise<User | null>;
  findById(id: number): Promise<User | null>;
  listAll(): Promise<User[]>;
  removeUser(id: number): Promise<User>;
  listActivitiesByUser(id: number): Promise<Participation[]>;
}
