import { AppModuleWithFeatureModules } from "@/entities";
import { cn } from "@/lib/utils/utils";
import Link from "next/link";

export default function SubMenu({
  module,
  featureName,
  baseUrlModule,
}: {
  module?: AppModuleWithFeatureModules;
  featureName: string;
  baseUrlModule: string;
}) {
  return (
    <div className="">
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
              (featureName == undefined && featureModule.defaultUrl === "/") ||
              (featureName !== undefined &&
                featureModule.defaultUrl.startsWith(`/${featureName}`));

            const hrefUrl = `${baseUrlModule}${featureModule.defaultUrl}`;
            return (
              <Link href={`${hrefUrl}`} key={featureModule.name}>
                <div
                  key={featureModule.name}
                  className={cn(
                    "text-sm text-secondary px-4 py-2 font-normal flex gap-x-4",
                    isActive && " bg-primary-200-alpha text-active rounded-lg"
                  )}
                >
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
