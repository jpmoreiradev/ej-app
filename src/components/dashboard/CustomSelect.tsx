// CustomSelect.tsx
'use client';
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, X, LucideIcon } from 'lucide-react';
// IMPORTANTE: Crie este arquivo CSS para estilizar os itens!
import styles from '../../styles/dashboard/CustomSelect.module.css';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  label: string;
  icon: LucideIcon;
  currentValues: string[];
  options: Option[];
  onSelect: (value: string) => void;
  isMulti: boolean;
  placeholder: string;
  iconClassName: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  icon: Icon,
  currentValues,
  options,
  onSelect,
  isMulti,
  placeholder,
  iconClassName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [ref]);

  const handleOptionClick = (value: string) => {
    onSelect(value);
    // Em selects de seleção única (ordem), fecha após selecionar
    if (!isMulti) {
      setIsOpen(false);
    }
  };

  const selectedOption = !isMulti
    ? options.find((o) => o.value === currentValues[0])
    : undefined;

  return (
    <div className={styles.selectWrapper} ref={ref}>
      <div className={styles.dropdownButton} onClick={() => setIsOpen(!isOpen)}>
        <Icon className={`${styles.icon} ${iconClassName}`} />
        <span className={styles.placeholder}>
          {isMulti ? placeholder : selectedOption?.label || placeholder}
        </span>
        <ChevronDown
          className={`${styles.arrowIcon} ${isOpen ? styles.arrowOpen : ''}`}
        />
      </div>

      {isOpen && (
        <ul className={styles.dropdownList}>
          {options
            .filter((opt) =>
              isMulti ? !currentValues.includes(opt.value) : true,
            ) // Filtra para multi-select
            .map((opt) => (
              <li
                key={opt.value}
                className={`${styles.dropdownItem} ${currentValues.includes(opt.value) ? styles.selectedItem : ''}`}
                onClick={() => handleOptionClick(opt.value)}
              >
                {opt.label}
              </li>
            ))}
          {/* Opção padrão para selects não-multi */}
          {!isMulti && (
            <li
              className={`${styles.dropdownItem} ${currentValues[0] === '' ? styles.selectedItem : ''}`}
              onClick={() => handleOptionClick('')}
            >
              Nenhum
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
