import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useThemeStore } from '../../store/themeStore';
import '../../prepare-styles/colors.scss';
import React from 'react';

export const SkeletonDarkTheme = <T extends React.ReactNode>({
  children,
}: {
  children: T;
}) => {
  const { theme } = useThemeStore();

  return (
    <SkeletonTheme
      baseColor={theme === 'dark' ? 'var(--elements)' : '#ebebeb'}
      highlightColor={theme === 'dark' ? 'var(--icons)' : '#f5f5f5'}
    >
      {children}
    </SkeletonTheme>
  );
};
