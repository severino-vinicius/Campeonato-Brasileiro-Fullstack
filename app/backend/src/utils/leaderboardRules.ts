import { businessType, leaderboardParam } from '../Interfaces/LeaderBoard/Leaderboard';

// function points(w: number, d: number): number {
//   const wPoints = w * 3;
//   const dPoints = d * 1;

//   const totalPoints = wPoints + dPoints;

//   return totalPoints;
// }

export default function businessRule(allMatchByTeams: leaderboardParam[]): Array<businessType> {
  return allMatchByTeams.map((team) => ({
    name: team.teamName,
    totalGames: team.homeTeam.length,
    totalVictories: team.homeTeam
      .filter((match) => match.homeTeamGoals > match.awayTeamGoals).length,
    totalDraws: team.homeTeam
      .filter((match) => match.homeTeamGoals === match.awayTeamGoals).length,
    totalLosses: team.homeTeam
      .filter((match) => match.homeTeamGoals < match.awayTeamGoals).length,

    goalsFavor: team.homeTeam.reduce((total, match) => total + match.homeTeamGoals, 0),
    goalsOwn: team.homeTeam.reduce((total, match) => total + match.awayTeamGoals, 0),
    goalsBalance: team.homeTeam
      .reduce((total, match) => total + (match.homeTeamGoals - match.awayTeamGoals), 0),
  }));
}

// name, totalPoints, totalGames, totalVictories, totalDraws, totalLosses, goalsFavor, goalsOwn goalsBalance, efficiency
