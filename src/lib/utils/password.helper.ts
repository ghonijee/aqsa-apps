import * as bcrypt from "bcrypt-ts";
const saltRounds = 10;
const salt = process.env.SALT_PASSWORD || bcrypt.genSaltSync(saltRounds);

export const PasswordHash = (password: string) => {
  console.log(salt);
  let hashResult = bcrypt.hashSync(password, salt);
  return hashResult;
};

export const PasswordCompare = (password: string, hash: string) => {
  let compareResult = bcrypt.compareSync(password, hash);
  return compareResult;
};
