"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const WEB3FORMS_ACCESS_KEY = "d2bfebaa-452e-4b84-9b05-af0f66ceaee4";

export default function Home() {
  const navRef = useRef(null);
  const [status, setStatus] = useState("idle");

  async function handleRdv(e) {
    e.preventDefault();
    setStatus("sending");
    const form = e.target;
    const data = new FormData(form);
    data.append("access_key", WEB3FORMS_ACCESS_KEY);
    data.append("subject", "Nouvelle demande de rendez-vous — Mèche");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      if (result.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        if (target) lenis.scrollTo(target);
      });
    });

    lenis.on("scroll", ({ scroll }) => {
      if (!navRef.current) return;
      if (scroll > 40) navRef.current.classList.add("nav-blur");
      else navRef.current.classList.remove("nav-blur");
    });

    const ctx = gsap.context(() => {
      document.querySelectorAll("[data-reveal]").forEach((el, i) => {
        gsap.fromTo(
          el,
          { yPercent: 110 },
          { yPercent: 0, duration: 1, ease: "expo.out", delay: i * 0.07, scrollTrigger: { trigger: el, start: "top 90%" } }
        );
      });
      document.querySelectorAll(".reveal-up").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 36 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: (i % 3) * 0.06, scrollTrigger: { trigger: el, start: "top 88%" } }
        );
      });
      document.querySelectorAll(".magnetic").forEach((btn) => {
        const move = (e) => {
          const r = btn.getBoundingClientRect();
          const x = (e.clientX - r.left - r.width / 2) * 0.3;
          const y = (e.clientY - r.top - r.height / 2) * 0.3;
          gsap.to(btn, { x, y, duration: 0.3, ease: "power2.out" });
        };
        const leave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.4)" });
        btn.addEventListener("mousemove", move);
        btn.addEventListener("mouseleave", leave);
      });
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
        document.querySelectorAll("[data-reveal],.reveal-up").forEach((el) => gsap.set(el, { opacity: 1, yPercent: 0, y: 0 }));
      }
    });

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative overflow-x-hidden">
      <svg className="grain" width="100%" height="100%">
        <filter id="noise-meche">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise-meche)" />
      </svg>

      <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 transition-all duration-500">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 flex items-center justify-between">
          <a href="#" className="disp text-xl">Mèche</a>
          <div className="hidden md:flex items-center gap-9 text-sm" style={{ color: "var(--text-dim)" }}>
            <a href="#prestations" className="hover:opacity-70 transition-opacity">Prestations</a>
            <a href="#equipe" className="hover:opacity-70 transition-opacity">L&apos;équipe</a>
            <a href="#salon" className="hover:opacity-70 transition-opacity">Le salon</a>
            <a href="#avis" className="hover:opacity-70 transition-opacity">Avis</a>
          </div>
          <a href="#rdv" className="magnetic btn-primary text-sm px-5 py-2.5 pill">Prendre RDV</a>
        </div>
      </nav>

      <section className="relative min-h-screen flex items-center pt-24">
        <div className="max-w-7xl mx-auto px-6 md:px-10 w-full grid md:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div>
            <div className="line-mask"><p className="label mb-6" data-reveal="">Salon indépendant — depuis 2019</p></div>
            <h1 className="h1 text-[13vw] md:text-[6vw]">
              <div className="line-mask"><div data-reveal="">Chaque mèche</div></div>
              <div className="line-mask"><div data-reveal="" style={{ color: "var(--accent)" }}>a son idée.</div></div>
            </h1>
            <div className="line-mask mt-7 max-w-md">
              <p data-reveal="" style={{ color: "var(--text-dim)" }}>
                Coupe, couleur, soin — un salon à taille humaine où l&apos;on prend le temps de comprendre vos cheveux avant d&apos;y toucher.
              </p>
            </div>
            <div className="line-mask mt-9">
              <div data-reveal="" className="flex gap-4">
                <a href="#rdv" className="magnetic btn-primary pill px-7 py-3.5 text-sm">Réserver un créneau</a>
                <a href="#prestations" className="magnetic btn-outline pill px-7 py-3.5 text-sm">Voir les tarifs</a>
              </div>
            </div>
          </div>
          <div className="relative reveal-up">
            <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80" className="img-treat w-full aspect-[4/5] object-cover" style={{ borderRadius: 32 }} alt="Coupe de cheveux" />
            <div className="absolute -bottom-6 -left-6 card p-5 hidden md:block" style={{ borderRadius: 20 }}>
              <p className="disp text-2xl" style={{ color: "var(--accent)" }}>4.9<span className="text-sm" style={{ color: "var(--text-muted)" }}>/5</span></p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>312 avis Google</p>
            </div>
          </div>
        </div>
      </section>

      <section id="prestations" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <p className="label mb-5">Prestations</p>
          <h2 className="h2 text-4xl md:text-5xl mb-14 max-w-lg">Ce qu&apos;on aime faire le mieux.</h2>
          <div className="grid md:grid-cols-3 gap-5">
            <div className="card p-8 md:row-span-2 flex flex-col justify-between reveal-up" style={{ background: "var(--accent)", color: "#fff", border: "none" }}>
              <div>
                <p className="text-xs tracking-widest uppercase mb-4 opacity-70">Signature</p>
                <p className="disp text-3xl leading-tight mb-4">Coupe & brushing sur-mesure</p>
                <p className="text-sm opacity-80 leading-relaxed">Diagnostic, coupe adaptée à la nature de vos cheveux, brushing qui tient la semaine.</p>
              </div>
              <p className="disp text-4xl mt-8">55€</p>
            </div>
            <div className="card p-7 reveal-up">
              <img src="https://images.unsplash.com/photo-1560869713-7d0a29430803?w=500&q=80" className="img-treat w-full h-36 object-cover mb-4" style={{ borderRadius: 18 }} alt="Couleur" />
              <p className="disp text-xl mb-2">Couleur & balayage</p>
              <p className="text-sm" style={{ color: "var(--text-dim)" }}>À partir de 75€</p>
            </div>
            <div className="card p-7 reveal-up">
              <img src="https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=500&q=80" className="img-treat w-full h-36 object-cover mb-4" style={{ borderRadius: 18 }} alt="Soin" />
              <p className="disp text-xl mb-2">Soin réparateur</p>
              <p className="text-sm" style={{ color: "var(--text-dim)" }}>À partir de 40€</p>
            </div>
            <div className="card p-7 md:col-span-2 flex items-center gap-6 reveal-up">
              <img src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&q=80" className="img-treat w-28 h-28 object-cover flex-shrink-0" style={{ borderRadius: 18 }} alt="Barbe" />
              <div>
                <p className="disp text-xl mb-2">Barbe & coupe homme</p>
                <p className="text-sm" style={{ color: "var(--text-dim)" }}>Taille précise, rasage à l&apos;ancienne, à partir de 35€</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="equipe" className="py-24 md:py-32" style={{ background: "var(--bg-2)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <p className="label mb-5">L&apos;équipe</p>
          <h2 className="h2 text-4xl md:text-5xl mb-14 max-w-lg">Trois paires de mains, une même exigence.</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="reveal-up">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&q=80" className="img-treat w-full aspect-[3/4] object-cover mb-4" style={{ borderRadius: 24 }} alt="Coiffeuse" />
              <p className="disp text-lg">Lina Faure</p>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>Fondatrice — coupe & couleur</p>
            </div>
            <div className="reveal-up">
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=80" className="img-treat w-full aspect-[3/4] object-cover mb-4" style={{ borderRadius: 24 }} alt="Coiffeur" />
              <p className="disp text-lg">Yanis Brel</p>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>Coupe homme & barbe</p>
            </div>
            <div className="reveal-up">
              <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9" className="img-treat w-full aspect-[3/4] object-cover mb-4" style={{ borderRadius: 24 }} alt="Coloriste" />
              <p className="disp text-lg">Odessa Kim</p>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>Coloriste & soins</p>
            </div>
          </div>
        </div>
      </section>

      <section id="salon" className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32 grid md:grid-cols-2 gap-14 items-center">
        <div className="reveal-up">
          <img src="https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=900&q=80" className="img-treat w-full aspect-[4/3] object-cover" style={{ borderRadius: 28 }} alt="Intérieur du salon" />
        </div>
        <div className="reveal-up">
          <p className="label mb-5">Le salon</p>
          <h2 className="h2 text-4xl md:text-5xl mb-6">Un fauteuil, jamais deux rendez-vous en même temps.</h2>
          <p style={{ color: "var(--text-dim)" }} className="leading-relaxed mb-6">
            Pas de chaîne, pas de rotation à la minute. Chez Mèche, chaque coiffeur ne reçoit qu&apos;une personne à la fois, dans une salle baignée de lumière naturelle, rue des Panoyaux.
          </p>
          <div className="flex gap-8">
            <div><p className="disp text-3xl" style={{ color: "var(--accent)" }}>3</p><p className="text-sm" style={{ color: "var(--text-muted)" }}>fauteuils</p></div>
            <div><p className="disp text-3xl" style={{ color: "var(--accent)" }}>6j/7</p><p className="text-sm" style={{ color: "var(--text-muted)" }}>ouvert</p></div>
          </div>
        </div>
      </section>

      <section id="avis" className="py-24 md:py-32" style={{ background: "var(--bg-2)" }}>
        <div className="max-w-3xl mx-auto px-6 text-center reveal-up">
          <p className="label mb-8">Avis</p>
          <p className="h2 text-3xl md:text-4xl leading-snug mb-8">
            &quot;Premier salon où on m&apos;a vraiment écoutée avant de couper. Résultat impeccable, ambiance douce.&quot;
          </p>
          <p style={{ color: "var(--text-muted)" }} className="text-sm">— Camille, cliente depuis 2022</p>
        </div>
      </section>

      <section id="rdv" className="py-24 md:py-36 text-center">
        <div className="max-w-md mx-auto px-6 reveal-up">
          <p className="label mb-6">Rendez-vous</p>
          <h2 className="h2 text-4xl md:text-6xl mb-10">On s&apos;occupe de vous ?</h2>
          {status === "success" ? (
            <p className="mb-10" style={{ color: "var(--accent)" }}>Merci, votre demande a bien été envoyée ! On vous recontacte rapidement pour confirmer.</p>
          ) : (
            <form onSubmit={handleRdv} className="flex flex-col gap-3 mb-10">
              <input required type="text" name="name" placeholder="Votre prénom" className="px-5 py-3 pill text-sm" style={{ background: "var(--surface-2)", border: "1px solid var(--line)" }} />
              <input required type="email" name="email" placeholder="Votre email" className="px-5 py-3 pill text-sm" style={{ background: "var(--surface-2)", border: "1px solid var(--line)" }} />
              <input type="tel" name="phone" placeholder="Votre téléphone" className="px-5 py-3 pill text-sm" style={{ background: "var(--surface-2)", border: "1px solid var(--line)" }} />
              <input type="text" name="prestation" placeholder="Prestation souhaitée (coupe, couleur...)" className="px-5 py-3 pill text-sm" style={{ background: "var(--surface-2)", border: "1px solid var(--line)" }} />
              <input type="text" name="creneau" placeholder="Jour et heure souhaités" className="px-5 py-3 pill text-sm" style={{ background: "var(--surface-2)", border: "1px solid var(--line)" }} />
              <button disabled={status === "sending"} className="magnetic btn-primary px-7 py-3 pill text-sm whitespace-nowrap">
                {status === "sending" ? "Envoi en cours..." : "Envoyer ma demande"}
              </button>
              {status === "error" && (
                <p className="text-sm" style={{ color: "var(--gold)" }}>Une erreur est survenue, réessaie dans un instant.</p>
              )}
            </form>
          )}
          <p style={{ color: "var(--text-muted)" }} className="text-sm">14 rue des Panoyaux, 75020 Paris — 01 43 00 00 00</p>
        </div>
      </section>

      <footer className="border-t py-10" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm" style={{ color: "var(--text-muted)" }}>
          <p className="disp" style={{ color: "var(--text)" }}>Mèche</p>
          <p>Mardi – Samedi, 9h30 – 19h</p>
          <p>© 2026 Mèche</p>
        </div>
      </footer>
    </div>
  );
}
