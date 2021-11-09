import Post from "src/db/schema/Post.schema";
import User from "src/db/schema/User.schema";
import Exception from "src/exceptions/exception";
import ExceptionCode from "src/exceptions/ExceptionCode";
import ExceptionName from "src/exceptions/ExceptionName";
import YoutubeAPI from "src/helpers/YoutubeAPI";

interface IGetPostType {
	limit: number,
	offset: number,
}
interface ICreatePostType {
	url: string,
	userId: string,
}

const getListPost = async (params: IGetPostType) => {
	let data = await Post.find()
		.sort({ createAt: -1 })
		.skip(params.offset)
		.limit(params.limit)
		.populate('author', ['email'])
	return data || [];
}

const SUPPORTED_LINKS = ['https://www.youtube.com/', 'https://youtu.be/', 'https://youtube.com/']

const createPost = async (params: ICreatePostType) => {
	if (!SUPPORTED_LINKS.some((i) => params.url.startsWith(i))) {
		throw new Exception(ExceptionName.LINK_TYPE_NOT_SUPPORT, ExceptionCode.LINK_TYPE_NOT_SUPPORT)
	}
	const userExisted = await User.findById(params.userId);
	if (!userExisted) {
		throw new Exception(ExceptionName.USER_NOT_FOUND, ExceptionCode.USER_NOT_FOUND)
	}
	let videoInfo = await YoutubeAPI.getVideoInfo(params.url);
	if (!videoInfo) {
		throw new Exception(ExceptionName.CAN_GET_VIDEO_INFO, ExceptionCode.CAN_GET_VIDEO_INFO)
	}
	let post = new Post({
		author: params.userId,
		url: params.url,
		title: videoInfo.snippet?.title,
		description: videoInfo.snippet?.description,
		thumbnail: videoInfo.snippet?.thumbnails?.high?.url,
		youtubeId: videoInfo.id,
	})
	await post.save();
	return post;
}

export const postUseCase = {
	getListPost,
	createPost,
};
