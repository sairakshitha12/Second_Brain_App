import type { ReactElement } from "react";

export function SidebarItem({
  text,
  icon,
  onClick,
}: {
  text: string;
  icon: ReactElement | null;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="flex pb-5 text-gray-600 text-md py-2 cursor-pointer hover:bg-gray-200 rounded max-w-48 pl-3 transition-all duration-150"
    >
      <div className="pr-2">{icon}</div>
      <div>{text}</div>
    </div>
  );
}
