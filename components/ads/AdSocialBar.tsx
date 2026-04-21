'use client';
import { useEffect } from 'react';

export function AdSocialBar() {
  useEffect(() => {
    const srcs = ["https://pl29147334.profitablecpmratenetwork.com/5d/d9/9b/5dd99bea8372fac45a6751d9dfbbc237.js", "https://pl29147337.profitablecpmratenetwork.com/c0/c5/91/c0c591352d239aef3d0e8bb295ad4364.js"];
    const scripts = srcs.map((src) => {
      const s = document.createElement('script');
      s.src = src;
      s.async = true;
      document.head.appendChild(s);
      return s;
    });
    return () => scripts.forEach((s) => s.parentNode?.removeChild(s));
  }, []);
  return null;
}
