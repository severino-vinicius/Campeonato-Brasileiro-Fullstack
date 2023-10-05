import TeamsModelSequelize from '../database/models/TeamsModelSequelize';
import MatchesModelSequelize from '../database/models/MatchesModelSequelize';
import { IMatchesModel } from '../Interfaces/Matches/IMatchesModel';
import IMatche from '../Interfaces/Matches/Matche';

export default class MatchesModel implements IMatchesModel {
  private model = MatchesModelSequelize;
  private teamModel = TeamsModelSequelize;

  async findAll(): Promise<IMatche[]> {
    const dbdata = await this.model.findAll({
      include: [
        { model: this.teamModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: this.teamModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return dbdata;
  }

  async findMatchByProgress(progress: boolean): Promise<IMatche[] | null> {
    const dbdata = await this.model.findAll({
      include: [
        { model: this.teamModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: this.teamModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
      where: {
        inProgress: progress,
      },
    });
    return dbdata;
  }

  async findById(id: number): Promise<IMatche | null> {
    const dbdata = await this.model.findByPk(id);
    if (!dbdata) return null;
    return dbdata;
  }

  async endMatch(id: number): Promise<IMatche | null> {
    const [affectedRows] = await this.model.update({ inProgress: false }, { where: { id } });
    if (affectedRows === 0) return null;

    return this.findById(id);
  }
}
