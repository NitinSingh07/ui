import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { styled } from '@mui/material/styles';
import Link from 'next/link'; // Next.js Link for client-side navigation
import { useRouter } from 'next/navigation';
import React from 'react';

const TailwindBreadcrumbs = styled(Breadcrumbs)`
  @apply text-gray-300;
  & .MuiBreadcrumbs-separator {
    margin-left: 0.25rem;
    margin-right: 0.25rem;
  }
`;

export const Breadcrumb = ({ breadcrumbs }: { breadcrumbs: { label: string; href: string }[] }) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <TailwindBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextIcon fontSize="medium" className="text-primary" />}
    >
      {breadcrumbs.map((breadcrumb, index) =>
        index === breadcrumbs.length - 1 ? (
          <div key={breadcrumb.label} className="text-disabled font-inter text-primary">
            {breadcrumb.label}
          </div>
        ) : (
          <Link key={breadcrumb.label} href={breadcrumb.href} passHref>
            <div
              onClick={(e) => handleClick(e, breadcrumb.href)}
              style={{ color: 'var(--primary-main)', textDecoration: 'none' }}
            >
              {breadcrumb.label}
            </div>
          </Link>
        )
      )}
    </TailwindBreadcrumbs>
  );
};
