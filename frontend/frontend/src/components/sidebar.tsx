import { Logo } from "../icons/logo";
import { SidebarItem } from "./sideBarItem";
import { Home, FileText, Link, Twitter, Youtube } from "lucide-react"; // 👈 don't forget this

// Define filters
const filters = [
  {key:'all', text: "All", icon: <Home size={27} /> },
  {key: 'note',  text: "Notes", icon: <FileText size={27} /> },
  {key: 'link',  text: "Links", icon: <Link size={27} /> },
  { key: 'twitter', text: "Twitter", icon: <Twitter size={27} /> },
  { key: 'youtube', text: "YouTube", icon: <Youtube size={27} /> },
];

export function SideBar({ onFilterSelect }: { onFilterSelect: (filter: string) => void }) {
  return (
    <div className="h-screen w-72 fixed border-2 border-slate-200 left-0 top-0 pl-3">
      {/* Logo + Title */}
      <div className="flex items-center text-2xl font-semibold pt-4 text-slate-700">
        <div className="pr-2"><Logo /></div>
        SecondBrain
      </div>

      {/* Sidebar Items */}
     
      <div className="pt-6 pl-4 text-lg">
        {filters.map(f => (
          <SidebarItem
            key={f.key}
            text={f.text}
            icon={f.icon}
            onClick={() => onFilterSelect(f.key)}
          />
        ))}
      </div>
      
    </div>
  );
}
