import { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import "../styles/NewHome.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from "react-bootstrap/Button";
import UserInfoTableRow from "../components/UserInfoTableRow.jsx";

function NewHome() {
    const [userInfos, setUserInfos] = useState([]);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userBirthyear, setUserBirthyear] = useState("");
    const [userbirthmonth, setUserBirthmonth] = useState("");
    const [userbirthday, setUserBirthday] = useState("");
    const [userAzurerole, setUserAzurerole] = useState("");
    const [userBlackrole, setUserBlackrole] = useState("");
    const [userProfessionArea, setUserProfessionArea] = useState("");
    const [userWorkForUnit, setUserWorkForUnit] = useState("");
    const [userTitle, setUserTitle] = useState("");
    const [userSocialLinkedin, setUserSocialLinkedin] = useState("");
    const [userSocialTwitter, setUserSocialTwitter] = useState("");
    const [userSocialFacebook, setUserSocialFacebookSocialFacebook] = useState("");
    const [userNote, setUserNote] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        getUserInfos();
    }, []);

    const getUserInfos = () => {
        api
            .get("/api/user-info/")
            .then((res) => res.data)
            .then((data) => {
                setUserInfos(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const deleteUserInfos = (user_no) => {
        api
            .delete(`/api/user-info/delete/${user_no}/`)
            .then((res) => {
                if (res.status === 204) alert("UserInfo deleted!");
                else alert("Failed to delete userInfo.");
                getUserInfos();
            })
            .catch((error) => alert(error));
    };

    const createUserInfo = (e) => {
        e.preventDefault();
        api
            .post("/api/user-info/", { userName, userEmail , userBirthyear , userbirthmonth , userbirthday , userAzurerole , userBlackrole , userProfessionArea , userWorkForUnit , userTitle , userSocialLinkedin , userSocialTwitter , userSocialFacebook , userNote })
            .then((res) => {
                if (res.status === 201) alert("UserInfo created!");
                else alert("Failed to make userInfo.");
                getUserInfos();
            })
            .catch((err) => alert(err));
    };

    const handleLogout = () => {
        navigate("/logout");
    };


    return (
        <div>
            <div>
                <Button onClick={() => handleLogout()}>Logout</Button>
                <h2>BJ-Poker Users</h2>

            </div>
            <form onSubmit={createUserInfo}>
                <label htmlFor="userName">Name:</label>
                <br />
                <input
                    type="text"
                    id="userName"
                    name="userName"
                    required
                    onChange={(e) => setUserName(e.target.value)}
                    value={userName}
                />
                <label htmlFor="userEmail">Email:</label>
                <br />
                <input
                    type="text"
                    id="userEmail"
                    name="userEmail"
                    required
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                ></input>
                <br />
                <input type="submit" value="Submit"></input>
            </form>


            <h2>User Infos</h2>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">use_no</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Birthyear</th>
                    <th scope="col">Birthmonth</th>
                    <th scope="col">Birthday</th>
                    <th scope="col">Azurerole</th>
                    <th scope="col">Blackrole</th>
                    <th scope="col">Professionarea</th>
                    <th scope="col">Workforunit</th>
                    <th scope="col">Title</th>
                    <th scope="col">Sociallinkedin</th>
                    <th scope="col">Socialtwitter</th>
                    <th scope="col">Socialfacebook</th>
                    <th scope="col">Note</th>
                    <th scope="col">info_id</th>
                    <th scope="col">created_at</th>
                </tr>
                </thead>
                <tbody>
                {userInfos.map((userInfo) => (
                    <UserInfoTableRow userInfo={userInfo} onDelete={deleteUserInfos} key={userInfo.user_no} />
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default NewHome;
