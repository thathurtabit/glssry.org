if(!self.define){let e,s={};const a=(a,c)=>(a=new URL(a+".js",c).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,i)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let t={};const d=e=>a(e,n),f={module:{uri:n},exports:t,require:d};s[n]=Promise.all(c.map((e=>f[e]||d(e)))).then((e=>(i(...e),t)))}}define(["./workbox-7c2a5a06"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/8v_PZGHEqHCb_upGx6oyJ/_buildManifest.js",revision:"a7a37f68e4a59ae5eb653422e7c7f8bb"},{url:"/_next/static/8v_PZGHEqHCb_upGx6oyJ/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/479-42824cac4ac31267.js",revision:"42824cac4ac31267"},{url:"/_next/static/chunks/585-6e8b56d219827a98.js",revision:"6e8b56d219827a98"},{url:"/_next/static/chunks/604-7ea8993069cf8fea.js",revision:"7ea8993069cf8fea"},{url:"/_next/static/chunks/675-4e2621cffef3649c.js",revision:"4e2621cffef3649c"},{url:"/_next/static/chunks/7f0c75c1-ba8cb0990f9e5856.js",revision:"ba8cb0990f9e5856"},{url:"/_next/static/chunks/99-670b3b388f16d433.js",revision:"670b3b388f16d433"},{url:"/_next/static/chunks/ae51ba48-a42da3909975cd35.js",revision:"a42da3909975cd35"},{url:"/_next/static/chunks/d64684d8-b2d2fd2b3da5bf01.js",revision:"b2d2fd2b3da5bf01"},{url:"/_next/static/chunks/framework-10fac88913917d91.js",revision:"10fac88913917d91"},{url:"/_next/static/chunks/main-1d74609dec6d6337.js",revision:"1d74609dec6d6337"},{url:"/_next/static/chunks/pages/%5B...post%5D-4e25a19bff77fe37.js",revision:"4e25a19bff77fe37"},{url:"/_next/static/chunks/pages/_app-e53ec1ba54c92b54.js",revision:"e53ec1ba54c92b54"},{url:"/_next/static/chunks/pages/_error-c3101dbfeee25159.js",revision:"c3101dbfeee25159"},{url:"/_next/static/chunks/pages/account/deauthorized-f8de6480b2d9af26.js",revision:"f8de6480b2d9af26"},{url:"/_next/static/chunks/pages/account/nuke-15c972e39caaac91.js",revision:"15c972e39caaac91"},{url:"/_next/static/chunks/pages/account/set-username-e703f998475e65a2.js",revision:"e703f998475e65a2"},{url:"/_next/static/chunks/pages/account/sign-in-c50a32118d712e0b.js",revision:"c50a32118d712e0b"},{url:"/_next/static/chunks/pages/account/sign-in/error-81b30f2befdb4e11.js",revision:"81b30f2befdb4e11"},{url:"/_next/static/chunks/pages/account/sign-in/magic-link-c48ec0c44103b11d.js",revision:"c48ec0c44103b11d"},{url:"/_next/static/chunks/pages/account/sign-in/success-e551a82b4ff7a6ab.js",revision:"e551a82b4ff7a6ab"},{url:"/_next/static/chunks/pages/account/signed-out-2e69df8e0b5fadad.js",revision:"2e69df8e0b5fadad"},{url:"/_next/static/chunks/pages/index-7d8605fd47e4e3b0.js",revision:"7d8605fd47e4e3b0"},{url:"/_next/static/chunks/pages/post/create-d57dd2b841c76dcd.js",revision:"d57dd2b841c76dcd"},{url:"/_next/static/chunks/pages/post/edit-0009deeaaaa18b0c.js",revision:"0009deeaaaa18b0c"},{url:"/_next/static/chunks/pages/post/list-ae4db15da82889dd.js",revision:"ae4db15da82889dd"},{url:"/_next/static/chunks/pages/post/pending-f7fdf2214f26f155.js",revision:"f7fdf2214f26f155"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-59c5c889f52620d6.js",revision:"59c5c889f52620d6"},{url:"/_next/static/css/7b32b40648a8c04f.css",revision:"7b32b40648a8c04f"},{url:"/_next/static/media/10ca58f12dc31ec2-s.woff2",revision:"e0df918a07b640f09bb69751b040c517"},{url:"/_next/static/media/1fe05f8c46e9977c-s.p.woff2",revision:"c1fec4a19b3192d4701a6533aab96a61"},{url:"/_next/static/media/1ffa718e60efccd4-s.woff2",revision:"a8662b6d037362c4dc6470530d4bca51"},{url:"/_next/static/media/23f25237a0dd6e5e-s.woff2",revision:"95712b78a4a4cd25725d199575ce922c"},{url:"/_next/static/media/4211d34fd1c6f59f-s.woff2",revision:"10c49f8eebd781ea0feb134d5d895ae1"},{url:"/_next/static/media/46ada7a8096f3625-s.woff2",revision:"190b012a1ea4fa649277742d8aaa952f"},{url:"/_next/static/media/527ad038b46df541-s.woff2",revision:"9d5d33aac7b433227908a50658ebb82c"},{url:"/_next/static/media/590bfc1facaea403-s.woff2",revision:"2890339585a50c5843a89ea9788f0780"},{url:"/_next/static/media/61b81e7bde89ba40-s.p.woff2",revision:"e7c8b3a1196384678e2b2044f8baa115"},{url:"/_next/static/media/95e7cb10eda7a858-s.woff2",revision:"a17f6ed96209e29281424e6d7bab0ec8"},{url:"/_next/static/media/9f705a8904cabecc-s.p.woff2",revision:"d39b3002cb55ab0dba0c94a9132d4cc8"},{url:"/_next/static/media/b34eb5d9a2ebd9de-s.woff2",revision:"1c2eb10dc87812929e90e70cfdc75753"},{url:"/_next/static/media/fe0643d5f2ad0dcb-s.woff2",revision:"6de05c54b2b48e2b12745b95bcdd950d"},{url:"/favicon/android-chrome-192x192.png",revision:"c0d5beb829690c3d18c31cb45174dc67"},{url:"/favicon/android-chrome-256x256.png",revision:"7c9bc14f15d5731e3bb1427c8baba551"},{url:"/favicon/apple-touch-icon.png",revision:"c77ac1e2d104e3e3a68bc70232ab9bba"},{url:"/favicon/browserconfig.xml",revision:"7f2b2f8a4c6863cc7be0a1e4b7963bd9"},{url:"/favicon/favicon-16x16.png",revision:"0e0998bad54483253eb2c54cd52f2620"},{url:"/favicon/favicon-32x32.png",revision:"9fcfab51d2269f5954a245263983cfe4"},{url:"/favicon/favicon.ico",revision:"e09f15b2d8c043c9819b778811852dc4"},{url:"/favicon/favicon.png",revision:"6e948c4229998491ceb982d67f5ff79a"},{url:"/favicon/mstile-150x150.png",revision:"39bbe4b44f7a26e9f308b178f1c69f6f"},{url:"/favicon/safari-pinned-tab.svg",revision:"e4226dd601fda16790841b9189dcabb5"},{url:"/favicon/site.webmanifest",revision:"ab665afc09201416fecde4c3aa2bba88"},{url:"/robots.txt",revision:"59b5022b914a82f95d18493c2a28d218"},{url:"/sitemap-0.xml",revision:"d77a8b1038e3e131d9b6a8722167990b"},{url:"/sitemap.xml",revision:"c24dc2f275b85f38caa3c21d559c012f"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
