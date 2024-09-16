"use client";
import Image from "next/image";
import Link from "next/link";

const Custom404 = () => {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-900 text-white text-center p-6">
      <Image
        src="/assets/others/404.webp"
        alt="Lost Fighter"
        fill
        className="absolute inset-0 w-full h-full object-cover"
        priority
      />

      <div className="relative z-10 max-w-lg mx-auto bg-black bg-opacity-50 p-8 rounded-md">
        <h1 className="text-6xl font-extrabold mb-8">404</h1>
        <h2 className="text-4xl font-bold mb-4">Oh no! A Lost Fighter!</h2>
        <p className="mb-8 text-lg">
          In a world where warriors strive to become the master of combos, one
          fighter took a wrong turn. Now, lost in the vast digital arena, he
          searches for the ultimate technique to return home. Will he find his
          way, or will he forever be lost in the 404 lands? Only time will
          tell...
        </p>

        <Link
          href="/"
          className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-full transition duration-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Custom404;
