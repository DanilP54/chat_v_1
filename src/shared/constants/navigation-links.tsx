import { Star } from "lucide-react"
import React from "react";


interface  navLinksType {
    name: string;
    icon: React.ReactNode;
    route: string;
}

export const navLinks: navLinksType[] = [
    {
        "name": "Favorites",
        "icon": <Star />,
        "route": "/favorites",
    }
]