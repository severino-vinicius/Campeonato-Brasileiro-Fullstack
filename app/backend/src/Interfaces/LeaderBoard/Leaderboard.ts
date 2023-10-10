export default interface Leaderboard {
  id: number,
  teamName: string,
}

export interface leaderboardParam extends Leaderboard {
  homeTeam: [
    {
      id: number,
      homeTeamId: number,
      homeTeamGoals: number,
      awayTeamId: number,
      awayTeamGoals: number,
      inProgress: boolean
    },
  ],
}

export interface leaderboardAwayParam extends Leaderboard {
  awayTeam: [
    {
      id: number,
      homeTeamId: number,
      homeTeamGoals: number,
      awayTeamId: number,
      awayTeamGoals: number,
      inProgress: boolean
    },
  ],
}

export interface dataFromBoard extends businessType{
  totalPoints: number,
}

export interface businessType {
  name: string,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number
}
