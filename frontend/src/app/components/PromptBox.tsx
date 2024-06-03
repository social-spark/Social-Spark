import {Button, Modal} from "flowbite-react";
import { useState } from "react";


export function PromptBox() {
  const [openModal, setOpenModal] = useState(true);

  return (
      <>
        <Modal show={openModal} onClose={() => setOpenModal(false)} popup>
          <Modal.Header className="text-center" >Your Daily Prompt Topics</Modal.Header>
          <Modal.Body>
            <ul className="mx-auto mt-6 grid max-w-screen-xl border-y border-gray-200 px-4 py-5 sm:grid-cols-2 md:grid-cols-3 md:px-6">
              <li>
                <a href="#" className="block rounded-lg p-3 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <div className="font-semibold">Entertainment:</div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                "What are the most anticipated movies and TV shows set to release this year?"
              </span>
                </a>
              </li>
              <li>
                <a href="#" className="block rounded-lg p-3 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <div className="font-semibold">Fashion:</div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                "What are the current trends in sustainable fashion and how can consumers make more eco-friendly clothing choices?"
              </span>
                </a>
              </li>
              <li>
                <a href="#" className="block rounded-lg p-3 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <div className="font-semibold">Food:</div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                "What are some innovative plant-based recipes that are both healthy and delicious?"
              </span>
                </a>
              </li>
              <li>
                <a href="#" className="block rounded-lg p-3 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <div className="font-semibold">Health:</div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
               "What are some effective strategies for maintaining mental health and wellness in a fast-paced world?"
              </span>
                </a>
              </li>
              <li>
                <a href="#" className="block rounded-lg p-3 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <div className="font-semibold">Technology:</div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                "What are the latest advancements in artificial intelligence and how are they impacting various industries?"
              </span>
                </a>
              </li>
              <li>
                <a href="#" className="block rounded-lg p-3 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <div className="font-semibold">Travel:</div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
               "What are the top destinations for solo travelers looking for adventure and cultural experiences?"
              </span>
                </a>
              </li>
            </ul>
          </Modal.Body>
          <Modal.Footer className="flex justify-end">
            <Button onClick={() => setOpenModal(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </>
  );
}
