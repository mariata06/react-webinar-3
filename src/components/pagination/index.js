// import {memo} from "react";
// import PropTypes from 'prop-types';
import './style.css';

function Pagination(props){
    let pageLinks = [];
    for(let i=0; i<props.maxPage; i++) {
        pageLinks.push(i);            
    }

    return (
        <div className='Pagination'>{
            pageLinks.map((i, page) => 
                <div key={i} className="Pagination-page">
                    {!((page < props.currentPage - 1) && (page > 0)) &&
                     !((page > props.currentPage + 1) && (page < props.maxPage-1)) && 
                        <a onClick={() => props.changePageHandler(page)} href="#" className={page === props.currentPage? "Pagination-link is-active" : "Pagination-link"}>
                            {page + 1}
                        </a>}

                    {(((page < props.currentPage - 1) && (page > 0) && (page===1)) ||
                    ((page > props.currentPage + 1) && (page < props.maxPage-1) && (page===props.maxPage-2))) && <span>...</span>}
                </div>
                      
            )
        }
        </div>
    )
}

export default Pagination;
