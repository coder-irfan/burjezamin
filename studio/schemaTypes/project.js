export default {
  name: 'project',
  title: 'Projects',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Project Title',
      type: 'object',
      fields: [
        { name: 'en', title: 'English Title', type: 'string' },
        { name: 'fa', title: 'Dari Title', type: 'string' },
      ],
    },
    {
      name: 'description',
      title: 'Project Description',
      type: 'object',
      fields: [
        { name: 'en', title: 'English Description', type: 'text' },
        { name: 'fa', title: 'Dari Description', type: 'text' },
      ],
    },
    {
      name: 'image',
      title: 'Project Main Image',
      type: 'image',
      options: {
        hotspot: true, 
      },
    },
  ],
}