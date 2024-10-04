import { IActivitiesRepository } from "../../../repositories/interfaces/IActivitiesRepository";

interface IFindActivityBySlugRequestDTO {
  slug: string;
}

export class FindActivityBySlugUseCase {
  constructor(private activitiesRepository: IActivitiesRepository) {}

  execute = async (data: IFindActivityBySlugRequestDTO) => {
    try {
      const activity = await this.activitiesRepository.findBySlug(data.slug);

      if (!activity) {
        throw new Error("Activity not found");
      }

      return activity;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  };
}
