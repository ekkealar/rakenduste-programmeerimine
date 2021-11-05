import { Button } from "antd";
import { useState, useContext, useEffect } from "react";
import { Context } from "../store";
import React from "react";
import { logoutUser } from "../store/actions";

function AccountPage({ inputs }) {
	const [error, setError] = useState("");
	const [firstName, setFirstName] = useState("");
	const [state] = useContext(Context);

	function logout() {
		logoutUser();
	}

	useEffect(() => {
		fetch("http://localhost:8081/api/auth/" + state.auth.email)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				setFirstName(data.firstName);
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
				setError(error);
			});
	}, []);

	return (
		<div>
			<Button type="default" htmlType="logout" onClick={(e) => logout()}>
				Logout
			</Button>
		</div>
	);
}

export default AccountPage;
