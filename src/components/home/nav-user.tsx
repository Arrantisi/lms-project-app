"use client";

import {
  BoltIcon,
  BookOpenIcon,
  CircleUserRoundIcon,
  Layers2Icon,
  LogOutIcon,
  PinIcon,
  UserPenIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { useSignout } from "@/hooks/use-logout";
import Image from "next/image";
import {
  IconBook,
  IconLayoutDashboardFilled,
  IconSettingsCog,
} from "@tabler/icons-react";
import Link from "next/link";

export default function NavUser() {
  const { data: session, isPending } = authClient.useSession();
  const handleSignout = useSignout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          aria-label="Open account menu"
          className="z-50 rounded-full"
        >
          <Image
            src={session?.user.image ?? "/profile-9.png"}
            alt="Avatar"
            width={32}
            height={32}
            className="shrink-0 rounded-full"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64">
        <DropdownMenuLabel className="flex items-start gap-3">
          <Image
            src={session?.user.image ?? "/profile-9.png"}
            alt="Avatar"
            width={32}
            height={32}
            className="shrink-0 rounded-full"
          />
          <div className="flex min-w-0 flex-col">
            <span className="text-foreground truncate text-sm font-medium">
              {session?.user.name}
            </span>
            <span className="text-muted-foreground truncate text-xs font-normal">
              {session?.user.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={"/admin"}>
              <IconLayoutDashboardFilled
                size={16}
                className="opacity-60"
                aria-hidden="true"
              />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={"/admin/courses"}>
              <IconBook size={16} className="opacity-60" aria-hidden="true" />
              <span>Courses</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IconSettingsCog
              size={16}
              className="opacity-60"
              aria-hidden="true"
            />
            <span>Setting</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignout} variant="destructive">
          <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
