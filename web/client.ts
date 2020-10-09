import sanityClient from '@sanity/client';

export default sanityClient({
  projectId: '3n6cqkfs',
  dataset: 'production',
  useCdn: false,
});
