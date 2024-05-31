import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note"
import "../styles/Home.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from "react-bootstrap/Button";

function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        getNotes();
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

    return (
        <div>
            <div>
                <h2>Notes</h2>
                <Button>Test Button</Button>
                {notes.map((note) => (
                    <Note note={note} onDelete={deleteNote} key={note.id} />
                ))}
            </div>
            {/*# (id: 1)*/}
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
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                </tr>
                </thead>
                <tbody>
                {/*# (id: 2)*/}
                {/*{notes.map((note) => (*/}
                {/*    <Note note={note} onDelete={deleteNote} key={note.id} />*/}
                {/*))}*/}

                {/*# (id: 2)*/}
                {notes.map((note) => (
                    <tr key={note.id}>
                        <th scope="row">{note.id}</th>
                        <td>{note.title}</td>
                        <td>{note.content}</td>
                        <td>@mdo</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Home;
