import {defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'Title',
      type: 'string',
    }),
    defineField({
        name: 'slug',
        type: 'string',
      }),
    defineField({
        name: 'body',
        type: 'array',
        of: [{type: 'block'}],
      }),
    defineField({
        name: 'mainImage',
        type: 'image',
      }),
    defineField({
        name: 'publishedAt',
        type: 'datetime',
      }),
  ],
})