import SideNavigation from "@/src/components/SideNavigation";

export default function Layout({ children }) {
    return <div className="grid grid-cols-[3rem_1fr] lg:grid-cols-[14rem_1fr] gap-6 md:gap-8 lg:gap-12 h-full">

        <SideNavigation />

        <div className="py-1">{children}</div>
    </div>

}