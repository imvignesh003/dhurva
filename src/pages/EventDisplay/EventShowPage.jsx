import React, { useEffect } from "react";
import { Calendar, MapPin, Clock, User, Rocket, UserPen } from "lucide-react";
import { Button } from "@/components/ui/button";
import "../../assets/fonts/dmserif.css";
import "../../assets/fonts/opensans.css";
import "../../assets/fonts/sourcesans.css";
import { useLocation, useNavigate } from "react-router-dom";

function EventShowPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const location = useLocation();
  const events = location.state;
  const data = events.events;
  const navigate = useNavigate();
  const eventRounds = data.eventRounds;
  const eventPrize = data.eventPrize;
  const eventRules = data.eventRules;

  if (!data) {
    return <div>No event data found. Please go back and try again.</div>;
  }

  const handleRegister = () => {
    navigate("/register", { state: { event: data } });
  };

  return (
    <div className="mt-16 min-h-screen bg-gray-100 flex justify-center items-start p-6 md:p-8 w-full">
      <div className="w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Image */}
        <div className="relative w-full h-80 md:h-96 flex justify-center">
          <img
            src={data.posterUrl || "path/to/fallback/image.jpg"}
            alt="Event Poster"
            className="w-full h-full object-cover rounded-xl block"
          />
        </div>

        {/* Details Section */}
        <div className="p-6 md:p-12 flex flex-col justify-start items-center">
          {/* Title and Subtitle */}
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {data.eventName}
            </h1>
            <h2 className="text-lg md:text-xl text-sky-500 mt-2">
              {data.eventType}
            </h2>
            {data.eventOrganizedBy && (
              <h3 className="text-xl md:text-2xl font-serif font-semibold mt-3 text-gray-800">
                {data.eventOrganizedBy}
              </h3>
            )}
          </div>

          {/* Event Timing */}
          <div className="mt-4 flex items-center gap-2 text-base md:text-lg text-gray-700 font-medium">
            <Clock className="w-5 h-5 text-gray-500" />
            <span>{data.eventTime}</span>
          </div>

          {/* Event Description */}
          <p className="mt-4 text-base md:text-lg sm:text-justify   text-gray-800 leading-relaxed text-center">
            {data.eventDescription}
          </p>

          {/* Event Details */}
          <div className="space-y-3 mt-4 text-base md:text-lg text-gray-800 w-full">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-500" />
              <span>{data.eventVenue}</span>
            </div>
            <div className="flex items-center gap-2">
              <UserPen className="w-5 h-5 text-gray-500" />
              <span>
                {data.eventStaffCoordinator?.name} -{" "}
                {data.eventStaffCoordinator?.contact}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-gray-500" />
              <span>
                {data.studentCoordinator?.[0]?.name} -{" "}
                {data.studentCoordinator?.[0]?.contact} &{" "}
                {data.studentCoordinator?.[1]?.name} -{" "}
                {data.studentCoordinator?.[1]?.contact}
              </span>
            </div>
          </div>

          {/* Register Button */}
          <Button
            className="mt-6 flex dm-sans items-center justify-center gap-3 bg-sky-500 text-white px-6 py-3 text-lg rounded-full shadow-lg hover:bg-sky-600 transition-all duration-300"
            onClick={handleRegister}
          >
            Register Now <Rocket className="w-5 h-5" />
          </Button>
        </div>

        {/* Event Rules */}
        <div className="p-6 lg:ms-7 text-gray-800 text-lg">
          {/* eventRules */}
          {eventRules.length != 0 ? (
            <>
              <h4 className="font-semibold text-gold-400">Event Rules:</h4>
              <ul className="list-disc list-inside mt-2">
                {eventRules.map((rule, idx) => (
                  <li key={idx}>{rule}</li>
                ))}
              </ul>
            </>
          ) : (
            <></>
          )}
          {eventRounds.length != 0 ? (
            <>
              <div className="mb-5">
                <h4 className="font-semibold text-gold-400">Event Rounds:</h4>{" "}
                <ul>
                  {eventRounds.map((rounds, index) => (
                    <li key={index}>
                      <span>{rounds}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <></>
          )}
          {eventPrize.length > 0 ? (
            <>
              <p className="text-xl text-yellow-500"> Prices</p>
              <p className="mt-2">
                <ul>
                  {eventPrize.map((price, index) => (
                    <li key={index}>
                      <span>{price}</span>
                    </li>
                  ))}
                </ul>
              </p>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventShowPage;
