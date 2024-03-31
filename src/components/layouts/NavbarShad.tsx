"use client"
import React from 'react'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu"


export default function NavbarShad () {

  return (
    <NavigationMenu>
    <NavigationMenuList>

        <NavigationMenuItem>
        <NavigationMenuTrigger>Home</NavigationMenuTrigger>
        {/* <NavigationMenuContent>
            <NavigationMenuLink>Link</NavigationMenuLink>
        </NavigationMenuContent> */}
        </NavigationMenuItem>

        <NavigationMenuItem>
            <NavigationMenuTrigger>Home</NavigationMenuTrigger>
        </NavigationMenuItem>
    
        <NavigationMenuItem>
            <NavigationMenuTrigger>Cart</NavigationMenuTrigger>
        </NavigationMenuItem>

    </NavigationMenuList>
    </NavigationMenu>
  )
}
