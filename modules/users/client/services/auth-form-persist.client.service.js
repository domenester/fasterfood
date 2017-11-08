'use strict';

angular.module('users').service('AuthFormPersist', function () {
	let datas = {
		email: '',
		password: ''
	};

	this.get = function (field) {
		return datas[field];
	};

	this.set = function (field, value) {
		datas[field] = value;
	}

	this.reset = function () {
		for(let key in datas) {
		if (datas.hasOwnProperty(key)) datas[key] = '';     
		}
	}
});