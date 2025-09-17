import EventCard from "./EventCard";
import Pagination from "./Pagination";
import PlanCard from "./PlanCard";
import SidebarFilters from "./SidebarFilters";
import WebinarHeader from "./WebinarHeader";

export default function WebinarPage() {
  return (
    <div className="flex bg-gray-100 ">
      <SidebarFilters />
      <main className="flex-1 p-8">
        <WebinarHeader />

        {/* Plan Cards */}
        <div className="space-y-2 mb-8">
          <PlanCard title="Test"  speaker="Jim Sheldon Dean" price="$2,499.00" />
          <PlanCard title="Annual Membership" speaker="Jim Sheldon Dean" price="$0.00" />
          <PlanCard title="Webinar Pack" subtitle="Webinar Pack" speaker="Jim Sheldon Dean" price="$0.00" />
          <PlanCard title="Special Transaction" speaker="Jim Sheldon Dean" price="$0.00" />
        </div>

        {/* Event Cards */}
        <EventCard
          date="18"
          month="July"
          year="2025"
          title="3-Hour Virtual Seminar on 2025 HIPAA Texting and Emailing - Do's and Don'ts"
          description="Detailed guidance for your practice regarding business info tech and HIPAA/HITECH rules."
          speaker="Brian Tuttle"
          time="09:00 AM PDT | 12:00 PM EDT"
          duration="3 Hours"
          price="$299.00"
        />
        <EventCard
          date="18"
          month="July"
          year="2025"
          title="Health Care Private Equity Update"
          description="Joseph Wolfe discusses trending health care private equity topics and enforcement."
          speaker="Joseph Wolfe"
          time="10:00 AM PDT | 01:00 PM EDT"
          duration="60 Minutes"
          price="$139.00"
        />
        <EventCard
          date="18"
          month="July"
          year="2025"
          title="HIPAA Rules for Social Media, Web Sites & Patient Reviews"
          description="Paul H. Hales discusses new market dynamics and HIPAA compliance for online health care engagement."
          speaker="Paul H. Hales"
          time="10:00 AM PDT | 01:00 PM EDT"
          duration="90 Minutes"
          price="$139.00"
        />

        <Pagination />
      </main>
    </div>
  );
}
