import { Lead, Stage, User } from "../models/index.js";
import xlsx from "xlsx";
import * as fs from "fs";

export const uploadExcel = async (req, res) => {
    try {
        const filePath = req.file.path;
        // Read and parse the Excel file
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(sheet);
        // Insert the parsed data into the Product table
        // getting leadid according to user id.user
        let leadCreatorId;
        const user = await User.findOne({ where: { userid: req.user.userid, deleteddate: null } });
        if (user.usertype == 1) {
            leadCreatorId = user.userid;
        } else {
            leadCreatorId = user.createdby;
        }
        const stage = await Stage.findAll({
            where: { userid: leadCreatorId, deleteddate: null },
            order: [["sequencenumber", "ASC"]],
        });
        if (!stage?.length) {
            return res.status(404).json({
                statusCode: 404,
                isSuccessfull: false,
                message: "Stage not defined.",
                data: null,
            });
        }

        const products = data.map((row) => {
            return {
                leadid: row["leadid"],
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
                stageid: stage[0].dataValues.stageid,
                instagram: row["instagram"],
                facebook: row["facebook"],
                linkedin: row["linkedin"],
                remark: row["remark"],
                createdby: req.user.userid,
                leadby: leadCreatorId,
                updatedby: row["updatedby"],
                updateddate: row["updateddate"],
                deletedby: row["deletedby"],
                deleteddate: row["deleteddate"],
            };
        });

        await Lead.bulkCreate(products);
        // deleting uploaded file
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error("Error deleting file:", err);
                res.status(500).send("Error deleting file");
            } else {
                console.log("File deleted successfully");
                res.send("File uploaded and deleted successfully");
            }
        });

        res.status(200).json({
            statusCode: 200,
            isSuccessfull: true,
            message: "Data successfully inserted into the Product table.",
        });
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ error, message: "An error occurred while inserting data." });
    }
};
