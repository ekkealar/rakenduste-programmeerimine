import { useContext, useState, useEffect } from "react";
import { Context } from "../store";
import { addPost } from "../store/actions";
import { Table, message } from "antd";

function Posts() {
	const [post] = useState("");
	const [firstName, setFirstName] = useState("");
	const [requestData] = useState("");
	const [lastName, setLastName] = useState("");
	const [state, dispatch] = useContext(Context);
	console.log(state);

	useEffect(() => {
		fetch("http://localhost:8081/api/post/")
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error("Error fetching posts!");
				}
			})
			.then((data) => {
				fetchNames();
			})
			.catch((error) => {
				displayError(error);
			});
	}, [requestData]);

	function fetchNames() {
		if (state.auth.email != undefined) {
			return fetch("http://localhost:8081/api/auth/" + state.auth.email)
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					setFirstName(data.firstName);
					setLastName(data.lastName);
				})
				.catch((error) => {
					displayError(error);
				});
		} else {
			return;
		}
	}

	function postFetch() {
		const newPost = {
			_id: Date.now(),
			firstName: firstName,
			lastName: lastName,
			userEmail: state.auth.email,
			post: post,
		};
		return fetch("http://localhost:8081/api/post/create", {
			method: "POST",
			body: JSON.stringify(newPost),
			headers: { "Content-Type": "application/json" },
		})
			.then(() => {
				displaySuccess("Post successfully created!");
				dispatch(addPost(newPost));
			})
			.catch((error) => {
				displayError(error);
			});
	}

	const displaySuccess = (success) => {
		message.success(success);
	};

	const displayError = (error) => {
		message.error(error.toString());
	};

	const columns = [
		{
			title: "First Name",
			dataIndex: "firstName",
			key: "firstname",
		},
		{
			title: "Last Name",
			dataIndex: "lastName",
			key: "lastname",
		},
		{
			title: "Post",
			dataIndex: "post",
			key: "post",
		},
	];

	let rows;
	if (state.posts.data !== undefined) {
		const iteratedData = state.posts.data.map((row) => ({
			key: row._id,
			firstName: row.firstName,
			lastName: row.lastName,
			post: row.post,
		}));

		rows = [...iteratedData];
	} else {
		rows = [];
	}

	return (
		<div>
			<h1 style={{ textAlign: "center" }}>Table of posts</h1>
			<Table dataSource={rows} columns={columns} />
		</div>
	);
}

export default Posts;
