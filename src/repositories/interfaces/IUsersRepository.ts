import { User } from "../../entities/User";
import { Participation } from "../../entities/Participation";

export interface IUsersRepository {
  insert(user: User): Promise<User>;
  list(): Promise<User[]>;
  findByEmail(username: string): Promise<User | null>;
  findById(id: number): Promise<User | null>;
  update(user: User): Promise<void>;
  delete(id: number): Promise<User>;
  listActivities(id: number): Promise<Participation[]>;
}
