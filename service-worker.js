const cacheName = 'to-do-list-pwa'

const version = '1.0.3'

const repoName = 'to-do-list-pwa'

const filesToCache = [
	`${repoName}/`,
	`${repoName}/index.html`,
	`${repoName}/css/style.css`,
	`${repoName}/js/main.js`,
]

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', event => {
	event.waitUntil(
		caches
			.open(`${cacheName}-${version}`)
			.then(cache => cache.addAll(filesToCache))
			.then(a => console.log(a))
			.catch(a => console.log(a))
	)
})

/* Serve cached content when offline */
self.addEventListener('fetch', event => {
	event.respondWith(
		caches
			.match(event.request)
			.then(response => response || fetch(event.request))
	)
})
