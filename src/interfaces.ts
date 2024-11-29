export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
}

// Interfaces related to User Authentication

/**
 * @interface SignUpRequest
 * @description Defines the structure for a sign-up request
 */
export interface SignUpRequest {
  email: string;
  password: string;
  name: string;
}

/**
 * @interface LoginRequest
 * @description Defines the structure for a login request
 */
export interface LoginRequest {
  email: string;
  password: string;
}

// Interfaces related to Posts

/**
 * @interface CreatePostRequest
 * @description Defines the structure for creating a new post
 */
export interface CreatePostRequest {
  title: string;
  description: string;
  location?: string;  // Optional location for the post
  userId: string;     // User ID from auth.users in Supabase
}

/**
 * @interface Tag
 * @description Defines the structure for a tag
 */
export interface Tag {
  id: string;
  name: string;
}

// Interface related to User

/**
 * @interface User
 * @description Defines the structure for user data to be included in a post
 */
export interface User {
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

/**
 * @interface PostWithTagsResponse
 * @description Defines the structure for a post response with tags and user details included
 */
export interface PostWithTagsResponse {
  id: string;
  title: string;
  description: string;
  location?: string;
  views_count: number;
  likes_count: number;
  status: string;
  user: User;
  created_at: string;
  tags: Tag[];
}

// Interfaces related to Post Interactions

/**
 * @interface CommentRequest
 * @description Defines the structure for adding a comment to a post
 */
export interface CommentRequest {
  userId: string;
  commentText: string;
}

/**
 * @interface LikeRequest
 * @description Defines the structure for liking a post
 */
export interface LikeRequest {
  postId: string;
  userId: string;
}

/**
 * @interface ShareRequest
 * @description Defines the structure for sharing a post
 */
export interface ShareRequest {
  postId: string;
  userId: string;
}
