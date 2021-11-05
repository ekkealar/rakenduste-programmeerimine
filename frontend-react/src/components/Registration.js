import { useContext, useState } from "react";
import { Context } from "../store";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Form, Input, message, Button } from "antd";
import { Link } from "react-router-dom";
import "./App.css";

function Registration() {
	const history = useHistory();
	const onFinish = (values) => {
		const registration = {
			firstName: values.firstName,
			lastName: values.lastName,
			email: values.email,
			password: values.password,
			passwordConfirmation: values.confirm,
		};
		fetch("http://localhost:8081/api/auth/" + registration.email)
			.then((response) => {
				if (response.ok) {
					throw new Error("Account with the same email address already exists!");
				} else {
					signUp(registration);
				}
			})
			.catch((error) => {
				displayError(error);
			});
	};

	const signUp = (registration) => {
		fetch("http://localhost:8081/api/auth/signup/", {
			method: "POST",
			body: JSON.stringify(registration),
			headers: { "Content-Type": "application/json" },
		})
			.then((response) => {
				if (response.ok) {
					let successEvent = "Account successfully created!";
					displaySuccess(successEvent);
					return history.replace("/account");
				} else {
					throw new Error("Error signing up!");
				}
			})
			.catch((error) => {
				displayError(error);
			});
	};

	const displayError = (error) => {
		message.error(error.toString());
	};

	const displaySuccess = (success) => {
		message.success(success);
	};

	const formItemLayout = {
		labelCol: {
			xs: {
				span: 7,
			},
		},
		wrapperCol: {
			xs: {
				span: 10,
			},
		},
	};
	const tailFormItemLayout = {
		wrapperCol: {
			xs: {},
		},
	};

	const [form] = Form.useForm();

	return (
		<div>
			<h1>Create your account</h1>
			<Form {...formItemLayout} form={form} name="register">
				<Form.Item
					name="firstName"
					label="First Name"
					rules={[
						{
							required: true,
							message: "first name!",
							whitespace: true,
						},
						{
							min: 2,
							message: "Minimum 2 characters!",
							whitespace: true,
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name="lastName"
					label="Last Name"
					rules={[
						{
							required: true,
							message: "last name!",
							whitespace: true,
						},
						{
							min: 2,
							message: "Minimum 2 characters!",
							whitespace: true,
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name="email"
					label="E-mail"
					rules={[
						{
							type: "email",
							message: "not a valid E-mail!",
						},
						{
							required: true,
							message: "input your e-mail!",
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item name="password" label="Password" hasFeedback>
					<Input.Password />
				</Form.Item>

				<Form.Item name="confirm" label="Confirm Password" dependencies={["password"]} hasFeedback>
					<Input.Password />
				</Form.Item>

				<Form.Item {...tailFormItemLayout}>
					<div class="Button">
						<Button type="default" htmlType="submit">
							Register
						</Button>
					</div>
				</Form.Item>
			</Form>
		</div>
	);
}

export default Registration;
