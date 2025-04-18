import fetchEventData from "@/services/EventCalendar";

const CalendarPage = async () => {
	const eventData = await fetchEventData();

	return (
		<div>
			<h1>Calendar Events</h1>
			{eventData.map((eventDay) => (
				<div key={eventDay.date}>
					<h2>{eventDay.date}</h2>
					{Object.entries(eventDay.events).map(([time, events]) => (
						<div key={time}>
							<strong>{time}</strong>
							<ul>
								{events.map((event, idx) => (
									<li key={idx}>{event}</li>
								))}
							</ul>
						</div>
					))}
				</div>
			))}
		</div>
	);
};

export default CalendarPage;

