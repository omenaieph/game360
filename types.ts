import React from 'react';

export interface Game {
  title: string;
  category: string;
  players: string;
  icon: React.ReactNode;
  description: string;
  previewUrl: string;
}

export interface GameCardProps extends Game {
  onClick?: () => void;
}

export interface StepProps {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface NavLinkProps {
  href: string;
  label: string;
  isMobile?: boolean;
  onClick?: () => void;
}