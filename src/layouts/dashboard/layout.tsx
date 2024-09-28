import type { Breakpoint, SxProps, Theme } from '@mui/material/styles';

import { useState } from 'react';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

import { _notifications } from 'src/_mock';

import { Button } from '@mui/material';
import { Iconify } from 'src/components/iconify';

import logo from '../../assets/logo.png';
import { layoutClasses } from '../classes';
import { AccountPopover } from '../components/account-popover';
import { NotificationsPopover } from '../components/notifications-popover';
import { navData } from '../config-nav-dashboard';
import { _workspaces } from '../config-nav-workspace';
import { HeaderSection } from '../core/header-section';
import { LayoutSection } from '../core/layout-section';
import { Main } from './main';
import { NavDesktop } from './nav';

// ----------------------------------------------------------------------

export type DashboardLayoutProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  header?: {
    sx?: SxProps<Theme>;
  };
  loggedIn: boolean;
};

export function DashboardLayout({ sx, children, header, loggedIn }: DashboardLayoutProps) {
  const theme = useTheme();

  const [navOpen, setNavOpen] = useState(false);

  const layoutQuery: Breakpoint = 'lg';

  return (
    <LayoutSection
      /** **************************************
       * Header
       *************************************** */
      loggedIn={loggedIn}
      headerSection={
        <HeaderSection
          layoutQuery={layoutQuery}
          slotProps={{
            container: {
              maxWidth: false,
              sx: {
                px: { [layoutQuery]: 5 },
                width: loggedIn ? '100%' : '80%',
                backgroundColor: '#010014 !important',
              },
            },
          }}
          sx={{ backgroundColor: '#010014 !important' }}
          slots={{
            topArea: (
              <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
                This is an info Alert.
              </Alert>
            ),
            leftArea: (
              <>
                {!loggedIn && (
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
                )}
              </>
            ),
            rightArea: (
              <Box gap={1} display="flex" alignItems="center">
                {!loggedIn && (
                  <>
                    <Button variant="outlined" sx={{ borderColor: '#fff', color: '#fff', mr: 3 }}>
                      Create Account
                    </Button>
                    <Button variant="outlined" sx={{ borderColor: '#fff', color: '#fff' }}>
                      Log In
                    </Button>
                  </>
                )}
                {loggedIn && (
                  <>
                    <NotificationsPopover data={_notifications} sx={{ mr: 3 }} />
                    <AccountPopover
                      data={[
                        {
                          label: 'Home',
                          href: '/',
                          icon: <Iconify width={22} icon="solar:home-angle-bold-duotone" />,
                        },
                        {
                          label: 'Profile',
                          href: '#',
                          icon: <Iconify width={22} icon="solar:shield-keyhole-bold-duotone" />,
                        },
                        {
                          label: 'Settings',
                          href: '#',
                          icon: <Iconify width={22} icon="solar:settings-bold-duotone" />,
                        },
                      ]}
                    />
                  </>
                )}
              </Box>
            ),
          }}
        />
      }
      /** **************************************
       * Sidebar
       *************************************** */
      sidebarSection={
        <NavDesktop data={navData} layoutQuery={layoutQuery} workspaces={_workspaces} />
      }
      /** **************************************
       * Footer
       *************************************** */
      footerSection={null}
      /** **************************************
       * Style
       *************************************** */
      cssVars={{
        '--layout-nav-vertical-width': '300px',
        '--layout-dashboard-content-pt': theme.spacing(1),
        '--layout-dashboard-content-pb': theme.spacing(8),
        '--layout-dashboard-content-px': theme.spacing(5),
      }}
      sx={{
        [`& .${layoutClasses.hasSidebar}`]: {
          [theme.breakpoints.up(layoutQuery)]: {
            pl: loggedIn ? 'var(--layout-nav-vertical-width)' : '0',
          },
        },
        ...sx,
        backgroundColor: '#d9d9d9',
      }}
    >
      <Main>{children}</Main>
    </LayoutSection>
  );
}
