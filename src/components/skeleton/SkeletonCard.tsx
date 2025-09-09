import styles from '../../styles/skeleton/SkeletonCard.module.css';

const SkeletonCard = () => (
  <div className={styles.skeletonCard}>
    <div className={styles.skeletonTitle}></div>
    <div className={styles.skeletonOrgao}></div>
    <div className={styles.skeletonLine}></div>
    <div className={styles.skeletonLine}></div>
    <div className={styles.skeletonSmall}></div>
  </div>
);

export default SkeletonCard;
