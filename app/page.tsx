
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-red-50 to-red-600 flex items-center justify-center p-4 font-inter">
      <div className="text-center max-w-4xl mx-auto">
        {/* TEDx Logo/Branding */}
        <div className="mb-12">
          <Image
            src="/tedx/logo-black.png"
            alt="TEDx VJCET Logo"
            width={400}
            height={120}
            priority
            className="mx-auto"
          />
        </div>

        {/* Main Message */}
        <div className="space-y-8 mb-16">
          <h2 className="text-4xl md:text-5xl font-extralight text-gray-800 leading-tight tracking-wide">
            Ideas ❤️ Worth
            <span className="block text-red-700 font-bold">Spreading</span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-light">
            Something extraordinary is coming to VJCET.
            <span className="block mt-2 text-red-700 font-medium">Stay tuned for an unforgettable experience.</span>
          </p>
        </div>

        {/* Coming Soon Badge */}
        <div className="inline-flex items-center gap-3 bg-white/30 border border-red-600/50 rounded-full px-8 py-4 backdrop-blur-sm">
          <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
          <span className="text-red-800 font-semibold text-lg tracking-wide">Website Coming Soon</span>
        </div>

        {/* Footer */}
        <div className="mt-20 text-gray-600 text-sm font-light">
          <p>Viswajyothi College of Engineering and Technology</p>
          <p className="mt-1">Get ready to be inspired</p>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-red-500/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-red-500/5 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/3 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}
