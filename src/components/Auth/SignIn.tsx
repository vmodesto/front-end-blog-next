import { ClipLoader } from 'react-spinners';
import styles from '../../../styles/auth.module.scss';
import { AuthErrorMessage } from '../../pages/auth';

interface SignInProps {
	email: string,
	password: string,
	handleInputChange: (e: React.FormEvent<HTMLInputElement>, type: string) => void,
	handleSignInClick: () => void,
	handlePageChange: (number: Number) => void
	errorMessage: AuthErrorMessage,
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
					onChange={
						(e: React.FormEvent<HTMLInputElement>) => {
							props.handleInputChange(e, "email")
						}
					}
				/>
				{props.errorMessage.email !== "" && 
					<small
						className={styles.errorMessage}
					>
						{props.errorMessage.email}
					</small>
				}
				<input
					placeholder="Password"
					type="password"
					onChange={
						(e: React.FormEvent<HTMLInputElement>) => {
							props.handleInputChange(e, "password")
						}
					}
				/>
				{props.errorMessage.password !== "" && 
					<small
						className={styles.errorMessage}
					>
						{props.errorMessage.password}
					</small>
				}
				{props.loading === false 
				? 
				<button
					className={styles.nextButton}
					onClick={props.handleSignInClick}
				>
				Sign in
				</button>
				: 
				<ClipLoader 
					css="margin-top: 2rem;"
					color="#fca311"
					loading={props.loading}
				/>
				}
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