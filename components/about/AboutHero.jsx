import React from 'react'

export default function AboutHero() {
  return (
    <div className="flex flex-col md:flex-row w-full max-w-[1600px] px-6 sm:px-12 lg:px-36 mb-8 md:mb-12 mt-8 md:mt-55 gap-6 md:gap-0">
      <div className="w-full md:w-[20%] text-2xl sm:text-4xl font-medium mb-4 md:mb-0 ">
        About Us
      </div>
      <div className="w-full md:w-[80%] text-xl sm:text-2xl md:text-2xl  md:px-4 leading-tight">
        At DataSack Solutions, we are committed to delivering innovative IT solutions and services to our clients in Saudi Arabia. With a focus on excellence and customer satisfaction, we strive to be the leading IT company in Riyadh, offering a wide range of solutions tailored to meet the unique needs of our clients.
      </div>
    </div>
  );
}
