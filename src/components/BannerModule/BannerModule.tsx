import React from "react"
import PropTypes, { InferProps } from "prop-types";
import { Link, navigate } from "gatsby"
import { BannerModuleStyles } from "./BannerModuleStyles"
import { StaticImage } from "gatsby-plugin-image"
import { MdArrowDownward as Arrow } from "react-icons/md"
import Button from "../Button/Button"

const BannerModule = ({ children, title, subTitle, price, enquire, }: InferProps<typeof BannerModule.propTypes>) => {
    function scrollToArea() {
        navigate("#topContent")
    }

    return (
        <>
            <BannerModuleStyles>
                {
                children 
                ? (children) 
                : (
                    <StaticImage
                        className="banner__image"
                        imgClassName="banner__image--content"
                        src="../../images/main_face.jpg"
                        alt="Banner Image"
                        layout="fullWidth"
                        placeholder="blurred"
                    />
                )
                }

                <div className="container">
                    <div className="banner__content">
                        {title && (
                            <h1>
                                {title}
                                <span style={{ color: "var(--primary)" }}>
                                    .
                                </span>
                            </h1>
                        )}
                        {subTitle && <h2>{subTitle}</h2>}
                        {price && (
                            <h2 className="price">
                                £{price}
                                <span style={{ color: "var(--primary)" }}>
                                    .
                                </span>
                            </h2>
                        )}
                        {enquire && (
                            <Button
                                text="Enquire Now"
                                as={Link}
                                to="/contact"
                            />
                        )}
                        <button onClick={scrollToArea}>
                            <Arrow />
                        </button>
                    </div>
                </div>
            </BannerModuleStyles>
            <span id="topContent"></span>
        </>
    )
}

BannerModule.propTypes = {
    children: PropTypes.element,
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string,
    price: PropTypes.number,
    enquire: PropTypes.any,
}

export default BannerModule
