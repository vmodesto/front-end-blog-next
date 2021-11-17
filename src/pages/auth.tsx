import axios from 'axios';
import router from 'next/router';
import React, { useContext, useState } from 'react';

import styles from '../../styles/auth.module.scss';
import api from '../api/api';
import { SignIn } from '../components/Auth/SignIn';
import { SignUp } from '../components/Auth/SignUp';
import StoreContext from '../components/Store/Context';

type User = {
	name: string,
	email: string,
	password: string,
}

export default function Auth() {
	const { setUserData } = useContext(StoreContext);
	const [pageIndex, setPageIndex] = useState<Number>(0);
	const [user, setUser] = useState<User>({name: "", password: "", email: ""});
	const [emailErrorMessage, setEmailErrorMessage] = useState("");
	const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
	const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
	const [loading, setLoading] = useState<boolean>(false);
	const [responseMessage, setResponseMessage] = useState("");

	function timeout(delay: number) {
    return new Promise( res => setTimeout(res, delay) );
	}

	const handleUsernameChange = (e: React.FormEvent<HTMLInputElement>) => {
		setUser({...user, name: e.currentTarget.value});
	}

	const handleEmailChange = (e: React.FormEvent<HTMLInputElement>) => {
		setUser({...user, email: e.currentTarget.value});
	}

	const handlePasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
		setUser({...user, password: e.currentTarget.value});
	}

	const handleSignInClick = async () => {
		setLoading(true);
		if(user.email.length < 6) {
			setEmailErrorMessage("Invalid email");
			setLoading(false);
			return;
		}
		setEmailErrorMessage("");
		if(user.password.length < 6) {
			setPasswordErrorMessage("Invalid password");
			setLoading(false);
			return;
		}
		setPasswordErrorMessage("");
		try {
			await api.post('http://54.83.70.8/users-api/authentications/authenticate', {
				"email": user.email,
				"password": user.password 
			}).then(async (response: any) => {
				await timeout(1000);
				setUserData(response.data);
				router.push("/");
			})
		} catch (error) {
			setLoading(false);
			setResponseMessage('Failure to create session');
		}
	}

	const handlePageChange = (number: Number) => {
		setPageIndex(number);
		setUser({name: "", password: "", email: ""})
		setEmailErrorMessage("");
		setPasswordErrorMessage("");
		setUsernameErrorMessage("");
	}

	const handleSignUpClick = async () => {
		setLoading(true);
		if(user.email.length < 6) {
			setEmailErrorMessage("Invalid email format");
			setLoading(false);
			return;
		}
		else if(user.name.length < 6) {
			setUsernameErrorMessage("Enter a longer name");
			setLoading(false);
			return;
		}
		else if(user.password.length < 6) {
			setPasswordErrorMessage("Enter a longer password");
			setLoading(false);
			return;
		}
		setEmailErrorMessage("");
		setPasswordErrorMessage("");
		setUsernameErrorMessage("");
		try {
			await api.post('http://54.83.70.8/users-api/users/create', {
				"name": user.name,
				"email": user.email,
				"password": user.password}
			).then(async (response) => {
				setLoading(false);
				if(response.status === 201){
					setResponseMessage('Created Account!');
					router.push("/auth");
				}else{
					setResponseMessage('Failure to create account!');
				}
			})
		} catch (error: any) {
			setResponseMessage('Failure to create account!');
			setLoading(false);
		}		
	}

	return (
		<>
			{responseMessage !== "" && 
				<small 
					className={
						responseMessage === "Created Account!" 
						? styles.responseMessageSuccess
						: styles.responseMessageFailure
					}
				>{responseMessage}
				</small>
			}
			<div>
				<h1 className={styles.title}>Blog</h1>
				{pageIndex ===0 
				? 
				<SignIn
					email={user.email}
					password={user.password}
					handleEmailChange={handleEmailChange}
					handlePasswordChange={handlePasswordChange}
					emailErrorMessage={emailErrorMessage}
					passwordErrorMessage={passwordErrorMessage}
					handleSignInClick={handleSignInClick}
					handlePageChange={handlePageChange}
					loading={loading}
					responseMessage={responseMessage}
				/>
				:
				<SignUp
					name={user.name}
					email={user.email}
					password={user.password}
					handleUsernameChange={handleUsernameChange}
					handleEmailChange={handleEmailChange}
					handlePasswordChange={handlePasswordChange}
					usernameErrorMessage={usernameErrorMessage}
					emailErrorMessage={emailErrorMessage}
					passwordErrorMessage={passwordErrorMessage}
					handleSignUpClick={handleSignUpClick}
					handlePageChange={handlePageChange}
					loading={loading}
					responseMessage={responseMessage}
				/>
				}
			</div>
		</>
	)
}