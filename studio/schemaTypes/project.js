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
        {name: 'en', title: 'English Title', type: 'string'},
        {name: 'fa', title: 'Dari Title', type: 'string'},
      ],
    },
    {
      name: 'slug',
      title: 'Slug (URL Identifier)',
      type: 'slug',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Project Description',
      type: 'object',
      fields: [
        {name: 'en', title: 'English Description', type: 'text'},
        {name: 'fa', title: 'Dari Description', type: 'text'},
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
    {
      name: 'gallery',
      title: 'Project Gallery Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    },
  ],
}
