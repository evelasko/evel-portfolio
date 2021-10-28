import React from "react"
import { Link } from "gatsby"
import Button from "../Button/Button"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import PropTypes from "prop-types"

const Feature = ({ feature, category }) => {
    const { name, slug, images, excerpt } = feature
    const image = getImage(images[0])

    return (
        <aside className="features__item">
            <Link to={`/${category}/${slug}`}>
                <GatsbyImage
                    className="features__item--img"
                    image={image}
                    alt="Product Image"
                />
                <div className="features__item--content">
                    {name && <h2>{name}</h2>}
                    {excerpt && <p>{excerpt}</p>}
                    <Button to="" text="Read More" as="span" />
                </div>
            </Link>
        </aside>
    )
}

Feature.propTypes = {
    category: PropTypes.oneOf(["art", "design", "coding"]).isRequired
}

export default Feature
