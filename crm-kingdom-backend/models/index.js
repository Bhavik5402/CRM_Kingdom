import User from "./Users.js";
import Lead from "./Lead.js";
import Stage from "./Stage.js";
import Country from "./Country.js";
import State from "./State.js";
import City from "./City.js";
import PageAccess from "./PageAccess.js";
import { syncDatabase } from "../config/database.config.js";

async function initialize() {
    try {
        // sync database
        await syncDatabase();

        // initialize table relations
        User.hasMany(User, { as: "creator", foreignKey: "createdby" });
        User.hasMany(Lead, { foreignKey: "createdby" });
        User.hasMany(Lead, { foreignKey: "leadby" });

        Lead.belongsTo(Stage, { as: "stageDetails", foreignKey: "stageid" });
        Lead.belongsTo(User, { as: "leadGenerator", foreignKey: "leadby" });

        Lead.belongsTo(Country, { foreignKey: "countryid", as: "country" });
        Lead.belongsTo(State, { foreignKey: "stateid", as: "state" });
        Lead.belongsTo(City, { foreignKey: "cityid", as: "city" });

        // add PageAccess data if not available
        const pageAccessData = [
            { pageid: 1, name: "Stages" },
            { pageid: 2, name: "Add Stage" },
            { pageid: 3, name: "Lead" },
            { pageid: 4, name: "Lead Processing" },
        ];

        for (const item of pageAccessData) {
            PageAccess.findOrCreate({
                where: { name: item.name },
                defaults: item,
            });
        }

        // Add dummy user data
        const userData = [
            {
                firstname: "John",
                lastname: "Doe",
                email: "john.doe@example.com",
                phonenumber: "1234567890",
                address: "1234 Elm Street, Some City, Some Country",
                workdescription: "Manager of Sales",
                usertype: 1, // Admin type user
                createdby: null, // Admin user
            },
            {
                firstname: "Jane",
                lastname: "Smith",
                email: "jane.smith@example.com",
                phonenumber: "0987654321",
                address: "5678 Oak Street, Other City, Some Country",
                workdescription: "Head of Marketing",
                usertype: 1, // Admin type user
                createdby: null, // Admin user
            },
        ];

        for (const user of userData) {
            User.findOrCreate({
                where: { email: user.email },
                defaults: user,
            });
        }
    } catch (error) {
        console.error("Error during initialization:", error);
    }
}

initialize();

export { Lead, User, Stage, Country, City, State };
