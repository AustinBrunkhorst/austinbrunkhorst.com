import React, { useState, useCallback, memo, useEffect, useRef, useMemo } from "react"
import styled from "styled-components"
import { animated, Transition, useTransition, useChain } from "react-spring"
import { scale } from "../utils/typography"
import shuffle from "shuffle-array"

const ContainerRoot = styled.div`
`

const Button = styled.button`
  position: relative;
  min-width: 75px;
`

const Label = styled.div``

const Total = styled.span`
  border-radius: 50%;
`

const ParticlesContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 800;
`

const Particle = styled(animated.div)`
  position: absolute;
  left: 0;
  top: 0;
  will-change: transform;
  white-space: nowrap;
  font-weight: bold;
  color: black;
  text-shadow: 0 0 1px white, 0 0 2px white, 0 0 3px white;
  font-family: Montserrat, sans-serif;
  ${scale(1.25)}
`

function useParticles() {
  const nextParticleId = useRef(0);
  const [particles, setParticles] = useState([]);

  const deletParticleById = useMemo(() => id => {
    setParticles(particles.filter(p => p.id === id));
  }, [particles, setParticles]);

  const createParticle = useCallback(() => {
    const feedback = [
      "awesome",
      "heck yea",
      "fantastic one",
      "you did it",
      "omg thanks",
      "excellent work",
      "we liked that one",
      "it was a good one",
      "uh huh, more of that",
      "faster next time",
      "my dog approves",
      "loved it",
      "nice click",
      "yup",
      "just like that",
      "wow",
      "thanks",
      "alright, we can use it",
      "😍🤙",
      "just spectacular",
      "we're friends",
      "oh my gosh yes",
      "oh daddy",
      "that was pretty delicious"
    ]

    const id = nextParticleId.current++;

    setParticles([
      ...particles,
      {
        id,
        angle: Math.random() * (Math.PI / 2) - (Math.PI / 2),
        distance: Math.round(Math.random() * 25) + 25,
        scale: (Math.random() * 3 + 0.45).toFixed(4),
        text: shuffle.pick(feedback),
        timer: setTimeout(() => deletParticleById(id), 600)
      }
    ])
  }, [particles, setParticles])

  useEffect(() => {
    return () => {
      for (const { timer } of particles) {
        clearTimeout(timer);
      }
    }
  }, [particles]);

  return { particles, createParticle };
}

const Particles = ({ particles }) => {
  const transitions = useTransition(particles, ({ id }) => id, {
    from: ({ scale }) => ({
      opacity: 0,
      transform: `scale(0) translate3d(0px, 0px, 0)`
    }),
    enter: ({ angle, distance }) => ({
      opacity: 1,
      transform: `scale(1) translate3d(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px, 0)`
    }),
    leave: { opacity: 0, transform: `scale(0) translate3d(0px, 0px, 0)` }
  })

  return (
    <ParticlesContainer>
      {transitions.map(({ item: { text }, props, key }) =>
        <Particle key={key} style={props}>{text}</Particle>
      )}
    </ParticlesContainer>
  )
}

const GiveShakaButton = ({ total, giveShaka }) => {
  const { particles, createParticle } = useParticles()

  const handleClick = useCallback(() => {
    giveShaka()
    createParticle()
  }, [giveShaka, createParticle]);

  return (
    <ContainerRoot>
      <Button onClick={handleClick} title="Give Shaka">
        <Total>{total}</Total>{` `}🤙
        <Particles particles={particles} />
      </Button>
    </ContainerRoot>
  )
}

export default memo(GiveShakaButton)