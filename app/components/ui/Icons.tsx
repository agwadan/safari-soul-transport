import {
  Armchair,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Briefcase,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CalendarSync,
  Car,
  ChevronDown,
  CircleCheck,
  Clock,
  Headset,
  History,
  Hourglass,
  Droplet,
  DoorOpen,
  Lock,
  LocateFixed,
  Luggage,
  MapPin,
  Menu,
  Phone,
  Plane,
  PlaneLanding,
  PlaneTakeoff,
  Radar,
  ReceiptText,
  Route,
  Shield,
  ShieldCheck,
  Star,
  ThumbsUp,
  User,
  UserCheck,
  Users,
  Wifi,
  X,
  type LucideIcon,
} from "lucide-react";

// Maps the Material Symbols names used across the site to Lucide icons.
// To add an icon: import it above and add a line here.
const icons = {
  airline_seat_recline_extra: Armchair,
  alt_route: Route,
  arrow_forward: ArrowRight,
  business_center: BriefcaseBusiness,
  calendar_today: CalendarDays,
  call: Phone,
  check_circle: CircleCheck,
  close: X,
  directions_car: Car,
  event_repeat: CalendarSync,
  expand_more: ChevronDown,
  flight: Plane,
  flight_land: PlaneLanding,
  flight_takeoff: PlaneTakeoff,
  group: Users,
  history: History,
  hourglass_top: Hourglass,
  local_airport: Plane,
  location_city: Building2,
  location_on: MapPin,
  lock: Lock,
  luggage: Luggage,
  meeting_room: DoorOpen,
  menu: Menu,
  my_location: LocateFixed,
  north_east: ArrowUpRight,
  person: User,
  person_check: UserCheck,
  radar: Radar,
  receipt_long: ReceiptText,
  schedule: Clock,
  security: Shield,
  star: Star,
  support_agent: Headset,
  thumb_up: ThumbsUp,
  verified_user: ShieldCheck,
  water_drop: Droplet,
  wifi: Wifi,
  work: Briefcase,
  badge: BadgeCheck,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;

type IconProps = {
  // IconName gives autocomplete; plain strings are allowed for data-driven icons (e.g. from a CMS)
  name: IconName | (string & {});
  size?: number;
  strokeWidth?: number;
  className?: string;
};

export default function Icon({
  name,
  size = 20,
  strokeWidth,
  className,
}: IconProps) {
  const Component = (icons as Record<string, LucideIcon>)[name];

  if (!Component) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        `<Icon>: unknown icon "${name}". Add it to components/ui/Icon.tsx`,
      );
    }
    // keep the layout stable instead of showing text
    return (
      <span
        aria-hidden="true"
        className={className}
        style={{ display: "inline-block", width: size, height: size }}
      />
    );
  }

  return (
    <Component
      size={size}
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden="true"
    />
  );
}
