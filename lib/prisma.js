// import { PrismaClient } from "@prisma/client";

const { PrismaClient } = require("@prisma/client");

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

// export default prisma;
module.exports = prisma;