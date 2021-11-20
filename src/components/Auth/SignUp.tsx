import { ClipLoader } from 'react-spinners';
import styles from '../../../styles/auth.module.scss';
import { AuthErrorMessage } from '../../pages/auth';

interface SignUpProps {
	name: string,
	email: string,
	password: string,
	handleInputChange: (e: React.FormEvent<HTMLInputElement>, type: string) => void,
	errorMessage: AuthErrorMessage,
	handleSignUpClick: () => void,
	handlePageChange: (number: Number) => void,
	loading: boolean,
	responseMessage: string,
}

export function SignUp(props: SignUpProps) {
	return (
		<div className={styles.container}>
			<div className={styles.formGroup}>
				<h2>Register</h2>
				<input
					placeholder="Email"
					onChange={
						(e: React.FormEvent<HTMLInputElement>) => {
							props.handleInputChange(e, "email")
						}
					}
					value={props.email}
				/>
				{props.errorMessage.email !== "" &&
					<small
						className={styles.errorMessage}
					>
						{props.errorMessage.email}
					</small>
				}
				<input
					placeholder="Name"
					onChange={
						(e: React.FormEvent<HTMLInputElement>) => {
							props.handleInputChange(e, "name")
						}
					}
					value={props.name}
				/>
				{props.errorMessage.name !== "" &&
					<small
						className={styles.errorMessage}
					>
						{props.errorMessage.name}
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
					value={props.password}
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
						onClick={props.handleSignUpClick}
					>
						Sign up
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
					onClick={() => { props.handlePageChange(0) }}
				>
					Sign in
				</small>
			</div>
		</div>
	)
}