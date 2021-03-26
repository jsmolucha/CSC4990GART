import React from 'react'
import IMAGES from "./IMAGES"
import ReactDOM from 'react-dom';
import Gallery from 'react-grid-gallery';


const Imagegrid = () => {
    return(
        setTimeout(() => {
            ReactDOM.render(<Gallery images={IMAGES}/>, document.getElementById('app'));
        }, 10)
    )
}

export default Imagegrid