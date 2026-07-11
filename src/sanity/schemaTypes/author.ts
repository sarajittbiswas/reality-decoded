import { defineType, defineField } from 'sanity'

export const author = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({ 
      name: 'role', 
      title: 'Role / Credit', 
      type: 'string', 
      description: 'e.g. Lead Investigator, Subscriber, Guest' 
    }),
    defineField({ name: 'image', title: 'Avatar', type: 'image', options: { hotspot: true } }),
  ],
})