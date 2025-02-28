const MainTask = require("./models/maintask");
const User = require("./models/user");
const ChildTask = require("./models/childtask");

const initAssociations = async () => {
  User.hasMany(MainTask, { foreignKey: "userId", onDelete: "CASCADE" });
  MainTask.belongsTo(User, { foreignKey: "userId" });

  MainTask.hasMany(ChildTask, {
    foreignKey: "mainTaskId",
    onDelete: "CASCADE",
  });
  ChildTask.belongsTo(MainTask, { foreignKey: "mainTaskId" });

  MainTask.afterUpdate(async (mainTask, options) => {
    if (mainTask.status === "Completed") {
      await ChildTask.update(
        { status: "Completed" },
        { where: { mainTaskId: mainTask.id } }
      );
    }
  });
};

module.exports = { initAssociations, User, MainTask, ChildTask };
