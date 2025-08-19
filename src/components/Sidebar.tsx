'use client';

import React from 'react';
import Link from 'next/link';
import { FiHome, FiInfo, FiMail } from 'react-icons/fi'; // ícones leves
import styles from '../../styles/Sidebar.module.css';

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.showOverlay : ''}`}
        onClick={onClose}
      ></div>

      <div
        className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}
      >
        <div className={styles.content}>
          <h2>Menu</h2>
          <ul>
            <li>
              <Link href="/">
                <FiHome className={styles.icon} /> Início
              </Link>
            </li>
            <li>
              <Link href="/sobre">
                <FiInfo className={styles.icon} /> Sobre
              </Link>
            </li>
            <li>
              <Link href="/contato">
                <FiMail className={styles.icon} /> Contato
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
