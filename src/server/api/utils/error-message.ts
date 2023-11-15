export const errorMessage = {
  // User
  deleteUser: (httpCode: number) => `httpCode: ${httpCode}. There was a problem when trying to delete this user.`,
  readUserData: (httpCode: number) => `httpCode: ${httpCode}. There was a problem when trying to read user data.`,
  readRandomUsername: (httpCode: number) => `httpCode: ${httpCode}. There was a problem when trying to read a random username.`,
  readDoesUsernameExist: (httpCode: number) => `httpCode: ${httpCode}. There was a problem when trying to read if a username exists.`,
  usernameIsTaken: (httpCode: number) => `httpCode: ${httpCode}. This username is already taken.`,
  upsertUsername: (httpCode: number) => `httpCode: ${httpCode}. There was a problem when trying to upsert a username.`,

};
