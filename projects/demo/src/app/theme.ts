import { definePreset } from '@primeng/themes';
import Material from '@primeng/themes/material';
import { DemoPNgDiffTheme } from './theme/demo-png-diff.theme';
import { DemoPNgCSSTheme } from './theme/demo-png-css.theme';

export const definePNgThemePreset = (withCss = true) =>
  definePreset(Material, DemoPNgDiffTheme, withCss ? DemoPNgCSSTheme : undefined);
