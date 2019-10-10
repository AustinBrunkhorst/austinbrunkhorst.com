import * as React from 'react';
import { graphql, Link } from 'gatsby';

const IndexPage = ({
  data: {
    site: { siteMetadata: { social } },
    allBlogPost: { edges: latestBlogPosts },
  },
}) => {
  const [LatestBlogPost] = latestBlogPosts
    .map(({ node: { title, slug } }) => <Link to={slug}>{title}</Link>);

  const socialUrls = social.reduce(
    (urls, { name, url }) => ({ [name]: url, ...urls }),
    {}
  );
  
  return (
    <>
      <Bio urls={socialUrls} />
      {LatestBlogPost}
    </>
  );
};

const Bio = ({ urls }) => {
  return <>
    <h2>greetings human! my name is</h2>
    <h1>Austin Brunkhorst</h1>
    <p>I like to make all the things. Check out my <a href={urls.github}>code</a> or my <a href={urls.linkedin}>resume</a>.</p>
  </>
};

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        social {
          name
          url
        }
      }
    }
    allBlogPost(limit: 1, sort: { order: DESC, fields: date }) {
      edges {
        node {
          title
          slug
        }
      }
    }
  }
`;

export default IndexPage;
