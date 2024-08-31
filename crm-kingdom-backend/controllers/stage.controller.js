import { Op } from "sequelize";
import Stage from "../models/Stage.js";

export const GetAllStages = async (req, res) => {
    try {
        const { pageSize, pageIndex, sortColumn, sortDirection, filterObj } = req.body;
        const user = req.user;
        const limit = pageSize || 10;
        const offset = pageIndex ? pageIndex * limit : 0;
        const order = [[sortColumn || "sequencenumber", sortDirection || "ASC"]];

        // Construct the where clause based on filterObj
        let whereClause = {
            deleteddate: null,
            userid: user.usertype == 2 ? user.createdby : user.userid,
        };

        if (filterObj) {
            for (const key in filterObj) {
                if (filterObj[key]) {
                    whereClause[key] = {
                        [Op.iLike]: `%${filterObj[key]}%`, // Enable partial and case-insensitive matching
                    };
                }
            }
        }

        console.log("Where Clause - ", whereClause);

        const stages = await Stage.findAndCountAll({
            where: whereClause,
            limit, // Pagination: limit number of records
            offset, // Pagination: skip these many records
            order, // Sorting: order by specified column and direction
        });

        return res.status(200).json({
            statusCode: 200,
            isSuccessfull: true,
            message: "Success",
            data: stages,
        });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            isSuccessfull: false,
            message: "Internal server error - Get All Stages.",
            data: null,
        });
    }
};

export const AddStage = async (req, res) => {
    try {
        const { stage } = req.body;
        const user = req.user;
        if (stage) {
            const userStages = await Stage.findAll({
                where: {
                    deleteddate: null,
                    userid: user.usertype == 2 ? user.createdby : user.userid,
                },
            });
            console.log("User Stages - ", userStages.length);
            if (userStages.length > 0) {
                const isNameExist = userStages.find((x) => x.name == stage.name);
                if (isNameExist) {
                    return res.status(404).json({
                        statusCode: 404,
                        isSuccessfull: false,
                        message: "Stage Name is already exist.",
                        data: null,
                    });
                }
                const isSequnceNumberExist = userStages.find(
                    (x) => x.sequencenumber == stage.sequence
                );
                if (isSequnceNumberExist) {
                    return res.status(404).json({
                        statusCode: 404,
                        isSuccessfull: false,
                        message: "Sequence Number is already exist.",
                        data: null,
                    });
                }
                const maxSequenceNumber = userStages[userStages.length - 1].sequencenumber;
                console.log("max sequnce number ", maxSequenceNumber);
                console.log("Current sequence number - ", stage.sequence);
                if (stage.sequence > maxSequenceNumber + 1) {
                    return res.status(404).json({
                        statusCode: 404,
                        isSuccessfull: false,
                        message: `Please add stage with sequence number ${
                            maxSequenceNumber + 1
                        } before adding this one.`,
                        data: null,
                    });
                }
            } else if (stage.sequence > 1) {
                return res.status(404).json({
                    statusCode: 404,
                    isSuccessfull: false,
                    message: `Please add stage with sequence number 1 before adding this one.`,
                    data: null,
                });
            }
            const newStage = await Stage.create({
                userid: user.usertype == 2 ? user.createdby : user.userid,
                name: stage.name,
                color: stage.color,
                sequencenumber: stage.sequence,
                description: stage.description,
            });
            return res.status(200).json({
                statusCode: 200,
                isSuccessfull: true,
                message: "Stage is added successfully.",
                data: newStage,
            });
        }
        return res.status(404).json({
            statusCode: 404,
            isSuccessfull: false,
            message: "Something went wrong.",
        });
    } catch (error) {
        const isValid = error.toString().includes("Validation");
        if (isValid) {
            return res.status(404).json({
                statusCode: 404,
                isSuccessfull: false,
                message: "Validation error occurred",
                data: null,
            });
        } else {
            console.log("Server Error - ", error);
            return res.status(500).json({
                statusCode: 500,
                isSuccessfull: false,
                message: "Internal server error - Create User.",
                data: null,
            });
        }
    }
};

export const EditStage = async (req, res) => {
    try {
        const { stage } = req.body;
        console.log("Stage", stage);
        const { stageId } = stage;

        const user = req.user;
        if (!stageId || !stage) {
            return res.status(404).json({
                statusCode: 404,
                isSuccessfull: false,
                message: "Stage ID and stage data must be provided.",
            });
        }

        // Find the existing stage
        const existingStage = await Stage.findOne({
            where: {
                stageid: stageId,
                deleteddate: null,
                userid: user.usertype == 2 ? user.createdby : user.userid,
            },
        });

        if (!existingStage) {
            return res.status(404).json({
                statusCode: 404,
                isSuccessfull: false,
                message: "Stage not found.",
            });
        }

        // Check if the stage name or sequence number already exists
        const userStages = await Stage.findAll({
            where: { deleteddate: null, userid: existingStage.userid },
        });
        console.log("Stage - ", stage);
        console.log("UserStages - ", userStages);
        const isNameExist = userStages.find(
            (x) => x.name === stage.name && x.stageid !== Number(stageId)
        );
        const isSequnceNumberExist = userStages.find(
            (x) => x.sequencenumber === stage.sequence && x.stageid !== Number(stageId)
        );

        const maxSequenceNumber = userStages[userStages.length - 1].sequencenumber;

        if (isNameExist) {
            return res.status(404).json({
                statusCode: 404,
                isSuccessfull: false,
                message: "Stage Name is already exist.",
                data: null,
            });
        }

        if (isSequnceNumberExist) {
            return res.status(404).json({
                statusCode: 404,
                isSuccessfull: false,
                message: "Sequence Number is already exist.",
                data: null,
            });
        }

        if (stage.sequenceNumber > maxSequenceNumber + 1) {
            return res.status(404).json({
                statusCode: 404,
                isSuccessfull: false,
                message: `Please add stage with sequence number ${
                    maxSequenceNumber + 1
                } before adding this one.`,
                data: null,
            });
        }

        // Update the stage
        const updatedStage = await existingStage.update({
            name: stage.name || existingStage.name,
            color: stage.color || existingStage.color,
            sequencenumber: stage.sequence || existingStage.sequencenumber,
            description: stage.description || existingStage.description,
            updateddate: new Date(),
        });

        return res.status(200).json({
            statusCode: 200,
            isSuccessfull: true,
            message: "Stage updated successfully.",
            data: updatedStage,
        });
    } catch (error) {
        console.log("Server Error - ", error);
        const isValid = error.toString().includes("Validation");
        if (isValid) {
            return res.status(404).json({
                statusCode: 404,
                isSuccessfull: false,
                message: "Validation error occurred",
                data: null,
            });
        } else {
            return res.status(500).json({
                statusCode: 500,
                isSuccessfull: false,
                message: "Internal server error - Edit Stage.",
                data: null,
            });
        }
    }
};

export const DeleteStage = async (req, res) => {
    try {
        const { stageId } = req.body;
        const user = req.user;
        console.log("StageIddd - ", stageId);
        if (!stageId) {
            return res.status(400).json({
                statusCode: 400,
                isSuccessfull: false,
                message: "Stage ID must be provided.",
            });
        }

        // Find the stage
        const stage = await Stage.findOne({
            where: {
                stageid: stageId,
                deleteddate: null,
                userid: user.usertype == 2 ? user.createdby : user.userid,
            },
        });

        if (!stage) {
            return res.status(404).json({
                statusCode: 404,
                isSuccessfull: false,
                message: "Stage not found.",
            });
        }

        // Mark the stage as deleted
        await stage.update({
            deleteddate: new Date(),
        });

        return res.status(200).json({
            statusCode: 200,
            isSuccessfull: true,
            message: "Stage deleted successfully.",
            data: null,
        });
    } catch (error) {
        console.log("Server Error - ", error);
        return res.status(500).json({
            statusCode: 500,
            isSuccessfull: false,
            message: "Internal server error - Delete Stage.",
            data: null,
        });
    }
};

export const GetStageById = async (req, res) => {
    try {
        const { stageId } = req.body;
        const user = req.user;

        if (!stageId) {
            return res.status(404).json({
                statusCode: 404,
                isSuccessfull: false,
                message: "Stage ID must be provided.",
            });
        }

        // Find the stage
        const stage = await Stage.findOne({
            where: {
                stageid: stageId,
                deleteddate: null,
                userid: user.usertype == 2 ? user.createdby : user.userid,
            },
        });

        if (!stage) {
            return res.status(404).json({
                statusCode: 404,
                isSuccessfull: false,
                message: "Stage not found.",
            });
        }

        return res.status(200).json({
            statusCode: 200,
            isSuccessfull: true,
            message: "Stage retrieved successfully.",
            data: stage,
        });
    } catch (error) {
        console.log("Server Error - ", error);
        return res.status(500).json({
            statusCode: 500,
            isSuccessfull: false,
            message: "Internal server error - Get Stage By ID.",
            data: null,
        });
    }
};

export const GetAllStagesByUserId = async (req, res) => {
    try {
        const { userid } = req.body; // Get userid from the request body
        const user = req.user;

        if (!userid) {
            return res.status(400).json({
                statusCode: 400,
                isSuccessfull: false,
                message: "User ID must be provided.",
                data: null,
            });
        }

        // Find stages by userid
        const stages = await Stage.findAll({
            where: {
                userid: user.usertype == 1 ? user.userid : user.createdby, // Filter stages by the provided userid
                deleteddate: null, // Optionally filter out deleted stages
            },
            order: [["sequencenumber", "ASC"]], // Optional: Order stages by sequence number
        });

        if (!stages.length) {
            return res.status(404).json({
                statusCode: 404,
                isSuccessfull: false,
                message: "No stages found for the provided User ID.",
                data: null,
            });
        }

        return res.status(200).json({
            statusCode: 200,
            isSuccessfull: true,
            message: "Stages retrieved successfully.",
            data: stages,
        });
    } catch (error) {
        console.log("Exception in GetAllStagesByUserId || ", error);
        return res.status(500).json({
            statusCode: 500,
            isSuccessfull: false,
            message: "Internal server error - Get All Stages By User ID.",
            data: null,
        });
    }
};
