import React, { useState } from 'react';
import Link from 'next/link';

import styles from '../../styles/auth.module.scss';

export default function Auth() {
	const [pageIndex, setPageIndex] = useState(0);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailErrorMessage, setEmailErrorMessage] = useState("");
	const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
	const [usernameErrorMessage, setUsernameErrorMessage] = useState("");

	const handleUsernameChange = (e: React.FormEvent<HTMLInputElement>) => {
		setUsername(e.currentTarget.value);
	}

	const handleEmailChange = (e: React.FormEvent<HTMLInputElement>) => {
		setEmail(e.currentTarget.value);
	}

	const handlePasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
		setPassword(e.currentTarget.value);
	}

	const handleSignInClick = () => {
		// if(username.length < 6){
		// 	setErrorMessages({...errorMessages, username: "Enter a longer name"})
		// }
		if(email.length < 6) {
			setEmailErrorMessage("Invalid email")
		}
		if(password.length < 6) {
			setPasswordErrorMessage("Invalid password")
		}
		
	}

	const handleSignUpClick = () => {
		// if(username.length < 6){
		// 	setErrorMessages({...errorMessages, username: "Enter a longer name"})
		// }
		if(email.length < 6) {
			setEmailErrorMessage("Invalid email format");
		}
		if(password.length < 6) {
			setPasswordErrorMessage("Enter a longer password");
		}
		if(username.length < 6) {
			setUsernameErrorMessage("Enter a longer name");
		}
	}

	return (
		<>
			{pageIndex ===0 ? <div className={styles.container}>
				<h1>Blog</h1>
				<div className={styles.formGroup}>
					<h2>Login</h2>
					<input 
						placeholder="Email"
						value={email}
						onChange={handleEmailChange}
					/>
					<small className={styles.errorMessage}>{emailErrorMessage}</small>
					<input
						placeholder="Password"
						onChange={handlePasswordChange}
					/>
					<small className={styles.errorMessage}>{passwordErrorMessage}</small>

						<a href="/"><button
							className={styles.nextButton}
							onClick={handleSignInClick}
						>
							Sign in
						</button></a>

					<small
						className={styles.smallAuth}
						onClick={
						() => { 
							setPageIndex(1);
							setUsername("");
							setEmail("");
							setPassword("");
							setPasswordErrorMessage("");
							setUsernameErrorMessage("");
							setEmailErrorMessage("")
						}
					}>
							Create account
					</small>
				</div>
			</div>
			:
			<div className={styles.container}>
				<h1>Blog</h1>
				<div className={styles.formGroup}>
					<h2>Register</h2>
					<input
						placeholder="Username"
						onChange={handleUsernameChange}
						value={username}
					/>
					<small className={styles.errorMessage}>{usernameErrorMessage}</small>
					<input
						placeholder="Email"
						onChange={handleEmailChange}
						value={email}
					/>
					<small className={styles.errorMessage}>{emailErrorMessage}</small>
					<input
						placeholder="Password"
						onChange={handlePasswordChange}
						value={password}
					/>
					<small className={styles.errorMessage}>{passwordErrorMessage}</small>
					<button
						className={styles.nextButton}
						onClick={handleSignUpClick}
					>
						Sign up
					</button>
					<small
						className={styles.smallAuth}
						onClick={
							
							() => { 
								setPageIndex(0);
								setUsername("");
								setEmail("");
								setPassword("");
								setPassword("")
								setPasswordErrorMessage("");
								setUsernameErrorMessage("");
								setEmailErrorMessage("")
							}
						}>
						Sign in
					</small>
				</div>
				
			</div>
			}
		</>
	)
}