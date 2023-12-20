export const errorMessage = {
  // Post
  readPost: (httpCode: number, message: string) => `httpCode: ${httpCode}. There was a problem when trying to read this post. Message: ${message}.`,
  publishPost: (httpCode: number, message: string) => `httpCode: ${httpCode}. There was a problem when trying publish this post. Message: ${message}.`,
  readAllPosts: (httpCode: number, message: string) => `httpCode: ${httpCode}. There was a problem when trying to read all posts. Message: ${message}.`,
  readLatestPosts: (httpCode: number, message: string) => `httpCode: ${httpCode}. There was a problem when trying to read latest posts. Message: ${message}.`,
  searchPublishedPosts: (httpCode: number, message: string) => `httpCode: ${httpCode}. There was a problem when trying to search published posts. Message: ${message}.`,
  readAllPostsInCategory: (httpCode: number, message: string) => `httpCode: ${httpCode}. There was a problem when trying to read all posts in category. Message: ${message}.`,
  readAllPendingPosts: (httpCode: number, message: string) => `httpCode: ${httpCode}. There was a problem when trying to read all pending posts. Message: ${message}.`,
  // User
  deleteUser: (httpCode: number, message: string) => `httpCode: ${httpCode}. There was a problem when trying to delete this user. Message: ${message}.`,
  readUserData: (httpCode: number, message: string) => `httpCode: ${httpCode}. There was a problem when trying to read user data. Message: ${message}.`,
  readRandomUsername: (httpCode: number, message: string) => `httpCode: ${httpCode}. There was a problem when trying to read a random username. Message: ${message}.`,
  readDoesUsernameExist: (httpCode: number, message: string) => `httpCode: ${httpCode}. There was a problem when trying to read if a username exists. Message: ${message}.`,
  usernameIsTaken: (httpCode: number, message: string) => `httpCode: ${httpCode}. This username is already taken. Message: ${message}.`,
  upsertUsername: (httpCode: number, message: string) => `httpCode: ${httpCode}. There was a problem when trying to upsert a username. Message: ${message}.`,
  verifyCaptcha: (httpCode: number, message: string) => `httpCode: ${httpCode}. There was a problem when trying to verify captcha. Message: ${message}.`,

};
