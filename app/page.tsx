import { IoSend } from "react-icons/io5";

export default function Home() {
  return (
    <section className="min-h-screen flex flex-col gap-6 md:gap-8 justify-center items-center px-4">
      <div className="max-w-[780px] text-center space-y-6 md:space-y-8">
        <div className="bg-[#1d2023] w-fit mx-auto p-2.5 rounded-full">
          <p className="text-[0.625rem] md:text-sm"><span className="bg-yellow-600 text-yellow-950 font-extrabold px-2 py-1 rounded-full">now</span>&nbsp;&nbsp;<span className="text-yellow-500">can only translate from english to indonesian</span></p>
        </div>
        <h1 className="text-[26px] md:text-7xl font-extrabold md:font-medium">WhatsApp Document<br /> Translator</h1>
        <div className="max-sm:max-w-[425px]">
          <p className="text-xs md:text-base leading-relaxed">Beelingo is a fast and reliable WhatsApp bot that helps you translate documents (PDF, DOCX) across languages in just a few seconds. Like a busy bee, it works tirelessly to deliver smooth, accurate translations right to your chat.</p>
        </div>
      </div>
      <div className="translate-container">
        <div className="flex gap-20 md:gap-40 items-center">
          <p className="text-gray-500">your_document.pdf</p>
          <button className="hero-btn flex items-center gap-2">
            {/* Icon hanya muncul di small screen */}
            <span className="md:hidden">
              <IoSend />
            </span>

            {/* Text hanya muncul di medium screen ke atas */}
            <span className="hidden md:inline">Translate</span>
          </button>
        </div>
      </div>
    </section>
  );
}
