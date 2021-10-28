import React from "react"
import Layout from "../components/Layout"
import Seo from "../components/SEO"
import BannerModule from "../components/BannerModule/BannerModule"
import BasicTextModule from "../components/BasicTextModule/BasicTextModule"
import PerksModule from "../components/PerksModule/PerksModule"
// import Perk from "../components/PerksModule/Perk"
import Features from "../components/Features/Features"
import { useStaticQuery, graphql } from "gatsby"
import LazyShow from "../components/LazyShow/LazyShow"
import { StaticImage } from "gatsby-plugin-image"
import { Parallax } from "react-scroll-parallax"
// import HairAnim from "../components/HairAnim/HairAnim"
import HairScene from "../components/HairAnim/HairScene"

const getPortada = graphql`
query ConfigQuery {
    config: allContentfulConfig {
      edges {
        node {
          slug
          node_locale
          mainTitle
          mainSubtitle {
            internal {
              content
            }
          }
          presentationTitle
          presentationSubtitle {
            internal {
              content
            }
          }
          sections {
            slug
            name
            node_locale
          }
        }
      }
    }
  }  
`

const Index = () => {
    const response = useStaticQuery(getPortada)
    const config = response.config.edges.filter(({node}) => node.node_locale == "en-US")[0].node;
    return (
        <>
            <Seo title={config.mainTitle} description=""/>
            <Layout>
                <BannerModule
                    title={ config.mainTitle }
                    subTitle={ config.mainSubtitle.internal.content }
                >
                  <HairScene />
                  {/* <HairAnim /> */}
                </BannerModule>
                <LazyShow>
                    <BasicTextModule title={config.presentationTitle} subtitle={config.presentationSubtitle.internal.content}>
                        {null}
                    </BasicTextModule>
                </LazyShow>
                {/* <Parallax y={[-20, 30]} > <StaticImage src="../images/macbook-dark.jpg" alt="MB Dark" /> </Parallax> */}
                <PerksModule />
                    {/* <Perk title="The Title" content="The content" /> */}
                {/* </PerksModule> */}
                <Features />
            </Layout>
        </>
    )
}

export default Index
