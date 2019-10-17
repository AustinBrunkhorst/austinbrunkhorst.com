import React, { useMemo } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import styled from "styled-components"
import useWindowSize from '@rehooks/window-size'
import shuffle from 'shuffle-array'

const ImageGrid = () => {
  const data = useStaticQuery(graphql`
    query GridImagesQuery {
      gridImages: allFile(filter: { sourceInstanceName: { eq: "grid-images" } }) {
        nodes {
          name
          childImageSharp {
            fluid(maxHeight: 720, quality: 100) {
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

  const { innerWidth, innerHeight } = useWindowSize();

  const { gridImages: { nodes: gridImages } } = data;

  const columns = 6;
  const itemHeight = innerWidth / columns;
  const rows = Math.ceil(innerHeight / itemHeight);
  const itemCount = columns * rows;
  const rowOverflow = (rows * itemHeight) - innerHeight;

  const images = useMemo(() => shuffle(gridImages).slice(0, itemCount).map(({ name, childImageSharp: image }) =>
    <GridImageContainer key={name} columns={columns} containerWidth={innerWidth}>
      <NoStretchImage style={{ width: "100%", height: "100%" }} {...image} />
    </GridImageContainer>
  ), [itemCount, gridImages, columns, innerWidth]);

  return (
    <>
      <GridRoot rows={rows} columns={columns} itemHeight={itemHeight} rowOverflow={rowOverflow}>
        {images}
        <GradientMask />
      </GridRoot>
    </>
  )
}

const GridRoot = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: ${props => -props.rowOverflow / 2}px;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(6, ${props => 100 / props.columns}%);
  grid-template-rows: repeat(${props => props.rows}, ${props => props.itemHeight}px);
  grid-auto-flow: row;
  filter: grayscale(50%) opacity(0.25);
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
`;

const GradientMask = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: linear-gradient(0deg, rgba(255,255,255,1) 35%, rgba(255,255,255,0) 100%);
  pointer-events: none;
  z-index: 1;
`;

const GridImageContainer = styled.div`
  max-height: ${props => props.containerWidth / props.columns}px;
  overflow: hidden;
`;

const NoStretchImage = props => {
  let normalizedProps = props
  if (props.fluid && props.fluid.presentationWidth) {
    normalizedProps = {
      ...props,
      style: {
        ...(props.style || {}),
        display: "inline-block",
        maxWidth: props.fluid.presentationWidth,
        maxHeight: props.fluid.presentationHeight,
      },
    }
  }

  return <Image {...normalizedProps} />
}

export default ImageGrid