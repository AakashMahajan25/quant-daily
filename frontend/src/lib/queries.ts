export const aakashPostsQuery = `*[_type == "post" && isAakash == true] | order(publishedAt desc){
    _id, title, author, body, publishedAt
  }`;
  
  export const communityPostsQuery = `*[_type == "post" && isAakash == false] | order(publishedAt desc){
    _id, title, author, body, publishedAt
  }`;
  