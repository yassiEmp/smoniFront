import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { blogPosts } from "@/data/blogPosts";
import Header from "@/components/generales/Header";
import Footer from "@/components/generales/Footer";
import "@/styles/blog.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function BlogIndex() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Hero & Announcement Animation ───────
      gsap.from(".blog-announcement", {
        y: -20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2
      });

      gsap.from(".blog-hero__title", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        delay: 0.4
      });

      // ── Grid Cards Animation (Initial) ───────
      gsap.from(".blog-index-card", {
        scrollTrigger: {
          trigger: ".blog-index-grid",
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
      });

      // ── Grid Lines Animation (Reveal) ───────
      gsap.from(".blog-col-line", {
        scaleY: 0,
        transformOrigin: "top",
        duration: 1.5,
        ease: "power4.inOut",
        stagger: 0.2
      });
    }, mainRef);

    // ── Intersection Observer for Mobile Reveal ──
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    }, observerOptions);

    const cards = document.querySelectorAll(".blog-index-card");
    cards.forEach(card => observer.observe(card));

    return () => {
      ctx.revert();
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Header />
      
      <main ref={mainRef} className="blog-main">
        {/* ── Announcement Banner ────────────────── */}
        <div className="blog-announcement">
          <span className="blog-announcement__text">
            Dernier article : {blogPosts[0].title}
          </span>
          <Link to={`/blog/${blogPosts[0].slug}`} className="blog-announcement__button">
            Lire l'article <ArrowRight size={16} strokeWidth={2} />
          </Link>
        </div>

        <div className="blog-container">
          {/* Background Grid lines */}
          <div className="blog-grid-overlay">
            <div className="blog-col-line blog-col-line--1" />
            <div className="blog-col-line blog-col-line--2" />
          </div>

          {/* ── Hero ─────────────────────────────── */}
          <header className="blog-hero">
            <div className="plus-marker plus-tl" />
            <div className="plus-marker plus-tr" />
            <div className="plus-marker plus-bl" />
            <div className="plus-marker plus-br" />
            <h1 className="blog-hero__title">Articles</h1>
          </header>

          {/* ── Grid ─────────────────────────────── */}
          <div className="blog-index-grid">
            {blogPosts.map((post) => (
              <Link 
                key={post.slug} 
                to={`/blog/${post.slug}`} 
                className="blog-index-card"
              >
                {/* 100% Sharp Image Reveal Layer */}
                <div className="blog-index-card__image-wrapper">
                  <img src={post.image} alt={post.title} className="blog-index-card__image" />
                </div>

                {/* Typography Container */}
                <div className="blog-index-card__content">
                  <div className="blog-index-card__meta">
                    <span>{post.category}</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="blog-index-card__title">{post.title}</h3>
                  <div className="blog-index-card__link">
                    Lire <ArrowRight size={14} strokeWidth={2.5} />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <footer className="blog-footer">
            <div className="plus-marker plus-tl" />
            <div className="plus-marker plus-tr" />
            <div className="plus-marker plus-bl" />
            <div className="plus-marker plus-br" />
            <span>© 2026 Smoni</span>
            <div style={{ display: "flex", gap: "24px" }}>
              <Link to="/" className="blog-footer__link">Accueil</Link>
              <Link to="/contact" className="blog-footer__link">Contact</Link>
            </div>
          </footer>
        </div>
      </main>
      <Footer />
    </>
  );
}
