const USERNAME_MIN_LENGTH = 4;
const USERNAME_MAX_LENGTH = 24;
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 30;
const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%^*?&])[A-Za-z\d@$!%^*?&]{8,}$/;

const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
const EMAIL_REGEX =
  /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const USERNAME_REGEX = /^[a-zA-Z0-9_-]*$/;

export const validateUsername = (username) => {
  if (
    username.length < USERNAME_MIN_LENGTH ||
    username.length > USERNAME_MAX_LENGTH ||
    !username.match(USERNAME_REGEX)
  ) {
    return false;
  }
  return true;
};

export const validatePasword = (password) => {
  // TODO add more password validation
  if (password.match(PASSWORD_REGEX)) {
    return true;
  } else return false;
};

export const validateEmail = (email) => {
  if (email.match(EMAIL_REGEX)) {
    return true;
  }
  return false;
};
