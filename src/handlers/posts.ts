import { supabase } from "../constants";
import {
  CreatePostRequest,
  CommentRequest,
  PostWithTagsResponse,
} from "../interfaces";

export const getAllPosts = async (
  query: any
): Promise<{ data: PostWithTagsResponse[] | null; error: any }> => {
  try {
    // Step 1: Get posts along with user details and tags
    const { data, error } = await supabase.from("posts").select(`
        id,
        title,
        description,
        location,
        views_count,
        likes_count,
        status,
        created_at,
        tags:post_tags(tag_id(id, name))
      `);

    // const user = data && data[0].user[0].user_id[0].raw_user_meta_data;
    // console.log(JSON.stringify(user, null, 2));
    if (error) return { data: null, error };

    // Step 2: Transform data to format tags array and set default user values if fields are missing
    const postsWithUserAndTags = data.map((post: any) => ({
      ...post,
      user: {
        first_name: post?.user?.first_name || "Anonymous",
        last_name: post?.user?.last_name || "",
        name: post?.user?.name || "Anonymous",
        email: post?.user?.email || "No email provided",
        avatar: post?.user?.avatar || "https://example.com/default-avatar.jpg",
      },
      tags: post.tags.map((tag: any) => tag.tag_id),
    }));

    return { data: postsWithUserAndTags, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const createPost = async (postData: CreatePostRequest) => {
  const { title, description, location, userId } = postData;
  const { data, error } = await supabase
    .from("posts")
    .insert([{ title, description, location, user_id: userId }])
    .select();
  if (error) throw error;
  return data;
};

export const likePost = async (postId: string, userId: string) => {
  // Implementation to toggle like/unlike on the post by userId
};

export const addComment = async (
  postId: string,
  userId: string,
  commentText: string
) => {
  const { data, error } = await supabase
    .from("comments")
    .insert([{ post_id: postId, user_id: userId, comment_text: commentText }])
    .select();
  if (error) throw error;
  return data;
};

export const sharePost = async (postId: string, userId: string) => {
  // Implementation for handling post shares by userId
};
