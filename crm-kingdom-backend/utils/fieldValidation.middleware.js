export const fieldValidatorMiddleware = (requiredFields) => {
    return (req, res, next) => {
        const missingFields = [];

        requiredFields.forEach((field) => {
            if (!req.body[field]) {
                missingFields.push(field);
            }
        });

        if (missingFields.length > 0) {
            return res.status(400).json({
                statusCode: 400,
                isSuccessfull: false,
                message: `Missing field(s) are : ${missingFields.join(", ")}`,
                data: null,
            });
        }

        next();
    };
};
