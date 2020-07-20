import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

export default function ProjectsPage() {
  const {
    allMarkdownRemark: {
      edges: {
        projects
      },
      site: { siteMetadata: {
        title: siteTitle
      } }
    }
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            excerpt
            fields {
              slug
            }
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              title
              description
            }
          }
        }
      }
    }`
  )

  return (
    <Layout location={this.props.location} title={siteTitle}>
      <SEO title="🔵 Projects" />
      {posts.map(({ node: { frontmatter: { title, slug } } }) =>
        <Link key={slug} to={slug} title={`${title}`}>{title}</Link>
      )}
    </Layout>
  )
}
