import { z } from "zod";

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

})