import React from 'react';
import {
  Github,
  Twitter,
  Linkedin,
  Goodreads,
  Twitch,
  Steam,
} from '@icons-pack/react-simple-icons';
import styled from "styled-components"

const icons = {
  github: {
    Component: Github,
    color: '#181717',
    link: (id: string) => `https://github.com/${id}`,
  },
  twitter: {
    Component: Twitter,
    color: '#1DA1F2',
    link: (id: string) => `https://twitter.com/${id}`,
  },
  linkedin: {
    Component: Linkedin,
    color: '#0A66C2',
    link: (id: string) => `https://linkedin.com/in/${id}`,
  },
  goodreads: {
    Component: Goodreads,
    color: '#372213',
    link: (id: string) => `https://goodreads.com/${id}`,
  },
  twitch: {
    Component: Twitch,
    color: '#9146FF',
    link: (id: string) => `https://twitch.com/${id}`,
  },
  steam: {
    Component: Steam,
    color: '#000000',
    link: (id: string) => `https://steamcommunity.com/id/${id}`,
  },
};

interface Props {
  icon: keyof typeof icons;
  id: string;
}

const Link = styled.a`
  margin: 0 0.6rem;
  padding: 0 0.3rem;
  line-height: 1.5;

  &&:hover {
    color: ${props => props.color} !important;
  }
  &&:focus {
    color: ${props => props.color} !important;
  }
`;

const Icon: React.FC<Props> = ({ icon, id }) => {
  const { Component, link, color } = icons[icon];
  return (
    <Link
      className="f4 text-color-secondary"
      href={link(id)}
      target="_blank"
      rel="noopener noreferrer"
      title={Component.name}
      color={color}
    >
      <Component size="1em" />
    </Link>
  );
};

export default Icon;
