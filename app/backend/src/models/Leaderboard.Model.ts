import Leaderboard, { leaderboardParam } from '../Interfaces/LeaderBoard/Leaderboard';
import { ILeaderboardModel } from '../Interfaces/LeaderBoard/ILeaderboardModel';
import MatchesModelSequelize from '../database/models/MatchesModelSequelize';
import TeamsModelSequelize from '../database/models/TeamsModelSequelize';

export default class BoardModel implements ILeaderboardModel {
  constructor(
    private matchModel = MatchesModelSequelize,
    private teamModel = TeamsModelSequelize,
  ) {}

  async getAllBoard(path: string): Promise<Leaderboard[] | leaderboardParam[]> {
    const atri = ['id', 'homeTeamId', 'homeTeamGoals', 'awayTeamId', 'awayTeamGoals', 'inProgress'];
    const dbdata = await this.teamModel.findAll({
      include: [
        {
          model: this.matchModel,
          as: `${path}Team`,
          attributes: atri,
          where: { inProgress: false },
        },
      ],
    });
    return dbdata;
  }
}
