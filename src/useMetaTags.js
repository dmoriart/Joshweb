import React, { useEffect, useState } from 'react';

// Meta data for each page/section
const metaData = {
  home: {
    title: 'Josh Moriarty Films - Underground DV Tape Videographer',
    description: 'Josh Moriarty Films captures raw, authentic moments through analog grain. Underground music scenes, live performances, and DJ sets documented on DV tape with Sony PD170.',
    keywords: 'Josh Moriarty, DV tape videographer, underground music, Sony PD170, analog video, live performances',
    canonical: 'https://joshmoriartyfilms.ie/'
  },
  work: {
    title: 'Video Work - Josh Moriarty Films | Underground Music Documentation',
    description: 'Explore underground music performances and DJ sets captured on DV tape. Raw documentation of live bands, club nights, and warehouse scenes with authentic analog aesthetics.',
    keywords: 'underground music videos, DV tape documentation, live performance videography, analog aesthetics, club nights',
    canonical: 'https://joshmoriartyfilms.ie/#work'
  },
  artwork: {
    title: 'Visual Artwork - Josh Moriarty Films | Photography & Digital Art',
    description: 'Visual artwork collection featuring street photography, digital art, and underground culture documentation. Exploring analog aesthetics through photography and mixed media.',
    keywords: 'street photography, digital art, underground culture, analog aesthetics, visual artwork, photography portfolio',
    canonical: 'https://joshmoriartyfilms.ie/#artwork'
  },
  about: {
    title: 'About - Josh Moriarty Films | DV Tape Videographer Process',
    description: 'Learn about the underground videography process using Sony PD170 and DV tape format. Capturing authentic moments that digital perfection often sanitizes away.',
    keywords: 'DV tape process, Sony PD170, underground videographer, analog video production, documentary filmmaking',
    canonical: 'https://joshmoriartyfilms.ie/#about'
  },
  contact: {
    title: 'Contact - Josh Moriarty Films | Underground Video Production',
    description: 'Get in touch for underground music documentation, live performance videography, and authentic analog video production. Specializing in DV tape and documentary style filming.',
    keywords: 'video production contact, underground music videographer, DV tape filming, live performance documentation',
    canonical: 'https://joshmoriartyfilms.ie/#contact'
  }
};

// Hook to manage dynamic meta tags
export const useMetaTags = (section = 'home') => {
  useEffect(() => {
    const meta = metaData[section] || metaData.home;
    
    // Update title
    document.title = meta.title;
    
    // Update description meta tag
    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', meta.description);
    }
    
    // Update keywords meta tag
    const keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (keywordsMeta && meta.keywords) {
      keywordsMeta.setAttribute('content', meta.keywords);
    }
    
    // Update or create canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = meta.canonical;
    
    // Update Open Graph meta tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', meta.title);
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', meta.description);
    }
    
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', meta.canonical);
    }
    
    // Update Twitter meta tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', meta.title);
    }
    
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', meta.description);
    }
    
    const twitterUrl = document.querySelector('meta[name="twitter:url"]');
    if (twitterUrl) {
      twitterUrl.setAttribute('content', meta.canonical);
    }
    
  }, [section]);
};

// Hook to detect current section based on scroll position
export const useCurrentSection = () => {
  const [currentSection, setCurrentSection] = useState('home');
  
  useEffect(() => {
    const sections = ['home', 'work', 'artwork', 'about', 'contact'];
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionName = entry.target.id || 'home';
            if (sections.includes(sectionName)) {
              setCurrentSection(sectionName);
            }
          }
        });
      },
      { threshold: 0.5 }
    );
    
    // Observe all sections
    sections.forEach(section => {
      const element = document.getElementById(section) || 
                    (section === 'home' ? document.querySelector('section:first-of-type') : null);
      if (element) {
        observer.observe(element);
      }
    });
    
    return () => observer.disconnect();
  }, []);
  
  return currentSection;
};

export default metaData;
