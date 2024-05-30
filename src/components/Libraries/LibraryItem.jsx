import React from 'react';
import MyButton from "../UI/button/MyButton";
import { useNavigate } from 'react-router-dom';
// import '../../styles/App.css';

const LibraryItem = ({library}) => {
    const navigate = useNavigate();
    
    return (
        <div className="post">
            <div className="post__content">
                <h2>{library.name}</h2>
                <p>Library UID: {library.libraryUid}</p>
                <p>Address: {library.address}</p>
                <p>City: {library.city}</p>
            </div>
            <div className="post__btns">
                <MyButton onClick={() => navigate(`/libraries/${library.libraryUid}/books?name=${library.name}`)}>
                    Открыть
                </MyButton>
            </div>
        </div>
    );
};

export default LibraryItem;
