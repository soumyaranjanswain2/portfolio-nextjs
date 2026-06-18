"use client";

import { useEffect, useState } from "react";

export default function GithubStats() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://api.github.com/users/soumyaranjanswain2")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  if (!data) {
    return null;
  }

  return (
   <section
  id="github"
  className="py-20 bg-[#050816]"
>
  <div className="max-w-6xl mx-auto px-4">

    <h2 className="text-4xl font-bold text-center text-white mb-12">
      GitHub Activity
    </h2>

    <div className="grid md:grid-cols-4 gap-6">

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
  <h3 className="text-purple-400 text-4xl font-bold">
    {data.public_repos}
  </h3>
  <p className="text-gray-400 mt-2">Repositories</p>
</div>

<div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
  <h3 className="text-cyan-400 text-4xl font-bold">
    {data.followers}
  </h3>
  <p className="text-gray-400 mt-2">Followers</p>
</div>

<div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
  <h3 className="text-green-400 text-4xl font-bold">
    {data.following}
  </h3>
  <p className="text-gray-400 mt-2">Following</p>
</div>

<div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
  <h3 className="text-yellow-400 text-4xl font-bold">
    {data.public_gists}
  </h3>
  <p className="text-gray-400 mt-2">Gists</p>
</div>

    </div>

    <div className="text-center mt-10">
      <a
        href="https://github.com/soumyaranjanswain2"
        target="_blank"
        className="
          px-6 py-3
          rounded-xl
          bg-gradient-to-r
          from-purple-600
          to-cyan-500
          text-white
          font-medium
        "
      >
        View GitHub Profile
      </a>
    </div>
    <div className="mt-12">
  <img
    src="https://ghchart.rshah.org/7C3AED/soumyaranjanswain2"
    alt="GitHub Contribution Graph"
    className="
      w-full
      rounded-2xl
      border
      border-white/10
      bg-white/5
      p-4
    "
  />
</div>

  </div>
</section>
  );
}