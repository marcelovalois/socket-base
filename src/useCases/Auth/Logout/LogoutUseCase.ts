interface ILogoutRequestDTO {}

export class LogoutUseCase {
  constructor() {}

  execute = async (data: ILogoutRequestDTO) => {
    try {
      console.log(data);
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  };
}
