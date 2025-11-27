/**
 * Public Routes
 *
 * Routes accessible without authentication. Any visitor can access these paths.
 *
 * @type {string[]}
 */
export const publicRoute = ["/",];

/**
 * Authentication Routes
 *
 * Routes for login and registration flows.
 * - Accessible only to unauthenticated users
 * - Authenticated users are redirected to DEFAULT_LOGIN_REDIRECT
 *
 * @type {string[]}
 */
export const authRoute = ["/auth/login", "/auth/register"];

/**
 * API Authentication Prefix
 *
 * Base path for all NextAuth.js authentication API endpoints.
 * Handles signin, signout, callbacks, and session management.
 *
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * Default Login Redirect Path
 *
 * Where users are redirected after successful login when no callbackUrl is provided.
 * Also used when authenticated users try to access auth routes.
 *
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";
