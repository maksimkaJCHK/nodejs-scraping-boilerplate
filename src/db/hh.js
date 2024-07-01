import { Sequelize, DataTypes } from 'sequelize';

export const db = new Sequelize("hh", "root", "", {
  dialect: "mysql",
  host: "localhost",
  pool: {
    max: 5,
    min: 0,
    idle: 10_000
  },
  port: 3306,
});

export const Vacancies = db.define(
  'vacancies',
  {
    id: {
      type: DataTypes.NUMBER,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    nameCompany: {
      type: DataTypes.STRING,
    },
  },
);