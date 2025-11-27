"use server";

import { db } from "@/lib/db";
import bcrypt from "bcrypt";

import { RegisterSchema } from "@/schemas";
import z from "zod";
import { getUserByEmail } from "@/data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateField = RegisterSchema.safeParse(values);

  if (!validateField.success) {
    return { error: "Invalid Email ❌" };
  }

  const { email, name, password } = validateField.data;

  const hashedPassword = await bcrypt.hash(password, 10); //todo=> salt rounds = 10 , iska matlab hai ki password ko 10 baar hash kiya jayega ,aab 10 bar hash karne ka kya mtlb hai ,to mainly hash karne ka mtlb hai ki password ko ek fixed length ke string me convert karna jo ki irreversible hota hai ,to 10 bar hash karne ka mtlb hai ki pehle password ko hash karenge fir us hash ko fir se hash karenge ye process 10 baar repeat hoga ,iska fayda ye hota hai ki agar koi attacker hamare database ko access kar leta hai to wo original password tak nahi pahuch paega kyuki wo multiple times hashed hoga,aur yehi salting ka concept hota hai ,aur pta hai round kaise kaam krta hai ,to har baar jab hum password ko hash karte hai to usme ek random string add karte hai jise salt kehte hai ,ye salt har baar different hota hai ,to agar do users same password rakhte hai to bhi unke hashed passwords different honge kyuki unke salts different honge ,to isse security badh jati hai,and salting ka main purpose yehi hota hai ki rainbow table attacks se bacha ja sake ,rainbow table attacks me attacker precomputed hash values ka use karke original passwords ko guess karne ki koshish karta hai ,to agar hum salt use karte hai to ye attack ineffective ho jata hai.salting ka use hum mainly hum password ko encrypt karne ke liye karte hai.

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "User Already Exists ❌" };
  }

  await db.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  // TODO: Send a verification email to the user
  return { success: "User Created ✅" };
};
