export const aakashPostsQuery = `*[_type == "post" && isAakash == true] | order(publishedAt desc){
  title, slug, author, publishedAt
}`;

export const communityPostsQuery = `*[_type == "post" && isAakash == false] | order(publishedAt desc){
  title, slug, author, publishedAt
}`;
