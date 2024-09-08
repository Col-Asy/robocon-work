import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function RoboconLanding() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-white text-black p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Image src="/placeholder.svg" alt="SRM Logo" width={40} height={40} className="rounded-full" />
          <span className="font-bold">SRM</span>
        </div>
        <nav className="hidden md:flex space-x-4">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">Team</a>
          <a href="#" className="hover:underline">Projects & Achievements</a>
          <a href="#" className="hover:underline">Contact Us</a>
        </nav>
        <Button variant="destructive">Log In</Button>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              MAKE BREAK<br />INNOVATE
            </h1>
          </div>
          <div className="md:w-1/2 relative">
            <div className="w-64 h-64 bg-gray-800 rounded-full relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-red-500 font-bold text-xl">SRM TEAM<br />ROBOCON</span>
              </div>
              <div className="absolute inset-0">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                    style={{
                      top: `${50 + 45 * Math.sin((i / 10) * Math.PI)}%`,
                      left: `${50 + 45 * Math.cos((i / 10) * Math.PI)}%`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {['bg-blue-500', 'bg-red-500', 'bg-cyan-400'].map((bgColor, index) => (
            <Card key={index} className="overflow-hidden">
              <div className={`h-40 ${bgColor}`} />
              <CardContent className="p-4">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac
                  congue tortor, ut luctus quam.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}