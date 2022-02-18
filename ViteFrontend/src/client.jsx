import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2021-11-16',
  useCdn: false, // `false` if you want to ensure fresh data
  token: import.meta.env.VITE_SANITY_TOKEN,
});


// from Sanity doc
const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);