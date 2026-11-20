import { COMPARE_GROUPS } from "@/lib/compare-fields";
import type { InstructorCompareData } from "@/lib/view";

/** 個別ページの「この先生の教え方」。すべての先生で同じ順・同じ言い回しで出す */
export function CompareFieldsList({ data }: { data: InstructorCompareData }) {
  return (
    <div className="space-y-6">
      {COMPARE_GROUPS.map((g) => (
        <section key={g.key} id={`cf-${g.key}`} aria-labelledby={`cf-${g.key}-title`} className="rise scroll-mt-24 rounded-[2rem] border border-line bg-white px-6 py-7 min-[768px]:px-10 min-[768px]:py-9">
          <h3 id={`cf-${g.key}-title`} className="serif flex items-center gap-3 text-[1.25rem]">
            <span aria-hidden="true" className="block size-3 rounded-full bg-brass-soft" />
            {g.label}
          </h3>
          <dl className="mt-3 divide-y divide-line">
            {g.fields.map((f) => {
              const v = f.get(data);
              const values = Array.isArray(v) ? v : [v];
              return (
                <div key={f.key} className="grid gap-1 py-4 min-[768px]:grid-cols-[13rem_1fr] min-[768px]:gap-6">
                  <dt className="text-[0.875rem] font-bold text-accent-deep">{f.label}</dt>
                  <dd className="text-[0.9375rem] leading-[1.9]">
                    {f.kind === "list" ? (
                      <ul className="flex flex-wrap gap-1.5">
                        {values.map((x) => (
                          <li key={x} className="rounded-full bg-chalk px-3.5 py-0.5 text-[0.8125rem]">
                            {x}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      values.map((x) => <p key={x}>{x}</p>)
                    )}
                  </dd>
                </div>
              );
            })}
          </dl>
        </section>
      ))}
    </div>
  );
}
