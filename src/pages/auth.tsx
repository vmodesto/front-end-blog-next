import router from 'next/router';
import React, { useContext, useState } from 'react';

import { SignIn } from '../components/Auth/SignIn';
import { SignUp } from '../components/Auth/SignUp';
import StoreContext from '../components/Store/Context';
import timeout from '../utils/timeout';
import api from '../api/api';
import { blogUserUrl } from '../shared/api_endpoints';
import styles from '../../styles/auth.module.scss';
import Link from 'next/link';

type User = {
	name: string,
	email: string,
	password: string,
}

export interface AuthErrorMessage {
	email: string,
	password: string,
	name: string,
}

export default function Auth() {
	const { setUserData } = useContext(StoreContext);
	const [pageIndex, setPageIndex] = useState<Number>(0);
	const [user, setUser] = useState<User>({name: "", password: "", email: ""});
	const [errorMessage, setErrorMessage] = useState<AuthErrorMessage>(
		{
			email: "",
			password: "",
			name: ""
		}
	)
	const [loading, setLoading] = useState<boolean>(false);
	const [responseMessage, setResponseMessage] = useState<string>("");

	const handleInputChange = (e: React.FormEvent<HTMLInputElement>, type: string) => {
		setUser({...user, [type]: e.currentTarget.value});
	}

	const handlePageChange = (number: Number) => {
		setPageIndex(number);
		setUser({name: "", password: "", email: ""})
		setErrorMessage({email: "", password: "", name: ""});
	}

	const handleSignInClick = async () => {
		setLoading(true);
		if(user.email.length < 6) {
			setErrorMessage({...errorMessage, email: "Invalid email"});
			setLoading(false);
			return;
		}
		setErrorMessage({...errorMessage, email: ""});
		if(user.password.length < 6) {
			setErrorMessage({...errorMessage, password: "Invalid password"});
			setLoading(false);
			return;
		}
		setErrorMessage({...errorMessage, password: ""});
		try {
			await api.post(blogUserUrl + '/authentications/authenticate', {
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

	const handleSignUpClick = async () => {
		setLoading(true);
		if(user.email.length < 6) {
			setErrorMessage({...errorMessage, email: "Invalid email format"});
			setLoading(false);
			return;
		}
		else if(user.name.length < 6) {
			setErrorMessage({...errorMessage, name: "Enter a longer name"});
			setLoading(false);
			return;
		}
		else if(user.password.length < 6) {
			setErrorMessage({...errorMessage, password: "Enter a longer password"});
			setLoading(false);
			return;
		}
		setErrorMessage({name: "", password: "", email: ""});
		try {
			await api.post(blogUserUrl + '/users/create', {
				"name": user.name,
				"email": user.email,
				"password": user.password}
			)
			setResponseMessage('Created Account!');
			timeout(1500);
			router.reload();
		} catch (error: any) {
			setResponseMessage(error.response.data.error);
			setLoading(false);
		}		
	}

	return (
		<>
			{responseMessage !== "" &&
				<small 
					className={
						responseMessage === "Created Account!" 
						? "responseMessageSuccess"
						: "responseMessageFailure"
					}
				>{responseMessage}
				</small>
			}
			<div>
				<Link href="/"><h1 className={styles.title}>Blog</h1></Link>
				{pageIndex ===0 
				? 
				<SignIn
					email={user.email}
					password={user.password}
					handleInputChange={handleInputChange}
					errorMessage={errorMessage}
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
					handleInputChange={handleInputChange}
					errorMessage={errorMessage}
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