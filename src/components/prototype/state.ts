import { feeTiers, splitPrice, type FeeTierId } from "@/data/pricing";
import {
  initialActiveJobs,
  initialCompletedJobs,
  meStudentId,
  services,
  students,
  type CategoryId,
  type Job,
} from "@/data/prototype";

export type Screen =
  | { name: "explore" }
  | { name: "profile"; studentId: string }
  | { name: "book"; step: 1 | 2 | 3 }
  | { name: "confirmed"; bookingId: string }
  | { name: "bookings" }
  | { name: "dashboard" };

export type Booking = {
  id: string;
  serviceId: string;
  tier: FeeTierId;
  when: string;
  notes: string;
  price: number;
};

export type Draft = { serviceId: string; tier: FeeTierId; when: string; notes: string };

export type State = {
  screen: Screen;
  history: Screen[];
  category: CategoryId | "all";
  query: string;
  draft: Draft | null;
  bookings: Booking[];
  active: Job[];
  completed: Job[];
  toast: string | null;
  seq: number;
};

export const initialState: State = {
  screen: { name: "explore" },
  history: [],
  category: "all",
  query: "",
  draft: null,
  bookings: [],
  active: initialActiveJobs,
  completed: initialCompletedJobs,
  toast: null,
  seq: 0,
};

export type Action =
  | { type: "go"; screen: Screen; reset?: boolean }
  | { type: "back" }
  | { type: "category"; category: CategoryId | "all" }
  | { type: "query"; query: string }
  | { type: "startBooking"; serviceId: string }
  | { type: "draft"; patch: Partial<Draft> }
  | { type: "confirmBooking" }
  | { type: "complete"; jobId: string }
  | { type: "dismissToast" }
  | { type: "reset" };

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "go":
      return {
        ...state,
        screen: action.screen,
        history: action.reset ? [] : [...state.history, state.screen],
        toast: null,
      };
    case "back": {
      const prev = state.history.at(-1);
      if (!prev) return state;
      return { ...state, screen: prev, history: state.history.slice(0, -1), toast: null };
    }
    case "category":
      return { ...state, category: action.category };
    case "query":
      return { ...state, query: action.query };
    case "startBooking":
      return {
        ...state,
        draft: { serviceId: action.serviceId, tier: state.draft?.tier ?? "club", when: "", notes: "" },
        history: [...state.history, state.screen],
        screen: { name: "book", step: 1 },
        toast: null,
      };
    case "draft":
      return state.draft ? { ...state, draft: { ...state.draft, ...action.patch } } : state;
    case "confirmBooking": {
      const d = state.draft;
      if (!d) return state;
      const svc = services.find((s) => s.id === d.serviceId)!;
      const seq = state.seq + 1;
      const booking: Booking = { id: `b${seq}`, serviceId: d.serviceId, tier: d.tier, when: d.when, notes: d.notes, price: svc.price };
      const tierLabel = { peer: "Student", club: "Club", business: "Business" }[d.tier];
      const active =
        svc.studentId === meStudentId
          ? [
              { id: `j-new-${seq}`, title: svc.title, client: `You · ${tierLabel} booking`, price: svc.price, tier: d.tier, icon: svc.icon, due: d.when },
              ...state.active,
            ]
          : state.active;
      return {
        ...state,
        seq,
        bookings: [booking, ...state.bookings],
        active,
        draft: null,
        screen: { name: "confirmed", bookingId: booking.id },
        // Booking flow screens shouldn't be reachable with "back" after paying.
        history: state.history.filter((s) => s.name !== "book"),
      };
    }
    case "complete": {
      const job = state.active.find((j) => j.id === action.jobId);
      if (!job) return state;
      return {
        ...state,
        active: state.active.filter((j) => j.id !== action.jobId),
        completed: [job, ...state.completed],
        toast: `${job.title} Completed ✓`,
      };
    }
    case "dismissToast":
      return { ...state, toast: null };
    case "reset":
      return initialState;
  }
}

export const studentById = (id: string) => students.find((s) => s.id === id)!;
export const serviceById = (id: string) => services.find((s) => s.id === id)!;
export const tierById = (id: FeeTierId) => feeTiers.find((t) => t.id === id)!;
export const payoutFor = (job: { price: number; tier: FeeTierId }) => splitPrice(job.price, tierById(job.tier).rate).payout;
