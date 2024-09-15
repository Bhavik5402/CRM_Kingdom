import { User, Lead, Stage, City, State, Country, LeadHistory } from "../models/index.js";
import { Op } from "sequelize";
export const CreateLead = async (req, res) => {
    try {
        const { lead } = req.body;
        // getting leadid according to user id.user
        let leadCreatorId;
        const user = await User.findOne({ where: { userid: req.user.userid, deleteddate: null } });
        if (user.usertype == 1) {
            leadCreatorId = user.userid;
        } else {
            leadCreatorId = user.createdby;
        }

        const isExist = await Lead.findOne({ where: { email: lead.email } });
        if (isExist) {
            return res.status(400).json({
                statusCode: 400,
                isSuccessfull: false,
                message: "This email is already exist",
            });
        }

        // getting default stageId from user
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

        console.log("Lead - ", lead);

        //  create new lead record
        const newLead = await Lead.create({
            email: lead?.email,
            companyname: lead?.companyname,
            phonenumber: lead?.phonenumber,
            whatsappnumber: lead?.whatsappnumber,
            website: lead?.website,
            country: lead?.country,
            state: lead?.state,
            city: lead?.city,
            countryid: lead?.countryid,
            stateid: lead?.stateid,
            cityid: lead?.cityid,
            address: lead?.address,
            managerusername: lead?.managerusername,
            manageremailid: lead?.manageremailid,
            instagram: lead?.instagram,
            facebook: lead?.facebook,
            linkedin: lead?.linkedin,
            remark: lead?.remark,
            createdby: leadCreatorId,
            managerphonenumber: lead?.managerphonenumber,
            managerwhatsappnumber: lead?.managerwhatsappnumber,
            stageid: stage[0].dataValues.stageid,
            leadby: req.user.userid, // userid of person who is creating the lead
        });
        return res.status(200).json({
            statusCode: 200,
            isSuccessfull: true,
            message: "Lead created successfully",
            data: newLead,
        });
    } catch (error) {
        console.log("error: ", error);
        return res.status(500).json({
            statusCode: 500,
            isSuccessfull: false,
            message: "Internal server error - Create Lead",
            data: null,
        });
    }
};

export const EditLead = async (req, res) => {
    try {
        const { updatelead } = req.body;
        const lead = await Lead.findOne({
            where: {
                leadid: updatelead.leadid,
            },
        });
        if (!lead) {
            return res.status(404).json({
                statusCode: 404,
                isSuccessfull: false,
                message: "Lead not found",
            });
        }
        // Check if the email is already in use by another user
        if (updatelead.email && updatelead.email !== lead.email) {
            const isEmailExist = await Lead.findOne({ where: { email: body?.email } });
            if (isEmailExist) {
                return res.status(400).json({
                    statusCode: 400,
                    isSuccessfull: false,
                    message: "This email is already in use for another lead",
                });
            }
        }
        console.log("Before Update ");
        const updatedLead = await lead.update({
            email: updatelead?.email || lead?.email,
            companyname: updatelead?.companyname || lead?.companyname,
            phonenumber: updatelead?.phonenumber || lead?.phonenumber,
            whatsappnumber: updatelead?.whatsappnumber || lead?.whatsappnumber,
            website: updatelead?.website || lead?.website,
            country: updatelead?.country || lead?.country,
            state: updatelead?.state || lead.state,
            city: updatelead?.city || lead?.city,
            address: updatelead?.address || lead?.address,
            managerusername: updatelead?.managerusername || lead?.managerusername,
            manageremailid: updatelead?.manageremailid || lead?.manageremailid,
            instagram: updatelead?.instagram || lead?.instagram,
            facebook: updatelead?.facebook || lead?.facebook,
            linkedin: updatelead?.linkedin || lead?.linkedin,
            remark: updatelead?.remarks || lead?.remark,
            updateddate: new Date(),
            updatedby: req.user.userid,
            managerphonenumber: updatelead?.managerphonenumber || lead?.managerphonenumber,
            managerwhatsappnumber: updatelead?.managerwhatsappnumber || lead?.managerwhatsappnumber,
            stageid: updatelead?.stageid || lead?.stageid,
        });
        return res.status(200).json({
            statusCode: 200,
            isSuccessfull: true,
            message: "Lead updated successfully",
            data: updatedLead,
        });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            isSuccessfull: false,
            message: "Internal server error - Edit Lead",
            data: null,
        });
    }
};
export const DeleteLead = async (req, res) => {
    try {
        const { body } = req;
        const { leadId } = body;

        const user = await User.findOne({ where: { userid: req.user.userid, deleteddate: null } });
        const lead = await Lead.findOne({
            where: {
                leadid: leadId,
                [Op.or]: [
                    {
                        createdby: user.userid,
                    },
                    {
                        createdby: user.createdby,
                    },
                ],
            },
        });
        console.log("Lead - ", lead);
        if (!lead) {
            return res.status(404).json({
                statusCode: 404,
                isSuccessfull: false,
                message: "Lead not found",
            });
        }

        await lead.update({
            deleteddate: new Date(),
            deletedby: req.user.userid,
        });
        return res.status(200).json({
            statusCode: 200,
            isSuccessfull: true,
            message: "Lead deleted successfully",
            data: {},
        });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            isSuccessfull: false,
            message: "Internal server error - Delete Lead",
            data: null,
        });
    }
};
export const GetLeadById = async (req, res) => {
    try {
        const { leadId } = req.body;
        const lead = await Lead.findOne({
            where: {
                leadid: leadId,
            },
        });
        if (!lead) {
            return res.status(404).json({
                statusCode: 404,
                isSuccessfull: false,
                message: "Lead not found",
            });
        }

        const leadhistory = await LeadHistory.findAll({
            where: {
                leadid: leadId,
            },
            attributes: ["createddate", "remark"],
            include: [
                {
                    model: User,
                    attributes: ["firstname", "lastname"], // Include username from User
                },
                {
                    model: Stage,
                    as: "previouseStage",
                    attributes: ["name"], // Include stageName as OldStageName
                },
                {
                    model: Stage,
                    as: "newState",
                    attributes: ["name"], // Include stageName as NewStageName
                },
            ],
        });

        const history = leadhistory.map((l) => ({
            username: l.User.firstname + " " + l.User.lastname,
            previouseStage: l.previouseStage.name,
            newState: l.newState.name,
            dateChanged: l.createddate,
            remark: l.remark,
        }));

        const leadbyUser = await User.findOne({
            where: {
                userid: lead.dataValues.leadby,
            },
        });

        const sourcebyUser = await User.findOne({
            where: {
                userid: lead.dataValues.createdby,
            },
        });

        const returnData = {
            ...lead.dataValues,
            leadby: leadbyUser.dataValues.firstname + " " + leadbyUser.dataValues.lastname,
            sourceby: sourcebyUser.dataValues.firstname + " " + sourcebyUser.dataValues.lastname,
            history: history,
        };

        console.log("Lead is -", lead);
        return res.status(200).json({
            statusCode: 200,
            isSuccessfull: true,
            message: "Lead retrieved successfully",
            data: returnData,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            statusCode: 500,
            isSuccessfull: false,
            message: "Internal server error - Get Lead By Id",
            data: null,
        });
    }
};
export const GetAllLeads = async (req, res) => {
    try {
        const user = req.user;
        const { pageSize, pageIndex, sortColumn, sortDirection, filterObj } = req.body;

        const limit = pageSize || 10;
        const offset = pageIndex ? pageIndex * limit : 0;
        const order = [[sortColumn || "createddate", sortDirection || "DESC"]];

        console.log("In Lead controller");

        // Where clause base setup
        const whereCondition = {
            deleteddate: null,
            createdby: user.usertype == 2 ? user.createdby : user.userid,
        };

        // Apply additional filters from filterObj
        if (filterObj) {
            const { stageid, countryid,country, leadby, ...restFilters } = filterObj;

            // Adding stageid filter in where clause
            if (stageid) {
                whereCondition.stageid = stageid;
            }

            // Adding countryid filter in where clause
            if (country) {
                whereCondition.country = {
                    [Op.iLike]: `%${country}%`
                };
            }
            // if (countryid) {
            //     whereCondition.countryid = countryid;
            // }

            // Adding leadby filter in where clause
            if (leadby) {
                whereCondition.leadby = leadby;
            }

            // Adding remaining filters from filterObj (e.g., companyname, etc.)
            for (const key in restFilters) {
                if (restFilters[key]) {
                    whereCondition[key] = {
                        [Op.iLike]: `%${restFilters[key]}%`, // Enable partial and case-insensitive matching
                    };
                }
            }
        }

        console.log("After Filter Obj", whereCondition);

        const result = await Lead.findAndCountAll({
            where: whereCondition,
            order,
            limit,
            offset,
            include: [
                {
                    model: User,
                    as: "leadGenerator",
                },
                {
                    model: Stage,
                    as: "stageDetails",
                    where: {
                        deleteddate: null, // Only include stages that are not deleted
                    },
                }
            ],
        });

        return res.json({
            statusCode: 200,
            isSuccessfull: true,
            message: "success",
            data: result,
        });
    } catch (error) {
        console.log("error: ", error);
        return res.status(500).json({
            statusCode: 500,
            isSuccessfull: false,
            message: "Internal server error - Get All Leads",
            data: null,
        });
    }
};

export const GetAllCountries = async (req, res) => {
    try {
        const countries = await Country.findAll({
            attributes: ["countryid", "name"],
            order: [["name", "ASC"]], // Optionally order by country name
        });

        if (!countries || countries.length === 0) {
            return res.status(404).json({
                statusCode: 404,
                isSuccessfull: false,
                message: "No countries found",
                data: [],
            });
        }

        return res.status(200).json({
            statusCode: 200,
            isSuccessfull: true,
            message: "Countries retrieved successfully",
            data: countries,
        });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            isSuccessfull: false,
            message: "Internal server error - Get All Countries",
            data: null,
        });
    }
};

export const GetStatesByCountry = async (req, res) => {
    try {
        const { countryid } = req.body;

        const states = await State.findAll({
            where: { countryid },
            attributes: ["stateid", "name"],
            order: [["name", "ASC"]], // Optionally order by state name
        });

        if (!states || states.length === 0) {
            return res.status(404).json({
                statusCode: 404,
                isSuccessfull: false,
                message: "No states found for the specified country",
                data: [],
            });
        }

        return res.status(200).json({
            statusCode: 200,
            isSuccessfull: true,
            message: "States retrieved successfully",
            data: states,
        });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            isSuccessfull: false,
            message: "Internal server error - Get States By Country",
            data: null,
        });
    }
};

export const GetCitiesByState = async (req, res) => {
    try {
        const { stateid } = req.body;

        const cities = await City.findAll({
            where: { stateid },
            attributes: ["cityid", "name"],
            order: [["name", "ASC"]], // Optionally order by city name
        });

        if (!cities || cities.length === 0) {
            return res.status(404).json({
                statusCode: 404,
                isSuccessfull: false,
                message: "No cities found for the specified state",
                data: [],
            });
        }

        return res.status(200).json({
            statusCode: 200,
            isSuccessfull: true,
            message: "Cities retrieved successfully",
            data: cities,
        });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            isSuccessfull: false,
            message: "Internal server error - Get Cities By State",
            data: null,
        });
    }
};

export const ChangeLeadStage = async (req, res) => {
    try {
        const { leadId, newStageId, remarks } = req.body;
        const user = req.user;

        // Fetch the lead by ID
        const lead = await Lead.findOne({
            where: { leadid: leadId, deleteddate: null },
        });

        if (!lead) {
            return res.status(404).json({
                statusCode: 404,
                isSuccessfull: false,
                message: "Lead not found",
            });
        }

        // Check if the new stage exists
        const stage = await Stage.findOne({
            where: { stageid: newStageId, deleteddate: null },
        });

        if (!stage) {
            return res.status(404).json({
                statusCode: 404,
                isSuccessfull: false,
                message: "Stage not found",
            });
        }

        // add entry in lead history table for stage change
        const leadHistory = await LeadHistory.create({
            leadid: leadId,
            userid: user.userid,
            oldstageid: lead.stageid,
            newstageid: newStageId,
            remark: remarks,
        });

        // Update the stage of the lead
        lead.stageid = newStageId;
        await lead.save();

        return res.status(200).json({
            statusCode: 200,
            isSuccessfull: true,
            message: "Lead stage updated successfully",
            data: lead,
        });
    } catch (error) {
        console.log("error: ", error);
        return res.status(500).json({
            statusCode: 500,
            isSuccessfull: false,
            message: "Internal server error - Change Lead Stage",
            data: null,
        });
    }
};
