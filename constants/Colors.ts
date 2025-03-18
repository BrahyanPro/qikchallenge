// Define primary and secondary colors based on modern design trends
const primaryColorLight = '#1C74B6'; // A strong, vibrant blue that catches the eye
const primaryColorDark = '#3A8D99'; // A slightly muted blue for dark mode

const secondaryColorLight = '#FF6F61'; // A warm coral red for accents
const secondaryColorDark = '#FF8B7E'; // A muted coral for dark mode

const backgroundLight = '#FAFAFA'; // A soft, light background color
const backgroundDark = '#121212'; // A true dark mode color, deep enough for eye comfort

const textLight = '#333333'; // Dark text for high contrast and readability
const textDark = '#ECEDEE'; // Light grayish text for dark mode, making it less harsh than white

const iconLight = '#9E9E9E'; // Neutral icon color for light mode
const iconDark = '#C1C1C1'; // A light gray for icons in dark mode, still visible but not too bright

export const Colors = {
  light: {
    text: textLight,
    background: backgroundLight,
    tint: primaryColorLight,
    icon: iconLight,
    tabIconDefault: iconLight,
    tabIconSelected: primaryColorLight,
    secondary: secondaryColorLight // For secondary actions or accents
  },
  dark: {
    text: textDark,
    background: backgroundDark,
    tint: primaryColorDark,
    icon: iconDark,
    tabIconDefault: iconDark,
    tabIconSelected: primaryColorDark,
    secondary: secondaryColorDark // For secondary actions or accents in dark mode
  }
};
