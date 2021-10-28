import React from "react"
import Layout from "../components/Layout"
import WorksList from "../components/Works/WorksList"
import Seo from "../components/SEO"
import SimpleBanner from "../components/SimpleBanner/SimpleBanner"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { useStaticQuery, graphql } from "gatsby"

const getCategory = graphql`
query {
  category: contentfulCategories(slug: {eq: "art"}) {
    description {
      raw
    }
    name
    node_locale
    showcaseImage {
      gatsbyImageData(formats: [AUTO, WEBP])
    }
    slug
  }
}
`

const art = () => {
    const response = useStaticQuery(getCategory)
    const { category } = response;
    const image = getImage(category.showcaseImage[0])
    return (
        <>
            <Seo title={category.name ?? "Art"} description="" />
            <Layout>
                <SimpleBanner title={category.name ?? "Art"}>
                    <GatsbyImage
                        className="banner__image"
                        image={image}
                        alt="Apple iPhone face down"
                    />
                </SimpleBanner>
                <WorksList category="art"/>
            </Layout>
        </>
    )
}

export default art
