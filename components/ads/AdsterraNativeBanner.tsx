'use client';
import { useEffect, useRef } from 'react';

export function AdsterraNativeBanner() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current || ref.current.dataset.loaded) return;
    ref.current.dataset.loaded = '1';
    const s = document.createElement('script');
    s.async = true;
    s.setAttribute('data-cfasync', 'false');
    s.src = 'https://pl29147335.profitablecpmratenetwork.com/98b7a4a9d700f794545db26fec4c68f2/invoke.js';
    ref.current.appendChild(s);
  }, []);
  return <div ref={ref} id="container-98b7a4a9d700f794545db26fec4c68f2" style={{ margin: '1.5rem 0', minHeight: '90px' }} />;
}
