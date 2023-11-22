"use client";

import classNames from "classnames";
import { Tab } from "@headlessui/react";
import { Fragment } from "react";

interface TabExampleProps {
  examples: {
    name: string;
    code: React.ReactNode;
    output?: React.ReactNode;
  }[];
}

export function CodeExample({ examples }: TabExampleProps) {
  return (
    <div className="rounded-lg bg-gray-50">
      <Tab.Group>
        <Tab.List className="border-b px-3">
          {examples.map((example) => (
            <Tab key={example.name} as={Fragment}>
              {({ selected }) => (
                <button
                  className={classNames(
                    "px-3 py-1 focus:bg-gray-100 [&:not(:focus-visible)]:outline-none",
                    {
                      "-mb-px border-b border-black": selected,
                    },
                  )}
                >
                  {example.name}
                </button>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {examples.map((example) => (
            <Tab.Panel key={example.name} className="divide-y">
              <div className="px-3 py-2">
                <div className="table-cell rounded bg-gray-200 px-2 py-1 text-sm font-bold uppercase text-gray-600">
                  Code
                </div>
                <div className="overflow-auto">{example.code}</div>
              </div>
              {example.output && (
                <div className="px-3 py-2">
                  <div className="table-cell rounded bg-gray-200 px-2 py-1 text-sm font-bold uppercase text-gray-600">
                    Output
                  </div>
                  {example.output}
                </div>
              )}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
