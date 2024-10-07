import TheRegisterUserForm from '@/components/forms/registerUserForm/TheRegisterUserForm';
import TheSigninForm from '@/components/forms/signinForm/TheSigninForm';
import React from 'react'

export default function TheRegisterPage() {
    return (
        <div className="flex flex-col my-20 h-[650px] max-w-[1200px] items-center justify-center md:mx-auto mx-auto md:grid lg:grid-cols-2 md:border rounded-md md:shadow-md">
          <div className="lg:p-8">
            <TheRegisterUserForm />
          </div>{" "}
          <div className="hidden relative h-full flex-col justify-between bg-muted p-10 text-white bg-gradient-to-br from-gray-900 to-gray-950 lg:flex rounded-tr-md rounded-br-md">
            <h2 className="text-lg font-semibold">Bookely.</h2>
            <div className="w-3/4">
              <p>
                Samla alla dina bokningar under ett och samma konto för dina
                anställda
              </p>
            </div>
          </div>
        </div>
      );
}
