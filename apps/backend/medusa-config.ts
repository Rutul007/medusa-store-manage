import { loadEnv, defineConfig } from "@medusajs/framework/utils"

loadEnv(process.env.NODE_ENV || "development", process.cwd())

const databaseUrl = process.env.DATABASE_URL || ""
const isLocalDb = (() => {
  if (!databaseUrl) {
    return true
  }
  try {
    const { hostname } = new URL(databaseUrl)
    return (
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname === "::1" ||
      hostname === "[::1]"
    )
  } catch {
    return /(?:@|\/\/)(localhost|127\.0\.0\.1|\[::1\])(?::|\/|\?|$)/i.test(
      databaseUrl
    )
  }
})()

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,

    ...(!isLocalDb
      ? {
          databaseDriverOptions: {
            connection: {
              ssl: {
                rejectUnauthorized: false,
              },
            },
          },
        }
      : {}),

    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET,
      cookieSecret: process.env.COOKIE_SECRET,
    },
  },
})