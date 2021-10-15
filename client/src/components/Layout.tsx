import { Header } from './public/landingPage/Header';

interface LayoutProps { children: any }
export const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="layout_page">
            <Header />
            {children}
        </div>
    )
}
