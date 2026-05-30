
import jwt from "jsonwebtoken";

import {
  JwtPayload,
} from "@/server/types/auth.types";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "dev-secret";

export function signToken(
  payload: JwtPayload
) {
  return jwt.sign(
    payload,
    JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
}

export function verifyToken(
  token: string
) {
  return jwt.verify(
    token,
    JWT_SECRET
  ) as JwtPayload;
}
