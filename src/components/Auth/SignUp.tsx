import { ClipLoader } from 'react-spinners';
import { ToastContainer } from 'react-toastify';
import styles from '../../../styles/auth.module.scss';

interface SignUpProps {
  name: string,
  email: string,
  password: string,
  handleUsernameChange: (e: React.FormEvent<HTMLInputElement>) => void,
  handleEmailChange: (e: React.FormEvent<HTMLInputElement>) => void,
  handlePasswordChange: (e: React.FormEvent<HTMLInputElement>) => void,
  usernameErrorMessage: string,
  emailErrorMessage: string,
  passwordErrorMessage: string,
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
						onChange={props.handleEmailChange}
						value={props.email}
					/>
          {props.emailErrorMessage !== "" && 
          <small className={styles.errorMessage}>{props.emailErrorMessage}</small>
          }
					<input
						placeholder="Username"
						onChange={props.handleUsernameChange}
						value={props.name}
					/>
					{props.usernameErrorMessage !== "" && 
          <small className={styles.errorMessage}>{props.usernameErrorMessage}</small>
          }
					<input
						placeholder="Password"
						onChange={props.handlePasswordChange}
						value={props.password}
					/>
					{props.passwordErrorMessage !== "" && 
          <small className={styles.errorMessage}>{props.passwordErrorMessage}</small>
          }
					{props.loading === false ? <button
						className={styles.nextButton}
						onClick={props.handleSignUpClick}
					>
						Sign up
					</button> : <ClipLoader css="margin-top: 2rem;" color="#fca311" loading={props.loading}/>}
          <small
						className={styles.smallAuth}
						onClick={
							
							() => { 
								props.handlePageChange(0)
							}
						}>
						Sign in
					</small>
				</div>
				
			</div>
  )
}