import type { Breakpoint, SxProps, Theme } from '@mui/material/styles';

import { useState } from 'react';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

import { _notifications } from 'src/_mock';

import { Button } from '@mui/material';
import { Iconify } from 'src/components/iconify';

import { Amplify, type ResourcesConfig } from 'aws-amplify';
import {
  confirmSignUp,
  signIn,
  signUp,
  type ConfirmSignUpInput,
  type SignInInput,
} from 'aws-amplify/auth';
import { createUser } from 'src/api/users';
import ConfirmSignupDialog from 'src/components/dialogs/confirmSignup';
import CreateAccountDialog from 'src/components/dialogs/createAccount';
import LoginDialog from 'src/components/dialogs/login';
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
const resConfig = {
  endpoint: 'https://6nfie7awye.execute-api.us-east-1.amazonaws.com/dev',
};

const apiConfig: ResourcesConfig['API'] = {
  REST: {
    'quicker-stops': resConfig,
  },
};

const authConfig: ResourcesConfig['Auth'] = {
  Cognito: {
    userPoolId: 'us-east-1_l6oAV7m6b',
    userPoolClientId: '54m3fkpimt2lcr1ftf3d7jujp6',
  },
};

Amplify.configure({
  Auth: authConfig,
  API: apiConfig,
});

export type DashboardLayoutProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  header?: {
    sx?: SxProps<Theme>;
  };
  loggedIn: boolean;
  updateLoggedIn: any;
};

type SignUpParameters = {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
};

type userCreate = {
  cognito_id: string;
  first_name: string;
  last_name: string;
};

export function DashboardLayout({
  sx,
  children,
  header,
  loggedIn,
  updateLoggedIn,
}: DashboardLayoutProps) {
  const theme = useTheme();
  const [loginOpen, setLoginOpen] = useState(false);
  const [createAccountOpen, setCreateAccountOpen] = useState(false);
  const [confirmSignUpOpen, setConfirmSignUpOpen] = useState(false);
  const [cognitoId, setCognitoId] = useState('');

  const layoutQuery: Breakpoint = 'lg';

  async function handleSignIn({ username, password }: SignInInput) {
    try {
      const { isSignedIn, nextStep } = await signIn({ username, password });
      console.log(isSignedIn);
      if (isSignedIn) {
        updateLoggedIn(isSignedIn);
        setLoginOpen(false);
      }

      console.log(nextStep);
    } catch (error) {
      console.log('error signing in', error);
    }
  }

  async function handleSignUp({ username, password, first_name, last_name }: SignUpParameters) {
    try {
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username,
        password,
      });

      const object: userCreate = {
        cognito_id: username,
        first_name: first_name,
        last_name: last_name,
      };

      await createUser(object);

      if (nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
        setCreateAccountOpen(false);
        setConfirmSignUpOpen(true);
      }
      if (userId !== undefined) {
        setCognitoId(userId);
      }
    } catch (error) {
      console.log('error signing up:', error);
    }
  }

  async function handleSignUpConfirmation({ username, confirmationCode }: ConfirmSignUpInput) {
    try {
      const { isSignUpComplete, nextStep } = await confirmSignUp({
        username,
        confirmationCode,
      });

      if (isSignUpComplete) {
        setConfirmSignUpOpen(false);
      }
    } catch (error) {
      console.log('error confirming sign up', error);
    }
  }

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
                    <Button
                      variant="outlined"
                      onClick={() => setCreateAccountOpen(true)}
                      sx={{ borderColor: '#fff', color: '#fff', mr: 3 }}
                    >
                      Create Account
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => setLoginOpen(true)}
                      sx={{ borderColor: '#fff', color: '#fff' }}
                    >
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
      <LoginDialog
        open={loginOpen}
        handleCancel={() => setLoginOpen(false)}
        handleSubmit={(e: any) => handleSignIn(e)}
      />
      <CreateAccountDialog
        open={createAccountOpen}
        handleCancel={() => setCreateAccountOpen(false)}
        handleSubmit={(e: any) => handleSignUp(e)}
      />
      <ConfirmSignupDialog
        open={confirmSignUpOpen}
        handleCancel={() => setConfirmSignUpOpen(false)}
        handleSubmit={(e: any) => handleSignUpConfirmation(e)}
        cognitoId={cognitoId}
      />
    </LayoutSection>
  );
}
