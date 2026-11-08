export const WA = "919010582716";
export const PHONE_TEL = "+919010582716";
export const PHONE_DISPLAY = "+91 90105 82716";
export const EMAIL = "travelsrk78@gmail.com";
export const CONTACT_NAME = "Fayaz";
export const ADDRESS = "Yanamalakuduru, Vijayawada, Andhra Pradesh";

export const inr = n => "₹" + n.toLocaleString("en-IN");

export const RATES = {
  hyd: {
    label: "Hyderabad", note: "About 275 km. All-inclusive, with no night charges.",
    cols: ["Car", "One way", "Round trip"],
    rows: [["Sedan", 5500, 9500], ["SUV", 7500, 11500], ["Innova Crysta", 10000, 14000], ["Tempo Traveller", 12000, 16000]],
  },
  tpt: {
    label: "Tirupati", note: "About 400 km. Return trip, and the driver waits during your darshan.",
    cols: ["Car", "Return trip"],
    rows: [["Sedan", 3500], ["SUV", 5500], ["Innova Crysta", 6800]],
  },
  local: {
    label: "Local Vijayawada", note: "Fares for the city and Gannavaram airport.",
    cols: ["Service", "Fare"],
    rows: [["Airport drop, sedan", "₹400 to ₹700"], ["4 hours / 40 km, sedan", "₹1,400"], ["8 hours / 80 km, sedan or SUV", "₹2,300 to ₹3,000"]],
  },
};

export const STONES = [
  ["Guntur", 35], ["Machilipatnam", 70], ["Hyderabad", 275, "from ₹5,500"], ["Srisailam", 270],
  ["Tirupati", 400, "from ₹3,500"], ["Visakhapatnam", 350], ["Chennai", 450], ["Bangalore", 650],
];

export const FLEET = [
  ["Sedan", "/sedan-fleet.png", "4 passengers. Swift Dzire, Etios", "₹5,500 to Hyderabad"],
  ["SUV", "/suv-fleet.png", "6 to 7 passengers. Innova, Ertiga", "₹7,500 to Hyderabad"],
  ["Innova Crysta", "/innova-crysta-fleet.png", "6 to 7 passengers, extra comfort", "₹10,000 to Hyderabad"],
  ["Tempo Traveller", "/tempo-fleet.png", "10 to 12 passengers. 17, 22 and 32 seaters on request", "₹12,000 to Hyderabad"],
];

export const CARS = ["Sedan", "SUV (Innova / Ertiga)", "Innova Crysta", "Tempo Traveller (12 seats)", "Tempo Traveller (17 seats)", "Tempo Traveller (22 seats)", "Tempo Traveller (32 seats)"];
export const PLACES = ["Hyderabad", "Tirupati", "Srisailam", "Visakhapatnam", "Guntur", "Machilipatnam", "Bangalore", "Chennai", "Araku"];

export const SERVICES = [
  { t: "Vijayawada to Hyderabad", p: "Daily cabs with doorstep pickup. One-way fares charge only for the distance you travel. Sedan from ₹5,500.", a: "Quote this trip", to: "Hyderabad", main: true },
  { t: "Outstation rentals", p: "Round trips and multi-day tours with a driver. Visakhapatnam, Bangalore, Chennai, Araku and more.", a: "Plan a tour", to: "" },
  { t: "Tirupati packages", p: "We wait through your darshan and bring you back. Sedan from ₹3,500.", a: "Quote this trip", to: "Tirupati" },
  { t: "Local, airport & self-drive", p: "Gannavaram airport drops from ₹400. Half-day and full-day city hire by the hour. Self-drive cars available on request — ask on WhatsApp.", a: "Book a pickup", to: "Airport" },
];

export const TICKS = [
  ["Police-verified drivers", "Every driver is checked before he gets a car."],
  ["GPS on every car", "Share the live location with family."],
  ["All-inclusive fares", "Tolls, driver allowance and taxes are in the quote."],
  ["24/7 on WhatsApp", "Confirmation within minutes, even at 3 AM."],
];

export const REVIEWS = [
  ["Driver reached before time, the car was spotless and there were no extra charges at the end. Exactly the fare we were quoted.", "Ravi Kumar", "Vijayawada to Hyderabad, March 2025"],
  ["Our driver waited patiently through a long darshan queue and the Innova was spacious and cool. My parents were comfortable throughout.", "Padmavathi Reddy", "Tirupati, February 2025"],
  ["I needed a 3 AM airport pickup. Confirmed on WhatsApp in minutes and the car was outside before I was.", "Suresh Babu", "Airport drop, April 2025"],
];

export const FAQS = [
  ["How much is a taxi from Vijayawada to Hyderabad?", "A sedan one-way starts at ₹5,500, all-inclusive. SUV is ₹7,500, Innova Crysta ₹10,000 and Tempo Traveller ₹12,000. Round trips are listed in the rates table."],
  ["Do you offer one-way fares?", "Yes. You pay for the distance you travel, not for an empty return."],
  ["Are tolls and driver allowance included?", "Yes. The quote we confirm on WhatsApp includes both, and there are no night charges on the Hyderabad route."],
  ["What do the Tirupati packages include?", "The driver waits during your darshan and brings you back to Vijayawada. Sedan from ₹3,500."],
  ["How are drivers and cars checked?", "Drivers are police-verified and every car has GPS tracking."],
  ["How do I book?", `Use the form at the top, message us on WhatsApp or call ${PHONE_DISPLAY}. We confirm within minutes.`],
];
