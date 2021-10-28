import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { WorksStyles } from "./WorksStyles"
import Product from "./Work"
import PropTypes from "prop-types"

const getWorks = graphql`
query {
    works:  allContentfulWorks {
        edges {
            node {
            slug
            contentful_id
            name
            node_locale
            excerpt
            price
            images {
                gatsbyImageData(width: 600, formats: [AUTO, WEBP])
            }
            category {
                slug
                name
            }
            description {
                internal {
                content
                }
                description
            }
            }
        }
        }
    }
`

const WorksList = ({ category }) => {

    const response = useStaticQuery(getWorks)
    const products = response.works.edges.filter(({node}) => node.category.slug == category && node.node_locale == "en-US");

    return (
        <WorksStyles>
            <div className="features__container">
                <div className="features__container--scroll">
                    {products.map(({ node }) => {
                        return <Product feature={node} category={category} />
                    })}
                </div>
            </div>
        </WorksStyles>
    )
}

WorksList.propTypes = {
    category: PropTypes.oneOf(["art", "design", "coding"]).isRequired,
}

export default WorksList
