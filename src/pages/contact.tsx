import React from "react"
import Layout from "../components/Layout"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Contact from "../components/Contact/Contact"
import Seo from "../components/SEO"
import SimpleBanner from "../components/SimpleBanner/SimpleBanner"
import { useStaticQuery, graphql } from 'gatsby';

const getSections = graphql`
query {
    sections: allContentfulSections {
      edges {
        node {
          node_locale
          slug
          name
          description {
            raw
            references {
                file {
                  url
                }
                gatsbyImageData
              }
          }
          showcaseImage {
            gatsbyImageData(formats: AUTO)
          }
        }
      }
    }
  }
  `

const contact = () => {
    const response = useStaticQuery(getSections)
    const {showcaseImage, description, name } = response.sections.edges.filter(({node}) => (node.slug ?? '').includes("contact") && (node.node_locale ?? '') == "en-US")[0].node
    const image = getImage(showcaseImage[0])
    return (
        <>
            <Seo title={name ?? "Contáctame"} description={"" /*TODO add SEO description */}/>
            <Layout>
                <SimpleBanner title={name ?? "Contáctame"}>
                    <GatsbyImage
                        className="banner__image"
                        image={image}
                        alt="Apple Macbook Dark"
                    />
                </SimpleBanner>
                <Contact />
            </Layout>
        </>
    )
}

export default contact
