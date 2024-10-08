import React from "react";

export default function AboutUsPage() {
  return (
    <div>
      <h1 className="text-3xl text-neutral-800 font-bold pb-10">Om oss</h1>
      <div className="flex flex-col gap-4 text-neutral-700 text-sm">
        <p>
          Välkommen till <strong>Bookely!</strong> Vi är en innovativ plattform som förenklar
          bokningsprocessen för både klienter och användare. Vårt mål är att
          erbjuda en smidig och effektiv bokningstjänst som gör det enkelt att
          boka tjänster, oavsett om du är en privatperson eller ett företag.
        </p>
        <p>
          Med vårt användarvänliga gränssnitt kan kunder enkelt söka efter och
          boka tjänster som passar deras behov. För företag ger vi en pålitlig
          och flexibel lösning för att hantera bokningar, vilket sparar tid och
          ökar effektiviteten.
        </p>
        <p>
          Vi strävar efter att erbjuda högsta kvalitet och kundservice, och vi
          arbetar ständigt med att förbättra våra tjänster för att möta våra
          kunders behov. Tack för att du valt <strong>Bookely</strong>. för dina bokningsbehov!
        </p>
      </div>
    </div>
  );
}
