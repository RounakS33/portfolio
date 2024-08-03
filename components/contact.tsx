"use client";
import React from 'react'
import SectionHeading from "./section-heading";
import { useSectionInView } from "@/lib/hooks";

function Contact() {
    const { ref } = useSectionInView("Projects", 0.5);
    return (
        <section ref={ref} id="contact">
            <SectionHeading>Contact me</SectionHeading>
            <div className='contact-container font-sans scroll-mt-28 mb-28  '>
                <p className='p-5 '>Email:</p>
                <a href="mailto:singhrounak927@gmail.com" className='justify-center font-sans group bg-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10'>singhrounak927@gmail.com</a>
                <p className='p-5'>Phone:</p>
                <a href="tel:+919007790033" className='justify-center font-sans group bg-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10'>+91 9007790033</a>
            </div>
        </section>
    );
}

export default Contact;