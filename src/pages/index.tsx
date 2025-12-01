'use client';

import { useRouter } from 'next/navigation';

import { Globe, Shield, Zap, Users, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import projectImage from '../../public/images/projectimage.png';
import styles from '../styles/welcome/Welcome.module.css';
import Header from '../components/intro/Header';
import { useEffect, useState } from 'react';
import { validateToken } from '../services/auth/authProfile';
import { fetchGeneralStatistics } from '../services/editals/informativeService';
import { GeneralStatistics } from '../types/informative';

export default function Welcome() {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [stats, setStats] = useState<GeneralStatistics | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      const isValid = await validateToken();
      setIsValid(isValid ? true : false);
    };

    const loadStats = async () => {
      try {
        const statistics = await fetchGeneralStatistics();
        setStats(statistics);
      } catch (error) {
        console.error('Erro ao carregar estatísticas:', error);
      }
    };

    checkToken();
    loadStats();
  }, []);

  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <div className={styles.container}>
      <Header
        title="Oportuniza"
        subtitle="Portal de Editais"
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
              <div className={styles.heroImageContainer}>
                <Image
                  src={projectImage}
                  alt="Oportuniza"
                  fill
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center top',
                  }}
                  priority
                  quality={100}
                />
              </div>
            </div>
          </div>

          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureContent}>
                <Globe className={styles.featureIcon} />
                <h3 className={styles.featureTitle}>Gestão Centralizada</h3>
                <p className={styles.featureText}>
                  Centralize todos os editais municipais em uma única plataforma
                </p>
              </div>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureContent}>
                <Shield className={styles.featureIcon} />
                <h3 className={styles.featureTitle}>Conformidade Legal</h3>
                <p className={styles.featureText}>
                  Sistema em conformidade com a LGPD e legislação municipal
                </p>
              </div>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureContent}>
                <Zap className={styles.featureIcon} />
                <h3 className={styles.featureTitle}>Acesso Facilitado</h3>
                <p className={styles.featureText}>
                  Interface moderna e intuitiva para cidadãos e gestores
                </p>
              </div>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureContent}>
                <Users className={styles.featureIcon} />
                <h3 className={styles.featureTitle}>Transparência</h3>
                <p className={styles.featureText}>
                  Aumente a transparência e democratize o acesso às
                  oportunidades
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className={styles.ctaSection}>
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>
                Pronto para Encontrar Sua Próxima Oportunidade?
              </h2>
              <p className={styles.ctaDescription}>
                Simplifique sua busca por editais e descubra oportunidades
                perfeitas para você.
              </p>

              {/* Statistics Grid */}
              <div className={styles.ctaStatsGrid}>
                <div className={styles.ctaStat}>
                  <div className={styles.ctaStatNumber}>
                    {stats?.total.editais
                      ? stats.total.editais.toLocaleString('pt-BR')
                      : '0'}
                  </div>
                  <div className={styles.ctaStatLabel}>
                    TOTAL DE EDITAIS Cadastrados
                  </div>
                </div>
                <div className={styles.ctaStat}>
                  <div className={styles.ctaStatNumber}>
                    {stats?.total.orgaos
                      ? stats.total.orgaos.toLocaleString('pt-BR')
                      : '0'}
                  </div>
                  <div className={styles.ctaStatLabel}>
                    TOTAL de Órgãos Participantes
                  </div>
                </div>
                <div className={styles.ctaStat}>
                  <div className={styles.ctaStatNumber}>
                    {stats?.total.ativos
                      ? stats.total.ativos.toLocaleString('pt-BR')
                      : '0'}
                  </div>
                  <div className={styles.ctaStatLabel}>
                    {' '}
                    TOTAL de Editais Ativos
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogin}
                className={styles.ctaButtonLarge}
              >
                Saiba Mais
                <ArrowRight className={styles.ctaIcon} />
              </button>
            </div>
          </div>
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
