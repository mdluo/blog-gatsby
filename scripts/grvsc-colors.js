const fs = require('fs');
const path = require('path');
const tinycolor = require('tinycolor2');

// https://github.com/file-icons/vscode/blob/master/scripts/import.js#L88
const colourMap = {
  // Red
  'medium-red': '#ac4142',
  'light-red': '#c97071',
  'dark-red': '#c97071',
  // Green
  'medium-green': '#90a959',
  'light-green': '#b2c38b',
  'dark-green': '#66783e',
  // Yellow
  'medium-yellow': '#f4bf75',
  'light-yellow': '#fae0bc',
  'dark-yellow': '#ee9e2e',
  // Blue
  'medium-blue': '#6a9fb5',
  'light-blue': '#9dc0ce',
  'dark-blue': '#46788d',
  // Maroon
  'medium-maroon': '#8f5536',
  'light-maroon': '#be7953',
  'dark-maroon': '#573421',
  // Purple
  'medium-purple': '#aa759f',
  'light-purple': '#c7a4c0',
  'dark-purple': '#825078',
  // Orange
  'medium-orange': '#d28445',
  'light-orange': '#e1ad83',
  'dark-orange': '#a35f27',
  // Cyan
  'medium-cyan': '#75b5aa',
  'light-cyan': '#a7d0c9',
  'dark-cyan': '#4d9085',
  // Pink
  'medium-pink': '#ff00cc',
  'light-pink': '#ff4ddb',
  'dark-pink': '#b3008f',
};

const lines = [];
Object.entries(colourMap).forEach(([key, val]) => {
  const isBgDark = tinycolor(val).getLuminance() < 0.4;
  const textColor = isBgDark ? '$white' : '$black';
  lines.push(`  &.${key}[data-language]::before {
    color: ${textColor} !important;
    background-color: ${val} !important;
  }`);
});

lines.unshift('pre.grvsc-container {');
lines.push('}\n');

fs.writeFileSync(
  path.resolve(__dirname, '../src/styles/_languages.scss'),
  lines.join('\n')
);
