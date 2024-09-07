import User from "./Users.js";
import Lead from "./Lead.js";
import Stage from "./Stage.js";
import Country from "./Country.js";
import State from "./State.js";
import City from "./City.js";
import PageAccess from "./PageAccess.js";

User.hasMany(User, { as: "creator", foreignKey: "createdby" });
User.hasMany(Lead, { foreignKey: "createdby" });
User.hasMany(Lead, { foreignKey: "leadby" });

Lead.belongsTo(Stage, { as: "stageDetails", foreignKey: "stageid" });
Lead.belongsTo(User, { as: "leadGenerator", foreignKey: "leadby" });

Lead.belongsTo(Country, { foreignKey: 'countryid', as: 'country' });
Lead.belongsTo(State, { foreignKey: 'stateid', as: 'state' });
Lead.belongsTo(City, { foreignKey: 'cityid', as: 'city' });

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
    }
];

for (const user of userData) {
    User.findOrCreate({
        where: { email: user.email },
        defaults: user,
    });
}

const countryData = [{ countryid: 1, name: "India" }];

for (const item of countryData) {
    Country.findOrCreate({
        where: { name: item.name },
        defaults: item,
    });
}

const stateData = [
    { stateid: 1, name: "Maharashtra", iso2: "MH", countryid: 1 },
    { stateid: 2, name: "Karnataka", iso2: "KA", countryid: 1 },
];

for (const item of stateData) {
    State.findOrCreate({
        where: { name: item.name },
        defaults: item,
    });
}

const cityData = [
    { cityid: 1, name: "Mumbai", stateid: 1 },
    { cityid: 2, name: "Pune", stateid: 1 },
    { cityid: 3, name: "Bangalore", stateid: 2 },
    { cityid: 4, name: "Mysore", stateid: 2 },
];

for (const item of cityData) {
    City.findOrCreate({
        where: { name: item.name },
        defaults: item,
    });
}

export { Lead, User, Stage, Country, City, State };
