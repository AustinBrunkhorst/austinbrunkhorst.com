import React, { memo, useMemo } from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import GiveShakaButton from "../components/give-shaka-button"
import usePostShakas from "../hooks/use-post-shakas"

const ShakaHint = styled.div`
  opacity: 0.8;
`

const PostContent = styled.section`
  margin-bottom: ${rhythm(1)};
`

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next, slug } = pageContext

  const postShaka = usePostShakas(slug)

  const postContent = useMemo(() => (
    <PostContent dangerouslySetInnerHTML={{ __html: post.html }} />
  ), [post.html])

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article>
        <header>
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: 0,
            }}
          >
            {post.frontmatter.title}
          </h1>
          <p
            style={{
              ...scale(-1 / 5),
              display: "block",
              marginBottom: rhythm(1),
            }}
          >
            {post.frontmatter.date}
          </p>
          <GiveShakaButton {...postShaka} />
        </header>
        {postContent}
        <GiveShakaButton {...postShaka} />
        <ShakaHint>If you totally loved this content, consider leaving a 🤙</ShakaHint>
        <hr
          style={{
            marginTop: rhythm(1),
            marginBottom: rhythm(1),
          }}
        />
        <footer>
          <Bio />
        </footer>
      </article>

      <nav>
        <ul
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            listStyle: "none",
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
                </Link>
            )}
          </li>
        </ul>
      </nav>
      <footer>&copy; Austin Brunkhorst 2016 - {new Date().getFullYear()}</footer>
    </Layout>
  )
};

export default memo(BlogPostTemplate)

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
