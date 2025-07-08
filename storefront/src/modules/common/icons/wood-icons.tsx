import { IconProps } from "types/icon"

export const FlameIcon = ({ ...props }: IconProps) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 23C12 23 18 19 18 11C18 8.79086 17.1571 6.73214 15.6569 5.12132C14.1566 3.51049 12.1217 2.5 10 2.5C8.5 2.5 6 4 6 7C6 8.5 7 9.5 8 10.5C9 11.5 10 12.5 10 14C10 15.5 9 16.5 8 17C7 17.5 6 18 6 19C6 21.5 9 23 12 23Z" fill="currentColor"/>
    <path d="M12 20C12 20 15 17.5 15 13C15 11.5 14 10.5 13 9.5C12 8.5 11 7.5 11 6C11 4.5 12 3.5 13 4C14 4.5 15 5.5 15 7C15 8 14.5 8.5 14 9C13.5 9.5 13 10 13 11C13 12 13.5 12.5 14 13C14.5 13.5 15 14 15 15C15 17 12 20 12 20Z" fill="#f59e0b"/>
  </svg>
)

export const ShieldIcon = ({ ...props }: IconProps) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 2L3 7V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V7L12 2Z" fill="currentColor"/>
    <path d="M10 14L16 8L17.5 9.5L10 17L6.5 13.5L8 12L10 14Z" fill="white"/>
  </svg>
)

export const BrushIcon = ({ ...props }: IconProps) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M7 14C5.9 14 5 14.9 5 16C5 17.1 5.9 18 7 18S9 17.1 9 18C9 19.7 7.7 21 6 21C4.3 21 3 19.7 3 18C3 16.9 3.9 16 5 16C5 14.9 5.9 14 7 14Z" fill="currentColor"/>
    <path d="M20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.12 5.12L18.87 8.87L20.71 7.04Z" fill="currentColor"/>
    <path d="M17.46 10.29L13.71 6.54L8.21 12.04L8.96 15.46L12.38 14.71L17.46 10.29Z" fill="currentColor"/>
  </svg>
)

export const LeafIcon = ({ ...props }: IconProps) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22.45C8.66 16.7 11.14 12.89 17 10V8Z" fill="currentColor"/>
    <path d="M16.5 3C13.59 3 11.04 4.81 9.5 7.5C7.96 4.81 5.41 3 2.5 3V5C4.83 5 6.79 6.58 7.85 8.79C8.91 6.58 10.87 5 13.2 5C15.53 5 17.49 6.58 18.55 8.79C19.61 6.58 21.57 5 23.9 5V3C21 3 18.45 4.81 16.91 7.5C16.22 6.02 15.09 4.8 13.7 4.07C14.72 3.41 15.57 3 16.5 3Z" fill="#16a34a"/>
  </svg>
)

export const WeatherIcon = ({ ...props }: IconProps) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M19.78 17.51C18.55 19.19 16.62 20.24 14.5 20.24C11.46 20.24 9 17.78 9 14.74C9 13.03 9.85 11.5 11.22 10.6C9.93 9.96 8.45 9.59 6.89 9.59C3.09 9.59 0 12.68 0 16.48C0 20.28 3.09 23.37 6.89 23.37C9.77 23.37 12.31 21.72 13.64 19.27" fill="currentColor"/>
    <path d="M12 6L10.12 8.88L7 8L10.12 7.12L12 4L13.88 7.12L17 8L13.88 8.88L12 6Z" fill="#fbbf24"/>
    <path d="M6 2L4.9 4.1L2 4L4.9 3.9L6 1L7.1 3.9L10 4L7.1 4.1L6 2Z" fill="#fbbf24"/>
    <path d="M20 2L19.1 3.6L17 3L19.1 2.9L20 1L20.9 2.9L23 3L20.9 3.6L20 2Z" fill="#fbbf24"/>
  </svg>
)

export const BugIcon = ({ ...props }: IconProps) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M20 8H17.19C16.74 7.22 16.12 6.55 15.37 6.04L17 4.41L15.59 3L13.17 5.42C12.8 5.29 12.4 5.22 12 5.22S11.2 5.29 10.83 5.42L8.41 3L7 4.41L8.63 6.04C7.88 6.55 7.26 7.22 6.81 8H4V10H6.09C6.04 10.33 6 10.66 6 11V12H4V14H6V15C6 15.34 6.04 15.67 6.09 16H4V18H6.81C7.85 19.79 9.78 21 12 21S16.15 19.79 17.19 18H20V16H17.91C17.96 15.67 18 15.34 18 15V14H20V12H18V11C18 10.66 17.96 10.33 17.91 10H20V8Z" fill="currentColor"/>
  </svg>
)

export const SparkleIcon = ({ ...props }: IconProps) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M9 11H7L9 9V7L11 9H13L11 11V13L9 11Z" fill="currentColor"/>
    <path d="M4 15H2L4 13V11L6 13H8L6 15V17L4 15Z" fill="currentColor"/>
    <path d="M20 9H18L20 7V5L22 7H24L22 9V11L20 9Z" fill="currentColor"/>
    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
  </svg>
)

export const TreeIcon = ({ ...props }: IconProps) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 2L8 7H16L12 2Z" fill="#16a34a"/>
    <path d="M12 5L9 9H15L12 5Z" fill="#15803d"/>
    <path d="M12 8L10 11H14L12 8Z" fill="#166534"/>
    <rect x="11" y="11" width="2" height="10" fill="#92400e"/>
    <path d="M8 21H16V19H8V21Z" fill="#92400e"/>
  </svg>
)

export const DropletIcon = ({ ...props }: IconProps) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 2.69L17.66 8.35C18.78 9.47 19.5 11.05 19.5 12.75C19.5 16.86 16.11 20.25 12 20.25C7.89 20.25 4.5 16.86 4.5 12.75C4.5 11.05 5.22 9.47 6.34 8.35L12 2.69Z" fill="#3b82f6"/>
    <circle cx="10" cy="10" r="2" fill="#60a5fa"/>
  </svg>
)

export const StarIcon = ({ ...props }: IconProps) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#fbbf24"/>
  </svg>
)

export const PaletteIcon = ({ ...props }: IconProps) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C13.1 22 14 21.1 14 20C14 19.5 13.8 19.1 13.4 18.8C13 18.4 12.6 18.1 12.6 17.6C12.6 16.5 13.5 15.6 14.6 15.6H16C19.31 15.6 22 12.91 22 9.6C22 5.23 17.5 2 12 2Z" fill="currentColor"/>
    <circle cx="6.5" cy="10.5" r="1.5" fill="#ef4444"/>
    <circle cx="9.5" cy="7.5" r="1.5" fill="#f97316"/>
    <circle cx="14.5" cy="7.5" r="1.5" fill="#eab308"/>
    <circle cx="17.5" cy="10.5" r="1.5" fill="#22c55e"/>
  </svg>
)

export const RulerIcon = ({ ...props }: IconProps) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M3 17.25V21.75C3 22.44 3.56 23 4.25 23H8.75C9.44 23 10 22.44 10 21.75V17.25C10 16.56 9.44 16 8.75 16H4.25C3.56 16 3 16.56 3 17.25Z" fill="currentColor"/>
    <path d="M1 1L23 23" stroke="currentColor" strokeWidth="2"/>
    <path d="M5 1L19 15" stroke="currentColor" strokeWidth="1"/>
    <path d="M8 1V4M11 1V3M14 1V4M17 1V3M20 1V4" stroke="currentColor" strokeWidth="1"/>
  </svg>
)

export const SquareIcon = ({ ...props }: IconProps) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="3" y="3" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M8 3V21M16 3V21M3 8H21M3 16H21" stroke="currentColor" strokeWidth="1"/>
  </svg>
)

export const LinkIcon = ({ ...props }: IconProps) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M10.5 17C8.5 17 7 15.5 7 13.5C7 11.5 8.5 10 10.5 10H13.5C15.5 10 17 11.5 17 13.5" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M13.5 7C15.5 7 17 8.5 17 10.5C17 12.5 15.5 14 13.5 14H10.5C8.5 14 7 12.5 7 10.5" stroke="currentColor" strokeWidth="2" fill="none"/>
  </svg>
)

export const PackageIcon = ({ ...props }: IconProps) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M21 8L12 13L3 8L12 3L21 8Z" fill="currentColor"/>
    <path d="M21 16L12 21L3 16" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M12 13V21" stroke="currentColor" strokeWidth="2"/>
  </svg>
)

export const HammerIcon = ({ ...props }: IconProps) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M2.5 4L3.5 3L6 5.5L14.5 14L18.5 10L22 13.5L18.5 17L10 8.5L7.5 6L6 7.5L5 6.5L2.5 4Z" fill="currentColor"/>
    <rect x="19" y="8" width="3" height="8" rx="1" fill="currentColor"/>
  </svg>
)

export const WrenchIcon = ({ ...props }: IconProps) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M22.7 19L13.6 9.9C14.5 7.6 14 4.9 12.1 3C10.1 1 7.1 0.6 4.7 1.7L9 6L6 9L1.7 4.7C0.6 7.1 1 10.1 3 12.1C4.9 14 7.6 14.5 9.9 13.6L19 22.7C19.8 23.5 21.1 23.5 21.9 22.7L22.7 21.9C23.5 21.1 23.5 19.8 22.7 19Z" fill="currentColor"/>
  </svg>
)

export const CheckIcon = ({ ...props }: IconProps) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="12" cy="12" r="10" fill="#16a34a"/>
    <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" fill="none"/>
  </svg>
)

export const RefreshIcon = ({ ...props }: IconProps) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M4 4V9H9" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M20 20V15H15" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L4 9M3.51 15A9 9 0 0 0 18.36 18.36L20 15" stroke="currentColor" strokeWidth="2" fill="none"/>
  </svg>
)

export const TruckIcon = ({ ...props }: IconProps) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="1" y="3" width="15" height="13" rx="2" ry="2" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M16 8H20L23 11V16H21" stroke="currentColor" strokeWidth="2" fill="none"/>
    <circle cx="5.5" cy="18.5" r="2.5" fill="currentColor"/>
    <circle cx="18.5" cy="18.5" r="2.5" fill="currentColor"/>
  </svg>
)

export const ReturnIcon = ({ ...props }: IconProps) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M9 10L5 6L9 2" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M20 4V7A4 4 0 0 1 16 11H5" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M15 14L19 18L15 22" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M4 20V17A4 4 0 0 1 8 13H19" stroke="currentColor" strokeWidth="2" fill="none"/>
  </svg>
)

export const ProtectionIcon = ({ ...props }: IconProps) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1Z" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" fill="none"/>
    <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.3"/>
  </svg>
) 