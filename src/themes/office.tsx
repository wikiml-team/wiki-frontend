import { createTheme, IColorCellProps } from "@fluentui/react";

export const themeWord = createTheme({
  palette: {
    themePrimary: "#2b579a",
    themeLighterAlt: "#f4f7fb",
    themeLighter: "#d3deef",
    themeLight: "#b0c3e0",
    themeTertiary: "#6e90c2",
    themeSecondary: "#3d66a5",
    themeDarkAlt: "#274e8a",
    themeDark: "#214274",
    themeDarker: "#183156",
    neutralLighterAlt: "#f8f8f8",
    neutralLighter: "#f4f4f4",
    neutralLight: "#eaeaea",
    neutralQuaternaryAlt: "#dadada",
    neutralQuaternary: "#d0d0d0",
    neutralTertiaryAlt: "#c8c8c8",
    neutralTertiary: "#a19f9d",
    neutralSecondary: "#605e5c",
    neutralPrimaryAlt: "#3b3a39",
    neutralPrimary: "#323130",
    neutralDark: "#201f1e",
    black: "#000000",
    white: "#ffffff",
  },
});

export const themeExcel = createTheme({
    palette: {
      themePrimary: '#217346',
      themeLighterAlt: '#f2f9f5',
      themeLighter: '#cee9da',
      themeLight: '#97c2aa',
      themeTertiary: '#62ab83',
      themeSecondary: '#318456',
      themeDarkAlt: '#1e673f',
      themeDark: '#195735',
      themeDarker: '#134027',
      neutralLighterAlt: '#faf9f8',
      neutralLighter: '#f3f2f1',
      neutralLight: '#edebe9',
      neutralQuaternaryAlt: '#e1dfdd',
      neutralQuaternary: '#d0d0d0',
      neutralTertiaryAlt: '#c8c6c4',
      neutralTertiary: '#a19f9d',
      neutralSecondary: '#605e5c',
      neutralPrimaryAlt: '#3b3a39',
      neutralPrimary: '#323130',
      neutralDark: '#201f1e',
      black: '#000000',
      white: '#ffffff',
  }
});

export const themePowerPoint = createTheme({
  palette: {
    themePrimary: "#b7472a",
    themeLighterAlt: "#fcf6f4",
    themeLighter: "#f4dcd6",
    themeLight: "#eabeb4",
    themeTertiary: "#d48672",
    themeSecondary: "#c0583e",
    themeDarkAlt: "#a53f26",
    themeDark: "#8c3620",
    themeDarker: "#672718",
    neutralLighterAlt: "#f8f8f8",
    neutralLighter: "#f4f4f4",
    neutralLight: "#eaeaea",
    neutralQuaternaryAlt: "#dadada",
    neutralQuaternary: "#d0d0d0",
    neutralTertiaryAlt: "#c8c8c8",
    neutralTertiary: "#a19f9d",
    neutralSecondary: "#605e5c",
    neutralPrimaryAlt: "#3b3a39",
    neutralPrimary: "#323130",
    neutralDark: "#201f1e",
    black: "#000000",
    white: "#ffffff",
  },
});

export const themeTeams = createTheme({
  palette: {
    themePrimary: "#6264a7",
    themeLighterAlt: "#f7f7fb",
    themeLighter: "#e1e1f1",
    themeLight: "#c8c9e4",
    themeTertiary: "#989ac9",
    themeSecondary: "#7173b0",
    themeDarkAlt: "#585a95",
    themeDark: "#4a4c7e",
    themeDarker: "#37385d",
    neutralLighterAlt: "#f8f8f8",
    neutralLighter: "#f4f4f4",
    neutralLight: "#eaeaea",
    neutralQuaternaryAlt: "#dadada",
    neutralQuaternary: "#d0d0d0",
    neutralTertiaryAlt: "#c8c8c8",
    neutralTertiary: "#a19f9d",
    neutralSecondary: "#605e5c",
    neutralPrimaryAlt: "#3b3a39",
    neutralPrimary: "#323130",
    neutralDark: "#201f1e",
    black: "#000000",
    white: "#ffffff",
  },
});

export default themeWord;

export const colorCells: IColorCellProps[] = [
  { id: "1", label: "word", color: "#2b579a" },
  { id: "2", label: "excel", color: "#217346" },
  { id: "3", label: "powerpoint", color: "#a92b1a" },
  { id: "4", label: "teams", color: "#6264a7" },
];
