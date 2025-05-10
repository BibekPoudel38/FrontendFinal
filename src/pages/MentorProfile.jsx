import PropTypes from 'prop-types';
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


import moment from "moment-timezone";
import api from "../api/apiClients";
import MentorProfileCard from '../components/MentorProfileCard';


function ReviewItem({ name, time, rating, text }) {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className={`ti ti-star ${i <= rating ? 'text-purple-800' : 'text-neutral-300'}`}
        />
      );
    }
    return stars;
  };

  return (
    <article className="pb-5 mb-8 border-b border-solid border-b-zinc-100">
      <div className="float-left mr-4 rounded-full bg-neutral-300 h-[50px] w-[50px]" />
      <div className="mb-2.5">
        <h3 className="text-white">
          <span>{name}</span>
        </h3>
        <time className="text-sm text-neutral-400">{time}</time>
      </div>
      <div className="mx-0 my-2.5 text-purple-800">{renderStars()}</div>
      <p className="clear-both pt-2.5 leading-normal text-stone-300">{text}</p>
    </article>
  );
}

ReviewItem.propTypes = {
  name: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};

function ReviewSection() {
  const reviews = [
    {
      id: 1,
      name: "Name",
      time: "~ 5 days ago",
      rating: 3,
      text: "Re alteram et co scripti sciamus ex conemur. At se fraudem incumbo innatis virorum gi. Dormio manebo certus sed nul. Posuerunt nullamque pro ubi sit procuravi fas manifeste. Ordinis ginabor seu agnosco creatus nia finitus. Sed duo alienum ignotas claudam ginabor videmus.",
    },
    {
      id: 2,
      name: "Name",
      time: "~ 1 months ago",
      rating: 4,
      text: "Re alteram et co scripti sciamus ex conemur. At se fraudem incumbo innatis virorum gi. Dormio manebo certus sed nul. Posuerunt nullamque pro ubi sit procuravi fas manifeste. Ordinis ginabor seu agnosco creatus nia finitus. Sed duo alienum ignotas claudam ginabor videmus.",
    },
    {
      id: 3,
      name: "Name",
      time: "~ 4 months ago",
      rating: 2,
      text: "Re alteram et co scripti sciamus ex conemur. At se fraudem incumbo innatis virorum gi. Dormio manebo certus sed nul.",
    },
  ];

  return (
    <section className="mt-5">
      <h2 className="mb-5 text-2xl text-white">Reviews</h2>
      <div>
        {reviews.map((review) => (
          <ReviewItem
            key={review.id}
            name={review.name}
            time={review.time}
            rating={review.rating}
            text={review.text}
          />
        ))}
      </div>
    </section>
  );
}

function ConfirmationModal({ isOpen, onClose, meetingDetails }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-900 rounded-lg shadow-xl p-6 w-full max-w-md border border-zinc-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-zinc-100">Appointment Confirmed!</h3>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-200"
          >
            <i className="ti ti-x text-xl" />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex">
            <i className="ti ti-calendar text-zinc-300 mr-3 mt-0.5" />
            <div>
              <p className="text-sm text-zinc-400">Date</p>
              <p className="text-zinc-100">{meetingDetails.date}</p>
            </div>
          </div>

          <div className="flex">
            <i className="ti ti-clock text-zinc-300 mr-3 mt-0.5" />
            <div>
              <p className="text-sm text-zinc-400">Time Slot</p>
              <p className="text-zinc-100">{meetingDetails.timeSlot}</p>
            </div>
          </div>
        </div>

        <div className="bg-zinc-800 p-4 rounded-lg mb-6 border border-zinc-700">
          <p className="text-sm text-zinc-300">
            <i className="ti ti-info-circle mr-2" />
            A confirmation has been sent to your email address.
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-colors"
        >
          Done
        </button>
      </div>
    </div>

  );
}

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  meetingDetails: PropTypes.shape({
    date: PropTypes.string.isRequired,
    timeSlot: PropTypes.string.isRequired,
  }).isRequired,
};

function Calendar({
  currentDate,
  selectedDate,
  onDateChange,
  onSelectDate,
  availableDates
}) {
  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const days = [];
  const daysCount = daysInMonth(year, month);
  const firstDay = firstDayOfMonth(year, month);

  // Previous month days
  for (let i = 0; i < firstDay; i++) {
    days.push({ day: null, type: "prev-month" });
  }

  // Current month days
  for (let i = 1; i <= daysCount; i++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
    const isAvailable = availableDates.includes(dateStr);
    days.push({
      day: i,
      type: "current",
      isAvailable,
      dateStr
    });
  }

  // Next month days
  const totalCells = Math.ceil(days.length / 7) * 7;
  for (let i = days.length; i < totalCells; i++) {
    days.push({ day: null, type: "next-month" });
  }

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  const handlePrevMonth = () => {
    const newDate = new Date(year, month - 1, 1);
    onDateChange(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(year, month + 1, 1);
    onDateChange(newDate);
  };

  return (
    <div className="mb-8 ">
      <div className=" flex justify-between items-center mb-5">
        <button
          className="text-black-800 cursor-pointer"
          onClick={handlePrevMonth}
          aria-label="Previous month"
        >
          <i className="ti ti-chevron-left" />
        </button>
        <h3 className="text-lg text-white">{monthNames[month]} {year}</h3>
        <button
          className="text-white cursor-pointer"
          onClick={handleNextMonth}
          aria-label="Next month"
        >
          <i className="ti ti-chevron-right" />
        </button>
      </div>
      <div>
        <div className="grid mb-2.5 text-center text-violet-400 grid-cols-[repeat(7,1fr)]">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>
        <div className="grid gap-1.5 text-center grid-cols-[repeat(7,1fr)]">
          {days.map((day, index) => (
            <button
              key={index}
              className={`p-2 cursor-pointer ${day.day === selectedDate?.getDate() &&
                month === selectedDate?.getMonth() &&
                year === selectedDate?.getFullYear()
                ? "bg-purple-800 text-white rounded-full"
                : "text-white"
                } ${day.type === "current" && !day.isAvailable
                  ? "opacity-50 cursor-not-allowed"
                  : ""}`}
              onClick={() => {
                if (day.type === "current" && day.isAvailable) {
                  onSelectDate(new Date(year, month, day.day));
                }
              }}
              disabled={day.type !== "current" || !day.isAvailable}
              aria-label={day.day ? `Select ${day.day}` : "Empty day"}
            >
              {day.day || ""}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

Calendar.propTypes = {
  currentDate: PropTypes.instanceOf(Date).isRequired,
  selectedDate: PropTypes.instanceOf(Date),
  onDateChange: PropTypes.func.isRequired,
  onSelectDate: PropTypes.func.isRequired,
  availableDates: PropTypes.arrayOf(PropTypes.string).isRequired,
};

function TimeSlots({ selectedDate, timeSlots, isLoading }) {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [meetingDetails, setMeetingDetails] = useState(null);
  const [error, setError] = useState(null);

  const handleSelectSlot = (slot) => {
    setSelectedSlot(slot);
  };

  const handleSchedule = async () => {
    if (selectedSlot === null) {
      setError("Please select a time slot");
      return;
    }

    try {
      setError(null);
      try {
        const response = await api.post(`/mentor/appointments/`, {
          "id": selectedSlot.id,
        },);

        setMeetingDetails({
          date: moment(selectedDate).format("YYYY-MM-DD"),
          timeSlot: selectedSlot.start_time + " - " + selectedSlot.end_time,
        });
        setShowModal(true);
        setSelectedSlot(null);
        return await response.data;
      } catch (error) {
        console.error('Error scheduling appointment:', error);
        throw error;
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="mt-5">
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      <div className="mb-2.5 text-base text-zinc-800">
        <span>Select time of meeting</span>
        <div className="text-sm text-stone-500">(available time slots)</div>
      </div>

      {isLoading ? (
        <div className="text-center py-4">Loading time slots...</div>
      ) : timeSlots.length > 0 ? (
        <>
          {timeSlots.map((slot, index) => (
            <button
              key={index}
              className={`p-2.5 mb-2.5 text-center ${selectedSlot === slot ? "bg-purple-800" : "bg-violet-400"
                } rounded-3xl cursor-pointer text-[white] w-full max-sm:text-sm`}
              onClick={() => handleSelectSlot(slot)}
            >
              {slot.start_time + " - " + slot.end_time}

            </button>
          ))}

          <button
            className="p-2.5 mt-5 text-center bg-purple-800 rounded-3xl cursor-pointer text-[white] w-full"
            onClick={handleSchedule}
          >
            Schedule
          </button>
        </>
      ) : (
        <div className="text-center py-4 text-stone-500">
          No available time slots for this date
        </div>
      )}

      <ConfirmationModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedSlot(null);
          setMeetingDetails(null);
        }}
        meetingDetails={meetingDetails}
      />
    </div>
  );
}


function AppointmentScheduler() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch available dates for the calendar
  useEffect(() => {
    const fetchDates = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;

        const url = `/mentor/availability/?year=${year}&month=${month}`;
        const response = await api.get(url);
        setAvailableDates(response.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDates();
  }, [currentDate]);

  // 🔥 Fix: Fetch time slots for the selected date
  useEffect(() => {
    if (!selectedDate) return;

    const fetchSlots = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth() + 1;
        const day = selectedDate.getDate();

        const url = `/mentor/availability/${year}/${month}/${day}/`;
        const response = await api.get(url);

        const finalData = [];

        for (let i = 0; i < response.data.length; i++) {
          const start = moment.utc(response.data[i].start_time).local().format("h:mm A");
          const end = moment.utc(response.data[i].end_time).local().format("h:mm A");

          finalData.push({
            start_time: start,
            end_time: end,
            id: response.data[i].id,
            is_booked: response.data[i].is_booked,
            mentor: response.data[i].mentor,
          });
        }



        setTimeSlots(finalData || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSlots();
  }, [selectedDate]);

  return (
    <section className="bg-zinc-800 p-4 rounded-xl">

      <h2 className="mb-5 text-xl text-white">Schedule an Appointment</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          Error: {error}
        </div>
      )}

      {isLoading && !selectedDate && (
        <div className="text-center py-4">Loading calendar...</div>
      )}

      <Calendar
        currentDate={currentDate}
        selectedDate={selectedDate}
        onDateChange={setCurrentDate} // ✅ was missing
        onSelectDate={setSelectedDate}
        availableDates={availableDates}
      />

      {selectedDate && (
        <TimeSlots
          selectedDate={selectedDate}
          timeSlots={timeSlots}
          isLoading={isLoading}
        />
      )}
    </section>
  );
}


export default function MentorProfile() {
  const { mentorId } = useParams();

  return (
    <div className='bg-zinc-900 min-h-screen'>

      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@500&family=Roboto:wght@500&display=swap"
        rel="stylesheet"
      />
      <main className=" mx-auto my-0 max-w-[1200px]">
        <div className="flex gap-4 p-5 max-md:flex-col max-sm:p-2.5">
          <section className="flex-[2] max-md:flex-none max-md:w-full">

            <MentorProfileCard mentorId={mentorId} />

            <ReviewSection />
          </section>
          <aside className="flex-1 rounded-xl max-md:flex-none max-md:w-full">
            <AppointmentScheduler />
          </aside>
        </div>
      </main>
    </div>
  );
}
