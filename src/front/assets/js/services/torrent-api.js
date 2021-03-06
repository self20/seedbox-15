/**
 * Created by MaximeMaillet on 30/06/2017.
 */

'use strict';

angular
	.module('dragNTorrent')
	.service('torrentApi', ['$http', function($http) {

		const url = '/api';

		function send(method, endpoint, data, headers) {
			return $http({
					'method': method,
					'url': url+endpoint,
					'headers': headers,
					'data': data
				}).then((response) => {
					return response.data;
				}, (error) => {
					throw new Error(error);
				});
		}

		this.download = function(hash) {
			return send('GET', `/torrents/${hash}/download`);
		};

		/**
		 * Put torrent in pause
		 * @param hash
		 */
		this.pause = function(hash) {
			return send('PUT', `/torrents/${hash}/pause`);
		};

		/**
		 * Put torrent in play
		 * @param hash
		 */
		this.play = function(hash) {
			return send('PUT', `/torrents/${hash}/resume`);
		};

		/**
		 * Delete torrent
		 * @param hash
		 */
		this.remove = function(hash) {
			return send('DELETE', `/torrents/${hash}`);
		};

		/**
		 * Get one
		 * @param hash
		 */
		this.get = (hash) => {
			return send('GET', `/torrents/${hash}`);
		};

		/**
		 * Get all with details or not
		 * @param details
		 */
		this.getList = (details) => {
			details = details || false;
			return send('GET', `/torrents?details=${details}`);
		};

		this.getMetadata = (hash) => {
			return send('GET', `/torrents/${hash}/metadata`);
		};

		this.create = (models) => {
			return send('POST', '/torrents', models, {'Content-Type': undefined });
		};
	}]);