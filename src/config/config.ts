import dotenv from "dotenv";

dotenv.config();

export default {
  db: {
    url: process.env.DATABASE_URL || "postgresql://postgres:1234@localhost:5432/pontuando?schema=public",
  },
  jwt: {
    secret: process.env.JWT || "secret",
    expiresIn: process.env.JWT_EXPIRES || "1d",
  },
};
