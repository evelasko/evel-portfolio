if (process.env.NODE_ENV == "development") require("dotenv").config()
module.exports = {
    siteMetadata: {
        title: "Enrique Velasco",
        description: "Portfolio of Works and Projects",
        author: "Misfitcoders",
        twitterUsername: "@hnpotter",
        image: "/yellow-metal-design-decoration.jpg",
        siteUrl: "https://evelas.co",
    },
    /* Your site config here */
    plugins: [
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-sitemap`,
        `gatsby-plugin-sass`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images/`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `logos`,
                path: `${__dirname}/src/images/logos`,
            },
        },
        {
          resolve: `gatsby-source-filesystem`,
          options: {
              name: `graphics`,
              path: `${__dirname}/src/graphics/`,
          },
      },
        /*
        {
            resolve: `gatsby-source-filesystem`,
            options: {
              path: `${__dirname}/src/locales`,
              name: `locale`
            }
          },
          {
            resolve: `gatsby-plugin-react-i18next`,
            options: {
              localeJsonSourceName: `locale`, // name given to `gatsby-source-filesystem` plugin.
              languages: [`en`, `es`],
              defaultLanguage: `en`,
              // if you are using Helmet, you must include siteUrl, and make sure you add http:https
              siteUrl: `https://evelas.co/`,
              // you can pass any i18next options
              // pass following options to allow message content as a key
              i18nextOptions: {
                interpolation: {
                  escapeValue: false // not needed for react as it escapes by default
                },
                keySeparator: false,
                nsSeparator: false
              },
              pages: [
                {
                  matchPath: '/:lang?/blog/:uid',
                  getLanguageFromPath: true,
                  excludeLanguages: ['es']
                },
                {
                  matchPath: '/preview',
                  languages: ['en']
                }
              ]
            }
          },
          */
        {
            resolve: `gatsby-source-contentful`,
            options: {
                spaceId: process.env.CONTENTFUL_SPACE_ID,
                accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
            },
        },
        `@contentful/gatsby-transformer-contentful-richtext`,
        {
            resolve: "gatsby-plugin-robots-txt",
            options: {
                host: "https://evelas.co",
                sitemap: "https://evelas.co/sitemap.xml",
                policy: [{ userAgent: "*", allow: "/" }],
            },
        },
        `gatsby-plugin-playground`,
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        `gatsby-plugin-styled-components`,
        `gatsby-plugin-image`,
        `gatsby-plugin-transition-link`,
    ],
}
