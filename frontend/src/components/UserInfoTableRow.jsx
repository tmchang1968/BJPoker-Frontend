import React from "react";
import "../styles/UserInfoTableRow.css"

function UserInfoTableRow({ userInfo, onDelete }) {
    const formattedDate = new Date(userInfo.created_at).toLocaleDateString("zh-TW")
    // console.log(note)

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
            <th scope="row">{userInfo.user_no}</th>
            <td>{userInfo.user_name}</td>
            <td>{userInfo.user_email}</td>
            <td>{formattedDate}</td>
        </tr>
    );
}

export default UserInfoTableRow
