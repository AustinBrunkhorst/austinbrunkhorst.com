import React, { useMemo } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import styled from "styled-components"
import shuffle from "shuffle-array"

const ImageGrid = () => {
  const data = useStaticQuery(graphql`
    query GridImagesQuery {
      gridImages: allFile(filter: { sourceInstanceName: { eq: "grid-images" } }) {
        nodes {
          name
          childImageSharp {
            fluid(maxHeight: 400, quality: 90) {
              ...GatsbyImageSharpFluid
              originalName
              presentationWidth
              presentationHeight
            }
          }
        }
      }
    }
  `)

  const { gridImages: { nodes } } = data

  const images = useMemo(() => shuffle(nodes).map(({ name, childImageSharp: image }) =>
    <GridImageContainer key={name}>
      <NoStretchImage style={{ width: "100%", height: "100%" }} {...image} />
    </GridImageContainer>
  ), [nodes])

  return (
    <GridRoot>
      {images}
      <GradientMask />
    </GridRoot>
  )
}

const GridRoot = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 100%;
  max-height: 450px;
  display: flex;
  flex-wrap: wrap;
  filter: opacity(45%) saturate(40%);
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
`

const GradientMask = styled.div`
  position: absolute;
  left: 0;  
  right: 0;
  top: 0;
  bottom: 0;
  background: linear-gradient(0deg, rgba(255,255,255,1) 35%, rgba(255,255,255,0) 100%);
  pointer-events: none;
  z-index: 1;
`

const GridImageContainer = styled.div`
  overflow: hidden;
  flex: 1;
  min-width: 200px;
  max-height: 200px;
`

const NoStretchImage = props => {
  let normalizedProps = props
  if (props.fluid && props.fluid.presentationWidth) {
    normalizedProps = {
      ...props,
      style: {
        ...(props.style || {}),
        maxWidth: props.fluid.presentationWidth,
        maxHeight: props.fluid.presentationHeight,
      },
    }
  }

  return <Image {...normalizedProps} />
}

export default ImageGrid