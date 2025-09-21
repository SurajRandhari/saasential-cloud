"use client";
import {   CircleUserRound,  Globe,  MousePointerClick,  Wallet,  Users,  CalendarCheck2,} from "lucide-react";
import { GradientButton } from "../common/my-button/GradientButton";

export default function ScheduleDemo() {
    return (
        <div className="min-h-screen bg-[linear-gradient(to_bottom,_#8cc4f9_0%,_#8cc4f9_50%,_white_50%,_white_100%)] flex items-center justify-center px-4 py-4">
            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-[40%_60%] gap-15 mt-26 ">
                {/* Glassmorphism Form (40%) */}
                <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-xl">
                    <form className="space-y-2">
                        {[
                            { label: "Full Name", type: "text", placeholder: "Full Name" },
                            { label: "Phone Number", type: "tel", placeholder: "phone number" },
                            { label: "Email Address", type: "email", placeholder: "email address" },
                            { label: "Company Name", type: "text", placeholder: "company name" },
                            { label: "Website URL", type: "url", placeholder: "website url" },
                        ].map((field, idx) => (
                            <div key={idx}>
                                <label className="text-sm font-semibold text-white">{field.label}</label>
                                <input
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    className="w-full mt-1 p-2.5 rounded-md bg-white/70 text-black border focus:outline-blue-500"
                                />
                            </div>
                        ))}
                        <div>
                            <label htmlFor="subject" className="text-sm font-semibold text-black">Subject</label>
                            <textarea
                                id="subject"
                                rows={3}
                                placeholder="subject"
                                className="w-full mt-1 p-2.5 rounded-md bg-white/70 text-black  border focus:outline-blue-500"
                            />
                        </div>
                        <GradientButton
                            variant="gradient"
                            className="text-center justify-center text-black text-base font-normal leading-tight"
                        >
                            Schedule Demo
                        </GradientButton>
                    </form>
                </div>

                {/* Right Content (60%) */}
                <div className="text-white mt-6 px-auto flex flex-col justify-around space-y-6">
                    <div>
                        <h2 className="text-4xl font-bold mb-2">Schedule a Demo</h2>
                        <p className="text-md mb-8">
                            Get a full tour that’s tailored to your business. From a 100% real human.
                        </p>
                    </div>

                    <div className="space-y-6 text-black">
                        <div className="flex items-start gap-4">
                            <CircleUserRound className="text-white bg-blue-600 p-1 rounded-full shadow w-8 h-8" />
                            <div>
                                <h3 className="font-semibold text-lg">See how we.com helps you</h3>
                                <p className="text-sm">Improve your sales or business and</p>
                                <p> customer experience</p>
                            </div>
                        </div>

                        <ul className="space-y-3 mt-4 text-sm">
                            <li className="flex items-center gap-2">
                                <Globe className="text-blue-400 w-4 h-4" />
                                Booking Website
                            </li>
                            <li className="flex items-center gap-2">
                                <MousePointerClick className="text-yellow-400 w-4 h-4" />
                                Widget for your Website
                            </li>
                            <li className="flex items-center gap-2">
                                <Wallet className="text-pink-400 w-4 h-4" />
                                Accept Online Payments
                            </li>
                            <li className="flex items-center gap-2">
                                <Users className="text-green-400 w-4 h-4" />
                                Assign staff to the customer
                            </li>
                            <li className="flex items-center gap-2">
                                <CalendarCheck2 className="text-purple-400 w-4 h-4" />
                                Schedule the service
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
