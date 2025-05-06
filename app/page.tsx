export default function Home() {
  return (
    <section className="min-h-screen flex flex-col gap-16 justify-center items-center">
      <div className="max-w-[780px] text-center space-y-8">
        <h1 className="text-5xl">WhatsApp Document Translator</h1>
        <p className="leading-relaxed">BeeLingo is a fast and reliable WhatsApp bot that helps you translate documents (PDF, DOCX) across languages in just a few seconds. Like a busy bee, it works tirelessly to deliver smooth, accurate translations right to your chat.</p>
      </div>
      <div className="flex gap-2">
        <button>Translate</button>
      </div>
    </section>
  );
}
