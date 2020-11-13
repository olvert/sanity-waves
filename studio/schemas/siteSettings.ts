export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  initialValue: (): unknown => ({
    publishedAt: new Date().toISOString(),
  }),
  fields: [
    {
      name: 'siteTitle',
      title: 'Site title',
      type: 'string',
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    },
  ],
};
