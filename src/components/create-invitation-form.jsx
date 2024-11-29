import { useEffect, useState } from "react";
import { partners, prefixes } from "../utils/options";
import { Toaster, toast } from "sonner";

const createInvitation = ({ name, prefix, partner }) => {
  const prefixLabel = prefix === "a" ? "" : prefixes[prefix] + " ";
  const partnerLabel = partner === "a" ? "" : " / " + partners[partner];

  const invitation = `Assalamu'alaikum Warahmatullahi Wabarakatuh
Bismilahirahmanirrahim.
Tanpa mengurangi rasa hormat, perkenankan kami mengundang *${prefixLabel}${name}*${partnerLabel}, untuk menghadiri acara pernikahan kami :

_Catur Puji Astuti_ & _Fathul Irfaan Abdillah_

Berikut link lengkap untuk info acara kami : 
${createLink({ name, prefix, partner })}

Merupakan suatu kebahagiaan bagi kami apabila ${prefixLabel}${name} ${partnerLabel} berkenan untuk hadir dan memberikan doa restu.
Wassalamu'alaikum Warahmatullahi Wabarakatuh

💐 Puji & Irfaan
    `;

  return invitation;
};

const createLink = ({ name, prefix, partner }) => {
  const baseURL = import.meta.env.PUBLIC_BASE_URL;

  const encodedParams = new URLSearchParams({
    name: encodeURIComponent(decodeURIComponent(name)),
    prefix: encodeURIComponent(prefix),
    partner: encodeURIComponent(partner),
  });
  return `${baseURL}?${encodedParams.toString()}`;
};

export default function CreateInvitationForm() {
  const [name, setName] = useState("");
  const [prefix, setPrefix] = useState("");
  const [partner, setPartner] = useState("");
  const [hasCopied, setHasCopied] = useState(false);

  const isFormEmpty = !name || !prefix || !partner;

  const handleCopy = (type) => {
    console.log(`Copying ${type}...`);
    if (type === "link") {
      const linkToCopy = createLink({ name, prefix, partner });
      navigator.clipboard.writeText(linkToCopy);
    } else if (type === "invitation") {
      const invitationToCopy = createInvitation({ name, prefix, partner });
      navigator.clipboard.writeText(invitationToCopy);
    }
    setHasCopied(true);

    toast.success(`${type === "link" ? "Link" : "Undangan"} berhasil disalin`);
  };

  const handleReset = () => {
    setName("");
    setPrefix("");
    setPartner("");
    setHasCopied(false);

    toast("Form direset");
  };

  useEffect(() => {
    setHasCopied(false);
  }, [name, prefix, partner]);

  return (
    <div className="w-full flex flex-col gap-6">
      <Toaster position="top-center" />
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-body">
          Nama Lengkap
        </label>
        <input
          type="text"
          id="name"
          placeholder="Usman"
          className="border border-primary px-3 py-3 font-bold text-black"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="prefix" className="text-body">
          Prefiks Panggilan
        </label>
        <select
          id="prefix"
          className="border border-primary px-3 py-3 font-bold bg-transparent text-black"
          value={prefix}
          onChange={(e) => setPrefix(e.target.value)}
        >
          <option value="" disabled hidden>
            Pilih prefiks panggilan
          </option>

          {Object.entries(prefixes).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="partner" className="text-body">
          Pasangan
        </label>
        <select
          id="partner"
          className="border border-primary px-3 py-3 font-bold bg-transparent"
          value={partner}
          onChange={(e) => setPartner(e.target.value)}
        >
          <option value="" disabled hidden>
            Pilih Jenis pasangan
          </option>
          {Object.entries(partners).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-3 mt-1 flex-col">
        <button
          className="flex items-center gap-3 text-primary py-3 px-5 border border-primary w-full justify-center disabled:opacity-50"
          onClick={() => handleCopy("link")}
          disabled={isFormEmpty}
        >
          Salin Link{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
            />
          </svg>
        </button>
        <button
          className="flex items-center gap-3 text-white py-3 px-5 border border-primary bg-primary w-full justify-center disabled:opacity-50"
          onClick={() => handleCopy("invitation")}
          disabled={isFormEmpty}
        >
          Salin Undangan{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
            />
          </svg>
        </button>
        {hasCopied && (
          <button
            className="flex items-center gap-3 text-primary py-3 px-5 border border-secondary bg-secondary font-bold w-full justify-center"
            onClick={handleReset}
          >
            Reset Form
          </button>
        )}
      </div>
    </div>
  );
}
