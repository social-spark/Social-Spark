"use client";

import { Button, Modal } from "flowbite-react";
import React, { useState } from "react";
import {Prompt} from "@/utils/models/prompt.model";
import {PromptCard} from "@/app/components/PromptCard";
import {PostCard} from "@/app/(index)/PostCard";
type PromptBoxProps = {
    openModal: boolean;
    setOpenModal: (value: boolean) => void;
    prompts: Prompt[];
    };

export function PromptBox(props: PromptBoxProps) {
  // const [openModal, setOpenModal] = useState(true);
const { openModal, setOpenModal, prompts } = props;

  return (
      <>
        <Modal show={openModal} onClose={() => setOpenModal(false)} popup>
          <Modal.Header className="text-center">
            Your Daily Prompt Topics
          </Modal.Header>
          <Modal.Body>
            <ul className="mx-auto mt-6 grid max-w-screen-xl border-y border-gray-200 px-4 py-5 sm:grid-cols-2 md:grid-cols-3 md:px-6">
              {prompts.map((prompt) => <PromptCard key={prompt.promptId} prompt={prompt} setOpenModal={setOpenModal} />)}
            </ul>
          </Modal.Body>
          <Modal.Footer className="flex justify-end">
            <Button onClick={() => setOpenModal(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </>
  );
}
