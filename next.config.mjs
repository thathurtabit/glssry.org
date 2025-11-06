// next-pwa temporarily disabled while debugging a build-time plugin crash
// (rkyv / SWC). Re-enable if/when we confirm compatibility.

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/environment.mjs");

// const withPWA = nextPWA({ dest: "public", disable: process.env.NODE_ENV === "development" });

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  experimental: {
    // temporarily disable forceSwcTransforms to avoid a Rust/SWC runtime panic
    // seen during production builds. Re-enable if/when upstream issues are fixed.
    forceSwcTransforms: false,
    // Temporarily disabled swcPlugins while we fix getStaticProps and avoid
    // an intermittent SWC/rkyv LayoutError that causes `next build` to crash.
    // Re-enable individual plugins later for testing (one at a time).
    // swcPlugins: [["next-superjson-plugin", {}]],
    workerThreads: false,
    cpus: 2,
  },

  /**
   * If you are using `appDir` then you must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/u/**",
      },
    ],
  },
};

// Temporarily disable next-pwa wrapper to work around a build-time plugin
// crash (rkyv/SWC). If this fixes the build we can investigate next-pwa
// compatibility separately and re-enable it.
export default config;
