import { PrismaClient } from "./generated/prisma";

declare global { // todo => pta hai hamne isko hot-reload ke liye use kiya hai "kyuki dev environment me baar-baar naye instance ban jate hain isliye hum globalThis me store kar rahe hain",aab saab log puchenge ki" globalThis kya hai to ye ek global object hai jo har environment me available hota hai jaise browser me window aur node.js me global hota hai"
  var prisma: PrismaClient | undefined;
}
export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
