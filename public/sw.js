if(!self.define){let e,s={};const c=(c,a)=>(c=new URL(c+".js",a).href,s[c]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=s,document.head.appendChild(e)}else e=c,importScripts(c),s()})).then((()=>{let e=s[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(a,i)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let t={};const d=e=>c(e,n),r={module:{uri:n},exports:t,require:d};s[n]=Promise.all(a.map((e=>r[e]||d(e)))).then((e=>(i(...e),t)))}}define(["./workbox-07a7b4f2"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/6mhTpYcXAMjM6mYqZwA8X/_buildManifest.js",revision:"5a0a8d426fddcf10b025e07f86f287a9"},{url:"/_next/static/6mhTpYcXAMjM6mYqZwA8X/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/322-ec40e56c8942dbf5.js",revision:"ec40e56c8942dbf5"},{url:"/_next/static/chunks/454-90225f19b8df3183.js",revision:"90225f19b8df3183"},{url:"/_next/static/chunks/479-42824cac4ac31267.js",revision:"42824cac4ac31267"},{url:"/_next/static/chunks/491-32eedc226c36d553.js",revision:"32eedc226c36d553"},{url:"/_next/static/chunks/604-7ea8993069cf8fea.js",revision:"7ea8993069cf8fea"},{url:"/_next/static/chunks/7f0c75c1-ba8cb0990f9e5856.js",revision:"ba8cb0990f9e5856"},{url:"/_next/static/chunks/ae51ba48-a42da3909975cd35.js",revision:"a42da3909975cd35"},{url:"/_next/static/chunks/d64684d8-b2d2fd2b3da5bf01.js",revision:"b2d2fd2b3da5bf01"},{url:"/_next/static/chunks/framework-71d000dbf097540b.js",revision:"71d000dbf097540b"},{url:"/_next/static/chunks/main-1d74609dec6d6337.js",revision:"1d74609dec6d6337"},{url:"/_next/static/chunks/pages/%5B...post%5D-e73d02250054bd01.js",revision:"e73d02250054bd01"},{url:"/_next/static/chunks/pages/_app-20228a1644cbcc06.js",revision:"20228a1644cbcc06"},{url:"/_next/static/chunks/pages/_error-c3101dbfeee25159.js",revision:"c3101dbfeee25159"},{url:"/_next/static/chunks/pages/about-858c491afa032879.js",revision:"858c491afa032879"},{url:"/_next/static/chunks/pages/account/deauthorized-af957b2b7de342da.js",revision:"af957b2b7de342da"},{url:"/_next/static/chunks/pages/account/nuke-015d8950afc97acd.js",revision:"015d8950afc97acd"},{url:"/_next/static/chunks/pages/account/set-username-b443bccc3c5293e7.js",revision:"b443bccc3c5293e7"},{url:"/_next/static/chunks/pages/account/sign-in-0a0a937ebf8b2244.js",revision:"0a0a937ebf8b2244"},{url:"/_next/static/chunks/pages/account/sign-in/error-d7dad664a654f82b.js",revision:"d7dad664a654f82b"},{url:"/_next/static/chunks/pages/account/sign-in/magic-link-700daf7608e68abc.js",revision:"700daf7608e68abc"},{url:"/_next/static/chunks/pages/account/sign-in/success-c10f0e0a89f573dc.js",revision:"c10f0e0a89f573dc"},{url:"/_next/static/chunks/pages/account/signed-out-7c853d49b98d4658.js",revision:"7c853d49b98d4658"},{url:"/_next/static/chunks/pages/contribute-cd127b09f4c100f9.js",revision:"cd127b09f4c100f9"},{url:"/_next/static/chunks/pages/index-509f7e448b4cd69e.js",revision:"509f7e448b4cd69e"},{url:"/_next/static/chunks/pages/nuke-1b37c0bd0547d9bb.js",revision:"1b37c0bd0547d9bb"},{url:"/_next/static/chunks/pages/post/create-17bfabe7461ddf49.js",revision:"17bfabe7461ddf49"},{url:"/_next/static/chunks/pages/post/edit-00b87ed2d6366d1f.js",revision:"00b87ed2d6366d1f"},{url:"/_next/static/chunks/pages/post/list-5bcf56900663d65d.js",revision:"5bcf56900663d65d"},{url:"/_next/static/chunks/pages/post/pending-2e145ce3ebd8c023.js",revision:"2e145ce3ebd8c023"},{url:"/_next/static/chunks/pages/privacy-2cc3a1937d7d06cf.js",revision:"2cc3a1937d7d06cf"},{url:"/_next/static/chunks/pages/terms-1a71c276506bd974.js",revision:"1a71c276506bd974"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-6317c718444a5287.js",revision:"6317c718444a5287"},{url:"/_next/static/css/eff377ce6bb7cd90.css",revision:"eff377ce6bb7cd90"},{url:"/_next/static/media/10ca58f12dc31ec2-s.woff2",revision:"e0df918a07b640f09bb69751b040c517"},{url:"/_next/static/media/1fe05f8c46e9977c-s.p.woff2",revision:"c1fec4a19b3192d4701a6533aab96a61"},{url:"/_next/static/media/1ffa718e60efccd4-s.woff2",revision:"a8662b6d037362c4dc6470530d4bca51"},{url:"/_next/static/media/23f25237a0dd6e5e-s.woff2",revision:"95712b78a4a4cd25725d199575ce922c"},{url:"/_next/static/media/4211d34fd1c6f59f-s.woff2",revision:"10c49f8eebd781ea0feb134d5d895ae1"},{url:"/_next/static/media/46ada7a8096f3625-s.woff2",revision:"190b012a1ea4fa649277742d8aaa952f"},{url:"/_next/static/media/527ad038b46df541-s.woff2",revision:"9d5d33aac7b433227908a50658ebb82c"},{url:"/_next/static/media/590bfc1facaea403-s.woff2",revision:"2890339585a50c5843a89ea9788f0780"},{url:"/_next/static/media/61b81e7bde89ba40-s.p.woff2",revision:"e7c8b3a1196384678e2b2044f8baa115"},{url:"/_next/static/media/95e7cb10eda7a858-s.woff2",revision:"a17f6ed96209e29281424e6d7bab0ec8"},{url:"/_next/static/media/9f705a8904cabecc-s.p.woff2",revision:"d39b3002cb55ab0dba0c94a9132d4cc8"},{url:"/_next/static/media/b34eb5d9a2ebd9de-s.woff2",revision:"1c2eb10dc87812929e90e70cfdc75753"},{url:"/_next/static/media/fe0643d5f2ad0dcb-s.woff2",revision:"6de05c54b2b48e2b12745b95bcdd950d"},{url:"/favicon/android-chrome-192x192.png",revision:"c0d5beb829690c3d18c31cb45174dc67"},{url:"/favicon/android-chrome-256x256.png",revision:"7c9bc14f15d5731e3bb1427c8baba551"},{url:"/favicon/apple-touch-icon.png",revision:"c77ac1e2d104e3e3a68bc70232ab9bba"},{url:"/favicon/browserconfig.xml",revision:"7f2b2f8a4c6863cc7be0a1e4b7963bd9"},{url:"/favicon/favicon-16x16.png",revision:"0e0998bad54483253eb2c54cd52f2620"},{url:"/favicon/favicon-32x32.png",revision:"9fcfab51d2269f5954a245263983cfe4"},{url:"/favicon/favicon-large.png",revision:"789b577c10c52b78fa901f49cc3d5161"},{url:"/favicon/favicon.ico",revision:"e09f15b2d8c043c9819b778811852dc4"},{url:"/favicon/favicon.png",revision:"6e948c4229998491ceb982d67f5ff79a"},{url:"/favicon/mstile-150x150.png",revision:"39bbe4b44f7a26e9f308b178f1c69f6f"},{url:"/favicon/safari-pinned-tab.svg",revision:"e4226dd601fda16790841b9189dcabb5"},{url:"/favicon/site.webmanifest",revision:"ab665afc09201416fecde4c3aa2bba88"},{url:"/robots.txt",revision:"59b5022b914a82f95d18493c2a28d218"},{url:"/sitemap-0.xml",revision:"aa861d18f38363c5c6fa218b3ee65373"},{url:"/sitemap.xml",revision:"c24dc2f275b85f38caa3c21d559c012f"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:c,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
