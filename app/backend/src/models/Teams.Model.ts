import Iteams from '../Interfaces/Teams/Teams';
import TeamsModelSequelize from '../database/models/TeamsModelSequelize';
import { IteamsModel } from '../Interfaces/Teams/ITeamsModel';

export default class TeamsModel implements IteamsModel {
  private model = TeamsModelSequelize;

  async findAll(): Promise<Iteams[]> {
    const dbData = await this.model.findAll();
    return dbData.map(({ id, teamName }) => (
      { id, teamName }
    ));
  }

  async findById(teamId: Iteams['id']): Promise<Iteams | null> {
    const dbData = await this.model.findByPk(teamId);
    if (dbData === null) return null;

    const { id, teamName }: Iteams = dbData;
    return { id, teamName };
  }
}
