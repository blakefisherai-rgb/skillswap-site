import { usd } from "@/data/pricing";

const colors = ["#102F47", "#EE8F74", "#8FDCC9", "#4A7A99", "#E3C48F"];

/** Donut chart of the use of funds, with a legend that carries the numbers (color is never the only cue). */
export function UseOfFundsChart({
  total,
  funds,
}: {
  total: number;
  funds: ReadonlyArray<{ label: string; amount: number; pct: number }>;
}) {
  const R = 70;
  const C = 2 * Math.PI * R;
  const gap = 2;
  // Each segment starts where the previous ones end.
  const offsets = funds.map((_, i) => funds.slice(0, i).reduce((a, f) => a + (f.pct / 100) * C, 0));

  return (
    <figure className="grid items-center gap-8 sm:grid-cols-[220px_1fr]">
      <div className="relative mx-auto h-[220px] w-[220px]">
        <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90" role="img" aria-label="Use of funds donut chart. Details in the table.">
          {funds.map((f, i) => {
            const len = (f.pct / 100) * C;
            const el = (
              <circle
                key={f.label}
                cx="100"
                cy="100"
                r={R}
                fill="none"
                stroke={colors[i % colors.length]}
                strokeWidth="26"
                strokeDasharray={`${Math.max(0, len - gap)} ${C}`}
                strokeDashoffset={-offsets[i]}
              />
            );
            return el;
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-bold text-navy">{usd(total)}</span>
          <span className="text-xs text-muted">seed ask</span>
        </div>
      </div>
      <figcaption>
        <table className="w-full text-left text-sm">
          <caption className="sr-only">Proposed use of funds</caption>
          <thead>
            <tr className="border-b border-navy/10 text-xs text-muted">
              <th scope="col" className="pb-2 font-semibold">
                Proposed use
              </th>
              <th scope="col" className="pb-2 text-right font-semibold">
                Amount
              </th>
              <th scope="col" className="pb-2 text-right font-semibold">
                Share
              </th>
            </tr>
          </thead>
          <tbody>
            {funds.map((f, i) => (
              <tr key={f.label} className="border-b border-navy/5">
                <th scope="row" className="py-2.5 pr-3 font-medium text-navy">
                  <span className="flex items-center gap-2.5">
                    <span className="h-3 w-3 shrink-0 rounded-sm" style={{ background: colors[i % colors.length] }} aria-hidden="true" />
                    {f.label}
                  </span>
                </th>
                <td className="py-2.5 text-right text-navy tabular-nums">{usd(f.amount)}</td>
                <td className="py-2.5 pl-3 text-right font-semibold text-navy tabular-nums">{f.pct}%</td>
              </tr>
            ))}
            <tr>
              <th scope="row" className="pt-3 font-bold text-navy">
                Total
              </th>
              <td className="pt-3 text-right font-bold text-navy tabular-nums">{usd(total)}</td>
              <td className="pt-3 pl-3 text-right font-bold text-navy">100%</td>
            </tr>
          </tbody>
        </table>
      </figcaption>
    </figure>
  );
}
