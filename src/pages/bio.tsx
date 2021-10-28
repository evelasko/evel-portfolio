import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React from "react"
import Layout from "../components/Layout"
import Seo from "../components/SEO"
import SimpleBanner from "../components/SimpleBanner/SimpleBanner"
import { graphql, useStaticQuery } from "gatsby"
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { BlogSingleStyles } from "../components/Blog/BlogStyles"
import { renderRichText } from "gatsby-source-contentful/rich-text"

const getSections = graphql`
query Sections {
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

const Bold = ({ children }) => <strong>{children}</strong>
const Italic = ({ children }) => <em>{children}</em>
const Text = ({ children }) => <p>{children}</p>

const bio = () => {
    const response = useStaticQuery(getSections)
    const {showcaseImage, description, name } = response.sections.edges.filter(({node}) => (node.slug ?? '').includes("bio") && (node.node_locale ?? '') == "en-US")[0].node
    const image = getImage(showcaseImage[0])

    const options = {
        renderMark: {
            [MARKS.BOLD]: text => <Bold>{text}</Bold>,
            [MARKS.ITALIC]: text => <Italic>{text}</Italic>,
        },
        renderNode: {
            [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
        },
    }

    return (
        <>
            <Seo title={name ?? "Bio"} description={"" /*TODO Add SEO description */} />
            <Layout>
                <SimpleBanner title={name ?? "Bio"}>
                    <GatsbyImage
                        className="banner__image"
                        image={image}
                        alt="Apple iPhone camera"
                    />
                </SimpleBanner>
                <section>
                    <BlogSingleStyles>
                        <article className="blogsingle__content">
                            {renderRichText(description, options)}
                        </article>
                    </BlogSingleStyles>
                </section>
            </Layout>
        </>
    )
}

export default bio
