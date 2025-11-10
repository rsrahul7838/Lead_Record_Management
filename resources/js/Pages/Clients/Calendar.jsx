import React, { useMemo } from "react";
import { usePage, Link } from "@inertiajs/react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import { format } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Calendar as CalendarIcon, ArrowLeft } from "lucide-react";
import moment from "moment";

export default function ClientCalendar() {
    const { events = [] } = usePage().props;

    // react-big-calendar requires date objects
    const localizer = momentLocalizer(moment);
    const formattedEvents = useMemo(
        () =>
            events.map((e) => ({
                ...e,
                start: new Date(e.start),
                end: new Date(e.end),
            })),
        [events]
    );

    const eventStyleGetter = (event) => {
        let backgroundColor = "#3b82f6"; // blue
        if (event.agent?.includes("Manager")) backgroundColor = "#16a34a"; // green
        if (event.agent?.includes("Agent")) backgroundColor = "#f59e0b"; // orange

        return {
            style: {
                backgroundColor,
                color: "white",
                borderRadius: "6px",
                border: "none",
                padding: "4px",
            },
        };
    };

    const EventCard = ({ event }) => (
        <div>
            <strong>{event.title}</strong>
            <div className="text-xs opacity-80">
                {event.agent && `Agent: ${event.agent}`}
            </div>
        </div>
    );

    return (
        <AuthenticatedLayout>
            <div className="max-w-6xl mx-auto p-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <CalendarIcon size={22} /> Client Follow-Up Calendar
                        <span className="text-gray-500 text-sm ml-2">
                            ({format(new Date(), "EEEE, MMM dd yyyy")})
                        </span>
                    </h1>

                    <Link
                        href={route("clients.index")}
                        className="flex items-center gap-2 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
                    >
                        <ArrowLeft size={16} /> Back to Clients
                    </Link>
                </div>

                <div className="bg-white rounded-xl shadow-md border p-4">
                    <BigCalendar
                        localizer={localizer}
                        events={formattedEvents}
                        startAccessor="start"
                        endAccessor="end"
                        views={["month", "week", "day", "agenda"]}
                        defaultView="month"
                        style={{ height: 600 }}
                        eventPropGetter={eventStyleGetter}
                        components={{
                            event: EventCard,
                        }}
                        popup
                        selectable
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
