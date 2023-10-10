import BoardModel from '../models/Leaderboard.Model';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
// import { dataFromBoard } from '../Interfaces/LeaderBoard/Leaderboard';
import { ILeaderboardModel } from '../Interfaces/LeaderBoard/ILeaderboardModel';
import boardHomeEfficiency from '../utils/leaderboardRules';
import boardAwayEfficiency from '../utils/leaderboardAwayRules';

export default class BoardService {
  constructor(
    private boardModel: ILeaderboardModel = new BoardModel(),
  ) {}

  public async getAllBoard(path: string): Promise<ServiceResponse<any>> {
    if (path === 'home') {
      const bdResponse = await this.boardModel.getAllBoardHome();
      const matchAllData = boardHomeEfficiency(bdResponse);
      return {
        status: 'SUCCESS', data: matchAllData,
      };
    }
    const bdResponse = await this.boardModel.getAllBoardAway();
    const matchAllData = boardAwayEfficiency(bdResponse);
    return {
      status: 'SUCCESS', data: matchAllData,
    };
  }
}
