import { User } from "../entities/User";

export interface IUsersRepository {
  findByName(username: string): Promise<User | null>;
  save(user: User): Promise<void>;
  list(): Promise<User[]>;
  findById(id: number): Promise<User | null>;
  remove(user: User): Promise<void>;
}
