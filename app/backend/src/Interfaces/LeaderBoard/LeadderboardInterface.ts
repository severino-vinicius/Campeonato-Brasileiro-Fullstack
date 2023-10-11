import IMatche from '../Matches/Matche';

export interface AllLeaderboard {
  id: number,
  teamName: string,
  homeTeam?: IMatche[],
  awayTeam?: IMatche[],
}

export interface businessType {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  efficiency: number,
  goalsBalance: number
}
