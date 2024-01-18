import { User } from "../../entities/User";

export interface IUsersRepository {
  findByName(username: string): Promise<User | null>;
  findById(id: number): Promise<User | null>;
  save(user: User): Promise<User>;
  list(): Promise<User[]>;
  remove(id: number): Promise<User>;
}
