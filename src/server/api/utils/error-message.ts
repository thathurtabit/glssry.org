export const errorMessage = {
  // Email
  newPostEmailNotification: (httpCode: number, message: string) => `httpCode: ${httpCode}. There was a problem when trying to send a new post email notification. Message: ${message}.`,
  // Post
  readPost: (httpCode: number, message: string) => `httpCode: ${httpCode}. There was a problem when trying to read this post. Message: ${message}.`,
  readRandomPost: (httpCode: number, message: string) => `httpCode: ${httpCode}. There was a problem when trying to read a random post. Message: ${message}.`,
  readRandomPosts: (httpCode: number, message: string) => `httpCode: ${httpCode}. There was a problem when trying to read random posts. Message: ${message}.`,
  readRandomCategoryPostCount: (httpCode: number, message: string) => `httpCode: ${httpCode}. There was a problem when trying to read a random categories and their post counts. Message: ${message}.`,
  createPost: (httpCode: number, message: string) => `httpCode: ${httpCode}. There was a problem when trying to create post. Message: ${message}.`,
  updatePost: (httpCode: number, message: string) => `httpCode: ${httpCode}. There was a problem when trying to update post. Message: ${message}.`,
  publishPost: (httpCode: number, message: string) => `httpCode: ${httpCode}. There was a problem when trying publish this post. Message: ${message}.`,
  readAllPosts: (httpCode: number, message: string) => `httpCode: ${httpCode}. There was a problem when trying to read all posts. Message: ${message}.`,
  readLatestPosts: (httpCode: number, message: string) => `httpCode: ${httpCode}. There was a problem when trying to read latest posts. Message: ${message}.`,
  searchPublishedPosts: (httpCode: number, message: string) => `httpCode: ${httpCode}. There was a problem when trying to search published posts. Message: ${message}.`,
  readAllPostsInCategory: (httpCode: number, message: string) => `httpCode: ${httpCode}. There was a problem when trying to read all posts in category. Message: ${message}.`,
  readAllPendingPosts: (httpCode: number, message: string) => `httpCode: ${httpCode}. There was a problem when trying to read all pending posts. Message: ${message}.`,
  readRandomisedRelatedPosts: (httpCode: number, message: string) => `httpCode: ${httpCode}. There was a problem when trying to read randomized related posts. Message: ${message}.`,

  // User
  deleteUser: (httpCode: number, message: string) => `httpCode: ${httpCode}. There was a problem when trying to delete this user. Message: ${message}.`,
  readUserData: (httpCode: number, message: string) => `httpCode: ${httpCode}. There was a problem when trying to read user data. Message: ${message}.`,
  readRandomUsername: (httpCode: number, message: string) => `httpCode: ${httpCode}. There was a problem when trying to read a random username. Message: ${message}.`,
  readDoesUsernameExist: (httpCode: number, message: string) => `httpCode: ${httpCode}. There was a problem when trying to read if a username exists. Message: ${message}.`,
  usernameIsTaken: (httpCode: number, message: string) => `httpCode: ${httpCode}. This username is already taken. Message: ${message}.`,
  upsertUsername: (httpCode: number, message: string) => `httpCode: ${httpCode}. There was a problem when trying to upsert a username. Message: ${message}.`,
  verifyCaptcha: (httpCode: number, message: string) => `httpCode: ${httpCode}. There was a problem when trying to verify captcha. Message: ${message}.`,

};
