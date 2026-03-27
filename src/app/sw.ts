import { installSerwist } from "@serwist/sw"
import { StaleWhileRevalidate } from "serwist"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const self: any

installSerwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: false,
  runtimeCaching: [
    {
      matcher: /\.(?:js|css|png|jpg|jpeg|svg|gif|woff2?|ico)$/i,
      handler: new StaleWhileRevalidate({
        cacheName: "static-assets",
      }),
    },
    {
      matcher: /\/manifest\.webmanifest$/,
      handler: new StaleWhileRevalidate({
        cacheName: "manifest",
      }),
    },
  ],
  // Do NOT add a navigation fallback — let all page navigations
  // and API calls go directly to the network (server-rendered with auth)
})
