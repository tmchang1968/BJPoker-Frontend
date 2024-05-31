import React from "react";
import "../styles/UserInfoTableRow.css"

function UserInfoTableRow({ note, onDelete }) {
    const formattedDate = new Date(note.created_at).toLocaleDateString("zh-TW")

    return (
        // <div className="note-container">
        //     <p className="note-title">{note.title}</p>
        //     <p className="note-content">{note.content}</p>
        //     <p className="note-date">{formattedDate}</p>
        //     <button className="delete-button" onClick={() => onDelete(note.id)}>
        //         Delete
        //     </button>
        // </div>

        <tr>
            <th scope="row">{note.id}</th>
            <td>{note.title}</td>
            <td>{note.content}</td>
            <td>{formattedDate}</td>
        </tr>
    );
}

export default UserInfoTableRow
