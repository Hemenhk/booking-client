import TheStoreForm from "@/components/forms/storeForm/TheStoreForm";

export default function RegisterPage() {
  return (
    <div className="flex flex-col h-[750px] max-w-[1200px] items-center justify-center mx-auto md:grid lg:grid-cols-2 border rounded-md shadow-md my-5">
      <div className="hidden  relative h-full flex-col justify-between bg-muted p-10 text-white bg-gradient-to-br from-gray-900 to-gray-950 lg:flex rounded-tl-md rounded-bl-md">
        <h2 className="text-lg font-semibold">Booksy.</h2>
        <div className="w-3/4">
          <p>
            Samla alla dina bokningar under ett och samma konto för dina anställda
          </p>
        </div>
      </div>
      <div className="lg:p-8">
        <TheStoreForm />
      </div>
    </div>
  );
}
