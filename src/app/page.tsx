import ThePaymentCards from "@/components/payments/ThePaymentCards";
import TheAllStores from "@/components/stores/TheAllStores";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center gap-12 pb-24 pt-14 bg-gradient-to-r from-blue-50 via-pink-100 to-blue-50">
      <div className="flex flex-col gap-2">
        <h2 className="text-5xl font-semibold tracking-tight capitalize">Börja ta emot bokningar nu</h2>
        <p className="text-gray-500 text-center">Välj mellan planerna nedan.</p>
      </div>
      <ThePaymentCards />
      {/* <div className="w-2/4 p-3">
        <TheAllStores />
      </div>
      <div className="w-2/4"></div> */}
    </main>
  );
}
