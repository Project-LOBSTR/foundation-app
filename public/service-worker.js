if(!self.define){let e,s={};const n=(n,a)=>(n=new URL(n+".js",a).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(a,c)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let t={};const r=e=>n(e,i),o={module:{uri:i},exports:t,require:r};s[i]=Promise.all(a.map((e=>o[e]||r(e)))).then((e=>(c(...e),t)))}}define(["./workbox-9b4d2a02"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"1d574da5f0f54a868c4dfae4dca847c3"},{url:"/_next/static/chunks/288-5a4c930d8ce63625.js",revision:"hM185Z6Ork_s_jLnerXQx"},{url:"/_next/static/chunks/34-03ef64e27d44f35b.js",revision:"hM185Z6Ork_s_jLnerXQx"},{url:"/_next/static/chunks/455-e89d597a564a74ef.js",revision:"hM185Z6Ork_s_jLnerXQx"},{url:"/_next/static/chunks/5e22fd23-f1607181adf03235.js",revision:"hM185Z6Ork_s_jLnerXQx"},{url:"/_next/static/chunks/795-b454fe7159887ada.js",revision:"hM185Z6Ork_s_jLnerXQx"},{url:"/_next/static/chunks/808-99f0d2fc33dda53c.js",revision:"hM185Z6Ork_s_jLnerXQx"},{url:"/_next/static/chunks/846-eab53f2bc709412c.js",revision:"hM185Z6Ork_s_jLnerXQx"},{url:"/_next/static/chunks/867-c5367bbe768e6385.js",revision:"hM185Z6Ork_s_jLnerXQx"},{url:"/_next/static/chunks/8e1d74a4-05fb26a5d8258ed9.js",revision:"hM185Z6Ork_s_jLnerXQx"},{url:"/_next/static/chunks/938-a58b4da3cb9f02d8.js",revision:"hM185Z6Ork_s_jLnerXQx"},{url:"/_next/static/chunks/app/_not-found-7ccb1fd9166919b7.js",revision:"hM185Z6Ork_s_jLnerXQx"},{url:"/_next/static/chunks/app/dashboard/page-af103371de58b3dd.js",revision:"hM185Z6Ork_s_jLnerXQx"},{url:"/_next/static/chunks/app/layout-02fdebc978693e5e.js",revision:"hM185Z6Ork_s_jLnerXQx"},{url:"/_next/static/chunks/app/page-5a6bf78a3b01a7cf.js",revision:"hM185Z6Ork_s_jLnerXQx"},{url:"/_next/static/chunks/app/recover-seed-phrase/page-3ed31e842f31ebd8.js",revision:"hM185Z6Ork_s_jLnerXQx"},{url:"/_next/static/chunks/app/sign-in/page-a486f6de9f627b3b.js",revision:"hM185Z6Ork_s_jLnerXQx"},{url:"/_next/static/chunks/app/sign-up/page-d80af593b9826855.js",revision:"hM185Z6Ork_s_jLnerXQx"},{url:"/_next/static/chunks/fd9d1056-a42935ad4bc91089.js",revision:"hM185Z6Ork_s_jLnerXQx"},{url:"/_next/static/chunks/framework-8883d1e9be70c3da.js",revision:"hM185Z6Ork_s_jLnerXQx"},{url:"/_next/static/chunks/main-1d723ee49322cde1.js",revision:"hM185Z6Ork_s_jLnerXQx"},{url:"/_next/static/chunks/main-app-9e6301156255a168.js",revision:"hM185Z6Ork_s_jLnerXQx"},{url:"/_next/static/chunks/pages/_app-98cb51ec6f9f135f.js",revision:"hM185Z6Ork_s_jLnerXQx"},{url:"/_next/static/chunks/pages/_error-e87e5963ec1b8011.js",revision:"hM185Z6Ork_s_jLnerXQx"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-f3aefdef1b595a02.js",revision:"hM185Z6Ork_s_jLnerXQx"},{url:"/_next/static/css/801669b87d08b725.css",revision:"801669b87d08b725"},{url:"/_next/static/hM185Z6Ork_s_jLnerXQx/_buildManifest.js",revision:"a1b7599199e2e8c82f2c6bcf8d8aca61"},{url:"/_next/static/hM185Z6Ork_s_jLnerXQx/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/media/05a31a2ca4975f99-s.woff2",revision:"f1b44860c66554b91f3b1c81556f73ca"},{url:"/_next/static/media/513657b02c5c193f-s.woff2",revision:"c4eb7f37bc4206c901ab08601f21f0f2"},{url:"/_next/static/media/51ed15f9841b9f9d-s.woff2",revision:"bb9d99fb9bbc695be80777ca2c1c2bee"},{url:"/_next/static/media/c9a5bc6a7c948fb0-s.p.woff2",revision:"74c3556b9dad12fb76f84af53ba69410"},{url:"/_next/static/media/d6b16ce4a6175f26-s.woff2",revision:"dd930bafc6297347be3213f22cc53d3e"},{url:"/_next/static/media/ec159349637c90ad-s.woff2",revision:"0e89df9522084290e01e4127495fae99"},{url:"/_next/static/media/fd4db3eb5472fc27-s.woff2",revision:"71f3fcaf22131c3368d9ec28ef839831"},{url:"/icon-192x192.png",revision:"c69cf7a145fbea2ca1cbbdf9cf99d5ff"},{url:"/icon-256x256.png",revision:"e9775b43f7fd2c09c06b8cbc54fa6439"},{url:"/icon-384x384.png",revision:"651abd37d80626dae1e3ff93c55cc914"},{url:"/icon-512x512.png",revision:"ac5bdcd0b672c64cf5abb346aa13dedf"},{url:"/lobstr-logo.png",revision:"e96ce908c25b855459c03c6be5df0730"},{url:"/manifest.json",revision:"712c7e82bebc69fb7a4cd85c4eb945f2"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/sw.js",revision:"0ce6f60f4c857f4d50c22451fa3b10f2"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));