import type { Breakpoint, SxProps, Theme } from '@mui/material/styles';

import { useEffect } from 'react';

import Box from '@mui/material/Box';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { useTheme } from '@mui/material/styles';

import { RouterLink } from 'src/routes/components';
import { usePathname } from 'src/routes/hooks';

import { Scrollbar } from 'src/components/scrollbar';

import { WorkspacesPopover } from '../components/workspaces-popover';

import logo from '../../assets/logo.png';
import type { WorkspacesPopoverProps } from '../components/workspaces-popover';
import { HeaderSection } from '../core/header-section';
// ----------------------------------------------------------------------

export type NavContentProps = {
  data: {
    path: string;
    title: string;
    icon: React.ReactNode;
    info?: React.ReactNode;
  }[];
  slots?: {
    topArea?: React.ReactNode;
    bottomArea?: React.ReactNode;
  };
  workspaces: WorkspacesPopoverProps['data'];
  sx?: SxProps<Theme>;
};

export function NavDesktop({
  sx,
  data,
  slots,
  workspaces,
  layoutQuery,
}: NavContentProps & { layoutQuery: Breakpoint }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        top: 0,
        left: 0,
        height: 1,
        display: 'none',
        position: 'fixed',
        flexDirection: 'column',
        bgcolor: 'var(--layout-nav-bg)',
        zIndex: 'var(--layout-nav-zIndex)',
        width: 'var(--layout-nav-vertical-width)',
        [theme.breakpoints.up(layoutQuery)]: {
          display: 'flex',
        },
        ...sx,
      }}
    >
      <NavContent data={data} slots={slots} workspaces={workspaces} />
    </Box>
  );
}

// ----------------------------------------------------------------------

export function NavMobile({
  sx,
  data,
  open,
  slots,
  onClose,
  workspaces,
}: NavContentProps & { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      sx={{
        [`& .${drawerClasses.paper}`]: {
          pt: 2.5,
          px: 2.5,
          overflow: 'unset',
          bgcolor: 'var(--layout-nav-bg)',
          width: 'var(--layout-nav-mobile-width)',
          ...sx,
        },
      }}
    >
      <NavContent data={data} slots={slots} workspaces={workspaces} />
    </Drawer>
  );
}

// ----------------------------------------------------------------------

export const drivers = [
  {
    id: 'team-1',
    name: 'Kyle Rachau',
    logo: `/assets/icons/workspaces/logo-1.webp`,
    plan: 'Driver',
  },
  {
    id: 'team-2',
    name: 'Team 2',
    logo: `/assets/icons/workspaces/logo-2.webp`,
    plan: 'Pro',
  },
  {
    id: 'team-3',
    name: 'Team 3',
    logo: `/assets/icons/workspaces/logo-3.webp`,
    plan: 'Pro',
  },
];

export const vehicles = [
  {
    id: 'team-1',
    name: 'Chevy Volt (2017)',
  },
  {
    id: 'team-2',
    name: 'Subaru Outback (2021)',
  },
];

export function NavContent({ data, slots, workspaces, sx }: NavContentProps) {
  const pathname = usePathname();

  const layoutQuery: Breakpoint = 'lg';

  return (
    <>
      <HeaderSection
        layoutQuery={layoutQuery}
        slotProps={{
          container: {
            maxWidth: false,
            sx: { backgroundColor: '#010014 !important' },
          },
        }}
        slots={{
          leftArea: (
            <>
              <img
                src={logo}
                alt="logo"
                style={{
                  width: 125,
                  height: 125,
                  position: 'absolute',
                  zIndex: '999',
                  paddingTop: '7px',
                }}
              />
            </>
          ),
        }}
        sx={{ backgroundColor: '#010014 !important' }}
      />

      <Box sx={{ p: 2.5 }}>
        <WorkspacesPopover data={drivers} sx={{ my: 2 }} />

        <Scrollbar fillContent>
          <Box component="nav" display="flex" flex="1 1 auto" flexDirection="column" sx={sx}>
            <Box component="ul" gap={0.5} display="flex" flexDirection="column">
              {data.map((item) => {
                const isActived = item.path === pathname;

                return (
                  <ListItem disableGutters disablePadding key={item.title}>
                    <ListItemButton
                      disableGutters
                      component={RouterLink}
                      href={item.path}
                      sx={{
                        pl: 2,
                        py: 1,
                        gap: 2,
                        pr: 1.5,
                        borderRadius: 0.75,
                        typography: 'body2',
                        fontWeight: 'fontWeightMedium',
                        color: 'var(--layout-nav-item-color)',
                        minHeight: 'var(--layout-nav-item-height)',
                        ...(isActived && {
                          fontWeight: 'fontWeightSemiBold',
                          bgcolor: 'var(--layout-nav-item-active-bg)',
                          color: 'var(--layout-nav-item-active-color)',
                          '&:hover': {
                            bgcolor: 'var(--layout-nav-item-hover-bg)',
                          },
                        }),
                      }}
                    >
                      <Box component="span" flexGrow={1}>
                        {item.title}
                      </Box>

                      {item.info && item.info}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </Box>
          </Box>
        </Scrollbar>
      </Box>
    </>
  );
}
