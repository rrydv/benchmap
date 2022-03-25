import { useRef, useState } from "react";
import ImageGallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css";
import Cropper from 'cropperjs'

const PopUpGallery = ({images}) =>{
    
    const galleryRef = useRef();
    const [fullScreenImage, setFullScreenImage] = useState(false)
    //generate square thumbnails

    const changeFullScreen = () =>{
        if (!fullScreenImage) {
            galleryRef.current.fullScreen()
            setFullScreenImage(true)
        }
        else {
            galleryRef.current.exitFullScreen()
            setFullScreenImage(false)
    }}

    
    const items = []
    images.map(image => {
        
        items.push({
            original: image
        })

    })
    return (
        <>
        <ImageGallery
        items = {items} 
        ref = {galleryRef}
        
        onClick={() => changeFullScreen()}
        
        />
        
        
        </>

    )

}

export default PopUpGallery