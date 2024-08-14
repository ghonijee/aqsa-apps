"use client";

import { AppModuleWithFeatureModules } from "@/entities";
import { cn } from "@/lib/utils/utils";
import { useAppModuleStore } from "@/store/app-module.store";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SubMenu({
  module,
}: {
  module?: AppModuleWithFeatureModules;
}) {
  const pathname = usePathname().split("/");
  const featureName = pathname[3] || "";

  // if (
  //   !selected ||
  //   selected.featureModules === null ||
  //   selected.featureModules.length === 0
  // ) {
  //   return null;
  // }

  return (
    <div className="w-60 bg-[#F6F7F9] px-4 py-6">
      {/* Company swicth */}

      {/* Feature list */}
      <div>
        <div className="px-2 flex flex-row justify-start items-center mb-5">
          {/* <span className="text-active">{selected.icon}</span> */}
          <div className=" text-muted font-semibold text-base">
            {module?.name}
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          {module?.featureModules?.map((featureModule) => {
            const isActive =
              (featureName == "" && featureModule.defaultUrl === "/") ||
              (featureName !== "" &&
                featureModule.defaultUrl.startsWith(`/${featureName}`));
            pathname[3] = featureModule.defaultUrl.substring(1);
            const hrefUrl = pathname.join("/");
            return (
              <Link href={`${hrefUrl}`} key={featureModule.name}>
                <div
                  key={featureModule.name}
                  className={cn(
                    "text-sm text-secondary px-4 py-2 font-normal flex gap-x-4",
                    isActive && " bg-primary-200-alpha text-active rounded-lg"
                  )}
                >
                  {featureModule.icon}
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
