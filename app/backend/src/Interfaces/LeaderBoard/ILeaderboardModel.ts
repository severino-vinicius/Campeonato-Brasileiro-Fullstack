import { AllLeaderboard } from './LeadderboardInterface';
// import Leaderboard, { leaderboardParam } from './Leaderboard';

export type ILeaderboardModel = {
  getAllBoard(path: string): Promise<AllLeaderboard[]>
};
