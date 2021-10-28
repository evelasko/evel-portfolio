import React from "react"
import "../../../node_modules/react-image-gallery/styles/scss/image-gallery.scss"
import ReactImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import PropTypes, { InferProps } from "prop-types";

const ImageGallery = ({images}: InferProps<typeof ImageGallery.propTypes>) => {
    return (
        <ReactImageGallery
            items={images}
            infinite
            lazyLoad
            autoPlay
            showBullets
        />
    );
};

ImageGallery.propTypes = {
    images: PropTypes.array
}

export default ImageGallery;