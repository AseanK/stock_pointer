import { EventData } from "@/model/interfaces";
import { db } from "@/utils/firebase";
import { collection, getDocs } from "firebase/firestore";

export default async function fetchEventData(): Promise<EventData[]> {
	try {
		const eventCollection = collection(db, "events");
		const querySnapshot = await getDocs(eventCollection);

		const eventData: EventData[] = querySnapshot.docs.map((doc) => ({
			date: doc.id,
			events: doc.data() as { [time: string]: string[] },
		}));

		return eventData;
	} catch (err) {
		console.error("Error fetching event data: ", err);
		return [];
	}
}

