import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';

import TeamsModelSequelize from './TeamsModelSequelize';

export default class MatchesModelSequelize extends
  Model<InferAttributes<MatchesModelSequelize>, InferCreationAttributes<MatchesModelSequelize>> {
  declare id: CreationOptional<number>;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

MatchesModelSequelize.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'matches',
  tableName: 'matches',
  timestamps: false,
  underscored: true,
});

TeamsModelSequelize.hasMany(MatchesModelSequelize, { foreignKey: 'homeTeamId', as: 'homeTeam' });
MatchesModelSequelize.belongsTo(TeamsModelSequelize, { foreignKey: 'homeTeamId', as: 'homeTeam' });

TeamsModelSequelize.hasMany(MatchesModelSequelize, { foreignKey: 'awayTeamId', as: 'awayTeam' });
MatchesModelSequelize.belongsTo(TeamsModelSequelize, { foreignKey: 'awayTeamId', as: 'awayTeam' });
