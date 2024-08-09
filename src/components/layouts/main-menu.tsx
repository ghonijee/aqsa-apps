"use client";

import { AppModuleWithFeatureModules } from "@/entities";
import { cn } from "@/lib/utils/utils";
import { useAppModuleStore } from "@/store/app-module.store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface MainMenuProps {
  menus: AppModuleWithFeatureModules[];
}

export default function MainMenu({ menus }: Readonly<MainMenuProps>) {
  const pathName = usePathname().split("/");
  const activeModule = pathName[2] || "";
  const companyName = pathName[1];

  const { onSelect } = useAppModuleStore();

  return (
    <div className="w-20 bg-darkblue flex flex-col justify-start items-center gap-y-4 pt-4">
      {menus.map((appModule) => {
        const isActive =
          (activeModule == "" && appModule.defaultUrl === "/") ||
          (activeModule !== "" &&
            appModule.defaultUrl.startsWith(`/${activeModule}`));

        return (
          <TooltipProvider key={appModule.name}>
            <Tooltip delayDuration={100}>
              <TooltipTrigger asChild>
                <Link
                  href={`/${companyName}${appModule.defaultUrl}`}
                  onClick={() => onSelect(appModule)}
                >
                  <div
                    className={cn(
                      "h-10 w-10 rounded-lg bg-base bg-opacity-[.15] flex justify-center items-center ",
                      isActive && "bg-primary-500 border-2 border-primary-400"
                    )}
                  >
                    <div className="text-white">{appModule.icon}</div>
                  </div>
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                sideOffset={10}
                className="bg-overlay text-color-base text-xs"
              >
                {appModule.name}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </div>
  );
}
