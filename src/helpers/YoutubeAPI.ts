import axios from 'axios';
import { get } from 'lodash';
import urlParser from 'url';
import queryString from 'query-string';

const API_KEY = 'AIzaSyDGr1YHwvnFICW-Uq6OpNW3WkFTPuEFLy4';

export interface IVideoInfo {
	kind?: string,
	id?: string,
	snippet?: {
		title?: string,
		description?: string,
		thumbnails?: {
			medium?: any,
			high?: any,
		}
	}
}

class YoutubeAPI {
	getVideoId = (url: string) => {
		if (!url) return '';
		let parseObj = urlParser.parse(url);
		if (url.indexOf('youtu.be') > 0) {
			return parseObj.pathname?.replace('/', '');
		}
		if (url.indexOf('youtube.com/watch') > 0 && !!parseObj.query) {
			let objQuery = queryString.parse(parseObj.query);
			return objQuery?.v;
		}
		return '';
	}

	getVideoInfo = async (url: string) => {
		let videoId = this.getVideoId(url);
		if (!videoId) return;
		try {
			let res = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet&id=${videoId}&key=${API_KEY}`);
			let videoItem: IVideoInfo = get(res, 'data.items[0]');
			if (!videoItem) return;
			return videoItem;
		} catch (error) {
			return;
		}
	}
}

export default new YoutubeAPI;
