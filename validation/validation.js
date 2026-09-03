import { z } from "zod";

const Location = z.object({
    // required fields
    name: z.string().min(2, "Name must be at least 2 characters"),
    lat: z.number().min(-90, "Latitude must be at least -90").max(90, "Latitude must be at most 90"),
    lon: z.number().min(-180, "Longitude must be at least -180").max(180, "Longitude must be at most 180"),

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

export {
    Location, 
    validateData
};
