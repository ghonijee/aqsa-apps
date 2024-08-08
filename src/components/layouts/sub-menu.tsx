"use client";

import { AppModuleWithFeatureModules } from "@/entities";
import { cn } from "@/lib/utils/utils";
import { useAppModuleStore } from "@/store/app-module.store";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SubMenu({
  menus,
  company,
}: {
  menus: AppModuleWithFeatureModules[];
  company?: string;
}) {
  const { selected, onSelect } = useAppModuleStore();
  const pathname = usePathname().split("/");
  const companyName = company || pathname[1];
  const moduleName = pathname[2] || "";
  const featureName = pathname[3] || "";

  if (!selected) {
    const selectedModuleIndex = menus.findIndex(
      (appModule) => appModule.defaultUrl === `/${moduleName}`
    );
    onSelect(menus[selectedModuleIndex]);
  }

  if (
    !selected ||
    selected.featureModules === null ||
    selected.featureModules.length === 0
  ) {
    return null;
  }

  return (
    <div className="w-60 h-screen bg-secondary px-4 py-6">
      {/* Company swicth */}

      {/* Feature list */}
      <div>
        <div className="px-4 flex flex-row gap-x-4 justify-start items-center mb-5">
          <span className="text-muted">{selected.icon}</span>
          <div className=" text-muted font-medium text-base">
            {selected.name}
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          {selected.featureModules.map((featureModule) => {
            const isActive =
              (featureName == "" && featureModule.defaultUrl === "/") ||
              (featureName !== "" &&
                featureModule.defaultUrl.startsWith(`/${featureName}`));

            return (
              <Link
                href={`/${companyName}/${moduleName}${featureModule.defaultUrl}`}
                key={featureModule.name}
              >
                <div
                  key={featureModule.name}
                  className={cn(
                    "text-sm text-secondary px-4 py-2 font-normal flex gap-x-4",
                    isActive && " bg-primary-200-alpha rounded-lg"
                  )}
                >
                  <Image
                    src={featureModule.icon}
                    alt={featureModule.name}
                    width={20}
                    height={20}
                    loading="lazy"
                    className={isActive ? "text-active" : "text-secondary"}
                  />

                  {featureModule.name}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
