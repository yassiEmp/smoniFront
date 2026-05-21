import { useEffect, useRef, useState } from "react";
import { useParams, Link, Navigate } from "react-router";
import { blogPosts } from "@/data/blogPosts";
import Header from "@/components/generales/Header";
import Footer from "@/components/generales/Footer";
import "@/styles/blog.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageHead from "@components/SEO/PageHead";
import JsonLd from "@components/SEO/JsonLd";
import { articleSchema, breadcrumbSchema } from "@components/SEO/schemas";
import {
  ArrowLeft,
  ArrowRight,
  Share2,
  Clock,
  User,
  Calendar,
  BookOpen,
  GraduationCap,
  MapPin,
  Send,
  Target,
  Compass,
  Activity,
  Zap,
  BarChart3,
  Maximize,
  AlertTriangle,
  Book,
  ListChecks,
  ClipboardCheck,
  Link2,
  CheckCircle2,
  Loader2,
  Volume2,
  Brain,
  ShieldAlert,
  HelpCircle,
  Bike,
  BatteryCharging,
  Table,
  UserCheck,
  Eye,
  Squirrel,
  Wrench
} from 'lucide-react';

// Map icon names to components
const IconMap: Record<string, any> = {
  Target,
  Compass,
  Activity,
  Zap,
  BarChart3,
  Maximize,
  AlertTriangle,
  Book,
  ListChecks,
  Clock,
  ClipboardCheck,
  Volume2,
  Brain,
  ShieldAlert,
  Calendar,
  HelpCircle,
  Bike,
  BatteryCharging,
  Table,
  UserCheck,
  Eye,
  Squirrel,
  Wrench
};

gsap.registerPlugin(ScrollTrigger);

export default function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);
  const mainRef = useRef<HTMLDivElement>(null);
  const [readingProgress, setReadingProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  useEffect(() => {
    if (!post) return;

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);

    const ctx = gsap.context(() => {
      gsap.from(".article-clean-header__content", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2
      });

      gsap.from(".article-featured-img", {
        y: 30,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
        delay: 0.4
      });

      gsap.from(".article-sidebar__widget", {
        x: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.6
      });

      gsap.from(".article-body > div", {
        scrollTrigger: {
          trigger: ".article-body",
          start: "top 80%",
        },
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out"
      });
    }, mainRef);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      ctx.revert();
    };
  }, [post]);

  if (!post) return <Navigate to="/blog" replace />;

  const copyUrl = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(window.location.href);
    alert("URL copiée !");
  };

  const canonical = `/blog/${post.slug}`;

  return (
    <>
      <PageHead
        title={`${post.title} — Blog Smoni`}
        description={post.subtitle}
        canonicalPath={canonical}
        ogImage={post.image}
      />
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Accueil", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: canonical },
          ]),
          articleSchema({
            headline: post.title,
            description: post.subtitle,
            path: canonical,
            image: post.image,
            datePublished: post.date,
          }),
        ]}
      />
      <Header />

      <div className="article-progress-container">
        <div
          className="article-progress-fill"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <main ref={mainRef} className="blog-main">

        <header className="article-clean-header">
          <div className="article-clean-header__content">
            <div className="article-clean-header__top">
              <Link to="/blog" className="article-clean-header__back">
                <ArrowLeft size={14} /> <span>Back to Articles</span>
              </Link>
              <div className="article-clean-header__share">
                <button onClick={copyUrl} className="share-btn"><Link2 size={16} /></button>
              </div>
            </div>

            <div className="article-clean-header__main">
              <h1 className="article-clean-header__title">{post.title}</h1>
              <p className="article-clean-header__subtitle">{post.subtitle}</p>
            </div>

            <div className="article-clean-header__meta">
              <div className="meta-item"><Clock size={14} /> {post.readingTime} read</div>
              <div className="meta-sep" />
              <div className="meta-item">{post.date}</div>
              <div className="meta-sep" />
              <div className="meta-item">
                Par <Link to="/equipe/arike" className="underline decoration-dotted underline-offset-2 hover:text-[#2c2876]">{post.author.name}</Link>
              </div>
            </div>
          </div>
        </header>

        <div className="blog-container">
          {/* Vertical lines in container */}
          <div className="blog-grid-overlay">
            <div className="blog-col-line blog-col-line--1" />
            <div className="blog-col-line blog-col-line--2" />
          </div>

          {/* Featured Image (Inside Container, Contained) */}
          <div className="article-featured-img">
            <img src={post.image} alt="" />
          </div>

          <div className="article-layout">
            <div className="article-layout__main">
              <article className="article-body">
                {post.sections.map((section, i) => {
                  const sectionId = `section-${i}`;
                  const SectionIcon = section.iconName ? IconMap[section.iconName] : null;
                  return (
                    <div key={i} id={sectionId} className="article-section">
                      <div className="section-header">
                        {SectionIcon && <SectionIcon className="section-icon" size={24} strokeWidth={1.5} />}
                        <h2>{section.title}</h2>
                      </div>
                      <p>{section.content}</p>
                      {section.secondContent && <p>{section.secondContent}</p>}

                      {section.bullets && (
                        <ul className="article-list">
                          {section.bullets.map((bullet, j) => (
                            <li key={j}>{bullet}</li>
                          ))}
                        </ul>
                      )}

                      {section.table && (
                        <div className="article-table-container">
                          <table className="article-table">
                            <thead>
                              <tr>
                                {section.table.headers.map((h, j) => (
                                  <th key={j}>{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {section.table.rows.map((row, j) => (
                                <tr key={j}>
                                  {row.map((cell, k) => (
                                    <td key={k}>{cell}</td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {section.tip && (
                        <div className="article-callout">
                          <div className="plus-marker plus-tl" />
                          <div className="plus-marker plus-tr" />
                          <div className="plus-marker plus-bl" />
                          <div className="plus-marker plus-br" />
                          <p className="article-callout__text">{section.tip.text}</p>
                        </div>
                      )}

                      {section.quote && (
                        <blockquote className="article-pullquote">
                          <p className="article-pullquote__text">"{section.quote.text}"</p>
                          <cite className="article-pullquote__cite">{section.quote.author}</cite>
                        </blockquote>
                      )}
                    </div>
                  );
                })}
              </article>

              {/* "Pour aller plus loin" — contextual in-article internal link
                  to a money page, category-aware. Keeps the article body
                  pointing back at conversion routes without spamming links. */}
              {(() => {
                const target = (() => {
                  switch (post.category) {
                    case "Code":
                      return { path: "/code-en-ligne", label: "notre formation code en ligne" };
                    case "Sécurité":
                      return { path: "/conduite", label: "nos leçons de conduite avec moniteurs diplômés" };
                    case "Examen":
                      return { path: "/accompagnement", label: "notre accompagnement à l'examen" };
                    case "Conduite":
                    default:
                      return { path: "/conduite", label: "nos formules de conduite à Vincennes" };
                  }
                })();
                return (
                  <p className="article-deep-link" style={{ marginTop: "2rem", padding: "1rem 1.25rem", borderLeft: "3px solid #2c2876", background: "#f8fafc", fontSize: "0.95rem", lineHeight: 1.6 }}>
                    <strong>Pour aller plus loin :</strong> envie de mettre ces conseils en pratique ?
                    Découvrez <Link to={target.path} style={{ color: "#2c2876", textDecoration: "underline" }}>{target.label}</Link>,
                    ou <Link to="/tarifs" style={{ color: "#2c2876", textDecoration: "underline" }}>consultez nos tarifs</Link>.
                  </p>
                );
              })()}

              <div className="article-footer-nav">
                <Link to="/blog" className="article-back-link">
                  <ArrowLeft size={18} strokeWidth={1.5} /> <span>Retour aux articles</span>
                </Link>
              </div>
            </div>

            <aside className="article-layout__sidebar">
              <div className="article-sidebar__widget toc-widget">
                <div className="widget-label">Sommaire</div>
                <nav className="toc-list">
                  {post.sections.map((section, i) => (
                    <a
                      key={i}
                      href={`#section-${i}`}
                      className="toc-item"
                    >
                      {section.title}
                    </a>
                  ))}
                </nav>
              </div>

              <div className="article-sidebar__widget trust-widget">
                <div className="widget-label">Pourquoi nous choisir</div>
                <div className="trust-grid">
                  <div className="trust-item"><span className="trust-val">98%</span><span className="trust-lbl">Taux de réussite</span></div>
                  <div className="trust-item"><span className="trust-val">350+</span><span className="trust-lbl">Élèves formés</span></div>
                  <div className="trust-item"><span className="trust-val">15</span><span className="trust-lbl">Ans d'expertise</span></div>
                </div>
              </div>

              <div className="article-sidebar__widget form-widget">
                <div className="widget-label">Consultation Gratuite</div>
                <h3>Parlez avec un expert</h3>
                {isSubmitted ? (
                  <div className="form-success-message">
                    <CheckCircle2 className="success-icon" size={32} />
                    <h4>Message envoyé</h4>
                    <p>Un expert Smoni vous rappellera d'ici 24h.</p>
                    <button onClick={() => setIsSubmitted(false)} className="reset-btn">Envoyer un autre message</button>
                  </div>
                ) : (
                  <form className="sidebar-form" onSubmit={handleFormSubmit}>
                    <div className="form-group"><label>Service</label><select><option>Code de la route</option><option>Conduite</option></select></div>
                    <div className="form-group"><label>Nom</label><input type="text" placeholder="Votre nom" required /></div>
                    <div className="form-group"><label>Email</label><input type="email" placeholder="email@exemple.com" required /></div>
                    <button type="submit" className="submit-btn" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>Patientez... <Loader2 className="animate-spin" size={14} /></>
                      ) : (
                        <>Demander un rappel <Send size={14} /></>
                      )}
                    </button>
                  </form>
                )}
              </div>

              <div className="article-sidebar__widget list-widget">
                <div className="widget-label">Articles Récents</div>
                <div className="recent-list">
                  {blogPosts.slice(0, 3).map(p => (
                    <Link key={p.slug} to={`/blog/${p.slug}`} className="recent-item">{p.title}</Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>

          <section className="article-cta">
            <div className="article-cta__content">
              <h2>Passez votre permis avec Smoni</h2>
              <p>Inscrivez-vous dès aujourd'hui et profitez de notre accompagnement personnalisé pour réussir votre examen du premier coup.</p>
            </div>
            <div className="cta-actions">
              <Link to="/contact" className="cta-btn-primary">Commencer maintenant <ArrowRight size={18} /></Link>
              <Link to="/tarifs" className="cta-btn-secondary">Voir les tarifs</Link>
            </div>
          </section>

          <section className="article-hub">
            <div className="article-hub-grid">
              {blogPosts
                .filter(p => p.slug !== slug)
                .slice(0, 3)
                .map((relatedPost, idx) => (
                  <Link key={relatedPost.slug} to={`/blog/${relatedPost.slug}`} className="article-hub-card">
                    {idx < 2 && <div className="plus-marker plus-tr" />}
                    {idx < 2 && <div className="plus-marker plus-br" />}
                    <div className="hub-card__meta">{relatedPost.category}</div>
                    <h3 className="hub-card__title">{relatedPost.title}</h3>
                    <p className="hub-card__desc">{relatedPost.excerpt}</p>
                    <div className="hub-card__footer">
                      <span>Lire l'article</span> <ArrowRight size={14} />
                    </div>
                  </Link>
                ))}
            </div>
          </section>

          <footer className="blog-footer">
            <div className="plus-marker plus-tl" /><div className="plus-marker plus-tr" /><div className="plus-marker plus-bl" /><div className="plus-marker plus-br" />
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
