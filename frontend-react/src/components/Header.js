import "./Header.css";
import { Link } from "react-router-dom";
import React from "react";
import "antd/dist/antd.css";
import { Button } from "antd";

function Header() {
	return (
		<div class="Header">
			<div class="Buttons">
				<Link to="/">
					<img class="pic" src="/logo192.png" alt="logo"></img>
				</Link>
			</div>
			<div class="Logo">
				<Link to="/addPost">
					<Button type="default">Add post</Button>
				</Link>
				<Link to="/posts">
					<Button type="default">View posts</Button>
				</Link>
				<Link to="/login">
					<Button type="default">Login</Button>
				</Link>
			</div>
		</div>
	);
}

export default Header;
