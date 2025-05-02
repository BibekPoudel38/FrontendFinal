import { addMonths, format, isWithinInterval, subMonths } from "date-fns";
import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import "../calendar.css";
const events = [
    { start: new Date(2024, 3, 15), end: new Date(2024, 3, 15), title: 'Fall 2024 Registration begins via MyCSUDH' },
    { start: new Date(2024, 3, 15), end: new Date(2024, 6, 15), title: 'Registration via MyCSUDH - fees due Monday, July 15, 2024' },
    { start: new Date(2024, 6, 15), end: new Date(2024, 8, 4), title: 'Registration via MyCSUDH - fees due 48 hours after registration' },
    { start: new Date(2024, 8, 4), end: new Date(2024, 8, 20), title: 'Registration via MyCSUDH - fees due at time of registration' },
    { start: new Date(2024, 4, 27), end: new Date(2024, 4, 27), title: 'Memorial Day Holiday - NO CLASSES, CAMPUS CLOSED' },
    { start: new Date(2024, 5, 1), end: new Date(2024, 5, 1), title: 'First Day to file for Spring 2025 Graduation' },
    { start: new Date(2024, 6, 1), end: new Date(2024, 6, 1), title: 'Fall 2024 Graduation Application Deadline - without late fee' },
    { start: new Date(2024, 6, 4), end: new Date(2024, 6, 4), title: 'Independence Day Holiday - NO CLASSES, CAMPUS CLOSED' },
    { start: new Date(2024, 7, 19), end: new Date(2024, 7, 19), title: 'Academic Year Fall Semester Begins' },
    { start: new Date(2024, 7, 19), end: new Date(2024, 7, 19), title: 'General Faculty Meeting and Provost Fall Meeting' },
    { start: new Date(2024, 7, 23), end: new Date(2024, 7, 23), title: 'Instructional Preparation Day' },
    { start: new Date(2024, 7, 25), end: new Date(2024, 7, 25), title: 'Last Day for students on Waitlist to be added to classes; all waitlists will be cancelled at midnight' },
    { start: new Date(2024, 7, 26), end: new Date(2024, 7, 26), title: 'Classes Begin' },
    { start: new Date(2024, 7, 26), end: new Date(2024, 8, 14), title: 'Late Registration and Add/Drop via MyCSUDH - fees due 48 hours after registration' },
    { start: new Date(2024, 8, 2), end: new Date(2024, 8, 2), title: 'Labor Day Holiday - NO CLASSES, CAMPUS CLOSED' },
    { start: new Date(2024, 8, 6), end: new Date(2024, 8, 6), title: 'Instructor Drop Deadline' },
    { start: new Date(2024, 8, 15), end: new Date(2024, 8, 15), title: 'Fall 2024 Graduation Application Deadline - with late fee' },
    { start: new Date(2024, 8, 19), end: new Date(2024, 8, 19), title: 'Credit/No Credit and Audit Grading Deadline' },
    { start: new Date(2024, 8, 20), end: new Date(2024, 8, 20), title: 'Last Day to Drop from FT to PT Status with Refund' },
    { start: new Date(2024, 8, 20), end: new Date(2024, 8, 20), title: 'Drop Without Record of Enrollment Deadline via Change of Program Form' },
    { start: new Date(2024, 8, 20), end: new Date(2024, 8, 20), title: 'Student Census' },
    { start: new Date(2024, 8, 23), end: new Date(2024, 10, 16), title: 'Serious and Compelling Reason Required to Withdraw' },
    { start: new Date(2024, 9, 1), end: new Date(2024, 9, 1), title: 'Spring 2025 Graduation Application Deadline - without late fee' },
    { start: new Date(2024, 9, 14), end: new Date(2025, 0, 21), title: 'Spring 2025 Registration via MyCSUDH' },
    { start: new Date(2024, 9, 17), end: new Date(2024, 9, 17), title: 'The Great California ShakeOut at 10:17 a.m.' },
    { start: new Date(2024, 9, 22), end: new Date(2024, 11, 20), title: 'Winter 2025 Registration - fees due at time of registration' },
    { start: new Date(2024, 9, 31), end: new Date(2024, 9, 31), title: 'Last Day for Pro-rata Refund of Non-Resident Tuition and Tuition fees' },
    { start: new Date(2024, 10, 1), end: new Date(2024, 10, 1), title: 'First day to file for Summer 2025 Graduation' },
    { start: new Date(2024, 10, 11), end: new Date(2024, 10, 11), title: 'Veterans Day Holiday - NO CLASSES, CAMPUS CLOSED' },
    { start: new Date(2024, 10, 18), end: new Date(2024, 11, 10), title: 'Serious Accident/Illness Required to Withdraw' },
    { start: new Date(2024, 10, 28), end: new Date(2024, 10, 28), title: 'Thanksgiving Day Holiday - NO CLASSES, CAMPUS CLOSED' },
    { start: new Date(2024, 10, 29), end: new Date(2024, 11, 2), title: 'Thanksgiving Break, not a Holiday - NO CLASSES, CAMPUS CLOSED' },
    { start: new Date(2024, 11, 9), end: new Date(2024, 11, 9), title: 'Last Day of Scheduled Classes' },
    { start: new Date(2024, 11, 10), end: new Date(2024, 11, 17), title: 'Final Examinations' },
    { start: new Date(2024, 11, 10), end: new Date(2024, 11, 10), title: 'Grade Submission Begins' },
    { start: new Date(2024, 11, 14), end: new Date(2024, 11, 14), title: 'Spring 2025 Graduation Application Deadline - with late fee' },
    { start: new Date(2024, 11, 17), end: new Date(2024, 11, 17), title: 'Evaluation Day' },
    { start: new Date(2024, 11, 19, 15), end: new Date(2024, 11, 19, 15), title: 'Final Grades Due (3 p.m.)' },
    { start: new Date(2024, 11, 19), end: new Date(2024, 11, 19), title: 'Semester Ends' },
    { start: new Date(2024, 11, 25), end: new Date(2025, 0, 2), title: 'Winter Break and New Year\'s Day Holiday - NO CLASSES, CAMPUS CLOSED' },
    { start: new Date(2024, 11, 20), end: new Date(2025, 0, 16), title: 'Winter Session 2025' },
    { start: new Date(2025, 0, 1), end: new Date(2025, 0, 1), title: 'New Year\'s Day Holiday - NO CLASSES, CAMPUS CLOSED' },
    { start: new Date(2024, 9, 14), end: new Date(2024, 10, 22), title: 'Registration via MyCSUDH - fees due Friday, November 22, 2024' },
    { start: new Date(2024, 10, 22), end: new Date(2025, 1, 8), title: 'Registration via MyCSUDH - fees due 48 hours after registration' },
    { start: new Date(2025, 1, 8), end: new Date(2025, 1, 14), title: 'Registration via MyCSUDH - fees due at time of registration' },
    { start: new Date(2025, 0, 1), end: new Date(2025, 0, 1), title: 'First Day to file for Fall 2025 Graduation' },
    { start: new Date(2025, 0, 16), end: new Date(2025, 0, 16), title: 'Spring Semester Begins' },
    { start: new Date(2025, 0, 17), end: new Date(2025, 0, 17), title: 'Instructional Preparation Day' },
    { start: new Date(2025, 0, 20), end: new Date(2025, 0, 20), title: 'Martin Luther King Jr. Holiday - NO CLASSES, CAMPUS CLOSED' },
    { start: new Date(2025, 0, 20), end: new Date(2025, 0, 20), title: 'Last day for students on Waitlist to be added to classes; all waitlists will be cancelled at midnight' },
    { start: new Date(2025, 0, 21), end: new Date(2025, 1, 8), title: 'Late Registration and Add/Drop via MyCSUDH - fees due 48 hours after registration' },
    { start: new Date(2025, 0, 21), end: new Date(2025, 0, 21), title: 'Classes Begin' },
    { start: new Date(2025, 1, 1), end: new Date(2025, 1, 1), title: 'Summer 2025 Graduation Application Deadline - without late fee' },
    { start: new Date(2025, 1, 6), end: new Date(2025, 1, 6), title: 'Instructor Drop Deadline' },
    { start: new Date(2025, 1, 6), end: new Date(2025, 1, 6), title: 'Credit/No Credit and Audit Grading Deadline' },
    { start: new Date(2025, 1, 8), end: new Date(2025, 1, 14), title: 'Late Registration and Add/Drop via MyCSUDH - fees due at time of registration' },
    { start: new Date(2025, 1, 14), end: new Date(2025, 1, 14), title: 'Last Day to Drop from FT to PT Status with Refund' },
    { start: new Date(2025, 1, 14), end: new Date(2025, 1, 14), title: 'Drop without Record of Enrollment Deadline via Change of Program Form' },
    { start: new Date(2025, 1, 14), end: new Date(2025, 1, 14), title: 'Student Census' },
    { start: new Date(2025, 1, 17), end: new Date(2025, 1, 17), title: 'President\'s Day Holiday - NO CLASSES, CAMPUS OPEN' },
    { start: new Date(2025, 1, 17), end: new Date(2025, 3, 19), title: 'Serious and Compelling Reason Required to Withdraw' },
    { start: new Date(2025, 1, 18), end: new Date(2025, 4, 17), title: 'May Intersession 2025 Registration fees due at time of registration' },
    { start: new Date(2025, 2, 17), end: new Date(2025, 6, 5), title: 'Summer 2025 Registration - fees due at time of registration' },
    { start: new Date(2025, 2, 25), end: new Date(2025, 2, 25), title: 'Last Day for Pro-rata Refund of Non-Resident Tuition and Tuition Fees' },
    { start: new Date(2025, 2, 30), end: new Date(2025, 3, 6), title: 'Spring Recess' },
    { start: new Date(2025, 2, 31), end: new Date(2025, 2, 31), title: 'Cesar Chavez Day Holiday - NO CLASSES, CAMPUS CLOSED' },
    { start: new Date(2025, 3, 14), end: new Date(2025, 7, 18), title: 'Fall 2025 Registration begins via MyCSUDH' },
    { start: new Date(2025, 3, 15), end: new Date(2025, 3, 15), title: 'Summer 2025 Graduation Application - Late Deadline with late fee' },
    { start: new Date(2025, 3, 18), end: new Date(2025, 3, 18), title: 'First Day to file for Spring 2026 Graduation' },
    { start: new Date(2025, 3, 21), end: new Date(2025, 4, 10), title: 'Serious Accident/Illness Required to Withdraw' },
    { start: new Date(2025, 4, 9), end: new Date(2025, 4, 9), title: 'Last Day of Scheduled Classes' },
    { start: new Date(2025, 4, 10), end: new Date(2025, 4, 17), title: 'Final Examinations' },
    { start: new Date(2025, 4, 10), end: new Date(2025, 4, 10), title: 'Grade Submission Begins' },
    { start: new Date(2025, 4, 16), end: new Date(2025, 4, 18), title: 'Commencement' },
    { start: new Date(2025, 4, 19), end: new Date(2025, 4, 19), title: 'Evaluation Day' },
    { start: new Date(2025, 4, 21, 15), end: new Date(2025, 4, 21, 15), title: 'Final Grades Due (3 p.m.)' },
    { start: new Date(2025, 4, 21), end: new Date(2025, 4, 21), title: 'Semester/Academic Year Ends' },
    { start: new Date(2025, 4, 17), end: new Date(2025, 5, 26), title: 'May 2025 Intersession' },
    { start: new Date(2025, 4, 26), end: new Date(2025, 4, 26), title: 'Memorial Day Holiday - NO CLASSES, CAMPUS CLOSED' },
    { start: new Date(2025, 2, 17), end: new Date(2025, 6, 7), title: 'Summer 2025 Registration, Session I and II fees due at time of registration' },
    { start: new Date(2025, 4, 27), end: new Date(2025, 6, 7), title: 'Summer Session I' },
    { start: new Date(2025, 4, 27), end: new Date(2025, 5, 3), title: 'Late Registration and Add/Drop, Session I fees due at time of registration' },
    { start: new Date(2025, 5, 19), end: new Date(2025, 5, 19), title: 'Juneteenth Holiday - NO CLASSES, CAMPUS CLOSED' },
    { start: new Date(2025, 6, 1), end: new Date(2025, 6, 1), title: 'Fall 2025 Graduation Application Deadline - without late fee' },
    { start: new Date(2025, 6, 4), end: new Date(2025, 6, 4), title: 'Independence Day Holiday - NO CLASSES, CAMPUS CLOSED' },
    { start: new Date(2025, 6, 7), end: new Date(2025, 6, 13), title: 'Late Registration and Add/Drop, Session II fees due at time of registration' },
    { start: new Date(2025, 6, 7), end: new Date(2025, 7, 17), title: 'Summer Session II' },
];

export default function AcademicCalendar() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const getEventsForDate = (date) => {
        return events.filter(event =>
            isWithinInterval(date, { start: event.start, end: event.end })
        );
    };

    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const hasEvent = events.some(event =>
                isWithinInterval(date, { start: event.start, end: event.end })
            );
            return hasEvent ? <div style={{ height: '5px', width: '5px', background: 'red', borderRadius: '50%', margin: 'auto', marginTop: '2px' }}></div> : null;
        }
    };

    const todayEvents = getEventsForDate(selectedDate);

    return (
        <div >
            <div className="bg-zinc-800 shadow-lg rounded-2xl p-6 w-full max-w-4xl" style={{ maxHeight: '88vh', overflowY: 'auto' }}>
                <h1 className="text-2xl font-bold mb-4 text-center">Academic Calendar 2024-2025</h1>
                <div className="flex justify-center gap-4 mb-4">
                    <button className="bg-zinc-700 px-4 py-2 rounded-full hover:bg-zinc-600" onClick={() => setSelectedDate(subMonths(selectedDate, 1))}>Previous</button>
                    <button className="bg-zinc-700 px-4 py-2 rounded-full hover:bg-zinc-600" onClick={() => setSelectedDate(new Date())}>Today</button>
                    <button className="bg-zinc-700 px-4 py-2 rounded-full hover:bg-zinc-600" onClick={() => setSelectedDate(addMonths(selectedDate, 1))}>Next</button>
                </div>
                <Calendar
                    onChange={handleDateChange}
                    value={selectedDate}
                    tileContent={tileContent}
                    className="calendar-dark rounded-2xl overflow-hidden"
                />
            </div>

            <div className="bg-zinc-800 shadow-lg rounded-2xl p-6 w-full max-w-4xl mt-8" style={{ maxHeight: '88vh', overflowY: 'auto' }}>
                <h2 className="text-xl font-semibold mb-4">Events</h2>
                {todayEvents.length > 0 ? (
                    <ul>
                        {todayEvents.map((event, index) => (
                            <li key={index} className="p-2 my-2 rounded bg-blue-700">
                                {event.title}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-zinc-400">No events for this day.</p>
                )}
            </div>

            <div className="bg-zinc-800 shadow-lg rounded-2xl p-6 w-full max-w-4xl mt-4" style={{ overflowY: 'auto' }}>
                <h2 className="text-xl font-semibold mb-4">All Events</h2>
                <ul>
                    {events.map((event, index) => (
                        <li
                            key={index}
                            className={`p-2 my-2 rounded ${isWithinInterval(selectedDate, { start: event.start, end: event.end }) ? 'bg-green-600' : 'bg-zinc-700'}`}
                        >
                            <span className="font-semibold">{format(event.start, 'MMMM d, yyyy')}{event.start.getTime() !== event.end.getTime() ? ` - ${format(event.end, 'MMMM d, yyyy')}` : ''}:</span> {event.title}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}