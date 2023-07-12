
export const forbiddenCharacters = "( ) ' - _ . ! * ~";

export enum FormErrorMessage {
  symbolsNotAllowed = "Some symbols are not allowed: ( ) ' - _ . ! * ~",
  emptyField = 'Please enter a username.',
  usernameTooShort = 'Your username needs at least 2 characters.'
}
