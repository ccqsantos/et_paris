import { PrismaClient } from "./prisma/generated/client.ts";
import UserModel from "./prisma/generated/models/User.ts";

const prisma = new PrismaClient();

export default prisma