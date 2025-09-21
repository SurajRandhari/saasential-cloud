import {
    Home,
    Users,
    Settings,
    FileText,
    BarChart3,
    Mail,
    Calendar,
    FolderOpen,
    Shield,
    HelpCircle,
    MessageSquare,
    Upload,
  } from "lucide-react"
  
  export const navigationItems = [
    {
      title: "Overview",
      href: "/admin/dashboard",
      icon: Home,
    },
    {
      title: "Analytics",
      href: "/admin/analytics", 
      icon: BarChart3,
    },
    {
      title: "Content Management",
      icon: FileText,
      items: [
        {
          title: "Posts",
          href: "/admin/content/posts",
        },
        {
          title: "Pages", 
          href: "/admin/content/pages",
        },
        {
          title: "Media",
          href: "/admin/content/media",
        },
      ],
    },
     {
      title: "WhitePaper Management",
      icon: FileText,
      items: [
        {
          title: "Whitepapers",
          href: "/admin/whitepapers",
        },
        {
          title: "Download Records", 
          href: "/admin/whitepapers/downloads",
        },
       
      ],
    },
    {
      title: "Testimonials",
      href: "/admin/testimonials",
      icon: MessageSquare // or Star icon
    },
    {
      title: "Media Library",      // 🆕 Add this new item
      href: "/admin/media",
      icon: Upload
    },
    {
      title: "User Management",
      href: "/admin/users",
      icon: Users,
    },
    {
      title: "Messages",
      href: "/admin/messages",
      icon: Mail,
      badge: "12", // Optional badge for notifications
    },
    {
      title: "Calendar",
      href: "/admin/calendar",
      icon: Calendar,
    },
    {
      title: "Files",
      href: "/admin/files",
      icon: FolderOpen,
    },
    {
      title: "Security",
      href: "/admin/security",
      icon: Shield,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
    {
      title: "Help",
      href: "/admin/help",
      icon: HelpCircle,
    },
  ]
  