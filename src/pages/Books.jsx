import React, {useEffect, useState} from 'react';
import {useFetching} from "../hooks/useFetching";
import {getPageCount} from "../utils/pages";
import BookList from "../components/Books/BookList";
import Loader from "../components/UI/Loader/Loader";
import {useParams} from 'react-router-dom';
import Pagination from "../components/UI/pagination/Pagination";
import MySelect from "../components/UI/select/MySelect";
import GatewayService from '../API/GatewayService';


function Books() {
    const params = useParams();
    const [books, setBooks] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [showAll, setShowAll] = useState(false);

    const libraryUid = params.libraryUid;


    const [fetchBooks, isBooksLoading, booksError] = useFetching(async (libraryUid, limit, page, showAll) => {
        try {
            const response = await GatewayService.fetchBooks(libraryUid, limit, page, showAll);
            console.log('fetchBooks data:', response.data);
            setBooks([...response.data.items]);
            const totalCount = response.data.totalElements;
            setTotalPages(getPageCount(totalCount, limit));
        }catch(error){
            console.error('fetchBooks error:', error)
        }
    })

    useEffect(() => {
        fetchBooks(libraryUid, limit, page, showAll)
    }, [page, limit, showAll])

    const changePage = (page) => {
        setPage(page)
    }

    return (
        <div className="App">
            <hr style={{margin: '15px 0'}}/>
            <MySelect
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue="Кол-во элементов на странице"
                options={[
                    {value: 5, name: '5'},
                    {value: 10, name: '10'},
                    {value: -1, name: 'Показать все'},
                ]}
            />
            <MySelect
                value={showAll}
                onChange={value => setShowAll(value)}
                defaultValue="show all yes"
                options={[
                    {value: true, name: 'yes'},
                    {value: false, name: 'no'},
                ]}
            />
            {booksError &&<h1>Произошла ошибка ${booksError}</h1>}
            <BookList books={books} libraryUid={libraryUid}/>
            {isBooksLoading &&
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

export default Books;
