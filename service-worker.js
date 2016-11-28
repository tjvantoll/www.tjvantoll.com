var version = "8.0::";
var offlineResources = [
	"/",
	"/offline/",
	"/css/app.css",
	"/js/prism.min.js"
];
self.addEventListener("install", function(event) {
	event.waitUntil(
		caches
			.open(version + "static")
			.then(function(cache) {
				cache.addAll(offlineResources);
			})
	);
});

self.addEventListener("activate", function(event) {
	event.waitUntil(
		caches.keys().then(function(keys) {
			return Promise.all(keys
				.filter(function (key) {
					return key.indexOf(version) !== 0;
				})
				.map(function (key) {
					return caches.delete(key);
				})
			);
		})
	);
});

function isOfflineOrigin(origin) {
	return origin === location.origin || origin.indexOf("netlify") !== -1;
}

self.addEventListener("fetch", function(event) {
	var request = event.request;
	var url = new URL(request.url);

	// Only worry about GET requests and certain domains
	if (request.method !== "GET" || !isOfflineOrigin(url.origin)) {
		return;
	}

	// For HTML try the network first, fall back to the cache, and then
	// finally the offline page
	if (request.headers.get("Accept").indexOf("text/html") !== -1) {
		event.respondWith(
			fetch(request)
				.then(function(response) {
					var copy = response.clone();
					caches.open(version + "pages")
						.then(function(cache) {
							cache.put(request, copy);
						});
					return response;
				})
				.catch(function() {
					return caches.match(request)
						.then(function(response) {
							return response || caches.match("/offline/");
						});
				})
		);
		return;
	}

	// For non-HTML requests look in the cache first, and fall back to
	// the network
	event.respondWith(
		caches.match(request)
			.then(function(response) {
				return response || fetch(request);
			})
	);
});
