export default function EventCard({ date, month, year, title, description, speaker, time, duration, price }) {
  return (
    <div className="flex bg-white border rounded shadow p-4 mb-4">
      <div className="flex flex-col items-center w-24 mr-5 border border-[#0B8AE5]">
        <div className="font-semibold text-xs bg-[#0B8AE5] text-white w-full text-center">
          Friday
        </div>
        <div className="text-3xl font-bold mt-2">{date}</div>
        <div className="text-xs mt-1">{month},</div>
        <div className="text-xs">{year}</div>
      </div>

      <div className="flex-1">
        <div className="font-semibold text-[#0B8AE5] text-lg mb-1">{title}</div>
        <div className="text-gray-600 text-sm mb-2">{description}</div>
        <div className="flex flex-wrap items-center text-xs text-gray-500 space-x-2 mb-1">
           <img
            src="/avatar.webp"
            alt={speaker}
            className="w-5 h-5 rounded-full object-cover"
          />
          <span>{speaker}</span>
          <span>|</span>
          <span>{time}</span>
          <span>|</span>
          <span>Duration: {duration}</span>
          <span>|</span>
          <span className="text-[#0B8AE5] font-semibold">Price: {price}</span>
           <span>|</span>
          <a href="#" className="text-[#0B8AE5] hover:underline text-xs">View Details</a>
        </div>
        
      </div>
    </div>
  );
}
