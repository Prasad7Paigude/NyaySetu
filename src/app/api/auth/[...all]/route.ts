// app/api/auth/[...all]/route.ts
// Create this file at: app/api/auth/[...all]/route.ts
// 
// IMPORTANT: Create the folders in this exact structure:
// app/
//   api/
//     auth/
//       [...all]/        <-- Create folder named exactly "[...all]" (with brackets)
//         route.ts       <-- This file

import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

// This handles all auth API requests (GET and POST)
export const { POST, GET } = toNextJsHandler(auth);