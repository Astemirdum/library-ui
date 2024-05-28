import React, { useEffect, useState } from 'react';
import GatewayService from "../API/GatewayService";
import {useFetching} from "../hooks/useFetching";
import {getPageCount} from "../utils/pages";
import LibraryFilter from "../components/Libraries/LibraryFilter";
import LibraryList from "../components/Libraries/LibraryList";
import Loader from "../components/UI/Loader/Loader";
import Pagination from "../components/UI/pagination/Pagination";
import MySelect from "../components/UI/select/MySelect";


function Libraries() {
    const defaultCity = 'Москва'
    const [libraries, setLibraries] = useState([])
    const [city, setCity] = useState(defaultCity)
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);

    const [fetchLibraries, isLibsLoading, libError] = useFetching(async (city, limit, page) => {
        try {
            const response = await GatewayService.fetchLibraries(city, limit, page);
            console.log('fetchLibraries data:', response.data);
            setLibraries([...response.data.items]);
            const totalCount = response.data.totalElements;
            setTotalPages(getPageCount(totalCount, limit));
        } catch(error){
            console.error('fetchLibraries error:', error)
        } 
    })

    useEffect(() => {
        fetchLibraries(city, limit, page)
    }, [city, limit, page])

    const changePage = (page) => {
        setPage(page);
    }

    return (
        <div className="App">
            <hr style={{margin: '15px 0'}}/>
            <LibraryFilter
                filter={city}
                setFilter={setCity}
            />
            <MySelect
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue="Кол-во элементов на странице"
                options={[
                    {value: 1, name: '1'},
                    {value: 5, name: '5'},
                    {value: 10, name: '10'},
                    {value: -1, name: 'Показать все'},
                ]}
            />
            {libError && <h1>Произошла ошибка ${libError}</h1>}
            <LibraryList libraries={libraries}/>
            {isLibsLoading &&
            <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div>
            }
            <Pagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}
            />
        </div>
    );
}

export default Libraries;
