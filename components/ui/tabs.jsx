"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      // "inline-flex items-center justify-center xl:bg-white rounded-[30px] dark:md:bg-secondary  p-1",
       "inline-flex items-center justify-center p-1 text-muted-foreground", 
      className
    )}
    {...props} />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "relative inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "bg-transparent text-black dark:text-white", // default text color
      // "hover:bg-black/5 dark:hover:bg-white/10", // hover bg
      "data-[state=active]:text-[#0B8AE5]",
      "h-[48px]",
      "cursor-pointer",
      "group", // 🔑 enables targeting child with state
      className
    )}
    {...props}
  >
    {props.children}

    {/* Vertical line for active tab */}
 <span
  className="absolute top-[80%] mt-1 left-1/2 -translate-x-1/2 w-[2px] h-6 bg-[#0B8AE5] opacity-0 group-data-[state=active]:opacity-100 transition-opacity duration-300"
/>
  </TabsPrimitive.Trigger>
))


TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props} />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
