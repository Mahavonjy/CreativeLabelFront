import React, {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import "../../assets/css/style/Results.css"

/**
 * @return {null}
 */
function Pagination(props) {

    const results = useSelector(state => state.KantobizSearch.results);

    const isMounted = useRef(false);
    const [pager, setPager] = useState({});
    const loading = useSelector(state => state.KantobizSearch.loading);

    const setPage = (page) => {
        let items = props.items;
        let tmp_pager = {...pager};

        if (page < 1 || page > pager.totalPages)
            return;

        // get new pager object for specified page
        tmp_pager = getPager(items.length, page);

        // get new page of items from items array
        let pageOfItems = items.slice(tmp_pager.startIndex, tmp_pager.endIndex + 1);

        // update state
        setPager(tmp_pager);

        // call change page function in parent component
        props.onChangePage(pageOfItems);
    };

    const getPager = (totalItems, currentPage, pageSize) => {
        // default to first page
        currentPage = currentPage || 1;

        // default page size is 10
        pageSize = pageSize || 8;

        // calculate total pages
        let totalPages = Math.ceil(totalItems / pageSize);

        let startPage, endPage;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        let pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    };

    useEffect(() => {
        if (props.items && props.items.length) {
            setPage(props.initialPage);
        }

        return () => {
            isMounted.current = true
        };
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [loading, results]);

    if (!pager.pages || pager.pages.length <= 1) {
        // don't display pager if there is only 1 page
        if (props.items.length === 0)
            return <p className="text-red center-center m-5">0 prestations trouvé</p>;
        return null;
    } else {
        return (
            <ul className="pagination row justify-content-center">
                <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                    <button className="btn btn-outline-info" onClick={() => setPage(1)}>Première Page</button>
                </li>
                <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                    <button className="btn btn-outline-success" onClick={() => setPage(pager.currentPage - 1)}>
                        Précédent
                    </button>
                </li>
                {pager.pages.map((page, index) =>
                    <li key={index}>
                        <button className={
                            pager.currentPage === page
                                ? 'btn text-red bg-info'
                                : 'btn text-red btn-outline-light'}
                                onClick={() => setPage(page)}>{page}
                        </button>
                    </li>
                )}
                <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                    <button className="btn btn-outline-success" onClick={() => setPage(pager.currentPage + 1)}>
                        Suivant
                    </button>
                </li>
                <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                    <button className="btn btn-outline-info" onClick={() => setPage(pager.totalPages)}>
                        Dernière Page
                    </button>
                </li>
            </ul>
        );
    }

}

export default Pagination;
