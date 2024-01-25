interface ILogoutRequest {}

export class LogoutUseCase {
  constructor() {}

  execute = async (data: ILogoutRequest) => {
    try {
      console.log(data);
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  };
}
