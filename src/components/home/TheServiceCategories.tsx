"use client";

import { services } from "@/lib/services";

export default function TheServiceCategories() {
  const featuredServices = services.slice(0, 7);
  return (
    <div className="w-3/4 m-auto">
      <h2 className="text-3xl font-bold pb-5">
        Leta bland efter typ av behandling
      </h2>
      <ul className="grid grid-cols-4 gap-5">
        {featuredServices.map((service) => (
          <div
            key={service.name}
            className="w-64 h-36 shadow-md rounded-lg bg-slate-300 flex justify-center items-center"
          >
            {service.name}
          </div>
        ))}
        <div className="w-64 h-36 shadow-md rounded-lg bg-slate-300 flex justify-center items-center">
          Alla kategorier
        </div>
      </ul>
    </div>
  );
}
