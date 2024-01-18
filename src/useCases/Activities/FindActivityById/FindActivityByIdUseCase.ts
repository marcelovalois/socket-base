import { IActivitiesRepository } from "../../../repositories/interfaces/IActivitiesRepository";

interface IFindActivityByIdRequest {
  id: number;
}

export class FindActivityByIdUseCase {
  constructor(private activitiesRepository: IActivitiesRepository) {}

  async execute({ id }: IFindActivityByIdRequest) {
    const activity = await this.activitiesRepository.findById(id);

    return activity;
  }
}
