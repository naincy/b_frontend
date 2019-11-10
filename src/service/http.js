import axios from 'axios';

axios.defaults.timeout = 600000;
//axios.defaults.baseURL = 'http://ec2-13-234-59-232.ap-south-1.compute.amazonaws.com/app/api/v1/';
// axios.defaults.baseURL = 'https://7x0q649ji7.execute-api.ap-south-1.amazonaws.com/stage';
axios.defaults.baseURL = 'https://0un4mtvuv9.execute-api.ap-south-1.amazonaws.com/stage';
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


axios.interceptors.request.use(
	(config) => {
		return config;
	},
	(err) => {
		return Promise.reject(err);
	}
);
export function get(url, params = {}) {
	return new Promise((resolve, reject) => {
		axios
			.get(url, {
				params: params
			})
			.then((response) => {
				resolve(response.data);
			})
			.catch((err) => {
				reject(err);
			});
	});
}

/*
 * post 
 * */
export function post(url, data = {}) {
	return new Promise((resolve, reject) => {
		axios.post(url, data).then((response) => {
			resolve(response.data);
		});
	});
}

/**
 * put 
 * */
export function put(url, data = {}) {
	return new Promise((resolve, reject) => {
		axios.put(url, data).then((response) => {
			resolve(response.data);
		});
	});
}

/*
 * patch  
 * */
export function patch(url, data = {}) {
	return new Promise((resolve, reject) => {
		axios.patch(url, data).then((response) => {
			resolve(response.data);
		});
	});
}

/* Login Service */
export function authenticateUser(data) {
	return axios({
		// url: '/login',
		url: 'http://10.150.122.218:8000/app/api/v1/authenticate_user',
		method: 'POST',
		data: data
	});
}

export function registerUser(data) {
	return axios({
		url: 'http://10.150.122.218:8000/app/api/v1/register_user',
		method: 'POST',
		data: data
	});
}

/* Search Service */
export function searchService(key,level) {
	return axios({
		url: `/search?skills=${key}&levels=${level}`,
		method: 'get'
	});
}

/* Search Service */
export function saveUserData(data) {
	return axios({
		url: 'http://10.150.122.218:8000/app/api/v1/user',
		method: 'POST',
		data: data
	});
}

/*  get User List */
export function userList(data) {
	return axios({
		url: '/users',
		method: 'get',
		data: data
	});
}

export function getNotifyUser(data) {
	return axios({
		url: '/personalizedNotification',
		method: 'post',
		data: data
	});
}

export function getRecommendations(email) {
	return axios({
		url: '/recommendations',
		method: 'get',
		headers: {
			email: email
		}
	});
}

export function getHistoryRecommendations(email) {
	return axios({
		url: '/recommendations?type=history',
		method: 'get',
		headers: {
			email: email
		}
	});
}

export function getInterestRecommendations(email) {
	return axios({
		url: '/recommendations?type=interests',
		method: 'get',
		headers: {
			email: email
		}
	});
}

export function getCollaborativeDataForUser(email) {
	return axios({
		url: `/collaborativeSearch?email=${email}`,
		method: 'get'
	});
}
