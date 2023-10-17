import BoardModel from '../models/Leaderboard.Model';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ILeaderboardModel } from '../Interfaces/LeaderBoard/ILeaderboardModel';
import LeaderboardRules from '../utils/leaderboardRulesClass';
import IMatche from '../Interfaces/Matches/Matche';
import { businessType } from '../Interfaces/LeaderBoard/LeadderboardInterface';

export default class BoardService {
  constructor(
    private boardModel: ILeaderboardModel = new BoardModel(),
  ) {}

  static orderedLeaderBoard(leaderBoard: businessType[]) {
    const orderedLeaderBoard = leaderBoard
      .sort((a, b) => b.goalsFavor - a.goalsFavor)
      .sort((a, b) => b.goalsBalance - a.goalsBalance)
      .sort((a, b) => b.totalPoints - a.totalPoints);
    return orderedLeaderBoard;
  }

  public async getAllBoard(path: string): Promise<ServiceResponse<businessType[]>> {
    const bdResponse = await this.boardModel.getAllBoard(path);
    const dbResponseFormated = bdResponse.map((teamMatch) => {
      const businessRules = new LeaderboardRules(teamMatch.teamName);
      if (path === 'home' || path === 'away') {
        const matches = path === 'home'
          ? teamMatch.homeTeam : teamMatch.awayTeam;
        return businessRules.startLeaderboard(path, matches as IMatche[]);
      }
      return businessRules.startLeaderboard(path, teamMatch.homeTeam as IMatche[]);
    });
    const leaderboardFormated = BoardService.orderedLeaderBoard(dbResponseFormated);
    return {
      status: 'SUCCESS', data: leaderboardFormated,
    };
  }

  public async getAllLeaderboard(): Promise<ServiceResponse<businessType[]>> {
    const bdResponse = await this.boardModel.getAllLeaderboard();
    const dbResponseFormated = bdResponse.map((teamMatch) => {
      const businessRules = new LeaderboardRules(teamMatch.teamName);
      return businessRules
        .startHomeAwayLeaderboard(teamMatch.homeTeam as IMatche[], teamMatch.awayTeam as IMatche[]);
    });
    const leaderboardFormated = BoardService.orderedLeaderBoard(dbResponseFormated);
    return {
      status: 'SUCCESS', data: leaderboardFormated,
    };
  }
}
