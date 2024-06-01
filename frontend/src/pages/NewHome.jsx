import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note"
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
            .post("/api/user-info/", { userName, userEmail })
            .then((res) => {
                if (res.status === 201) alert("UserInfo created!");
                else alert("Failed to make userInfo.");
                getUserInfos();
            })
            .catch((err) => alert(err));
    };

    return (
        <div>
            <div>
                <h2>Notes</h2>
                <Button>Test Button</Button>
                {notes.map((note) => (
                    <Note note={note} onDelete={deleteNote} key={note.id} />
                ))}
            </div>
            {/*# (id: 1) Input Form*/}
            {/*<h2>Create a Note</h2>*/}
            {/*<form onSubmit={createNote}>*/}
            {/*    <label htmlFor="title">Title:</label>*/}
            {/*    <br />*/}
            {/*    <input*/}
            {/*        type="text"*/}
            {/*        id="title"*/}
            {/*        name="title"*/}
            {/*        required*/}
            {/*        onChange={(e) => setTitle(e.target.value)}*/}
            {/*        value={title}*/}
            {/*    />*/}
            {/*    <label htmlFor="content">Content:</label>*/}
            {/*    <br />*/}
            {/*    <textarea*/}
            {/*        id="content"*/}
            {/*        name="content"*/}
            {/*        required*/}
            {/*        value={content}*/}
            {/*        onChange={(e) => setContent(e.target.value)}*/}
            {/*    ></textarea>*/}
            {/*    <br />*/}
            {/*    <input type="submit" value="Submit"></input>*/}
            {/*</form>*/}

            {/*# (id: 1)*/}

            <h2>User Infos</h2>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">use_no</th>
                    <th scope="col">name</th>
                    <th scope="col">email</th>
                    <th scope="col">birthyear</th>
                    <th scope="col">birthmonth</th>
                    <th scope="col">birthday</th>
                    <th scope="col">azurerole</th>
                    <th scope="col">blackrole</th>
                    <th scope="col">professionarea</th>
                    <th scope="col">workforunit</th>
                    <th scope="col">title</th>
                    <th scope="col">sociallinkedin</th>
                    <th scope="col">socialtwitter</th>
                    <th scope="col">socialfacebook</th>
                    <th scope="col">note</th>
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
