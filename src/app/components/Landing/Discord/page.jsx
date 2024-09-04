import React from "react";

const DiscordPage = () => {
  return (
    <section className="bg-black  flex items-center justify-center">
      <div className="container my-20 bg-transparent text-white flex items-center justify-center">
        <div>
          <img
            src="/images/Discord/vr-lady.webp"
            alt="VR Lady"
            className="mx-2 rounded-3xl object-cover w-full h-full"
          />
        </div>
        <div className="text-center p-8">
          <h1 className="text-5xl font-bold mb-6">Follow Us on Discord</h1>
          <p className="text-lg mb-6">
            Connect and share innovative ideas with over 63K+ creative,
            like-minded people. Join our community and be part of a vibrant space
            where creativity meets collaboration.
          </p>
          <a
            href="https://discord.com/invite/your-discord-link"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-violet-500 text-white px-6 py-3 rounded font-bold text-lg"
          >
            Join Our Discord
          </a>
        </div>
        <div>
          <img
            src="/images/Discord/space-from-earth.webp"
            alt="Space-Earth"
            className="mx-2 rounded-3xl object-cover w-full h-full"
          />
        </div>
      </div>
    </section>
  );
};

export default DiscordPage;

