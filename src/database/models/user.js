const { DataTypes } = require("sequelize");
const { sequelize } = require("../connect");
const bcrypt = require("bcrypt");

const User = sequelize.define(
  "User",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      unique: true,
    },
    password: { type: DataTypes.STRING, allowNull: false },
    role: {
      type: DataTypes.ENUM("ADMIN", "USER"),
      defaultValue: "USER",
      allowNull: false,
    },
  },
  { timestamps: true }
);

User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
});

module.exports = User;
