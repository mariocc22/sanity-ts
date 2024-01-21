import { Rule, validation } from "sanity";

export const post = {
  name: "post",
  title: "Post",
  type: "document",

  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Title is required"), // here we use the validation helper to create a validation rule
    },

    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      initialValue: () => new Date().toISOString(), // use a function to guarantee that every document get's a fresh timestamp, default is the time of creation
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "string",
      validation: (Rule: Rule) => Rule.max(200).error("Max 200 characters"), // here we use the validation helper to create a validation rule
    },
    {
      name: "body",
      title: "Body",
      type: "array",
      of: [
        {
          type: "block",
        },
        {
          type: "image",
          fields: [{ type: "text", name: "alt", title: "Alt" }],
        },
      ],
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "tag" }], // this is creating a relationship between the post and the tag (reference)
        },
      ],
    },
  ],
};
