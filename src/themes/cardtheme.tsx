import { useTheme } from "@fluentui/react";

// 2, 4, 6, 3, 1, 5
const wordcard = [
  "124, 185, 232",
  "82, 122, 153",
  "27, 39, 47",
  "141, 176, 204",
  "187, 213, 233",
  "57, 85, 105",
];

const excellcard = [
  "85, 218, 115",
  "159, 255, 0",
  "21, 114, 115",
  "32, 206, 208",
  "114, 203, 181",
  "67, 209, 143",
];

const pptcard = [
  "244, 120, 72",
  "116, 10, 7",
  "226, 61, 40",
  "221, 124, 49",
  "170, 0, 0",
  "255, 160, 122",
];

const teamscard = [
  "144, 123, 175",
  "91, 82, 112",
  "216, 191, 216",
  "69, 44, 99",
  "86, 88, 141",
  "156, 148, 207",
];

function GetCardColor() {
  let colors: string[] = [];

  const { palette } = useTheme();

  switch (palette.themePrimary) {
    case "#2b579a":
      colors = wordcard;
      break;
    case "#217346":
      colors = excellcard;
      break;
    case "#b7472a":
      colors = pptcard;
      break;
    case "#6264a7":
      colors = teamscard;
      break;
    default:
      colors = wordcard;
      break;
  }

  const degrees = ["180", "45", "-45", "90", "-90", "180"];
  const percents = ["20", "20", "40", "40", "60", "60", "80", "80"];

  const linears = colors.map((data, i) => {
    let c = `linear-gradient(${degrees[i]}deg,`;
    for (let index = 0; index < 8; index++) {
      c = c.concat(` rgba(${data}, .${index + i}) ${percents[index]}%,`);
    }
    return c.replace(/,$/, ")");
  });

  return linears.join(",");
}

export default GetCardColor;
