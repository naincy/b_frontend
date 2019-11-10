importScripts('https://www.gstatic.com/firebasejs/5.8.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.8.2/firebase-messaging.js');

const version = '1.0.1';
const cacheName = `push-${version}`;

var urlsToCache = [ 'manifest.json' ];

self.addEventListener('install', function(event) {
	// Perform install steps
	// console.log('installing sw');
	event.waitUntil(
		caches.open(cacheName).then(function(cache) {
			// console.log('Opened cache');
			var x = cache.addAll(urlsToCache);
			// console.log('cache added');
			return x;
		})
	);
});

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request).then(function(response) {
			// Cache hit - return response
			if (response) {
				return response;
			}
			return fetch(event.request);
		})
	);
});

self.addEventListener('activate', (event) => {
	event.waitUntil(self.clients.claim());
});

//const messaging = firebase.messaging();

self.addEventListener('push', function(event) {
	// console.log('Notification Received.');

	var eventData = event.data.text();
	var obj = JSON.parse(eventData); //Parse the received JSON object.
	const options = {
		icon: obj.notification.icon
	};

	if (obj.data['gcm.notification.showbanner'] === 'true') {
		options.image = obj.data['gcm.notification.image'];
	}

	options.body = obj.notification.body;
	const title = obj.notification.title;
	event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
	event.notification.close();
	// console.log('Notification Clicked.');
});
