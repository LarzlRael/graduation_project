
interface LayoutProps { children: any }
export const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="layout_page">
            {children}
        </div>
    )
}
