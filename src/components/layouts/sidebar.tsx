import { AppModuleWithFeatureModules } from "@/entities";
import {
  House,
  Landmark,
  LayoutDashboard,
  Settings,
  Wallet2Icon,
} from "lucide-react";
import MainMenu from "./main-menu";
import SubMenu from "./sub-menu";
import Icon from "../ui/icon";

const appModules: AppModuleWithFeatureModules[] = [
  {
    name: "Dashboard",
    defaultUrl: "/",
    icon: <LayoutDashboard size={20} />,
    featureModules: null,
  },
  {
    name: "Finance",
    defaultUrl: "/finances",
    icon: <Wallet2Icon size={20} />,
    featureModules: [
      {
        name: "Home",
        defaultUrl: "/",
        icon: <Icon name="house" size={20} />,
      },
      {
        name: "Chart of Account",
        defaultUrl: "/chart-of-accounts",
        icon: <Icon name="credit-card" size={20} />,
      },
    ],
  },
  {
    name: "Setting",
    defaultUrl: "/settings",
    icon: <Settings size={20} />,
    featureModules: [
      {
        name: "Home",
        defaultUrl: "/",
        icon: <Icon name="house" size={20} />,
      },
      {
        name: "User",
        defaultUrl: "/users",
        icon: <Icon name="building-2" size={20} />,
      },
    ],
  },
];

export default function Sidebar({ company }: { company: string }) {
  return (
    <div className="w-auto flex flex-row">
      {/* modules list */}
      <MainMenu menus={appModules} />
      {/* feature list */}
      <SubMenu menus={appModules} />
    </div>
  );
}
