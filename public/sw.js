if(!self.define){let e,s={};const n=(n,t)=>(n=new URL(n+".js",t).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(t,a)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let c={};const r=e=>n(e,i),o={module:{uri:i},exports:c,require:r};s[i]=Promise.all(t.map((e=>o[e]||r(e)))).then((e=>(a(...e),c)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/7S5Z64wPX2d0DIkx7OKQL/_buildManifest.js",revision:"936faa8bfc6fb96a9900f0cfcd482701"},{url:"/_next/static/7S5Z64wPX2d0DIkx7OKQL/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/130.92ab81862037267a.js",revision:"92ab81862037267a"},{url:"/_next/static/chunks/277.42262de248735b3b.js",revision:"42262de248735b3b"},{url:"/_next/static/chunks/298-f88d173c00d24769.js",revision:"f88d173c00d24769"},{url:"/_next/static/chunks/397.3df130ae2112b752.js",revision:"3df130ae2112b752"},{url:"/_next/static/chunks/431.bde0803c0029dd62.js",revision:"bde0803c0029dd62"},{url:"/_next/static/chunks/527dfe43-faef1e300699ebd5.js",revision:"faef1e300699ebd5"},{url:"/_next/static/chunks/650.9e57a45dede765ce.js",revision:"9e57a45dede765ce"},{url:"/_next/static/chunks/664-860d4fb5fc32e7d0.js",revision:"860d4fb5fc32e7d0"},{url:"/_next/static/chunks/86.f68a5c85825f91ae.js",revision:"f68a5c85825f91ae"},{url:"/_next/static/chunks/873-b27f0da868e24c87.js",revision:"b27f0da868e24c87"},{url:"/_next/static/chunks/916-d75951ba7e7c61d2.js",revision:"d75951ba7e7c61d2"},{url:"/_next/static/chunks/922.2778b628bcf18a56.js",revision:"2778b628bcf18a56"},{url:"/_next/static/chunks/960.0d5dae6771f2f866.js",revision:"0d5dae6771f2f866"},{url:"/_next/static/chunks/962.504e4fa65e5cbac8.js",revision:"504e4fa65e5cbac8"},{url:"/_next/static/chunks/framework-3b5a00d5d7e8d93b.js",revision:"3b5a00d5d7e8d93b"},{url:"/_next/static/chunks/main-743f8aff90ea8642.js",revision:"743f8aff90ea8642"},{url:"/_next/static/chunks/pages/_app-ebc716e0319a75a7.js",revision:"ebc716e0319a75a7"},{url:"/_next/static/chunks/pages/_error-8353112a01355ec2.js",revision:"8353112a01355ec2"},{url:"/_next/static/chunks/pages/doctors-d3e57ab51315f383.js",revision:"d3e57ab51315f383"},{url:"/_next/static/chunks/pages/documents-0241cd1bb8dc812f.js",revision:"0241cd1bb8dc812f"},{url:"/_next/static/chunks/pages/index-5a714310e4d0d4fb.js",revision:"5a714310e4d0d4fb"},{url:"/_next/static/chunks/pages/login-37c0235e85b0917e.js",revision:"37c0235e85b0917e"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-6d0999515128529b.js",revision:"6d0999515128529b"},{url:"/_next/static/css/0ef7647d2d01d13d.css",revision:"0ef7647d2d01d13d"},{url:"/_next/static/css/63c9fb6849ef5e1a.css",revision:"63c9fb6849ef5e1a"},{url:"/_next/static/css/729f911b4df0bad5.css",revision:"729f911b4df0bad5"},{url:"/_next/static/css/dfb2c105f40779a2.css",revision:"dfb2c105f40779a2"},{url:"/_next/static/media/spinner.f3bc28ea.gif",revision:"66ac1aa9538614b2af7c05a20d2601de"},{url:"/favicon.ico",revision:"c30c7d42707a47a3f4591831641e50dc"},{url:"/ipehr-icon.png",revision:"c783eef138371143272de7f823627a48"},{url:"/manifest.json",revision:"62b3f51c2f214f43e2949f53183e7984"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:t})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));