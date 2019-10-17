import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import { rhythm } from "../utils/typography"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
          siteUrl
          social {
            twitter
          }
        }
      }
    }
  `)

  const { author, siteUrl } = data.site.siteMetadata
  return (
    <div
      style={{
        display: `flex`,
        marginBottom: rhythm(2.5),
        textShadow: '0 0 2px white'
      }}
    >
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <div>
        <p>
          Greetings human! I'm <strong>{author}</strong>, and I like to make all the things.
        </p>
        <p>
          Follow me on <a href={`https://twitter.com/intent/follow?original_referer=${encodeURIComponent(siteUrl)}&ref_src=twsrc%5Etfw&region=follow_link&screen_name=abrunkhorst&tw_p=followbutton`}>Twitter</a> or <a href="https://github.com/AustinBrunkhorst">GitHub</a>.
        </p>
      </div>
    </div>
  )
}

export default Bio
