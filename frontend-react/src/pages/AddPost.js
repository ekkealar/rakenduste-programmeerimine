import { useContext, useState } from "react";
import { Context } from "../store";
import { Button, Form, Input, message } from "antd";

function AddPost() {
	const [post, setPost] = useState("");
	const [state] = useContext(Context);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");

	const handleSubmit = () => {
		addNewPost();
	};

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
				message.error("post was successfull!");
			})
			.catch((error) => {
				message.error(error);
			});
	}

	const addNewPost = () => {
		if (state.auth.email != null) {
			postFetch();
		} else {
			message.error("has to be logged in!");
		}
	};

	const checkLogin = () => {
		if (state.auth.email != null) {
			return <p>You must be logged in to post.</p>;
		} else {
			return (
				<Form name="basic" onFinish={handleSubmit}>
					<Form.Item
						name="post"
						value="xd"
						onChange={(e) => setPost(e.target.value)}
						rules={[
							{
								required: true,
								message: "post message here",
							},
							{
								max: 200,
								message: "max 200 characters!",
							},
						]}
					>
						<Input.TextArea />
					</Form.Item>
					<div class="Button">
						<Button type="default" htmlType="submit">
							Submit
						</Button>
					</div>
				</Form>
			);
		}
	};

	return (
		<div>
			<div style={{ textAlign: "center" }}>
				<h1>Submit a post</h1>
				{checkLogin()}
			</div>
		</div>
	);
}

export default AddPost;
