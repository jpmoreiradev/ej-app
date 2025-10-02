'use client';

import { useRouter } from 'next/navigation';

import { Globe, Shield, Zap, Users, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import welcomeHero from '../../public/images/welcome-hero.jpg';
import { motion } from 'framer-motion';
import styles from '../styles/welcome/Welcome.module.css';
import Header from '../components/intro/Header';
import Stats from '../components/welcome/Stats';
import { useEffect, useState } from 'react';
import { validateToken } from '../services/auth/authProfile';

export default function Welcome() {
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      const isValid = await validateToken();
      setIsValid(isValid ? true : false);
    };

    checkToken();
  }, []);

  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <div className={styles.container}>
      <Header
        title="Oportuniza"
        subtitle="Portal de editais"
        typeButton={isValid ? 'logout' : 'login'}
        onButtonClick={() => setIsValid((prev) => !prev)}
      />
      <main className={styles.main}>
        <div className={styles.wrapper}>
          <div className={styles.heroGrid}>
            <div className={styles.heroText}>
              <motion.h1
                className={styles.heroTitle}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Transforme
                <span className={styles.highlight}> Oportunidades</span>
                <br />
                <span className={styles.subtitle}>em Realidade</span>
              </motion.h1>

              <p className={styles.heroDescription}>
                Descubra editais públicos, privados e internacionais em uma
                plataforma moderna, intuitiva e completa. Sua próxima
                oportunidade está aqui.
              </p>
              <button
                type="button"
                onClick={handleLogin}
                className={styles.ctaButton}
              >
                Comece Agora
                <ArrowRight className={styles.ctaIcon} />
              </button>
            </div>

            <div className={styles.heroImageWrapper}>
              <div className={styles.heroImageCard}>
                <Image
                  src={welcomeHero}
                  alt="Oportuniza"
                  className={styles.heroImage}
                  priority
                />
              </div>
              <div className={styles.heroDecorationTop}></div>
              <div className={styles.heroDecorationBottom}></div>
            </div>
          </div>

          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureContent}>
                <Globe className={styles.featureIcon} />
                <h3 className={styles.featureTitle}>Editais Globais</h3>
                <p className={styles.featureText}>
                  Acesse oportunidades nacionais e internacionais
                </p>
              </div>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureContent}>
                <Shield className={styles.featureIcon} />
                <h3 className={styles.featureTitle}>Segurança Total</h3>
                <p className={styles.featureText}>
                  Plataforma segura e confiável para suas candidaturas
                </p>
              </div>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureContent}>
                <Zap className={styles.featureIcon} />
                <h3 className={styles.featureTitle}>Busca Inteligente</h3>
                <p className={styles.featureText}>
                  Encontre editais personalizados para seu perfil
                </p>
              </div>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureContent}>
                <Users className={styles.featureIcon} />
                <h3 className={styles.featureTitle}>Mentoria Especializada</h3>
                <p className={styles.featureText}>
                  Suporte profissional para maximizar suas chances
                </p>
              </div>
            </div>
          </div>

          <Stats />
        </div>
      </main>

      {/* Floating Elements */}
      <div className={styles.floating}>
        <div className={styles.floatingOne}></div>
        <div className={styles.floatingTwo}></div>
      </div>
    </div>
  );
}
