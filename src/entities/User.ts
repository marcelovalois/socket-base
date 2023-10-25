export class User {
  public name: string = "";
  public image?: string | null = "";
  public type?: string | null = "";
  public id?: number;

  constructor(props: Omit<User, "id">, id?: number) {
    Object.assign(this, props);

    if (id) {
      this.id = id;
    }
  }
}
