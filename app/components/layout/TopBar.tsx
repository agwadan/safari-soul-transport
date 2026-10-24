import Link from "next/link";
import Icon from "../ui/Icons";

export default function TopBar() {
  return (
  <div className="hidden sm:block bg-[#0a0a0a] border-b border-[#222222] py-2 px-4 sm:px-6 md:px-8 lg:px-margin text-gray-300 font-body-sm text-body-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <span className="flex items-center gap-1.5 font-label-sm text-label-sm text-white">
            <span className="w-2 h-2 rounded-full bg-[#e5a910] animate-pulse"></span>
            24/7 Regional Dispatch Active
          </span>
          <span className="inline-flex items-center gap-1 hover:text-[#e5a910] transition-colors cursor-pointer text-gray-300">
            <Icon name="call" size={14} className="text-gray-300" />
            +254 (0) 792 485 814 / +256 (0) 705 530 039
          </span>
        </div>
        <div className="flex items-center">
          <Link
            className="hover:text-white transition-colors font-label-sm text-label-sm text-gray-400"
            href="#support"
          >
            Support & FAQ
          </Link>
        </div>
      </div>
  </div>
  );
}
