import React, { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ChangePassword from '../../components/ChangePassword/ChangePassword';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = location.state || {};
    const [savedUser, setSavedUser] = useState(null);
    const [isChangingPassword, setIsChangingPassword] = useState(false); // Hozzáfűztük a jelszóváltoztatás állapotot
    const [userUploads, setUserUploads] = useState([]);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData) {
          setSavedUser(userData);
        }
      }, []);

      const handleSaveEdit = async (editedUser) => {
        try {
          const response = await axios.put(`http://localhost:3500/updateUser/${user.username}`, editedUser);
    
          if (response.status === 200) {
            setSavedUser(editedUser); // Frissítjük a felhasználó adatait a mentett változatban
          } else {
            console.error('An error occurred while updating user data.');
          }
        } catch (error) {
          console.error('An error occurred:', error);
        }
      };

      const goToUpload = () => {
        navigate("/upload")
      }
    
      const handleChangePasswordClick = () => {
        setIsChangingPassword(true);
      };
    
      // A jelszóváltoztatás visszavonása
      const handleCancelChangePassword = () => {
        setIsChangingPassword(false);
      };

      useEffect(() => {
        const fetchUserUploads = async () => {
            try {
                const response = await axios.get(`http://localhost:3500/uploads/${savedUser.username}`);
                setUserUploads(response.data);
            } catch (error) {
                console.error('An error occurred while fetching user uploads:', error);
            }
        };

        if (savedUser) {
            fetchUserUploads();
        }
    }, [savedUser]);

  return (
    <div className='userprofile-container'>
        {isChangingPassword ? (
            <ChangePassword user={savedUser || user} onSave={handleSaveEdit} onCancel={handleCancelChangePassword} />
        ) : (
            <Fragment>
            {savedUser || user ? (
                <div>
                    <h1>Profil</h1>
                    <table>
                        <tr>
                            <p>Felhasználónév:</p>
                        <td>
                            <p>{savedUser ? savedUser.username : user.username}</p>
                        </td>
                        </tr>
                        <tr>
                            <p>Email:</p>
                        <td>
                            <p>{savedUser ? savedUser.email : user.email}</p>
                        </td>
                        </tr>
                    </table>
                    <button onClick={handleChangePasswordClick}>Jelszó megváltoztatása</button>
                    <button onClick={goToUpload}>Képfeltöltés</button>
                </div>):(
                    <p>Nem vagy bejelentkezve.</p>
                )}
            </Fragment>
        )}
        <div className='userimages'>
            <h2>Feltöltött képek</h2>
              <div className='images'>
              {userUploads.map((upload) => (
                <div key={upload._id}>
                  <img src={upload.img} alt={`Uploaded by ${upload.username}`} />
                  <p>{upload.desc}</p>
                </div>
              ))}
            </div>
          </div>
    </div>
  )
}

export default UserProfile