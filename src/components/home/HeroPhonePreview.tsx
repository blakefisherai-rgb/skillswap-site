import { Bell, Home, LayoutGrid, MessageCircle, Search, User } from "lucide-react";
import { LogoMark } from "@/components/brand/Logo";
import { Avatar, MiniGigCard, SampleTag } from "@/components/app/AppBits";
import { PhoneFrame } from "@/components/app/PhoneFrame";

/** Static preview of the app's home feed for the homepage hero. The clickable version lives on /prototype. */
export function HeroPhonePreview({ className }: { className?: string }) {
  return (
    <PhoneFrame className={className} label="Preview of the SkillSwap app home screen, showing sample gigs">
      <div className="flex h-full flex-col">
        <div className="bg-white px-4 pt-2 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LogoMark className="h-6 w-6" />
              <span className="text-sm font-bold text-navy">SkillSwap</span>
            </div>
            <span className="relative">
              <Bell className="h-5 w-5 text-navy" aria-hidden="true" />
              <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-coral-hover" />
            </span>
          </div>
          <p className="mt-4 text-lg font-bold text-navy">Hi, Maya 👋</p>
          <p className="text-xs text-muted">3 new gigs near Norlin Quad</p>
          <div className="mt-3 flex items-center gap-2 rounded-xl bg-page px-3 py-2.5 text-xs text-muted ring-1 ring-navy/10">
            <Search className="h-4 w-4" aria-hidden="true" />
            Search photography, design, tutoring…
          </div>
          <div className="mt-3 flex gap-1.5 overflow-hidden text-[11px] font-semibold">
            <span className="rounded-full bg-navy px-3 py-1 text-white">All</span>
            <span className="rounded-full bg-mint/70 px-3 py-1 text-navy">Photo</span>
            <span className="rounded-full bg-cream px-3 py-1 text-navy">Design</span>
            <span className="rounded-full bg-peach px-3 py-1 text-navy">Tutoring</span>
          </div>
        </div>

        <div className="flex-1 space-y-2.5 overflow-hidden px-3 pt-3">
          <div className="flex items-center justify-between px-1">
            <p className="text-xs font-bold text-navy">Open gigs</p>
            <SampleTag />
          </div>
          <MiniGigCard icon="Camera" title="Campus Photography" price="$75" type="Campus Gig" provider="Ski Club" />
          <MiniGigCard icon="BarChart3" title="Social Media Audit" price="$250" type="Business Project" provider="Pearl St. café" />
          <div className="rounded-2xl bg-navy p-3 text-white">
            <p className="text-[11px] text-white/75">Your portfolio</p>
            <div className="mt-1 flex items-center justify-between">
              <p className="text-sm font-semibold">4 verified projects</p>
              <div className="flex -space-x-2">
                <Avatar name="Ski Club" size="sm" />
                <Avatar name="Pearl Cafe" size="sm" />
                <Avatar name="Dance Co" size="sm" />
              </div>
            </div>
          </div>
        </div>

        <nav aria-hidden="true" className="flex shrink-0 justify-around border-t border-navy/10 bg-white py-2.5 text-navy/50">
          <Home className="h-5 w-5 text-navy" />
          <LayoutGrid className="h-5 w-5" />
          <MessageCircle className="h-5 w-5" />
          <User className="h-5 w-5" />
        </nav>
      </div>
    </PhoneFrame>
  );
}
