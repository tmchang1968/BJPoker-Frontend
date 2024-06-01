import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note"
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from "react-bootstrap/Button";
import UserInfoTableRow from "../components/UserInfoTableRow.jsx";

function NewHome() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

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
        getNotes();
        getUserInfos();
    }, []);

    const getNotes = () => {
        api
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };
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

    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Note deleted!");
                else alert("Failed to delete note.");
                getNotes();
            })
            .catch((error) => alert(error));
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

    const createNote = (e) => {
        e.preventDefault();
        api
            .post("/api/notes/", { content, title })
            .then((res) => {
                if (res.status === 201) alert("Note created!");
                else alert("Failed to make note.");
                getNotes();
            })
            .catch((err) => alert(err));
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
                <h2>Notes</h2>
                {notes.map((note) => (
                    <Note note={note} onDelete={deleteNote} key={note.id} />
                ))}
            </div>
            {/*# (id: 1) Input Form*/}
            <h2>Create a Note</h2>
            <form onSubmit={createNote}>
                <label htmlFor="title">Name:</label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <label htmlFor="content">Email:</label>
                <br />
                <input
                    id="content"
                    name="content"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></input>
                <br />
                <input type="submit" value="Submit"></input>
            </form>

            {/*# (id: 1)*/}

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
                {/*# (id: 2)*/}
                {/*{notes.map((note) => (*/}
                {/*    <Note note={note} onDelete={deleteNote} key={note.id} />*/}
                {/*))}*/}

                {/*# (id: 2)*/}
                {userInfos.map((userInfo) => (
                    <UserInfoTableRow userInfo={userInfo} onDelete={deleteNote} key={userInfo.user_no} />
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default NewHome;
