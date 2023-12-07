export const appTitle = "glssry";
export const appDescription = "glssry.org is an open-source glossary, dictionary, and encyclopedia of acronyms, initialisms, terms and definitions.";
export const appURL = "https://glssry.org";

export enum EURLS {
  Home = "/",
  Account = "/account",
  SignIn = "/account/sign-in",
  SignedOut = "/account/signed-out",
  SignInMagicLink = "/account/sign-in/magic-link",
  SignInSuccess = "/account/sign-in/success",
  SignInError = "/account/sign-in/error",
  SetUsername = "/account/set-username",
  SetName = "/account/set-name",
}

// Form validation
export const summaryMaxCharacterCount = 500;
export const maxPostLinkLength = 2048;
export const maxTagsForPost = 5;
