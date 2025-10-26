"use client";
import { trainings } from "@/data/training/trainings";
import { useParams } from "next/navigation";
import {
  FaClock,
  FaLayerGroup,
  FaCheckCircle,
  FaRegDotCircle,
} from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function TrainingDetailPage() {
  const params = useParams();
  const { id } = params;

  const router = useRouter();

  // Find the training
  const training = trainings.find((t) => String(t.id) === String(id));
  if (!training)
    return (
      <div className="text-center py-20 text-gray-500">Training not found.</div>
    );

  // Fake price logic for demo (replace with your real fields if present)
  const priceOld = 246;
  const priceNow = 189;
  const discount = priceOld - priceNow;

  return (
    
    <div className="max-w-7xl  mx-auto  px-2 md:px-0 flex flex-col md:flex-row gap-8 my-30">
      {/* Main Content */}
      <section className="flex-[2] min-w-0">
        {/* Header */}
        <div className="bg-teal-700 text-white rounded-t-xl px-5 py-4 text-lg font-bold">
          {training.title}
        </div>
        <div className="bg-white p-5 rounded-b-xl shadow-lg">
          {/* Info Row */}
          <div className="flex gap-6 mb-4 flex-wrap">
            <img
              src="https://images.pexels.com/photos/3183184/pexels-photo-3183184.jpeg"
              alt={training.title}
              className="rounded w-40 h-32 object-cover"
            />
            <div className="flex flex-col gap-2 flex-1">
              <div className="flex gap-5 flex-wrap">
                <div>
                  <span className="uppercase text-xs text-gray-500 font-bold">
                    Duration
                  </span>
                  <div className="flex items-center gap-1 text-teal-700 text-sm font-bold">
                    <FaClock /> {training.duration}
                  </div>
                </div>
                <div>
                  <span className="uppercase text-xs text-gray-500 font-bold">
                    Level
                  </span>
                  <div className="flex items-center gap-1 text-teal-700 text-sm font-bold">
                    <FaLayerGroup /> {training.level}
                  </div>
                </div>
                <div>
                  <span className="uppercase text-xs text-gray-500 font-bold">
                    Webinar ID
                  </span>
                  <div className="text-gray-700 font-bold">
                    IQW{training.id}
                  </div>
                </div>
              </div>
              {/* Tag or other info here */}
            </div>
          </div>

          {/* What you'll learn */}
          <div className="mt-4">
            <div className="font-bold text-teal-700 mb-2">
              What you'll learn?
            </div>
            <ul className="pl-4 list-disc text-gray-800 leading-relaxed space-y-1">
              <li>
                An illustration on how Cash Flow Analysis is used to transition
                an Accrual Basis Financial Statement into a Statement of Cash
                Flow (or Cash Basis Statement) because loans are repaid with
                cash and not profits.
              </li>
              <li>
                Review of the Rules of Cash Flow essential in determining how
                much cash is generated from items on the balance sheet.
              </li>
              <li>
                Comparison of the UCA method of calculating cash flow to the
                less effective traditional cash flow analysis.
              </li>
            </ul>
          </div>

          {/* Overview */}
          <div className="mt-6">
            <div className="font-bold text-teal-700 mb-2">
              Overview of the webinar
            </div>
            <div className="text-gray-800 break-words whitespace-pre-line">
              {training.description}
            </div>
          </div>

          {/* Who should attend */}
          <div className="mt-6">
            <div className="font-bold text-teal-700 mb-2">
              Who should attend?
            </div>
            <ul className="pl-4 list-disc text-gray-800">
              <li>Senior Loan Officers</li>
              <li>Credit Analysts</li>
              <li>Loan Review Personnel</li>
              <li>Credit Admin Staff</li>
              {/* ... */}
            </ul>
          </div>

          {/* Why should you attend */}
          <div className="mt-6">
            <div className="font-bold text-teal-700 mb-2">
              Why should you attend?
            </div>
            <p className="text-gray-800">
              Participants will have a good understanding of how cash flow is
              calculated and interpreted, and will better understand the
              benefits of utilizing UCA in analyzing cash flow.
            </p>
          </div>

          {/* Faculty */}
          <div className="mt-8 bg-gray-50 p-6 rounded">
            <div className="font-bold text-teal-700 mb-2">
              Faculty - {training.speaker}
            </div>
            <div className="flex gap-4 items-center">
              <img
                src="https://images.pexels.com/photos/34433260/pexels-photo-34433260.jpeg"
                alt={training.speaker}
                className="w-16 h-16 rounded-full object-cover border-2 border-teal-400"
              />
              <div className="text-gray-700 text-sm">
                {/* Put more bio here if you have it */}
                David Sawyer’s experience in banking began in 1981 in the area
                of credit administration with Central Bank of the South. Since
                that time he has served in the capacity of senior lender, senior
                credit officer and president and CEO of a community bank and two
                regional bank affiliates. His banking experience includes
                corporate, middle market and small businesses with emphasis on
                Commercial lending as well as SBA and lending to municipalities.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RIGHT SIDE: PAYMENT/ENROLL CARD */}
      <aside className="flex-1 min-w-[310px] max-w-md">
        <div className="bg-white px-6 py-7 rounded-xl shadow border mb-8">
          {/* ADD TO CART - prominent */}
          <button
            className="w-full rounded bg-gray-900 hover:bg-gray-700 text-white py-2 font-semibold text-base shadow mb-5 transition"
            onClick={() => router.push("/cart")}
          >
            Add To Cart
          </button>
          {/* Pricing summary */}
          <div className="flex flex-col gap-1 mb-5">
            <span className="text-sm text-gray-400 line-through">
              ${priceOld}
            </span>
            <span className="text-3xl font-bold text-gray-900">
              ${priceNow}
            </span>
            <span className="text-xs text-gray-400">
              You save ${discount} ({Math.round((discount / priceOld) * 100)}%)
            </span>
          </div>
          {/* Recording Options */}
          <div className="mb-5 border-t pt-5">
            <div className="text-md font-semibold text-gray-800 mb-2">
              Recorded Options
            </div>
            <div className="space-y-2 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked
                  readOnly
                  className="accent-gray-900"
                />
                Recording - Multi License{" "}
                <span className="ml-auto font-medium">$429.00</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" className="accent-gray-900" readOnly />
                DVD/USB <span className="ml-auto font-medium">$259.00</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" className="accent-gray-900" readOnly />
                Recording - Single License{" "}
                <span className="ml-auto font-medium">$189.00</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" className="accent-gray-900" readOnly />
                Transcript <span className="ml-auto font-medium">$169.00</span>
              </label>
            </div>
          </div>
          {/* Money Back */}
          <div className="border rounded p-3 mb-4 text-center text-xs text-gray-500">
            100% Money Back Guarantee
            <br />
            <a href="#" className="underline text-gray-700 cursor-pointer">
              Refund / Cancellation policy
            </a>
          </div>
          {/* Support */}
          <div className="border-l-4 border-gray-100 bg-gray-50 py-3 px-4 mb-2 rounded text-xs text-gray-700">
            For support or group bookings:
            <br />
            <span className="block font-bold text-gray-900 mt-1">
              +1-800-498-2906{" "}
              <span className="font-normal text-gray-400">(US Toll Free)</span>
            </span>
            <a
              href="mailto:contactus@upiq.com"
              className="underline text-gray-700"
            >
              contactus@upiq.com
            </a>
          </div>
          {/* Additional Actions */}
          <button className="w-full rounded border border-gray-300 bg-white hover:bg-gray-100 text-gray-900 py-2 font-semibold text-base shadow transition mt-4">
            Play Recording
          </button>
          <button className="w-full rounded border border-gray-300 bg-white hover:bg-gray-100 text-gray-900 py-2 font-semibold text-base shadow transition mt-2">
            Schedule Live
          </button>
        </div>
      </aside>
    </div>
  );
}
