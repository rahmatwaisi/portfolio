'use client';

import React, {useState, useEffect, useRef, useCallback} from 'react';
import {useParams, useRouter} from 'next/navigation';

// ── react-icons ──────────────────────────────────────────────────────────────
import {
    FaWhatsapp, FaTelegram, FaFacebookF,
    FaStackOverflow, FaLinkedinIn, FaGithub,
} from 'react-icons/fa';
import {MdCall} from 'react-icons/md';
import {
    HiHome, HiUser, HiBriefcase, HiLightningBolt,
    HiSun, HiMoon, HiTranslate, HiChevronDown, HiArrowRight,
    HiLocationMarker, HiCalendar, HiArrowLeft
} from 'react-icons/hi';
import {
    SiPhp, SiGo, SiLaravel, SiRedis, SiDocker,
    SiKubernetes, SiGit, SiNginx, SiMongodb, SiPostgresql,
    SiElasticsearch, SiRabbitmq, SiApachekafka, SiMariadb, SiClaude, SiMeilisearch, SiEventstore, SiLinux, SiJavascript, SiTypescript, SiNextdotjs, SiHtml5, SiCss, SiLivewire, SiGin, SiFilament,
} from 'react-icons/si';
import {TbBlade, TbBrandGolang} from 'react-icons/tb';
import {BiServer, BiData, BiSolidMemoryCard} from 'react-icons/bi';
import {VscGear} from 'react-icons/vsc';
import Image from 'next/image';
import {FaBrain, FaGoogle, FaHeart, FaR, FaW, FaXTwitter} from "react-icons/fa6";
import enLang from './../../locales/en/translation.json';
import kuLang from './../../locales/ku/translation.json';
import faLang from './../../locales/fa/translation.json';
import arLang from './../../locales/ar/translation.json';

// ── Types ─────────────────────────────────────────────────────────────────────
type Tab = 'home' | 'about' | 'experiences' | 'skills';
type Lang = 'en' | 'ku' | 'fa' | 'ar';

// ── Translation dictionaries ───────────────────────────────────────────────────
const translations: Record<Lang, Translation> = {
    en: enLang as Translation,
    ku: kuLang as Translation,
    fa: faLang as Translation,
    ar: arLang as Translation,
};

// ── Translation shape ─────────────────────────────────────────────────────────
interface Translation {
    nav: { home: string; about: string; experiences: string; skills: string };
    hero: { greeting: string; name: string; role: string; tagline: string; cta: string };
    about: {
        title: string; bio: string; bio2: string;
        location: string; locationValue: string;
        availability: string; availabilityValue: string;
        experience: string; experienceValue: string;
    };
    experiences: {
        title: string;
        jobs: Array<{ role: string; company: string; location: string; period: string; bullets: string[] }>;
    };
    skills: { title: string; categories: Array<{ name: string; skills: string[] }> };
    lang: Record<Lang, string>;
    theme: { dark: string; light: string };
}

// ── Skill icon map ─────────────────────────────────────────────────────────────
const skillIconMap: Record<string, React.ReactElement> = {
    PHP: <SiPhp/>,
    Go: <SiGo/>,
    Laravel: <SiLaravel/>,
    Filament: <SiFilament/>,
    Livewire: <SiLivewire/>,
    Gin: <SiGin/>,
    MariaDB: <SiMariadb/>,
    PostgreSQL: <SiPostgresql/>,
    MongoDB: <SiMongodb/>,
    Elasticsearch: <SiElasticsearch/>,
    Redis: <SiRedis/>,
    Memcached: <BiSolidMemoryCard/>,
    MeiliSearch: <SiMeilisearch/>,
    Microservices: <BiServer/>,
    'Event-Driven': <SiEventstore/>,
    Kafka: <SiApachekafka/>,
    RabbitMQ: <SiRabbitmq/>,
    'RESTful API': <BiServer/>,
    Docker: <SiDocker/>,
    DockerSwarm: <SiDocker/>,
    Kubernetes: <SiKubernetes/>,
    'CI/CD': <VscGear/>,
    Git: <SiGit/>,
    Nginx: <SiNginx/>,
    FrankenPHP: <SiPhp/>,
    Linux: <SiLinux/>,
    JavaScript: <SiJavascript/>,
    TypeScript: <SiTypescript/>,
    NextJs: <SiNextdotjs/>,
    HTML: <SiHtml5/>,
    CSS: <SiCss/>,
    Blade: <SiLaravel/>
};

// ── Social links ──────────────────────────────────────────────────────────────
const SOCIAL_LINKS = [
    {icon: <FaGoogle/>, href: 'mailto:rahmatwaisi@gmail.com', label: 'Gmail'},
    {icon: <FaGoogle/>, href: 'mailto:raphaelwaisi@gmail.com', label: 'Email'},
    {icon: <FaLinkedinIn/>, href: 'https://linkedin.com/in/raphaelwaisi', label: 'LinkedIn'},
    {icon: <FaWhatsapp/>, href: 'https://wa.me/989360835848', label: 'WhatsApp'},
    {icon: <FaTelegram/>, href: 'https://t.me/+989360835848', label: 'Telegram'},
    {icon: <FaGithub/>, href: 'https://github.com/rahmatwaisi', label: 'GitHub'},
    {icon: <FaXTwitter/>, href: 'https://x.com/rahmatwaisi', label: 'X'},
    {icon: <FaFacebookF/>, href: 'https://facebook.com/rahmatwaisi', label: 'Facebook'},
    {icon: <FaStackOverflow/>, href: 'https://stackoverflow.com/users/4101906/rahmat-waisi', label: 'StackOverflow'},
    {icon: <MdCall/>, href: 'tel:+989360835848', label: 'Phone'},
];

const LANGS: Lang[] = ['en', 'ku', 'fa', 'ar'];
const RTL_LANGS = new Set<Lang>(['fa', 'ar', 'ku']);

function HexAvatar() {
    const [flipped, setFlipped] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setFlipped((f) => !f);
        }, 3000); // change this number to adjust timing (ms)

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="avatar-wrapper" aria-hidden="true">
            <div
                className="avatar-flip-inner"
                style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
            >
                {/* Front face — your photo */}
                <div className="avatar-face avatar-face-front">
                    <Image
                        src="/avatar.jpg"
                        alt="Raphael Waisi"
                        fill
                        style={{ objectFit: 'cover', objectPosition: 'center top' }}
                        priority
                    />
                </div>

                {/* Back face — your logo */}
                <div className="avatar-face avatar-face-back">
                    <Image
                        src="/logo.png"
                        alt="RW Logo"
                        fill
                        style={{ objectFit: 'contain', padding: '20%' }}
                    />
                </div>
            </div>

            {/* Orbit rings — stay outside the flip, spin continuously */}
            <div className="orbit-ring orbit-ring-1">
                <span className="orbit-dot orbit-dot-1" />
            </div>
            <div className="orbit-ring orbit-ring-2">
                <span className="orbit-dot orbit-dot-2" />
            </div>
        </div>
    );
}
// ── Home tab ──────────────────────────────────────────────────────────────────
function HomeTab({t, onTabChange, isRTL}: { t: Translation; onTabChange: (tab: Tab) => void; isRTL: boolean }) {
    return (
        <div
            className="tab-panel tab-content"
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '2rem',
                padding: '3rem 2rem 3rem 5.5rem',
                minHeight: 520,
                flexWrap: 'wrap',
            }}
        >
            {/* Left content */}
            <div style={{flex: '1 1 340px', minWidth: 0}}>
                <p className="hero-greeting">{t.hero.greeting}</p>
                <h1 className="hero-name">{t.hero.name}</h1>
                <p className="hero-role">{t.hero.role}</p>
                <p className="hero-tagline">{t.hero.tagline}</p>

                <button
                    className="cta-btn"
                    onClick={() => onTabChange('experiences')}
                    aria-label={t.hero.cta}
                >
                    {t.hero.cta}
                    {isRTL ? <HiArrowLeft aria-hidden="true"/> : <HiArrowRight aria-hidden="true"/>}
                </button>
            </div>

            {/* Right: 3D Hex avatar */}
            {/*    <div
                style={{
                    flex: '0 0 auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem',
                    position: 'relative',
                }}
            >
                <HexAvatar/>
            </div>*/}

            <div className="flex justify-center items-center w-full md:w-auto my-6 md:my-0">
                <HexAvatar/>
            </div>
        </div>
    );
}

// ── About tab ─────────────────────────────────────────────────────────────────
function AboutTab({t}: { t: Translation }) {
    return (
        <div
            className="tab-panel  tab-content"
        >
            <h2 className="section-title">{t.about.title}</h2>
            <p className="about-body">{t.about.bio}</p>
            <p className="about-body">{t.about.bio2}</p>

            <div className="stat-grid">
                <div className="stat-card">
                    <p className="stat-label"><HiLocationMarker aria-hidden="true" style={{display: 'inline', marginRight: 4}}/>{t.about.location}</p>
                    <p className="stat-value">{t.about.locationValue}</p>
                </div>
                <div className="stat-card">
                    <p className="stat-label"><HiCalendar aria-hidden="true" style={{display: 'inline', marginRight: 4}}/>{t.about.experience}</p>
                    <p className="stat-value">{t.about.experienceValue}</p>
                </div>
                <div className="stat-card">
                    <p className="stat-label"><HiLightningBolt aria-hidden="true" style={{display: 'inline', marginRight: 4}}/>{t.about.availability}</p>
                    <p className="stat-value">{t.about.availabilityValue}</p>
                </div>
            </div>
        </div>
    );
}

// ── Experiences tab ───────────────────────────────────────────────────────────
function ExperiencesTab({t}: { t: Translation }) {
    return (
        <div
            className="tab-panel tab-content"
        >
            <h2 className="section-title">{t.experiences.title}</h2>
            <div className="exp-timeline">
                {t.experiences.jobs.map((job, idx) => (
                    <div className="exp-card" key={idx}>
                        <div className="exp-dot" aria-hidden="true">
                            <HiBriefcase style={{fontSize: '1.1rem'}}/>
                        </div>
                        <div className="exp-body">
                            <div className="exp-header">
                                <div>
                                    <p className="exp-role">{job.role}</p>
                                    <p className="exp-company">{job.company}</p>
                                </div>
                                <div className="exp-meta">
                                    <span className="exp-period">{job.period}</span>
                                    <span className="exp-location">{job.location}</span>
                                </div>
                            </div>
                            <ul className="exp-bullets">
                                {job.bullets.map((b, bi) => (
                                    <li className="exp-bullet" key={bi}>{b}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ── Skills tab ────────────────────────────────────────────────────────────────
function SkillsTab({t}: { t: Translation }) {
    return (
        <div
            className="tab-panel tab-content"
        >
            <h2 className="section-title">{t.skills.title}</h2>
            {t.skills.categories.map((cat, ci) => (
                <div className="skills-grid-section" key={ci}>
                    <p className="skills-category-title">{cat.name}</p>
                    <div className="skills-chips">
                        {cat.skills.map((skill) => (
                            <div className="skill-chip" key={skill} title={skill}>
                                <span aria-hidden="true">{skillIconMap[skill] ?? <VscGear/>}</span>
                                <span>{skill}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function PortfolioPage() {
    const params = useParams();
    const router = useRouter();

    const [activeTab, setActiveTab] = useState<Tab>('home');
    const [isDark, setIsDark] = useState(true);
    const [langMenuOpen, setLangMenuOpen] = useState(false);
    const langMenuRef = useRef<HTMLDivElement>(null);

    const lng = (params?.lng as Lang) ?? 'en';
    const t = translations[lng] ?? translations.en;
    const isRTL = RTL_LANGS.has(lng);

    // Apply theme class to <html>
    useEffect(() => {
        const root = document.documentElement;
        if (isDark) {
            root.classList.remove('light');
        } else {
            root.classList.add('light');
        }
    }, [isDark]);

    // Close lang dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
                setLangMenuOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const switchLang = useCallback((newLng: Lang) => {
        setLangMenuOpen(false);
        router.push(`/${newLng}`);
    }, [router]);

    const navItems: Array<{ id: Tab; label: string; icon: React.ReactElement }> = [
        {id: 'home', label: t.nav.home, icon: <HiHome/>},
        {id: 'about', label: t.nav.about, icon: <HiUser/>},
        {id: 'experiences', label: t.nav.experiences, icon: <HiBriefcase/>},
        {id: 'skills', label: t.nav.skills, icon: <HiLightningBolt/>},
    ];

    return (
        <div className="portfolio-bg" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="portfolio-card">

                {/* ── Navigation bar ── */}
                <nav className="nav-bar" role="navigation" aria-label="Main navigation">
                    {/* Logo */}
                    <span className="nav-logo" aria-label="Rahmat Waisi">
                    {
                        isRTL
                            ?
                            <><FaW className="inline text-cyan-500 mx-1"/><FaR className="inline text-blue-500 mx-1"/></>
                            :
                            <><FaR className="inline text-cyan-500 mx-1"/><FaW className="inline text-blue-500 mx-1"/></>
                    }
          </span>

                    {/* Tab group */}
                    <div className="nav-tabs" role="tablist" aria-label="Portfolio sections">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                role="tab"
                                aria-selected={activeTab === item.id}
                                aria-controls={`panel-${item.id}`}
                                className={`nav-tab${activeTab === item.id ? ' active' : ''}`}
                                onClick={() => setActiveTab(item.id)}
                            >
                                <span aria-hidden="true" style={{display: 'flex', alignItems: 'center'}}>{item.icon}</span>
                                <span className="tab-label">{item.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Controls */}
                    <div className="nav-controls">
                        {/* Theme toggle */}
                        <button
                            className="control-btn"
                            onClick={() => setIsDark((d) => !d)}
                            aria-label={isDark ? t.theme.light : t.theme.dark}
                            title={isDark ? t.theme.light : t.theme.dark}
                        >
                            {isDark
                                ? <HiSun aria-hidden="true" style={{fontSize: '0.9rem'}}/>
                                : <HiMoon aria-hidden="true" style={{fontSize: '0.9rem'}}/>
                            }
                            <span className="hidden sm:inline">
                {isDark ? t.theme.light : t.theme.dark}
              </span>
                        </button>

                        {/* Language switcher */}
                        <div className="lang-dropdown" ref={langMenuRef}>
                            <button
                                className="control-btn"
                                onClick={() => setLangMenuOpen((o) => !o)}
                                aria-expanded={langMenuOpen}
                                aria-haspopup="listbox"
                                aria-label="Switch language"
                            >
                                <HiTranslate aria-hidden="true" style={{fontSize: '0.9rem'}}/>
                                <span>{t.lang[lng]}</span>
                                <HiChevronDown
                                    aria-hidden="true"
                                    style={{
                                        fontSize: '0.8rem',
                                        transform: langMenuOpen ? 'rotate(180deg)' : 'rotate(0)',
                                        transition: 'transform 0.2s ease',
                                    }}
                                />
                            </button>

                            {langMenuOpen && (
                                <div className="lang-menu" role="listbox" aria-label="Language options">
                                    {LANGS.map((l) => (
                                        <button
                                            key={l}
                                            role="option"
                                            aria-selected={l === lng}
                                            className={`lang-option${l === lng ? ' selected' : ''}`}
                                            onClick={() => switchLang(l)}
                                        >
                      <span style={{fontWeight: 700, fontSize: '0.7rem', opacity: 0.5}}>
                        {l.toUpperCase()}
                      </span>
                                            {t.lang[l]}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </nav>

                {/* ── Social dock (left or right based on dir) ── */}
                <aside
                    className="social-dock"
                    aria-label="Social links"
                    style={{left: isRTL ? 'auto' : '1.5rem', right: isRTL ? '1.5rem' : 'auto'}}
                >
                    {SOCIAL_LINKS.map(({icon, href, label}) => (
                        <a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link"
                            aria-label={label}
                            title={label}
                        >
              <span aria-hidden="true" style={{display: 'flex', fontSize: '1rem'}}>
                {icon}
              </span>
                        </a>
                    ))}
                    <div className="social-divider" aria-hidden="true"/>
                </aside>

                {/* ── Tab panels ── */}
                <main
                    id={`panel-${activeTab}`}
                    role="tabpanel"
                    aria-labelledby={`tab-${activeTab}`}
                    style={{
                        paddingLeft: isRTL ? 0 : undefined,
                        paddingRight: isRTL ? '4rem' : undefined,
                    }}
                >
                    {activeTab === 'home' && (
                        <HomeTab t={t} onTabChange={setActiveTab} isRTL={isRTL}/>
                    )}
                    {activeTab === 'about' && (
                        <AboutTab t={t}/>
                    )}
                    {activeTab === 'experiences' && (
                        <ExperiencesTab t={t}/>
                    )}
                    {activeTab === 'skills' && (
                        <SkillsTab t={t}/>
                    )}
                </main>

                {/* ── Scroll indicator (home only) ── */}
                {activeTab === 'home' && (
                    <div className="scroll-indicator" aria-hidden="true">
                        <div className="scroll-indicator-line"/>
                        <span>
                            Made with{" "}
                            {isDark ? (
                                <SiClaude className="inline text-red-500 mx-1"/>
                            ) : (
                                <FaBrain className="inline text-teal-500 mx-1"/>
                            )}{" "}
                            by Rahmat
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
