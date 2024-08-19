import TheAllStores from "@/components/stores/TheAllStores";

export default function Home() {
  return (
    <main className="flex justify-center pb-24 bg-gradient-to-r from-lime-50  to-violet-50">
      <div className="w-2/4 p-3">
        <TheAllStores />
      </div>
      <div className="w-2/4"></div>
    </main>
  );
}
