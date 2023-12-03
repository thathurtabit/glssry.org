export const errorMessage = {
  // Post
  readPost: (httpCode: number, message: string) => `httpCode: ${httpCode}. There was a problem when trying to read this post. Message: ${message}.`,
  // User
  deleteUser: (httpCode: number, message: string) => `httpCode: ${httpCode}. There was a problem when trying to delete this user. Message: ${message}.`,
  readUserData: (httpCode: number, message: string) => `httpCode: ${httpCode}. There was a problem when trying to read user data. Message: ${message}.`,
  readRandomUsername: (httpCode: number, message: string) => `httpCode: ${httpCode}. There was a problem when trying to read a random username. Message: ${message}.`,
  readDoesUsernameExist: (httpCode: number, message: string) => `httpCode: ${httpCode}. There was a problem when trying to read if a username exists. Message: ${message}.`,
  usernameIsTaken: (httpCode: number, message: string) => `httpCode: ${httpCode}. This username is already taken. Message: ${message}.`,
  upsertUsername: (httpCode: number, message: string) => `httpCode: ${httpCode}. There was a problem when trying to upsert a username. Message: ${message}.`,
  verifyCaptcha: (httpCode: number, message: string) => `httpCode: ${httpCode}. There was a problem when trying to verify captcha. Message: ${message}.`,

};
