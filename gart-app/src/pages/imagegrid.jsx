import React from 'react'
import IMAGES from "./IMAGES"
import ReactDOM from 'react-dom';
import Gallery from 'react-grid-gallery';


const Imagegrid = () => {
    return(
        setTimeout(() => {
            ReactDOM.render(<Gallery images={IMAGES}/>, document.getElementById('middle'));
        }, 10)
    )
}

export default Imagegrid