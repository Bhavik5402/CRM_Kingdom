import Lead from "../models/Lead.js";
import User from "../models/Users.js";
import { Op } from "sequelize";
export const CreateLead = async (req, res) => {
    try {
        const { body } = req;

        // getting leadid according to user id.user
        let leadCreatorId;
        const user = await User.findOne({ where: { userid: req.user.userid, deleteddate: null } });
        if (user.usertype == 1) {
            leadCreatorId = user.userid;
        } else {
            leadCreatorId = user.createdby;
        }

        const isExist = await Lead.findOne({ where: { email: body.email } });
        if (isExist) {
            return res.status(400).json({
                statusCode: 400,
                isSuccessfull: false,
                message: "This email is already exist",
            });
        }

        //  create new lead record
        const newLead = await Lead.create({
            email: body?.email,
            companyname: body?.companyname,
            phonenumber: body?.phonenumber,
            whatsappnumber: body?.whatsappnumber,
            website: body?.website,
            countryid: body?.countryid,
            stateid: body?.stateid,
            cityid: body?.cityid,
            address: body?.address,
            managerusername: body?.managerusername,
            manageremailid: body?.manageremailid,
            instagram: body?.instagram,
            facebook: body?.facebook,
            linkedin: body?.linkedin,
            remark: body?.remark,
            createdby: leadCreatorId,
        });
        return res.status(200).json({
            statusCode: 200,
            isSuccessfull: true,
            message: "Lead created successfully",
            data: newLead,
        });
    } catch (error) {
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
            email: body.email || lead?.email,
            companyname: body?.companyname || lead?.companyname,
            phonenumber: body?.phonenumber || lead?.phonenumber,
            whatsappnumber: body?.whatsappnumber || lead.whatsappnumber,
            website: body?.website || lead?.website,
            countryid: body?.countryid || lead?.countryid,
            stateid: body?.stateid || lead.stateid,
            cityid: body?.cityid || lead?.cityid,
            address: body?.address || lead?.address,
            managerusername: body?.managerusername || lead?.managerusername,
            manageremailid: body?.manageremailid || lead?.manageremailid,
            instagram: body?.instagram || lead?.instagram,
            facebook: body?.facebook || lead?.facebook,
            linkedin: body?.linkedin || lead?.linkedin,
            remark: body?.remark || lead?.remark,
            updateddate: new Date(),
            updatedby: req.user.userid,
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
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            isSuccessfull: false,
            message: "Internal server error - Get All Leads",
            data: null,
        });
    }
};
