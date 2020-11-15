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
      name: 'menuItems',
      title: 'Menu Items',
      type: 'array',
      of: [
        {
          name: 'menuItem',
          title: 'Menu Item',
          type: 'menuItem',
        },
      ],
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    },
  ],
};