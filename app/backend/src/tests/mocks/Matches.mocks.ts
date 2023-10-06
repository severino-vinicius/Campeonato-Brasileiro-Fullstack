
const fishedMatches = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: 'São Paulo'
    },
    awayTeam: {
      teamName: 'Grêmio'
    }
  },
  {
    id: 2,
    homeTeamId: 9,
    homeTeamGoals: 1,
    awayTeamId: 14,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: 'Internacional'
    },
    awayTeam: {
      teamName: 'Santos'
    }
  },
  {
    id: 3,
    homeTeamId: 4,
    homeTeamGoals: 3,
    awayTeamId: 11,
    awayTeamGoals: 0,
    inProgress: false,
    homeTeam: {
      teamName: 'Corinthians'
    },
    awayTeam: {
      teamName: 'Napoli-SC'
    }
  },
]

const inProgressMatcheById = {
  id: 43,
  homeTeamId: 11,
  homeTeamGoals: 0,
  awayTeamId: 10,
  awayTeamGoals: 0,
  inProgress: true,
  homeTeam: {
    teamName: 'Napoli-SC'
  },
  awayTeam: {
    teamName: 'Minas Brasília'
  }
}

const matchUpdated = {
  id: 43,
  homeTeamId: 11,
  homeTeamGoals: 0,
  awayTeamId: 10,
  awayTeamGoals: 3,
  inProgress: true,
  homeTeam: {
    teamName: 'Napoli-SC'
  },
  awayTeam: {
    teamName: 'Minas Brasília'
  }
}

const matchUpdatedMock = {
  id: 43,
  homeTeamId: 11,
  homeTeamGoals: 0,
  awayTeamId: 10,
  awayTeamGoals: 0,
  inProgress: false,
  homeTeam: {
    teamName: 'Napoli-SC'
  },
  awayTeam: {
    teamName: 'Minas Brasília'
  }
}

const inProgressMatches = [
  inProgressMatcheById,
  {
    id: 44,
    homeTeamId: 7,
    homeTeamGoals: 2,
    awayTeamId: 15,
    awayTeamGoals: 2,
    inProgress: true,
    homeTeam: {
      teamName: 'Flamengo'
    },
    awayTeam: {
      teamName: 'São José-SP'
    }
  },
  {
    id: 45,
    homeTeamId: 5,
    homeTeamGoals: 1,
    awayTeamId: 3,
    awayTeamGoals: 1,
    inProgress: true,
    homeTeam: {
      teamName: 'Cruzeiro'
    },
    awayTeam: {
      teamName: 'Botafogo'
    }
  },
]

const matchesMock = [
  fishedMatches,
  inProgressMatches
]

export { 
  matchesMock,
  fishedMatches,
  inProgressMatches,
  inProgressMatcheById,
  matchUpdatedMock,
  matchUpdated,
};
