const post = {
    name: "post",
    title: "Post",
    type: "document",
    fields: [
      {
        name: "title",
        title: "Title",
        type: "string",
      },
      {
        name: "author",
        title: "Author Name",
        type: "string",
      },
      {
        name: "body",
        title: "Post Content",
        type: "array",
        of: [{ type: "block" }],
      },
      {
        name: "slug",
        title: "Slug",
        type: "slug",
        options: {
          source: "title",
          maxLength: 96,
        },
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: "isAakash",
        title: "Written by Aakash?",
        type: "boolean",
        initialValue: true,
      },
      {
        name: "publishedAt",
        title: "Published At",
        type: "datetime",
        initialValue: () => new Date().toISOString(),
      },
    ],
  };
  
  export default post;
  