import { Lead, Stage, User } from "../models/index.js";
import xlsx from "xlsx";
import * as fs from "fs";
import { Op } from "sequelize";

export const uploadExcel = async (req, res) => {
    try {
        console.log("In Excel");
        const filePath = req.file.path;
        // Read and parse the Excel file
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(sheet);

        // Define the required fields
        const requiredFields = [
            "email", "companyname", "phonenumber", "whatsappnumber", "website",
            "countryid", "stateid", "cityid", "address", "managerusername",
            "manageremailid", "managerphonenumber", "managerwhatsappnumber",
            "instagram", "facebook", "linkedin", "remark"
        ];

        // Validate that all required fields are present in the Excel data
        for (const row of data) {
            for (const field of requiredFields) {
                if (!row.hasOwnProperty(field) || !row[field]) {
                    // If the field is missing or empty, throw an error
                    throw new Error(`Invalid format: Missing or empty required field '${field}' in the Excel file.`);
                }
            }
        }

        // Determine lead creator ID based on user type
        let leadCreatorId;
        const user = await User.findOne({ where: { userid: req.user.userid, deleteddate: null } });
        if (user.usertype == 1) {
            leadCreatorId = user.userid;
        } else {
            leadCreatorId = user.createdby;
        }

        const stages = await Stage.findAll({
            where: { userid: leadCreatorId, deleteddate: null },
            order: [["sequencenumber", "ASC"]],
        });

        if (!stages?.length) {
            return res.status(404).json({
                statusCode: 404,
                isSuccessfull: false,
                message: "Stage not defined.",
                data: null,
            });
        }

        // Preparing products for insertion
        const products = data.map((row) => ({
            email: row["email"],
            companyname: row["companyname"],
            phonenumber: row["phonenumber"],
            whatsappnumber: row["whatsappnumber"],
            website: row["website"],
            countryid: row["countryid"],
            stateid: row["stateid"],
            cityid: row["cityid"],
            address: row["address"],
            managerusername: row["managerusername"],
            manageremailid: row["manageremailid"],
            managerphonenumber: row["managerphonenumber"],
            managerwhatsappnumber: row["managerwhatsappnumber"],
            stageid: stages[0].dataValues.stageid,
            instagram: row["instagram"],
            facebook: row["facebook"],
            linkedin: row["linkedin"],
            remark: row["remark"],
            leadby: req.user.userid,
            createdby: leadCreatorId,
        }));

        // Insert data into the Lead table, checking for uniqueness and skipping errors
        const results = await Promise.all(products.map(async (product) => {
            try {
                // Check if email or manageremailid already exists in the Lead table
                const existingLead = await Lead.findOne({
                    where: {
                        [Op.or]: [
                            { email: product.email },
                            { manageremailid: product.manageremailid }
                        ],
                        deleteddate: null // Check only active leads
                    }
                });

                if (existingLead) {
                    console.log(`Skipping entry with duplicate email or manager email ID: ${product.email}, ${product.manageremailid}`);
                    return { success: false, error: "Duplicate email or manager email ID", product };
                }

                // Create the product entry
                await Lead.create(product);
                return { success: true, product };
            } catch (error) {
                if (error.name === 'SequelizeUniqueConstraintError' || error.name === 'SequelizeValidationError') {
                    // Log the error and skip the conflicting entry
                    console.error("Skipping entry due to unique constraint or validation error:", error.message);
                    return { success: false, error: error.message, product };
                } else {
                    throw error; // rethrow if it's not a unique constraint or validation error
                }
            }
        }));

        // Deleting the uploaded file
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error("Error deleting file:", err);
                return res.status(500).send("Error deleting file");
            } else {
                console.log("File deleted successfully");
            }
        });

        const successfulEntries = results.filter(result => result.success).length;
        const failedEntries = results.filter(result => !result.success).length;

        res.status(200).json({
            statusCode: 200,
            isSuccessfull: true,
            message: `Data successfully processed. ${successfulEntries} entries inserted, ${failedEntries} entries skipped.`,
        });
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ error: error.message, message: "An error occurred while inserting data." });
    }
};










// import { Lead, Stage, User, Country, State, City } from "../models/index.js";
// import xlsx from "xlsx";
// import * as fs from "fs";

// export const uploadExcel = async (req, res) => {
//     try {
//         const filePath = req.file.path;
//         const workbook = xlsx.readFile(filePath);
//         const sheetName = workbook.SheetNames[0];
//         const sheet = workbook.Sheets[sheetName];
//         const data = xlsx.utils.sheet_to_json(sheet);

//         let leadCreatorId;
//         const user = await User.findOne({ where: { userid: req.user.userid, deleteddate: null } });
//         if (user.usertype == 1) {
//             leadCreatorId = user.userid;
//         } else {
//             leadCreatorId = user.createdby;
//         }

//         const stage = await Stage.findAll({
//             where: { userid: leadCreatorId, deleteddate: null },
//             order: [["sequencenumber", "ASC"]],
//         });
//         if (!stage?.length) {
//             return res.status(404).json({
//                 statusCode: 404,
//                 isSuccessfull: false,
//                 message: "Stage not defined.",
//                 data: null,
//             });
//         }

//         const results = await Promise.all(
//             data.map(async (row) => {
//                 // Lookup country, state, and city IDs
//                 const country = await Country.findOne({ where: { name: row["countryname"] } });
//                 const state = await State.findOne({ where: { name: row["statename"], countryid: country?.id } });
//                 const city = await City.findOne({ where: { name: row["cityname"], stateid: state?.id } });

//                 // Check if any ID is missing, skip entry if so
//                 if (!country || !state || !city) {
//                     console.log(`Skipping entry due to missing country, state, or city: ${row["companyname"]}`);
//                     return { success: false, error: "Missing location data", row };
//                 }

//                 // Check for duplicate emails before creating entry
//                 const existingLead = await Lead.findOne({
//                     where: {
//                         [Op.or]: [
//                             { email: row["email"] },
//                             { manageremailid: row["manageremailid"] }
//                         ],
//                         deleteddate: null,
//                     },
//                 });

//                 if (existingLead) {
//                     console.log(`Skipping entry with duplicate email: ${row["email"]}`);
//                     return { success: false, error: "Duplicate email", row };
//                 }

//                 // If no duplicates, create lead object
//                 const product = {
//                     leadid: row["leadid"],
//                     email: row["email"],
//                     companyname: row["companyname"],
//                     phonenumber: row["phonenumber"],
//                     whatsappnumber: row["whatsappnumber"],
//                     website: row["website"],
//                     countryid: country.id,
//                     stateid: state.id,
//                     cityid: city.id,
//                     address: row["address"],
//                     managerusername: row["managerusername"],
//                     manageremailid: row["manageremailid"],
//                     managerphonenumber: row["managerphonenumber"],
//                     managerwhatsappnumber: row["managerwhatsappnumber"],
//                     stageid: stage[0].dataValues.stageid,
//                     instagram: row["instagram"],
//                     facebook: row["facebook"],
//                     linkedin: row["linkedin"],
//                     remark: row["remark"],
//                     createdby: req.user.userid,
//                     leadby: leadCreatorId,
//                     updatedby: row["updatedby"],
//                     updateddate: row["updateddate"],
//                     deletedby: row["deletedby"],
//                     deleteddate: row["deleteddate"],
//                 };

//                 // Insert lead record into the database
//                 await Lead.create(product);
//                 return { success: true, row };
//             })
//         );

//         // Delete the uploaded file after processing
//         fs.unlink(filePath, (err) => {
//             if (err) {
//                 console.error("Error deleting file:", err);
//                 return res.status(500).send("Error deleting file");
//             } else {
//                 console.log("File deleted successfully");
//             }
//         });

//         const successfulEntries = results.filter(result => result.success).length;
//         const failedEntries = results.length - successfulEntries;

//         res.status(200).json({
//             statusCode: 200,
//             isSuccessfull: true,
//             message: `Data successfully processed. ${successfulEntries} entries inserted, ${failedEntries} entries skipped.`,
//         });
//     } catch (error) {
//         console.error("Error occurred:", error);
//         res.status(500).json({ error, message: "An error occurred while inserting data." });
//     }
// };
