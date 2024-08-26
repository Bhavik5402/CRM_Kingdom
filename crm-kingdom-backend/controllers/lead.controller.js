import Lead from "../models/Lead.js";
import User from "../models/Users.js";
import Stage from "../models/Stage.js";
import { Op } from "sequelize";
export const CreateLead = async (req, res) => {
    try {
        console.log("hello create lead");
        const { lead } = req.body;
        console.log("Lead obj - ",lead);
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
        //  create new lead record
        const newLead = await Lead.create({
            email: lead?.email,
            companyname: lead?.companyname,
            phonenumber: lead?.phonenumber,
            whatsappnumber: lead?.whatsappnumber,
            website: lead?.website,
            countryid: 1,
            stateid: 1,
            cityid: 1,
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
        console.log("hello edit lead");
        console.log("updated soc",req.body);
        const {updatelead } = req.body;
        const { leadId } = updatelead.leadid;
        
        console.log("lead id",leadId);
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
        if (!lead) {
            return res.status(404).json({
                statusCode: 404,
                isSuccessfull: false,
                message: "Lead not found",
            });
        }
        // Check if the email is already in use by another user
        if (body.email && body.email !== lead.email) {
            const isEmailExist = await Lead.findOne({ where: { email: body?.email } });
            if (isEmailExist) {
                return res.status(400).json({
                    statusCode: 400,
                    isSuccessfull: false,
                    message: "This email is already in use for another lead",
                });
            }
        }

        const updatedLead = await lead.update({
            email: updatelead?.email || lead?.email,
            companyname: updatelead?.companyname || lead?.companyname,
            phonenumber: updatelead?.phonenumber || lead?.phonenumber,
            whatsappnumber: updatelead?.whatsappnumber || lead?.whatsappnumber,
            website: updatelead?.website || lead?.website,
            // countryid: updatelead?.countryid || lead?.countryid,
            // stateid: updatelead?.stateid || lead.stateid,
            // cityid: updatelead?.cityid || lead?.cityid,
            countryid: 1,
            stateid: 1,
            cityid: 1,
            address: updatelead?.address || lead?.address,
            managerusername: updatelead?.managerusername || lead?.managerusername,
            manageremailid: updatelead?.manageremailid || lead?.manageremailid,
            instagram: updatelead?.instagram || lead?.instagram,
            facebook: updatelead?.facebook || lead?.facebook,
            linkedin: updatelead?.linkedin || lead?.linkedin,
            remark: updatelead?.remark || lead?.remark,
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
        if (!lead) {
            return res.status(404).json({
                statusCode: 404,
                isSuccessfull: false,
                message: "Lead not found",
            });
        }
        return res.status(200).json({
            statusCode: 200,
            isSuccessfull: true,
            message: "Lead retrieved successfully",
            data: lead,
        });
    } catch (error) {
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
        console.log("req.body: ", req.body);
        const user = req.user;
        const { pageSize, pageIndex, sortColumn, sortDirection, search } = req.body;
        const limit = pageSize || 10;
        const offset = pageIndex ? pageIndex * limit : 0;
        const order = [[sortColumn || "leadid", sortDirection || "DESC"]];

        let searchObject = undefined;
        if (search) {
            searchObject = [
                { companyname: { [Op.iLike]: `%${search}%` } },
                { email: { [Op.iLike]: `%${search}%` } },
                { countryid: { [Op.iLike]: `%${search}%` } },
            ];
        }
        console.log("user: ", user);
        const where = {
            deleteddate: null,
            createdby: user.usertype == 2 ? user.createdby : user.userid,
            [Op.or]: searchObject,
        };
        const result = await Lead.findAndCountAll({
            where,
            order,
            limit,
            offset,
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
