import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Icon({ children, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      {children}
    </svg>
  );
}

export const GridIcon = (props: IconProps) => <Icon {...props}><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></Icon>;
export const NewsIcon = (props: IconProps) => <Icon {...props}><path d="M4 5h11v14H4z" /><path d="M15 8h5v9a2 2 0 0 1-2 2h-3" /><path d="M7 9h5M7 13h5M7 16h3" /></Icon>;
export const MailIcon = (props: IconProps) => <Icon {...props}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></Icon>;
export const UserIcon = (props: IconProps) => <Icon {...props}><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></Icon>;
export const PlusIcon = (props: IconProps) => <Icon {...props}><path d="M12 5v14M5 12h14" /></Icon>;
export const ArrowIcon = (props: IconProps) => <Icon {...props}><path d="m9 18 6-6-6-6" /></Icon>;
export const UploadIcon = (props: IconProps) => <Icon {...props}><path d="M12 16V4m0 0L7 9m5-5 5 5" /><path d="M5 15v4h14v-4" /></Icon>;
export const SearchIcon = (props: IconProps) => <Icon {...props}><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></Icon>;
export const TrashIcon = (props: IconProps) => <Icon {...props}><path d="M4 7h16M9 7V4h6v3M7 7l1 13h8l1-13M10 11v5M14 11v5" /></Icon>;
export const LogoutIcon = (props: IconProps) => <Icon {...props}><path d="M10 5H5v14h5M14 8l4 4-4 4M8 12h10" /></Icon>;
export const MenuIcon = (props: IconProps) => <Icon {...props}><path d="M4 7h16M4 12h16M4 17h16" /></Icon>;
export const CloseIcon = (props: IconProps) => <Icon {...props}><path d="m6 6 12 12M18 6 6 18" /></Icon>;

