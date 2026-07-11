import { defineType, defineField } from 'sanity'

export const article = defineType({
  name: 'article',
  title: 'Article / Investigation',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ 
      name: 'slug', 
      title: 'URL Slug', 
      type: 'slug', 
      options: { source: 'title', maxLength: 96 } 
    }),
    defineField({ 
      name: 'author', 
      title: 'Written By', 
      type: 'reference', 
      to: { type: 'author' } 
    }),
    defineField({ 
      name: 'mainImage', 
      title: 'Hero Image / Thumbnail', 
      type: 'image', 
      options: { hotspot: true } 
    }),
    defineField({ 
      name: 'category', 
      title: 'Category', 
      type: 'string',
      description: 'e.g. INTEL, DEEP DIVE, TRANSMISSION'
    }),
    defineField({ 
      name: 'tags', 
      title: 'Tags', 
      type: 'array', 
      of: [{ type: 'string' }],
      description: 'Hit enter after typing each tag.'
    }),
    defineField({ 
      name: 'seoDescription', 
      title: 'SEO Description (Short preview text)', 
      type: 'text', 
      validation: (Rule) => Rule.max(160) 
    }),
    defineField({ 
      name: 'publishedAt', 
      title: 'Publish Date', 
      type: 'datetime' 
    }),
    defineField({ 
      name: 'body', 
      title: 'Body Content', 
      type: 'array', 
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } } // This allows native image dropping right in the text!
      ] 
    }),
  ],
})