import React, { Component } from "react";
import "../../style/Results.css"

class Pagination extends Component {
    state = {
        isMounted: false,
        pager: {}
    };

    setPage = (page) => {
        let items = this.props.items;
        let pager = this.state.pager;

        if (page < 1 || page > pager.totalPages) {
            return;
        }

        // get new pager object for specified page
        pager = this.getPager(items.length, page);

        // get new page of items from items array
        let pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

        // update state
        this.setState({ pager: pager });

        // call change page function in parent component
        this.props.onChangePage(pageOfItems);
    };

    getPager = (totalItems, currentPage, pageSize) => {
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

    componentDidMount() {
        this.setState({ isMounted: true}, () => {
            if (this.props.items && this.props.items.length) {
                this.setPage(this.props.initialPage);
            }
        })
    }

    componentWillUnmount() {
        this.setState({ isMounted: false });
    }

    render() {
        let pager = this.state.pager;

        if (!pager.pages || pager.pages.length <= 1) {
            // don't display pager if there is only 1 page
            return null;
        }

        return (
            <ul className="pagination row justify-content-center">
                <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                    <button className="btn btn-outline-info" onClick={() => this.setPage(1)}>Première Page</button>
                </li>
                <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                    <button className="btn btn-outline-success" onClick={() => this.setPage(pager.currentPage - 1)}>Précédent</button>
                </li>
                {pager.pages.map((page, index) =>
                    <li key={index}>
                        <button className={pager.currentPage === page ? 'btn text-red bg-info' : 'btn text-red btn-outline-light'}
                                onClick={() => this.setPage(page)}>{page}
                        </button>
                    </li>
                )}
                <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                    <button className="btn btn-outline-success" onClick={() => this.setPage(pager.currentPage + 1)}>Suivant</button>
                </li>
                <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                    <button className="btn btn-outline-info" onClick={() => this.setPage(pager.totalPages)}>Dernière Page</button>
                </li>
            </ul>
        );
    }
}

export default Pagination;
