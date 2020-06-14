import React from 'react';
import { Link } from 'react-router-dom'
 
export default function () {
    return (
        <div>
            <h2>We Couldnt Find That Page</h2>
            <Link to="/">Return To Homepage</Link>
        </div>
    );
}