'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, Globe, Shield, Play } from 'lucide-react';
import Header from './Header';
import Stats from './Stats';
import styles from '../../styles/intro/Intro.module.css';

export default function Intro() {
  const router = useRouter();
  const [playVideo, setPlayVideo] = useState(false);

  const handleNavigateToEditais = (type: string) => {
    router.push(`dashboard/${type}`);
  };

  const handlePlayVideo = () => setPlayVideo(true);

  return (
    <div className={styles.pageWrapper}>
      <Header
        title="Portal de Editais"
        subtitle="Governo Federal"
        typeButton="logout"
      />

      <main className={styles.main}>
        <div className={styles.introText}>
          <h2 className={styles.introTitle}>Bem-vindo ao Portal de Editais</h2>
          <p className={styles.introSubtitle}>
            Acesse informações sobre editais públicos, privados e internacionais
            de forma rápida e organizada
          </p>
        </div>

        <div className={styles.videoSection}>
          <div className={styles.videoCard}>
            <div className={styles.videoPreview}>
              {playVideo && (
                <iframe
                  className={styles.videoFrame}
                  src="https://www.youtube.com/embed/l7R3qveDNXs?si=iBRCk1ibm2fbp934"
                  title="Tutorial do Portal"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}

              {!playVideo && (
                <div className={styles.overlay}>
                  <div className={styles.videoContent}>
                    <div
                      className={styles.playButton}
                      onClick={handlePlayVideo}
                    >
                      <Play className={styles.playIcon} />
                    </div>
                    <h3 className={styles.videoTitle}>
                      Como Utilizar o Portal
                    </h3>
                    <p className={styles.videoSubtitle}>
                      Assista este vídeo introdutório para conhecer todas as
                      funcionalidades
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Cards abaixo do vídeo */}
          <div className={styles.cardsGrid}>
            <div
              className={styles.navCard}
              onClick={() => handleNavigateToEditais('publicos')}
            >
              <div className={styles.cardContent}>
                <div className={`${styles.iconCircle} ${styles.publicIcon}`}>
                  <FileText className={styles.icon} />
                </div>
                <h3 className={styles.cardTitle}>Editais Públicos</h3>
                <p className={styles.cardText}>
                  Concursos, licitações e processos seletivos do setor público
                </p>
                <button className={styles.primaryButton}>Acessar</button>
              </div>
            </div>

            <div
              className={styles.navCard}
              onClick={() => handleNavigateToEditais('privados')}
            >
              <div className={styles.cardContent}>
                <div className={`${styles.iconCircle} ${styles.privateIcon}`}>
                  <Shield className={styles.icon} />
                </div>
                <h3 className={styles.cardTitle}>Editais Privados</h3>
                <p className={styles.cardText}>
                  Processos seletivos e oportunidades do setor privado
                </p>
                <button className={styles.outlineButton}>Acessar</button>
              </div>
            </div>

            <div
              className={styles.navCard}
              onClick={() => handleNavigateToEditais('internacionais')}
            >
              <div className={styles.cardContent}>
                <div
                  className={`${styles.iconCircle} ${styles.internationalIcon}`}
                >
                  <Globe className={styles.icon} />
                </div>
                <h3 className={styles.cardTitle}>Editais Internacionais</h3>
                <p className={styles.cardText}>
                  Oportunidades e bolsas em organizações internacionais
                </p>
                <button className={styles.outlineButtonInternacionais}>
                  Acessar
                </button>
              </div>
            </div>
          </div>
        </div>

        <Stats />
      </main>
    </div>
  );
}
