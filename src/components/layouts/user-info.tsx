"use client";

import { Company, UserSession } from "@/entities";
import { useCompanyStore } from "@/store/company.store";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils/utils";
import { Check, ChevronsUpDown, LogOut, Replace, User } from "lucide-react";
import Image from "next/image";
import { ChevronDownIcon, UserCircle2Icon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface UserInfoProps {
  company: string;
  data: Company[];
  user: UserSession;
}

export default function UserInfo({ company, data, user }: UserInfoProps) {
  const router = useRouter();

  let companySelected;
  const { selected, onSelect } = useCompanyStore();
  console.log("selected", selected);

  if (!selected) {
    companySelected = data.find((c) => c.code === company);
    onSelect(companySelected!);
  }

  function onSignOut() {
    signOut({ callbackUrl: "/sign-in" });
  }

  return (
    <div className="text-color-base">
      <div className="ml-4 flex justify-center items-center gap-x-3 px-4 py-2">
        <div className="flex flex-col justify-center items-end gap-y-0">
          <span className=" text-primary-500 text-sm font-medium">
            {user?.name}
          </span>
          <span className=" text-muted text-xs font-normal">
            {selected?.name}
          </span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex justify-center items-center gap-x-1 bg-primary-100-alpha px-2 py-1 rounded-full">
              {user?.image ? (
                <Image
                  src={user.image!}
                  alt="avatar"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <UserCircle2Icon
                  size={32}
                  strokeWidth={1.5}
                  className=" text-primary-600"
                />
              )}
              <div className="">
                <ChevronDownIcon size={18} className=" text-secondary" />
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-overlay text-color-base mr-8 mt-2">
            {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator /> */}
            <DropdownMenuLabel>Select Company</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Command>
                <CommandList>
                  <CommandGroup>
                    {data.map((item) => (
                      <CommandItem
                        key={item.code}
                        value={item.code}
                        onSelect={(currentValue) => {
                          const findCompany = data.find(
                            (c) => c.code === currentValue
                          );
                          onSelect(findCompany!);

                          // Changes the current url with the selected company
                          const url = new URL(window.location.href);
                          let currentPage = url.pathname.split("/");
                          currentPage[1] = findCompany!.code!;
                          url.pathname = currentPage.join("/");
                          router.replace(url.toString());
                        }}
                      >
                        {item.name}
                        <Check
                          className={cn(
                            "ml-auto h-4 w-4 ",
                            selected?.code === item.code
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
