import Leaderboard, { businessType, leaderboardParam } from '../Interfaces/LeaderBoard/Leaderboard';

export function businessHomeRule(allMatchByTeams: leaderboardParam[]): Array<businessType> {
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

export default function boardHomeEfficiency(allMatchByTeams: Leaderboard[]): Array<businessType> {
  const boardWithoutTotal = businessHomeRule(allMatchByTeams as leaderboardParam[]);
  const allBoardData = boardWithoutTotal.map((team) => {
    const totalPoints = team.totalVictories * 3 + team.totalDraws;
    const efficiency = (totalPoints / (team.totalGames * 3)) * 100;
    return {
      ...team,
      totalPoints,
      efficiency: efficiency.toFixed(2),
    };
  });
  return allBoardData;
}

// name, totalPoints, totalGames, totalVictories, totalDraws, totalLosses, goalsFavor, goalsOwn goalsBalance, efficiency
