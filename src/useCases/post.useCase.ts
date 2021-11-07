import Post from "src/db/schema/Post.schema";

interface IGetPostType {
	limit: number,
	offset: number,
}

const getListPost = async (params: IGetPostType) => {
	let data = await Post.find()
		.sort({ createAt: 1 })
		.skip(params.offset)
		.limit(params.limit)
	return data || [];
}

export const postUseCase = {
	getListPost,
};
