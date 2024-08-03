import React from "react";

type SectionHeadingProps = {
  children: React.ReactNode;
};

export default function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <h2 className="font-sans text-3xl uppercase font-bold mb-8 text-center">
      {children}
    </h2>
  );
}
