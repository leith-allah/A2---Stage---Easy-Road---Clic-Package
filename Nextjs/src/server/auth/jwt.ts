
import jwt from "jsonwebtoken";

import {AuthJwtPayload} from "@/server/types/auth.types";


const JWT_SECRET =
  process.env.JWT_SECRET ||
  "dev-secret";

export function signToken(
  payload: AuthJwtPayload
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
): AuthJwtPayload {

  const payload =
    jwt.verify(
      token,
      JWT_SECRET
    );

  if (
    typeof payload === "string"
  ) {
    throw new Error(
      "Invalid token payload"
    );
  }

  if (
    !payload.email ||
    !payload.role ||
    !payload.sub
  ) {
    throw new Error(
      "Invalid token structure"
    );
  }

  return {
    sub: Number(payload.sub),
    email: payload.email,
    role: payload.role,
  };
}


export function signRefreshToken(
  payload: AuthJwtPayload
) {

  return jwt.sign(
    payload,
    JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );

}
