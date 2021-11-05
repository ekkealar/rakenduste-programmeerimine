import { useContext, useState } from "react";
import { Context } from "../store";
import { Form, Input, Button, message } from "antd";
import { Link } from "react-router-dom";
import { loginUser } from "../store/actions";
import "./App.css";

function Login() {
	const [state, dispatch] = useContext(Context);

	function fetchUserData(attempt) {
		fetch("http://localhost:8081/api/auth/" + attempt.email)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				const login = {
					email: attempt.email,
					token: data.password,
				};
				dispatch(loginUser(login));
			});
	}

	const onFinish = (values) => {
		const loginAttempt = {
			email: values.email,
			password: values.password,
		};
		fetch("http://localhost:8081/api/auth/login/", {
			method: "POST",
			body: JSON.stringify(loginAttempt),
			headers: { "Content-Type": "application/json" },
		})
			.then((response) => {
				if (response.ok) {
					fetchUserData(loginAttempt);
				} else {
					throw new Error("!");
				}
			})
			.catch((error) => {
				displayError(error);
			});
	};

	const displayError = (error) => {
		message.error(error.toString());
	};

	return (
		<div>
			<h1>Sign in</h1>
			<Form class="form" wrapperCol={{ span: 6 }}>
				<Form.Item
					label="Email"
					name="email"
					rules={[
						{
							required: true,
							message: "email!",
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Password"
					name="password"
					rules={[
						{
							required: true,
							message: "password!",
						},
						{
							min: 1,
							message: "!",
						},
					]}
				>
					<Input.Password />
				</Form.Item>
			</Form>
			<div class="Button">
				<Button type="default" htmlType="login">
					Login
				</Button>
			</div>
			<br />
			<div class="Button">
				<Link to="account/registration">
					<Button type="default">new account</Button>
				</Link>
			</div>
			<br />
		</div>
	);
}

export default Login;
