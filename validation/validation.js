const { z } = require("zod");

const Location = z.object({
    // required fields
    name: z.string(),
    lat: z.number(),
    lon: z.number(),

    // optional fields
    id: z.string().nullish(),
    slug: z.string().nullish(),
    city: z.string().nullish(),
    state: z.string().nullish(),
    country: z.string().nullish(),
    telephone: z.string().nullish(),
    source: z.string().nullish(),

    // optional formatted fields
    email: z.union([z.string().email(), z.literal('')]).nullish(),
    website: z.union([z.string().url(), z.literal('')]).nullish(),
});

const validateData = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                error: 'Validation failed',
                details: result.error.errors
            });
        }

        req.body = result.data;
        next();
    };
};

module.exports = {
    Location, 
    validateData
};