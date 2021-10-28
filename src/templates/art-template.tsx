import React from "react"
import Layout from "../components/Layout"
import { graphql } from "gatsby"
import { GatsbyImage, getImage, IGatsbyImageData, ImageDataLike } from "gatsby-plugin-image"
import styled from "styled-components"
import Faq from "../components/Faq/Faq"
import Seo from "../components/SEO"
import BannerModule from "../components/BannerModule/BannerModule"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import BackgroundSlider from "gatsby-image-background-slider"
import ImageGallery from "../components/ImageGallery/ImageGallery"
import { ReactImageGalleryImageSet, ReactImageGalleryItem } from "react-image-gallery"

const ProductTemplateStyles = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: var(--sectionPadding) var(--borderSpacing);
    background-color: #000;

    .column {
        flex: 0 0 100%;

        @media (min-width: 768px) {
            flex-basis: 50%;

            &:nth-child(1) {
                padding-right: 20px;
            }

            &:nth-child(2) {
                padding-left: 20px;
            }

            > * {
                &:last-child {
                    margin-bottom: 0;
                }
            }
        }

        > * {
            &:first-child {
                margin-top: 0;
            }
        }
    }
`

const productTemplate = ({ data }) => {
    const {
        name,
        price,
        excerpt,
        productDescription,
        images,
        faq,
    } = data.work

    const [mainImage, ...productImages] = images
    const image = getImage(mainImage)
    const galleryImages = (productImages as ImageDataLike[])
    .map<IGatsbyImageData>((imageLikeData) => getImage(imageLikeData))
    .map<ReactImageGalleryItem>((image) => ({
        original: image.images.fallback.src,
        srcSet: image.images.sources[0].srcSet,
        sizes: image.images.sources[0].sizes,
        originalWidth: image.width,
        originalHeight: image.height,        
    })
    )

    return (
        <>
            <Seo title={name} description={productDescription} />
            <Layout>
                <BannerModule
                    title={name}
                    price={price}
                    subTitle={excerpt}
                    enquire={true}
                >
                    <GatsbyImage
                        className="banner__image"
                        image={image}
                        alt="Banner Image"
                    />
                </BannerModule>
                <ProductTemplateStyles>
                    <div className="column">
                        {renderRichText(productDescription)}
                    </div>
                    <div className="column">
                        {faq.map((item, index) => {
                            return (
                                <Faq
                                    key={index}
                                    title={item.title}
                                    description={item.description}
                                />
                            )
                        })}
                    </div>
                    <div style={{paddingTop: 50}}>
                        <ImageGallery images={galleryImages} />
                    </div>
                </ProductTemplateStyles>
            </Layout>
        </>
    )
}

export const query = graphql`
query ($slug: String!) {
    work: contentfulWorks(slug: { eq: $slug }) {
      price
      name
      excerpt
      images {
        gatsbyImageData(formats: [AUTO, WEBP], width: 2000)
        node_locale
      }
      faq {
        title
        description
      }
      productDescription {
        raw
      }
      category {
        name
      }
    }
  }
`

export default productTemplate
