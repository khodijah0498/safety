import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ConnectedQuest() {
  const levels = [
    {
      id: 1,
      title: "Spot the Safe Site",
      instructions:
        "Click the sites that look safe. Look for https and a lock icon. Avoid suspicious or unknown sites.",
      items: [
        { id: "a", label: "https://learn.khanacademy.org", safe: true },
        { id: "b", label: "http://free-gifts.example.com", safe: false },
        { id: "c", label: "https://schoolportal.edu.ng", safe: true },
        { id: "d", label: "www.click-here-win-prize.com", safe: false },
        { id: "e", label: "https://news.africa.today", safe: true },
      ],
    },
    {
      id: 2,
      title: "Password Builder",
      instructions:
        "Select the elements that make a password strong. Choose letters, numbers, and symbols.",
      items: [
        { id: "a", label: "Your name", safe: false },
        { id: "b", label: "@", safe: true },
        { id: "c", label: "1234", safe: true },
        { id: "d", label: "#", safe: true },
        { id: "e", label: "birthday", safe: false },
      ],
    },
    {
      id: 3,
      title: "Kind or Unkind?",
      instructions:
        "Decide if each comment is kind or unkind. Choose the positive ones!",
      items: [
        { id: "a", label: "That was a great post!", safe: true },
        { id: "b", label: "You look so weird!", safe: false },
        { id: "c", label: "I like your idea.", safe: true },
        { id: "d", label: "Nobody cares what you think.", safe: false },
      ],
    },
    {
      id: 4,
      title: "Catch the Phish",
      instructions:
        "Identify the phishing attempts. Click on the messages that look suspicious.",
      items: [
        { id: "a", label: "You won a free phone! Click here!", safe: false },
        { id: "b", label: "Your school notice is available on the portal.", safe: true },
        { id: "c", label: "Update your password by entering it here.", safe: false },
        { id: "d", label: "Your teacher uploaded new assignments.", safe: true },
      ],
    },
  ];

  const [levelIndex, setLevelIndex] = useState(0);
  const [selected, setSelected] = useState({});
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [teacherMode, setTeacherMode] = useState(false);

  const level = levels[levelIndex];

  function toggleSelect(itemId) {
    if (completed) return;
    setSelected((prev) => {
      const next = { ...prev };
      if (next[itemId]) delete next[itemId];
      else next[itemId] = true;
      return next;
    });
  }

  function submitLevel() {
    if (completed) return;
    let roundScore = 0;
    level.items.forEach((it) => {
      const chose = !!selected[it.id];
      if (chose && it.safe) roundScore += 2;
      if (chose && !it.safe) roundScore -= 1;
    });
    setScore((s) => s + Math.max(0, roundScore));
    setCompleted(true);
  }

  function nextLevel() {
    if (levelIndex < levels.length - 1) {
      setLevelIndex(levelIndex + 1);
      setSelected({});
      setCompleted(false);
    }
  }

  function restart() {
    setSelected({});
    setScore(0);
    setLevelIndex(0);
    setCompleted(false);
  }

  const final = levelIndex === levels.length - 1 && completed;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-50 p-3 sm:p-6 flex flex-col items-center justify-center">
      <motion.div
        className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-4 sm:p-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-center mb-6 text-center sm:text-left">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-teal-700">
              Connected Quest
            </h1>
            <p className="text-xs sm:text-sm text-gray-600">
              Level {levelIndex + 1}: {level.title}
            </p>
          </div>
          <div className="mt-2 sm:mt-0 text-center sm:text-right">
            <p className="text-xs sm:text-sm text-gray-500">Score</p>
            <p className="text-lg sm:text-xl font-semibold text-teal-600">
              {score}
            </p>
          </div>
        </header>

        {/* Instructions */}
        <section className="mb-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">
            {level.title}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-snug">
            {level.instructions}
          </p>
        </section>

        {/* Game Items */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {level.items.map((it) => {
            const chosen = !!selected[it.id];
            return (
              <motion.button
                key={it.id}
                onClick={() => toggleSelect(it.id)}
                whileHover={{ scale: 1.05 }}
                className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 rounded-lg border transition-all text-left ${
                  chosen
                    ? "bg-teal-50 border-teal-400 shadow"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex-1">
                  <p className="text-xs sm:text-sm font-medium text-gray-800 break-words">
                    {it.label}
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-1">
                    Click to select
                  </p>
                </div>
                <div className="text-[11px] sm:text-sm mt-1 sm:mt-0 self-end sm:self-auto">
                  {completed ? (
                    it.safe ? (
                      <span className="text-green-600 font-semibold">✔</span>
                    ) : (
                      <span className="text-red-600 font-semibold">✖</span>
                    )
                  ) : chosen ? (
                    <span className="text-teal-600">Selected</span>
                  ) : (
                    <span className="text-gray-400">Not selected</span>
                  )}
                </div>
              </motion.button>
            );
          })}
        </section>

        {/* Action Buttons */}
        <section className="mt-6 flex flex-col sm:flex-row items-center gap-3">
          {!completed ? (
            <button
              onClick={submitLevel}
              className="w-full sm:w-auto px-4 py-2 bg-teal-600 text-white rounded-md shadow hover:bg-teal-700 text-sm sm:text-base"
            >
              Submit
            </button>
          ) : final ? (
            <button
              onClick={restart}
              className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 text-sm sm:text-base"
            >
              Play Again
            </button>
          ) : (
            <button
              onClick={nextLevel}
              className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 text-sm sm:text-base"
            >
              Next Level
            </button>
          )}

          <button
            onClick={() => setTeacherMode(!teacherMode)}
            className="w-full sm:w-auto sm:ml-auto px-4 py-2 border border-gray-300 rounded-md shadow hover:bg-gray-50 text-sm sm:text-base"
          >
            {teacherMode ? "Hide Dashboard" : "Teacher Dashboard"}
          </button>
        </section>

        {/* Teacher Dashboard */}
        {teacherMode && (
          <motion.div
            className="mt-6 p-3 sm:p-4 bg-amber-50 border border-amber-200 rounded-md text-sm sm:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h3 className="font-semibold text-amber-700 mb-2 text-base sm:text-lg">
              Teacher Dashboard
            </h3>
            <p className="text-xs sm:text-sm text-gray-700 mb-2">
              Monitor learning outcomes and encourage discussion:
            </p>
            <ul className="list-disc pl-4 text-xs sm:text-sm text-gray-600 space-y-1">
              <li>Ask: What made this website look safe or unsafe?</li>
              <li>Have students share examples of kind online messages.</li>
              <li>Encourage reflection: How can we avoid phishing messages?</li>
              <li>Reward top scorers with Digital Hero Certificates!</li>
            </ul>
          </motion.div>
        )}

        {/* Footer */}
        <footer className="mt-6 text-center text-[10px] sm:text-xs text-gray-400">
          <p>Prototype created for Webfala Digital Skills for All Initiative</p>
        </footer>
      </motion.div>
    </div>
  );
}
