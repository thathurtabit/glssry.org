if(!self.define){let e,a={};const s=(s,c)=>(s=new URL(s+".js",c).href,a[s]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=a,document.head.appendChild(e)}else e=s,importScripts(s),a()})).then((()=>{let e=a[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(c,i)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(a[n])return;let t={};const r=e=>s(e,n),f={module:{uri:n},exports:t,require:r};a[n]=Promise.all(c.map((e=>f[e]||r(e)))).then((e=>(i(...e),t)))}}define(["./workbox-07a7b4f2"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/227-df3fafff541faf91.js",revision:"df3fafff541faf91"},{url:"/_next/static/chunks/479-42824cac4ac31267.js",revision:"42824cac4ac31267"},{url:"/_next/static/chunks/604-7ea8993069cf8fea.js",revision:"7ea8993069cf8fea"},{url:"/_next/static/chunks/675-4e2621cffef3649c.js",revision:"4e2621cffef3649c"},{url:"/_next/static/chunks/7f0c75c1-ba8cb0990f9e5856.js",revision:"ba8cb0990f9e5856"},{url:"/_next/static/chunks/870-c8879254b0ee56f4.js",revision:"c8879254b0ee56f4"},{url:"/_next/static/chunks/ae51ba48-a42da3909975cd35.js",revision:"a42da3909975cd35"},{url:"/_next/static/chunks/d64684d8-b2d2fd2b3da5bf01.js",revision:"b2d2fd2b3da5bf01"},{url:"/_next/static/chunks/framework-71d000dbf097540b.js",revision:"71d000dbf097540b"},{url:"/_next/static/chunks/main-1d74609dec6d6337.js",revision:"1d74609dec6d6337"},{url:"/_next/static/chunks/pages/%5B...post%5D-81a5cec463a39426.js",revision:"81a5cec463a39426"},{url:"/_next/static/chunks/pages/_app-e121baabc2446110.js",revision:"e121baabc2446110"},{url:"/_next/static/chunks/pages/_error-c3101dbfeee25159.js",revision:"c3101dbfeee25159"},{url:"/_next/static/chunks/pages/account/deauthorized-33f4ee26e05bfca4.js",revision:"33f4ee26e05bfca4"},{url:"/_next/static/chunks/pages/account/nuke-16763b832ba8aa6d.js",revision:"16763b832ba8aa6d"},{url:"/_next/static/chunks/pages/account/set-username-efe528ceb5573bfb.js",revision:"efe528ceb5573bfb"},{url:"/_next/static/chunks/pages/account/sign-in-18ced9d634cec72a.js",revision:"18ced9d634cec72a"},{url:"/_next/static/chunks/pages/account/sign-in/error-e7fb4490738dc5a1.js",revision:"e7fb4490738dc5a1"},{url:"/_next/static/chunks/pages/account/sign-in/magic-link-42d68d5152724e92.js",revision:"42d68d5152724e92"},{url:"/_next/static/chunks/pages/account/sign-in/success-f9ae0f51fa19427c.js",revision:"f9ae0f51fa19427c"},{url:"/_next/static/chunks/pages/account/signed-out-8c5b6397df8b16bc.js",revision:"8c5b6397df8b16bc"},{url:"/_next/static/chunks/pages/index-cdcbdeb49c8c73aa.js",revision:"cdcbdeb49c8c73aa"},{url:"/_next/static/chunks/pages/post/create-b99a896e8b77c571.js",revision:"b99a896e8b77c571"},{url:"/_next/static/chunks/pages/post/edit-a1cb3fb1e166d641.js",revision:"a1cb3fb1e166d641"},{url:"/_next/static/chunks/pages/post/list-818311bed8a681d0.js",revision:"818311bed8a681d0"},{url:"/_next/static/chunks/pages/post/pending-17fe9f4435d3aba2.js",revision:"17fe9f4435d3aba2"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-b293dac5a2662b6d.js",revision:"b293dac5a2662b6d"},{url:"/_next/static/css/625527c3040a69b4.css",revision:"625527c3040a69b4"},{url:"/_next/static/media/10ca58f12dc31ec2-s.woff2",revision:"e0df918a07b640f09bb69751b040c517"},{url:"/_next/static/media/1fe05f8c46e9977c-s.p.woff2",revision:"c1fec4a19b3192d4701a6533aab96a61"},{url:"/_next/static/media/1ffa718e60efccd4-s.woff2",revision:"a8662b6d037362c4dc6470530d4bca51"},{url:"/_next/static/media/23f25237a0dd6e5e-s.woff2",revision:"95712b78a4a4cd25725d199575ce922c"},{url:"/_next/static/media/4211d34fd1c6f59f-s.woff2",revision:"10c49f8eebd781ea0feb134d5d895ae1"},{url:"/_next/static/media/46ada7a8096f3625-s.woff2",revision:"190b012a1ea4fa649277742d8aaa952f"},{url:"/_next/static/media/527ad038b46df541-s.woff2",revision:"9d5d33aac7b433227908a50658ebb82c"},{url:"/_next/static/media/590bfc1facaea403-s.woff2",revision:"2890339585a50c5843a89ea9788f0780"},{url:"/_next/static/media/61b81e7bde89ba40-s.p.woff2",revision:"e7c8b3a1196384678e2b2044f8baa115"},{url:"/_next/static/media/95e7cb10eda7a858-s.woff2",revision:"a17f6ed96209e29281424e6d7bab0ec8"},{url:"/_next/static/media/9f705a8904cabecc-s.p.woff2",revision:"d39b3002cb55ab0dba0c94a9132d4cc8"},{url:"/_next/static/media/b34eb5d9a2ebd9de-s.woff2",revision:"1c2eb10dc87812929e90e70cfdc75753"},{url:"/_next/static/media/fe0643d5f2ad0dcb-s.woff2",revision:"6de05c54b2b48e2b12745b95bcdd950d"},{url:"/_next/static/tLCGrZmxhAjUmD960iboB/_buildManifest.js",revision:"e4e2a77c96d20e16ceba2d7c86211c85"},{url:"/_next/static/tLCGrZmxhAjUmD960iboB/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/favicon/android-chrome-192x192.png",revision:"c0d5beb829690c3d18c31cb45174dc67"},{url:"/favicon/android-chrome-256x256.png",revision:"7c9bc14f15d5731e3bb1427c8baba551"},{url:"/favicon/apple-touch-icon.png",revision:"c77ac1e2d104e3e3a68bc70232ab9bba"},{url:"/favicon/browserconfig.xml",revision:"7f2b2f8a4c6863cc7be0a1e4b7963bd9"},{url:"/favicon/favicon-16x16.png",revision:"0e0998bad54483253eb2c54cd52f2620"},{url:"/favicon/favicon-32x32.png",revision:"9fcfab51d2269f5954a245263983cfe4"},{url:"/favicon/favicon.ico",revision:"e09f15b2d8c043c9819b778811852dc4"},{url:"/favicon/favicon.png",revision:"6e948c4229998491ceb982d67f5ff79a"},{url:"/favicon/mstile-150x150.png",revision:"39bbe4b44f7a26e9f308b178f1c69f6f"},{url:"/favicon/safari-pinned-tab.svg",revision:"e4226dd601fda16790841b9189dcabb5"},{url:"/favicon/site.webmanifest",revision:"ab665afc09201416fecde4c3aa2bba88"},{url:"/robots.txt",revision:"59b5022b914a82f95d18493c2a28d218"},{url:"/sitemap-0.xml",revision:"0a2ef642f6b5766d0e6a6ed5e61acc9d"},{url:"/sitemap.xml",revision:"c24dc2f275b85f38caa3c21d559c012f"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:s,state:c})=>a&&"opaqueredirect"===a.type?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const a=e.pathname;return!a.startsWith("/api/auth/")&&!!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
