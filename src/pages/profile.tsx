import { Header } from "../components/Header";
import styles from '../../styles/Profile.module.scss';
import { IoMdPerson } from "react-icons/io";
import { MdModeEditOutline } from "react-icons/md";
import React, { useContext, useEffect, useState } from "react";
import api from "../api/api";
import StoreContext from "../components/Store/Context";
import { ClipLoader } from "react-spinners";
import { blogUploadUrl, blogUserUrl } from "../shared/api_endpoints";
import router from "next/router";
import ReactModal from "react-modal";

type User = {
  avatar: any,
  name: string,
  email: string,
  currentPassword: string,
  newPassword: string
}

export default function Profile() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const { userData, setUserData } = useContext<any>(StoreContext);
  const [user, setUser] = useState<User>({
    avatar: null,
    name: "",
    email: "",
    currentPassword: "",
    newPassword: ""
  });
  useEffect(() => {
    if(userData !== null) {
      setUser(userData.user);
    }
  }, [])

  const handleUserChange = (e: any) => {
    let value = null;
    if (e.target.id === 'avatar') {
      value = e.target.files[0];
    } else {
      value = e.target.value;
    }
    setUser({ ...user, [e.target.id]: value })
  }

  const handleSaveChanges = async () => {
    const formData = new FormData();
    try {
      formData.append("avatar", user.avatar)
      await api.patch(blogUploadUrl + '/users/avatar/update',
        formData,
        { headers: { Authorization: `Bearer ${userData?.token}` } })
      const response = await api.put(blogUserUrl + '/users/update',
      {
        "email": user.email,
        "name": user.name,
        "current_password": user.currentPassword,
        "new_password": user.newPassword
      },{headers: {Authorization: `Bearer ${userData?.token}`}});
      setResponseMessage("Updated profile!");
      const newUser = response.data;
      setUserData({token: userData.token, user: response.data});
      setIsLoading(false);
      router.reload();
    } catch (error: any) {
      setResponseMessage(error.response.data.error)
    }
  }
  const openModal = () => {
    setIsOpen(true);
  }
  const closeModal = () => {
    setIsOpen(false);
  }

  const handleLogoutClick = () => {
    
  }

  const redirectToSignIn = () => {
    router.push('/auth');
  }

  return (
    <>
    {console.log(user.avatar)}
      {userData === null ? <>{redirectToSignIn()}</> :
      <>
      <Header />
      {responseMessage !== "" &&
        <small
          className={
            responseMessage === "Updated profile!"
              ? "responseMessageSuccess"
              : "responseMessageFailure"
          }
        >{responseMessage}
        </small>
      }
      <div className={styles.container}>
        <div className={styles.avatarContainer}>
          {user.avatar === null
            ? <IoMdPerson className={styles.avatarIcon} />
            : <img
              className={styles.profileImage}
              src={user.avatar !== null ? user.avatar : URL.createObjectURL(user.avatar)}
            />}
          <div className={styles.editAvatarCircle}>
            <MdModeEditOutline className={styles.editAvatarIcon} />
            <input
              type="file"
              id="avatar"
              className={styles.inputAvatar}
              onChange={handleUserChange}
            />
          </div>
        </div>
        <div className={styles.inputGroup}>
          <h2>Edit profile</h2>
          <label>Email</label>
          <input
            type="email"
            id="email"
            disabled={isDisabled}
            value={user.email}
            onChange={handleUserChange}
          />
          <label>Name</label>
          <input
            type="text"
            id="name"
            disabled={isDisabled}
            value={user.name}
            onChange={handleUserChange}
          />
          <label>Current Password</label>
          <input
            id="currentPassword"
            disabled={isDisabled}
            value={user.currentPassword}
            onChange={handleUserChange}
          />
          <label>New password</label>
          <input
            id="newPassword"
            className={styles.password}
            disabled={isDisabled}
            value={user.newPassword}
            onChange={handleUserChange}
          />
          <div className={styles.editButtons}>
            <button
              id={styles.editProfileButton}
              onClick={() => setIsDisabled(false)}>
              Edit profile
            </button>
            {isLoading === false ?
              <button
                id={styles.saveChangesButton}
                onClick={handleSaveChanges}
              >
                Save changes
              </button>
              :
              <ClipLoader
                css="margin-top: 2rem;"
                color="#fca311"
                loading={isLoading}
              />
            }
          </div>
        </div>
        <div className={styles.inputGroup}>
          <h2>My articles</h2>
        </div>
        <button id={styles.logout} onClick={openModal}>Logout</button>
      </div>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className={styles.logoutModal}
        ariaHideApp={false}
      >
        <h3>Are you sure?</h3>
        <button onClick={() => setUserData(null)}>Yes</button>
      </ReactModal>
      </>
      }
    </>
  )
}