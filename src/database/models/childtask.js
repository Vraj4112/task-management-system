const { DataTypes } = require("sequelize");
const {sequelize} = require("../connect");


const ChildTask = sequelize.define(
  "child_task",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    mainTaskId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.ENUM("Pending", "In Progress", "Completed"),
      defaultValue: "Pending",
    },
    dueDate: {
      type: DataTypes.DATE,
    },
    priority: {
      type: DataTypes.ENUM("Low", "Medium", "High"),
      defaultValue: "Medium",
    },
  },
  { timestamps: true }
);

module.exports = ChildTask;
