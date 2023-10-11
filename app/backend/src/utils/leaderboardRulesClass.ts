import IMatche from '../Interfaces/Matches/Matche';

export default class LeaderboardRules {
  private name: string;
  private totalPoints: number;
  private totalGames: number;
  private totalVictories: number;
  private totalDraws: number;
  private totalLosses: number;
  private goalsFavor: number;
  private goalsOwn: number;
  private goalsBalance: number;
  private efficiency: number;
  constructor(name: string) {
    this.name = name;
    this.totalPoints = 0;
    this.totalGames = 0;
    this.totalVictories = 0;
    this.totalDraws = 0;
    this.totalLosses = 0;
    this.goalsFavor = 0;
    this.goalsOwn = 0;
    this.goalsBalance = 0;
    this.efficiency = 0;
  }

  private businessLeaderboardRules(golsTeamOne: number, golsTeamTwo: number) {
    this.goalsFavor += golsTeamOne;
    this.goalsOwn += golsTeamTwo;
    if (golsTeamOne > golsTeamTwo) {
      this.totalVictories += 1;
      this.totalPoints += 3;
    }
    if (golsTeamOne === golsTeamTwo) {
      this.totalDraws += 1;
      this.totalPoints += 1;
    }
    if (golsTeamOne < golsTeamTwo) {
      this.totalLosses += 1;
    }
  }

  private setEfficiency() {
    this.efficiency = (this.totalPoints / (this.totalGames * 3)) * 100;
  }

  private setBalance() {
    this.goalsBalance = this.goalsFavor - this.goalsOwn;
  }

  public leaderboardStatus() {
    return {
      name: this.name,
      totalPoints: this.totalPoints,
      totalGames: this.totalGames,
      totalVictories: this.totalVictories,
      totalDraws: this.totalDraws,
      totalLosses: this.totalLosses,
      goalsFavor: this.goalsFavor,
      goalsOwn: this.goalsOwn,
      efficiency: Number(this.efficiency.toFixed(2)),
      goalsBalance: this.goalsBalance,
    };
  }

  public startLeaderboard(path: string, teams: IMatche[]) {
    teams.forEach((team) => {
      this.totalGames += 1;
      const { homeTeamGoals, awayTeamGoals } = team;
      if (path === 'home') {
        return this.businessLeaderboardRules(homeTeamGoals, awayTeamGoals);
      }
      this.businessLeaderboardRules(awayTeamGoals, homeTeamGoals);
    });
    this.setEfficiency();
    this.setBalance();
    return this.leaderboardStatus();
  }
}
