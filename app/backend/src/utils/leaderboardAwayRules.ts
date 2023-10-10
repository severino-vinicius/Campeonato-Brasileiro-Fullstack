import Leaderboard, { businessType,
  leaderboardAwayParam } from '../Interfaces/LeaderBoard/Leaderboard';

export function businessHomeRule(allMatchByTeams: leaderboardAwayParam[]): Array<businessType> {
  return allMatchByTeams.map((team) => ({
    name: team.teamName,
    totalGames: team.awayTeam.length,
    totalVictories: team.awayTeam
      .filter((match) => match.awayTeamGoals > match.homeTeamGoals).length,
    totalDraws: team.awayTeam
      .filter((match) => match.awayTeamGoals === match.homeTeamGoals).length,
    totalLosses: team.awayTeam
      .filter((match) => match.awayTeamGoals < match.homeTeamGoals).length,

    goalsFavor: team.awayTeam.reduce((total, match) => total + match.homeTeamGoals, 0),
    goalsOwn: team.awayTeam.reduce((total, match) => total + match.homeTeamGoals, 0),
    goalsBalance: team.awayTeam
      .reduce((total, match) => total + (match.awayTeamGoals - match.homeTeamGoals), 0),
  }));
}

export default function boardAwayEfficiency(allMatchByTeams: Leaderboard[]): Array<businessType> {
  const boardWithoutTotal = businessHomeRule(allMatchByTeams as leaderboardAwayParam[]);
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
