export interface NavItem {
    title: string;
    href: string;
    children?: NavItem[];
}

export const mainNav: NavItem[] = [
    {
        title: "Services",
        href: "/services",
        children: [
            { title: "Plumbing & Drainage", href: "/services/plumbing" },
            { title: "Electrical Services", href: "/services/electrical" },
            { title: "Carpentry & Joinery", href: "/services/carpentry" },
            { title: "Painting & Coatings", href: "/services/painting" },
            { title: "HVAC Systems", href: "/services/hvac" },
            { title: "Civil Works", href: "/services/civil-works" },
            { title: "Preventative Maintenance", href: "/services/preventative-maintenance" },
            { title: "Emergency Response", href: "/services/emergency-response" },
        ],
    },
    {
        title: "Areas We Serve",
        href: "/areas",
        children: [
            { title: "Auckland", href: "/areas/auckland" },
            { title: "Wellington", href: "/areas/wellington" },
            { title: "Christchurch", href: "/areas/christchurch" },
        ],
    },
    {
        title: "About",
        href: "/about",
    },
    {
        title: "Partners",
        href: "/partners",
    },
    {
        title: "Contact",
        href: "/contact",
    },
];
