import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import { useHistory } from "react-router-dom";

const UserListItem = (props) => {
	const userContext = useContext(AuthContext);
	const history = useHistory();
	const [color, setColor] = useState(null);
	const [visible, setVisibility] = useState(false);
	const [deleteUserPopup, setDeleteUserPopup] = useState(null);

	const apiCall = (event) => {
		event.preventDefault();

		axios
			.get("/api/users/new-contact/" + props.name)
			.then(() => {
				createChat();
			})
			.then((newContact) => {
				props.loadUsers();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const updateContacts = () => {
		props.getContactList();
	};

	const createChat = () => {
		const data = {
			members: [props.name, userContext.currUser.username],
		};

		const config = {
			withCredentials: true,
			headers: {
				"Content-Type": "application/json",
			},
		};

		axios
			.post("/api/chats", data, config)
			.then(() => {})
			.catch((err) => console.log(err));
	};

	const addUserToGroup = (event) => {
		if (event.target.checked === true) {
			props.getMembersData(props.name, true, color, props.index);
		} else {
			props.getMembersData(props.name, false, color, props.index);
		}
	};

	const deletePopupHandler = () => {
		setDeleteUserPopup(true);
	};

	const clearPopuState = () => {
		setDeleteUserPopup(null);
		setVisibility(false);
	};

	const removeContact = () => {
		axios
			.get("/api/users/remove-contact/" + props.name)
			.then((deletedUser) => {
				updateContacts();
			})
			.catch((err) => console.log(err));
	};

	if (props.selectContact !== undefined) {
		return (
			<div className="user-list-item padding-20 row">
				<div className="col">
					<div className="row height-50 space-between align-center clickable" onClick={() => props.selectContact(props.id)}>
						<h3>{props.name}</h3>
					</div>
					<div className="row height-50 space-between align-center">
						<span>{props.nickname !== "" && props.nickname !== null && props.nickname !== undefined ? props.nickname : null}</span>
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div className="user-list-item padding-20 row">
				<div className="col">
					<div className="row height-50 space-between align-center">
						<h3>{props.name}</h3>
					</div>
					<div className="row height-50 space-between align-center">
						<p>{props.alreadyAdded}</p>
					</div>
				</div>
			</div>
		);
	}
};

export default UserListItem;
