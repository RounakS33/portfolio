"use client";
import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

export default function About() {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>About me</SectionHeading>
      <p className="font-sans mb-3 text-xl leading-relaxed">
        I am passionate about leveraging data to drive innovation and solve complex problems. With a robust background in 
        both data science and machine learning, I specialize in developing intelligent systems 
        that transform raw data into valuable insights. My expertise encompasses a wide range 
        of techniques, from predictive modeling and statistical analysis to deep learning and 
        natural language processing. I thrive on the challenge of creating scalable, 
        data-driven solutions that enhance decision-making and improve operational efficiency.
         I am continuously seeking to expand my knowledge and stay at the 
        forefront of technological advancements in the field.
      </p>

    </motion.section>
  );
}
