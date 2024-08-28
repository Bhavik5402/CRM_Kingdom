import User from "./Users.js";
import Lead from "./Lead.js";
import Stage from "./Stage.js";

User.hasMany(User, { as: "creator", foreignKey: "createdby" });
User.hasMany(Lead, { foreignKey: "createdby" });
User.hasMany(Lead, { foreignKey: "leadby" });

Lead.belongsTo(Stage, { as: "stageDetails", foreignKey: "stageid" });
Lead.belongsTo(User, { as: "leadGenerator", foreignKey: "leadby" });

export { Lead, User, Stage };
