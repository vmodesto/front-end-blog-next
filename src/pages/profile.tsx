import { Header } from "../components/Header";
import styles from '../../styles/Profile.module.scss';
import { IoMdPerson } from "react-icons/io";
import { MdModeEditOutline } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import api from "../api/api";
import StoreContext from "../components/Store/Context";

export default function Profile() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [user, setUser] = useState({
                                  avatar: "",
                                  name: "", 
                                  email: "", 
                                  });
  const {userData} = useContext<any>(StoreContext);
  useEffect(() => {
    setUser(userData.user);
  }, [])
  const handleUserChange = (type: any, attr: string) => {
    setUser({...user, [type]: attr})
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.avatarContainer}>
          {user.avatar === null
            ? <IoMdPerson className={styles.avatarIcon} />
            : <img
              className={styles.profileImage}
              src={user.avatar}
            />}
          <div className={styles.editAvatarCircle}>
            <MdModeEditOutline className={styles.editAvatarIcon} />
          </div>
        </div>
        <div className={styles.inputGroup}>
          <h2>Edit profile</h2>
          <label>Email</label>
          <input
            disabled={isDisabled}
            value={user.email}
            onChange={(e) => handleUserChange("email", e.currentTarget.value)}
          />
          <label>Name</label>
          <input
            type="text"
            disabled={isDisabled}
            value={user.name}
            onChange={(e) => handleUserChange("name", e.currentTarget.value)}
          />
          <label>Password</label>
          <input
            disabled={isDisabled}
          />
          <label>New password</label>
          <input className={styles.passwordD}
            disabled={isDisabled}
          />
          <div className={styles.editButtons}>
            <button
              id={styles.editProfileButton}
              onClick={() => setIsDisabled(false)}>
              Edit profile
            </button>
            <button id={styles.saveChangesButton}>Save changes</button>
          </div>
        </div>
        <div className={styles.inputGroup}>
          <h2>My articles</h2>
        </div>
      </div>
    </>
  )
}