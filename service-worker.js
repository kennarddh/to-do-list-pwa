const cacheName = 'to-do-list-pwa'

const isGithubPage = true
const repoName = 'to-do-list-pwa'

const filesToCacheOriginal = [
	'/',
	'/index.html',
	'/css/style.css',
	'/js/main.js',
]

const filesToCache = isGithubPage
	? filesToCacheOriginal.map(element => `${repoName}${element}`)
	: filesToCacheOriginal

console.log(filesToCache)

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', event => {
	event.waitUntil(
		caches.open(cacheName).then(cache => cache.addAll(filesToCache))
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
