import Leaderboard, { leaderboardParam } from './Leaderboard';

export type ILeaderboardModel = {
  getAllBoard(): Promise<Leaderboard[] | leaderboardParam[]>
};
