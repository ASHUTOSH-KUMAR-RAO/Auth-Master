// ! Basically isme pta hai hum sabhi tokens ko kaise handle karenge aur hum tokens ko kaise generate karenge yehi saab hoga

import { getVerifactionTokenByEmail } from "@/data/verification-token";
import { v4 as uuidv4 } from "uuid";

import { db } from "@/lib/db";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();

  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4(); // ? yeha per hum uuid library ka use kar rahe hai taaki hum unique token generate kar sake uuid ka full form universally unique identifier hota hai jo basically ek aisa identifier hota hai jo globally unique hota hai aur isse hum kisi bhi entity ko uniquely identify kar sakte hai

  const expires = new Date(new Date().getTime() + 3600 * 1000); //todo so basically 1 hour ka token hoga uske baad expire ho jayega,kyuki yeha per hum number of milliseconds me time dete hai 1 hour = 3600 seconds = 3600*1000 milliseconds

  const existingTokens = await getVerifactionTokenByEmail(email); //todo yeha per hum sabhi existing tokens ko le rahe hai taaki hum check kar sake ki koi duplicate token na ho.

  if (existingTokens) {
    // ? agar existing token milta hai to hum usese delete kar denge taaki duplicate token na ho
    await db.verificationToken.delete({
      where: {
        id: existingTokens.id,
      },
    });
  }

  const verificationToken = await db.verificationToken.create({
    // ? yeha per hum naya token create kar rahe hai ,aur usme email,token aur expires ka data de rahe hai aur ye saab hum database me store kar rahe hai
    data: {
      email,
      token,
      expires,
    },
  });
  return verificationToken;
};
