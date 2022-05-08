import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// use command line npx @sanity/cli manage to access sanity dashboard
export const client = sanityClient({
    projectId: "s35b7guh",
    dataset: "production",
    apiVersion: "2022-05-08",
    useCdn: "true",
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
