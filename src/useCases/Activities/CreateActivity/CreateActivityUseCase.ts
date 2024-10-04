import { v4 as uuidv4 } from "uuid";

import { Activity } from "../../../entities/Activity";
import { IActivitiesRepository } from "../../../repositories/interfaces/IActivitiesRepository";
import { ICreateActivityResponseDTO } from "./CreateActivityDTO";

interface ICreateActivityRequestDTO {
  user_id: number;
  title: string;
}

export class CreateActivityUseCase {
  constructor(private activitiesRepository: IActivitiesRepository) {}

  async execute({ user_id, title }: ICreateActivityRequestDTO): Promise<ICreateActivityResponseDTO> {
    // Cria um slug para a atividade usando uuid
    const slug = uuidv4();

    const activity = new Activity({ user_id, title, slug });

    const activityData = await this.activitiesRepository.create(activity);

    return activityData;
  }
}
