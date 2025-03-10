import React from 'react';
import styles from './CustomButton.module.scss';

interface CustomButtonProps {
  children: React.ReactNode; // Текст или содержимое кнопки
  onClick?: () => void; // Обработчик клика
  type?: 'button' | 'submit' | 'reset'; // Тип кнопки
  variant?: 'primary' | 'success' | 'error' | 'denied'; // Вариант стиля кнопки
  disabled?: boolean; // Отключение кнопки
  className?: string; // Дополнительные классы
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant,
  disabled = false,
  className = '',
}) => {
  // Определяем классы для кнопки
  const buttonClass = `${styles.button} ${
    variant ? styles[variant] : ''
  } ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClass}
    >
      {children}
    </button>
  );
};

export default CustomButton;
