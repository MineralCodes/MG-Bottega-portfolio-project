import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
 
export default function (props) {
    const portfolioList = props.data.map(item => {
        return (
            <div key={item.id} className="portfolio-item-thumb">
                <div className="portfolio-thumb-image"><img src={item.thumb_image_url} /></div>
                <div className="portfolio-thumb-content">
                    <h1 className="portfolio-thumb-title">{item.name}</h1>
                    
                    <div className="actions">
                        <a className="action-icon edit" onClick={() => props.handleEditClick(item)}>
                            <FontAwesomeIcon icon="edit" />
                        </a>
                        
                        <a className="action-icon delete" onClick={() => props.handleDeleteClick(item)}>
                            <FontAwesomeIcon icon="trash" />
                        </a>
                    </div>
                </div>
            </div>
        )
    })
    
    return (
        <div className="portfolio-sidebar-list-wrapper">{portfolioList}</div>
    );
}