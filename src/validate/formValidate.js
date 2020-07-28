import validator from 'validator';

// General Validations
// Validate if input is blank
export const validateInputEmpty = input => {
  if (typeof input !== 'undefined') {
    return validator.isEmpty(input);
  } else {
    return true;
  }
};

// Password Handling
// Validate Password and Confirm Password Equality
export const validatePassMatch = (passOne, passTwo) => {
  return validator.equals(passOne, passTwo);
};

// Validate Password Length
export const validatePassLength = (password, minLength) => {
  return validator.isLength(password, { min: minLength });
};

//Username/Email Handling
export const validateIsEmail = email => {
  return validator.isEmail(email);
};

// handle valid name input
export const validateNameInput = name => {
  name = name.trim();

  let result = false;
  let space = name.indexOf(' ');

  if (space > 0) {
    if (
      validator.isAlpha(name.charAt(space - 1)) &&
      validator.isAlpha(name.charAt(space + 1))
    ) {
      result = true;
    }
  }
  return result;
};
