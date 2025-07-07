import FullRoutePath from "./routes";

export const dashboardMenuItemsOne = [
  {
    Icon: "/assets/icons/icon_2.png",
    title: "Get Started",
    link: FullRoutePath.GETSTARTED,
    onSelect: () => {},
  },
  {
    Icon: "/assets/icons/icon_3.svg",
    title: "Overview",
    link: FullRoutePath.OVERVIEW,
    onSelect: () => {},
  },
]

// Admin-specific menu items
export const dashboardMenuItemsAdmin = [
  {
    Icon: "/assets/icons/icon_9.svg",
    title: "Merchant List",
    link: FullRoutePath.ADMIN_MERCHANTS,
    onSelect: () => {},
  },
  {
    Icon: "/assets/icons/icon_6.svg",
    title: "Token Update",
    link: FullRoutePath.ADMIN_TOKEN_UPDATE,
    onSelect: () => {},
  },
];
