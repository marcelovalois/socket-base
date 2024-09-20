import { v4 as uuidv4 } from "uuid";

import { Activity } from "../../../entities/Activity";
import { Phrase } from "../../../entities/Phrase";
import { IActivitiesRepository } from "../../../repositories/interfaces/IActivitiesRepository";
import { ICreateActivityResponseDTO } from "./CreateActivityDTO";

interface ICreateActivityRequest {
  user_id: number;
  title: string;
  phrases?: Phrase[];
}

export class CreateActivityUseCase {
  constructor(private activitiesRepository: IActivitiesRepository) {}

  async execute({ user_id, title, phrases }: ICreateActivityRequest): Promise<ICreateActivityResponseDTO> {
    // Cria um slug para a atividade usando uuid
    const slug = uuidv4();

    const activity = new Activity({ user_id, title, slug, phrases });

    const activityData = await this.activitiesRepository.create(activity);

    return activityData;
  }
}
