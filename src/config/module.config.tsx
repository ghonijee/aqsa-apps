import DynamicIcon from "../components/ui/icon";
import { AppModuleWithFeatureModules } from "@/entities";

export const appModules: AppModuleWithFeatureModules[] = [
  {
    name: "Dashboard",
    defaultUrl: "/",
    icon: <DynamicIcon name="layout-dashboard" size={20} />,
    featureModules: null,
  },
  // {
  //   name: "Finance",
  //   defaultUrl: "/finances",
  //   icon: <DynamicIcon name="wallet" size={20} />,
  //   featureModules: [
  //     {
  //       name: "Home",
  //       defaultUrl: "/",
  //       icon: <DynamicIcon name="house" size={20} />,
  //     },
  //     {
  //       name: "Chart of Account",
  //       defaultUrl: "/chart-of-accounts",
  //       icon: <DynamicIcon name="credit-card" size={20} />,
  //     },
  //   ],
  // },
  {
    name: "Setting",
    defaultUrl: "/settings",
    icon: <DynamicIcon name="settings" size={20} />,
    featureModules: [
      {
        name: "Home",
        defaultUrl: "/",
        icon: <DynamicIcon name="house" size={20} />,
      },
      {
        name: "Company",
        defaultUrl: "/companies",
        icon: <DynamicIcon name="building-2" size={20} />,
      },
      {
        name: "User",
        defaultUrl: "/users",
        icon: <DynamicIcon name="user-round-cog" size={20} />,
      },
    ],
  },
];
