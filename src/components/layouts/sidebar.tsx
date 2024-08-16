"use client";

import { cn } from "@/lib/utils/utils";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import SubMenu from "./sub-menu";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { Tabs } from "../ui/tabs";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { appModules } from "@/config/module.config";

export default function Sidebar() {
  const pathName = usePathname();
  const [_, companyCode, activeModule, featureName] =
    pathName?.split("/") ?? [];

  const modulesItem = useMemo(() => {
    return appModules.map((appModule) => {
      const isActive =
        (activeModule == undefined && appModule.defaultUrl === "/") ||
        (activeModule !== "" &&
          appModule.defaultUrl.startsWith(`/${activeModule}`));

      return {
        name: appModule.name,
        url: `/${companyCode}${appModule.defaultUrl}`,
        icon: appModule.icon,
        isActive: isActive,
        module: appModule,
      };
    });
  }, [activeModule, companyCode]);

  return (
    <>
      <Tabs
        defaultValue={`/${companyCode}/${activeModule}`}
        className="w-auto flex flex-row"
      >
        {/* <div className="w-20 bg-darkblue flex flex-col justify-start items-center gap-y-4 pt-4"> */}
        <TabsPrimitive.List className="w-20 bg-darkblue flex flex-col justify-start items-center gap-y-2 pt-4">
          {modulesItem.map((item, index) => {
            return (
              <TabsPrimitive.Trigger asChild value={item.url} key={item.name}>
                <ModuleItem
                  name={item.name}
                  isActive={item.isActive}
                  url={item.url}
                  icon={item.icon}
                  key={index}
                />
              </TabsPrimitive.Trigger>
            );
          })}
        </TabsPrimitive.List>
        {/* </div> */}
        {modulesItem.map((item, index) => {
          return (
            <TabsPrimitive.Content
              value={item.url}
              key={index}
              className="w-60 bg-[#F6F7F9] px-4 py-6"
            >
              <SubMenu
                baseUrlModule={item.url}
                module={item.module}
                featureName={featureName}
              />
            </TabsPrimitive.Content>
          );
        })}
      </Tabs>
    </>
  );
}

interface ModuleItemProps {
  name: string;
  isActive: boolean;
  url: string;
  icon: React.ReactNode;
}

function ModuleItem({ name, isActive, url, icon }: Readonly<ModuleItemProps>) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <Link href={url}>
            <div
              className={cn(
                "h-10 w-10 rounded-lg bg-base bg-opacity-[.15] flex justify-center items-center ",
                isActive && "bg-primary-500 border-2 border-primary-400"
              )}
            >
              <div className="text-white">{icon}</div>
            </div>
          </Link>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          sideOffset={10}
          className="bg-overlay text-color-base text-xs"
        >
          {name}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
