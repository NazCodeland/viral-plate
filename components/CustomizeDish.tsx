"use client";
// components/CustomizeDish.tsx

import Badge from "./Badge";

interface Props {
  onClick?: () => void;
}

export default function CustomizeDish({ onClick }: Props) {
  return (
    <Badge variant="glass" icon="🍽️" label="Customize" onClick={onClick} />
  );
}
