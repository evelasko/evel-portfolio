import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { WorksStyles } from "../Works/WorksStyles"
import Product from "../Works/Work"

const getWorks = graphql`
query {
    works: allContentfulWorks(filter: {featured: {eq: true}}) {
        edges {
            node {
                slug
                name
                excerpt
                price
                images {
                    gatsbyImageData(width: 600, formats: [AUTO, WEBP])
                    contentful_id
                }
                category {
                    slug
                    name
                }
            }
        }
    }
}
`

const Features = () => {
    const response = useStaticQuery(getWorks)
    const designFeatures = response.works.edges.filter(({node}) => node.category.slug == "design")
    const codingFeatures = response.works.edges.filter(({node}) => node.category.slug == "coding")
    const artFeatures = response.works.edges.filter(({node}) => node.category.slug == "art")

    return (
        <WorksStyles>
            <div className="features__container">
                <h2>Design FEatures TODO Change this</h2>
                <div className="features__container--scroll">
                    {designFeatures.map(({ node }, i: number) => {
                        return <Product key={`${i}design`} feature={node} category="design"/>
                    })}
                </div>
            </div>
            <div className="features__container">
                <h2>Coding Features TODO Change this</h2>
                <div className="features__container--scroll">
                    {codingFeatures.map(({ node }, i: number) => {
                        return <Product key={`${i}coding`} feature={node} category="coding"/>
                    })}
                </div>
            </div>
            <div className="features__container">
                <h2>Art Feautres TODO Change this</h2>
                <div className="features__container--scroll">
                    {artFeatures.map(({ node }, i:number) => {
                        return <Product key={`${i}art`} feature={node} category="art"/>
                    })}
                </div>
            </div>
        </WorksStyles>
    )
}

export default Features
