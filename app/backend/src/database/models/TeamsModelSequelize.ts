import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';

export default class TeamsModelSequelize extends
  Model<InferAttributes<TeamsModelSequelize>, InferCreationAttributes<TeamsModelSequelize>> {
  declare id: CreationOptional<number>;
  declare teamName: string;
}

TeamsModelSequelize.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'team_name',
  },
}, {
  sequelize: db,
  modelName: 'teams',
  tableName: 'teams',
  timestamps: false,
  underscored: true,
});
