import User from "./Users.js";
import Lead from "./Lead.js";
import Stage from "./Stage.js";
import Country from "./Country.js";
import State from "./State.js";
import City from "./City.js";

User.hasMany(User, { as: "creator", foreignKey: "createdby" });
User.hasMany(Lead, { foreignKey: "createdby" });
User.hasMany(Lead, { foreignKey: "leadby" });

Lead.belongsTo(Stage, { as: "stageDetails", foreignKey: "stageid" });
Lead.belongsTo(User, { as: "leadGenerator", foreignKey: "leadby" });

Lead.belongsTo(Country, { foreignKey: 'countryid', as: 'country' });
Lead.belongsTo(State, { foreignKey: 'stateid', as: 'state' });
Lead.belongsTo(City, { foreignKey: 'cityid', as: 'city' });


export { Lead, User, Stage, Country, City, State };
