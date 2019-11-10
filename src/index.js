// eslint-disable-next-line
import React, {Component} from 'react';
import {render} from 'react-dom';
import firebase from 'firebase/app';
import 'firebase/messaging';
import App from './App';

render(
	<App />,
	document.getElementById('root')
);

/**
 * 
 * Firebase configuration and Set service worker for invoking user notification.
 */
var config = {
	apiKey: 'AIzaSyCOd4BVz3KTuU3yjnQhT_MK8Bu00VN8X-s',
	authDomain: 'demo2-b245b.firebaseapp.com',
	databaseURL: 'https://demo2-b245b.firebaseio.com',
	projectId: 'demo2-b245b',
	storageBucket: '',
	messagingSenderId: '516399921399'
};

if ('serviceWorker' in navigator) {
	firebase.initializeApp(config);
	var messaging = firebase.messaging();
	messaging
		.requestPermission()
		.then(function() {
			return messaging.getToken();
		})
		.then(function(token) {
			window.localStorage.setItem('deviceToken', token);
		})
		.catch(function(err) {
			// console.log('No Permission!! ', err);
		});

	messaging.onMessage(function(payload) {
		// console.log('Message received. ', payload);
	});

	navigator.serviceWorker
		.register('firebase-messaging-sw.js')
		.then(function(registration) {
			if ('sync' in registration) {
				// console.log('Set reg in store !!!');
			}
			// console.log('Registration successful, scope is:', registration.scope);
		})
		.catch(function(err) {
			console.log('Service worker registration failed, error:', err);
		});
}
