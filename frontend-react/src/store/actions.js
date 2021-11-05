export const POST_ADD = "POST_ADD";
export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";

export const addPost = (post) => ({
	type: POST_ADD,
	payload: post,
});

export const loginUser = (data) => ({
	type: USER_LOGIN,
	payload: data,
});

export const logoutUser = (data) => ({
	type: USER_LOGOUT,
});

const postReducer = (state, action) => {
	switch (action.type) {
		case POST_ADD:
			return {
				...state,
				data: state.data.concat(action.payload),
			};
		default:
			return state;
	}
};

const authReducer = (state, action) => {
	switch (action.type) {
		case USER_LOGIN:
			return {
				...state,
				email: action.payload.email,
				token: action.payload.token,
			};
		case USER_LOGOUT:
			return {
				...state,
				token: null,
				email: null,
			};
		default:
			return state;
	}
};

export { postReducer, authReducer };
