import nextAuth from "next-auth";

import { authOptions } from "~/server/auth";

export default nextAuth(authOptions);
