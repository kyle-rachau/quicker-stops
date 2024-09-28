import type { Theme, SxProps, CSSObject } from '@mui/material/styles';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';

import { baseVars } from '../config-vars';
import { layoutClasses } from '../classes';

// ----------------------------------------------------------------------

export type LayoutSectionProps = {
  sx?: SxProps<Theme>;
  cssVars?: CSSObject;
  children?: React.ReactNode;
  footerSection?: React.ReactNode;
  headerSection?: React.ReactNode;
  sidebarSection?: React.ReactNode;
  loggedIn?: boolean;
};

export function LayoutSection({
  sx,
  cssVars,
  children,
  footerSection,
  headerSection,
  sidebarSection,
  loggedIn,
}: LayoutSectionProps) {
  const theme = useTheme();

  const inputGlobalStyles = (
    <GlobalStyles
      styles={{
        body: {
          ...baseVars(theme),
          ...cssVars,
        },
      }}
    />
  );

  return (
    <>
      {inputGlobalStyles}

      <Box id="root__layout" className={layoutClasses.root} sx={sx}>
        {loggedIn ? sidebarSection : <></>}
        <Box
          display="flex"
          flex="1 1 auto"
          flexDirection="column"
          className={layoutClasses.hasSidebar}
        >
          {headerSection}
          {children}
          {footerSection}
        </Box>
      </Box>
    </>
  );
}
