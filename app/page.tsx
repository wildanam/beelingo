export default function Home() {
  return (
    <section className="min-h-screen flex flex-col gap-8 justify-center items-center px-2">
      <div className="max-w-[780px] text-center space-y-8">
        <div className="bg-[#1d2023] w-fit mx-auto p-2.5 rounded-full">
          <p className="text-sm"><span className="bg-yellow-600 text-yellow-950 font-extrabold px-2 py-1 rounded-full">now</span>&nbsp;&nbsp;<span className="text-yellow-500">can only translate from english to indonesian</span></p>
        </div>
        <h1 className="text-4xl md:text-7xl font-medium">WhatsApp Document<br /> Translator</h1>
        <p className="leading-relaxed">Beelingo is a fast and reliable WhatsApp bot that helps you translate documents (PDF, DOCX) across languages in just a few seconds. Like a busy bee, it works tirelessly to deliver smooth, accurate translations right to your chat.</p>
      </div>
      <div className="translate-container">
        <div className="flex gap-10 md:gap-40 items-center">
          <p className="text-gray-500">your_document.pdf</p>
          <button className="hero-btn">Translate</button>
        </div>
      </div>
    </section>
  );
}
