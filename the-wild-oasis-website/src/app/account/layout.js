import SideNavigation from "@/src/components/SideNavigation";

export default function Layout({ children }) {
    return <div className="grid grid-cols-[16rem_1fr] gap-12 min-h-screen">

        <SideNavigation />

        <div className="py-1">{children}</div>
    </div>

}