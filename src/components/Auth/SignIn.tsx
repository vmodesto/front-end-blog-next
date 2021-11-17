import { Dispatch, SetStateAction } from 'react';
import { ClipLoader } from 'react-spinners';
import styles from '../../../styles/auth.module.scss';

interface SignInProps {
	handleEmailChange: (e: React.FormEvent<HTMLInputElement>) => void,
	handlePasswordChange: (e: React.FormEvent<HTMLInputElement>) => void,
	email: string,
	password: string,
	emailErrorMessage: string,
	passwordErrorMessage: string,
	handleSignInClick: () => void,
	handlePageChange: (number: Number) => void
	loading: boolean,
	responseMessage: string,
}

export function SignIn(props: SignInProps) {
	return (
		<div className={styles.container}>
			<div className={styles.formGroup}>
				<h2>Login</h2>
				<input
					placeholder="Email"
					value={props.email}
					onChange={props.handleEmailChange}
				/>
				{props.emailErrorMessage !== "" && <small className={styles.errorMessage}>{props.emailErrorMessage}</small>}
				<input
					placeholder="Password"
					onChange={props.handlePasswordChange}
				/>
				{props.passwordErrorMessage !== "" && <small className={styles.errorMessage}>{props.passwordErrorMessage}</small>}
				{props.loading === false ? <button
					className={styles.nextButton}
					onClick={props.handleSignInClick}
				>
					Sign in
				</button> : <ClipLoader css="margin-top: 2rem;" color="#fca311" loading={props.loading}/>}
				<small
					className={styles.smallAuth}
					onClick={
						() => {
							props.handlePageChange(1)
						}
					}>
					Create account
				</small>
			</div>
		</div>
	)
}