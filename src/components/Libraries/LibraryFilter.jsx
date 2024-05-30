import React from 'react';
import MySelect from "../UI/select/MySelect";

const LibraryFilter = ({filter, setFilter}) => {
    return (
        <div>
            <MySelect
                value={filter}
                onChange={e => setFilter(e)}
                defaultValue="Москва"
                options={[{value: 'Москва', name: "Москва"}]}
            />
        </div>
    );
};

export default LibraryFilter;
