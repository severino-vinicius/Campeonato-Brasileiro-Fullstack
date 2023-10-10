import Leaderboard, { leaderboardParam } from './Leaderboard';

export type ILeaderboardModel = {
  getAllBoardHome(): Promise<Leaderboard[] | leaderboardParam[]>
  getAllBoardAway(): Promise<Leaderboard[] | leaderboardParam[]>
};
