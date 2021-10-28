const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions

    const { data } = await graphql(`
    query {
        works: allContentfulWorks {
          edges {
            node {
              slug
              category {
                slug
              }
            }
          }
        }
      }
    `)

    data.works.edges.filter(({ node }) => node.category.slug == "art").forEach(({ node }) => {
        createPage({
            path: `${node.category.slug}/${node.slug}`,
            component: path.resolve("src/templates/art-template.tsx"),
            context: { slug: node.slug },
        })
    })

    data.works.edges.filter(({ node }) => node.category.slug == "design").forEach(({ node }) => {
        createPage({
            path: `${node.category.slug}/${node.slug}`,
            component: path.resolve("src/templates/design-template.tsx"),
            context: { slug: node.slug },
        })
    })

    data.works.edges.filter(({ node }) => node.category.slug == "coding").forEach(({ node }) => {
        createPage({
            path: `${node.category.slug}/${node.slug}`,
            component: path.resolve("src/templates/coding-template.tsx"),
            context: { slug: node.slug },
        })
    })

    // data.posts.edges.forEach(({ node }) => {
    //     createPage({
    //         path: `blogs/${node.slug}`,
    //         component: path.resolve("src/templates/blog-template.tsx"),
    //         context: { slug: node.slug },
    //     })
    // })
    // //Amount of posts
    // const posts = data.posts.edges
    // // Posts per page
    // const postsPerPage = 6
    // // How many pages
    // const numPages = Math.ceil(posts.length / postsPerPage)

    // Array.from({ length: numPages }).forEach((_, i) => {
    //     createPage({
    //         path: i === 0 ? `/blogs` : `/blogs/${i + 1}`,
    //         component: path.resolve("./src/templates/blog-list-template.tsx"),
    //         context: {
    //             limit: postsPerPage,
    //             skip: i * postsPerPage,
    //             numPages,
    //             currentPage: i + 1,
    //         },
    //     })
    // })
}
