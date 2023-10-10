import BoardModel from '../models/Leaderboard.Model';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import businessRule from '../utils/leaderboardRules';
import { dataFromBoard, leaderboardParam } from '../Interfaces/LeaderBoard/Leaderboard';
import { ILeaderboardModel } from '../Interfaces/LeaderBoard/ILeaderboardModel';

export default class BoardService {
  constructor(
    private boardModel: ILeaderboardModel = new BoardModel(),
  ) {}

  public async getAllBoard(): Promise<ServiceResponse<dataFromBoard[]>> {
    const bdResponse = await this.boardModel.getAllBoard();
    const boardWithoutTotal = businessRule(bdResponse as leaderboardParam[]);
    const allBoardData = boardWithoutTotal.map((team) => ({
      ...team,
      totalPoints: team.totalVictories * 3 + team.totalDraws,
    }));
    return {
      status: 'SUCCESS', data: allBoardData,
    };
  }
}
