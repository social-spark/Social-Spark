
import { MegaMenu } from 'flowbite-react';
import React from "react";




export function PromptBox() {
  return (
    <MegaMenu>
      <MegaMenu.Dropdown>

        <h1 className="font-bold text-center">Your Daily Prompt Topics</h1>
        <ul className="mx-auto mt-6 grid max-w-screen-xl border-y border-gray-200 px-4 py-5 sm:grid-cols-2 md:grid-cols-3 md:px-6">
          <li>
            <a href="#" className="block rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-700">
              <div className="font-semibold">Art:</div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Share your latest artwork, discuss art techniques, artists you admire, or ask for recommendations on art supplies.
              </span>
            </a>
          </li>
          <li>
            <a href="#" className="block rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-700">
              <div className="font-semibold">Books/Movies/TV Shows:</div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Discuss your recent reads, favorite movies or TV shows, recommendations, or ask for suggestions.
              </span>
            </a>
          </li>
          <li>
            <a href="#" className="block rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-700">
              <div className="font-semibold">Culture:</div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Explore different cultures, share cultural traditions, festivals, or ask for recommendations on cultural experiences to explore.
              </span>
            </a>
          </li>
          <li>
            <a href="#" className="block rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-700">
              <div className="font-semibold">DIY/Crafts:</div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Share your DIY projects, crafting ideas, or ask for creative suggestions.
              </span>
            </a>
          </li>
          <li>
            <a href="#" className="block rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-700">
              <div className="font-semibold">Segmentation</div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Connect with third-party tools that you're already using.
              </span>
            </a>
          </li>
          <li>
            <a href="#" className="block rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-700">
              <div className="font-semibold">Education:</div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Share interesting facts, educational content, or ask questions to spark intellectual discussions.
              </span>
            </a>
          </li>
          <li>
            <a href="#" className="block rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-700">
              <div className="font-semibold">Fashion:</div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Share your outfit of the day, fashion tips, favorite brands, or ask for fashion advice.
              </span>
            </a>
          </li>
          <li>
            <a href="#" className="block rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-700">
              <div className="font-semibold">Fitness:</div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Share your workout routines, progress, fitness tips, or ask for advice on achieving specific fitness goals.
              </span>
            </a>
          </li>
          <li>
            <a href="#" className="block rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-700">
              <div className="font-semibold">Food:</div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Post about your favorite recipes, meals you've tried, restaurant experiences, or ask for food-related suggestions.
              </span>
            </a>
          </li>
        </ul>
      </MegaMenu.Dropdown>
    </MegaMenu>
  );
}
