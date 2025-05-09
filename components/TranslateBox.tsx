'use client'

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { IoSend } from "react-icons/io5";

const texts = ["final_thesis.pdf", "resume.docx", "contract.pdf", "journal.pdf", "notes.docx"];

export default function TranslateSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const itemHeight = container.firstElementChild?.clientHeight || 0;
    const totalItems = texts.length;
    const loops = 3;

    const targetIndex = Math.floor(Math.random() * totalItems);

    const tl = gsap.timeline();

    // total offset = loops * totalItems + targetIndex
    const totalOffset = itemHeight * (totalItems * loops + targetIndex);

    tl.to(container, {
      y: -totalOffset,
      duration: 3,
      ease: "expo.out",
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="translate-container flex justify-between items-center">
      <div className="overflow-hidden h-6 w-40 text-gray-500 relative">
        <div ref={containerRef}>
          {[...texts, ...texts, ...texts, ...texts].map((text, idx) => (
            <div key={idx} className="h-6 flex items-center justify-start">
              {text}
            </div>
          ))}
        </div>
      </div>
      <a href="https://wa.me/+14155238886" target="_blank" className="hero-btn flex items-center gap-2">
        <span className="md:hidden"><IoSend /></span>
        <span className="hidden md:inline">Translate</span>
      </a>
    </div>
  );
}