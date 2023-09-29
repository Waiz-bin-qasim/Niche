import argon2 from "argon2";

export const Encrypt = async (password) => {
  return await argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    hashLength: 50,
  });
};
export const Decrypt = async (password, hash) => {
  try {
    if (await argon2.verify(hash, password)) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return error;
  }
};
