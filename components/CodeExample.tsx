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
    <div className="bg-gray-50 rounded-lg">
      <Tab.Group>
        <Tab.List className="border-b px-3">
          {examples.map((example) => (
            <Tab key={example.name} as={Fragment}>
              {({ selected }) => (
                <button
                  className={classNames(
                    "px-3 py-1 [&:not(:focus-visible)]:outline-none focus:bg-gray-100",
                    {
                      "border-b border-black -mb-px": selected,
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
                <div className="text-gray-600 uppercase text-sm font-bold bg-gray-200 table-cell px-2 py-1 rounded">
                  Code
                </div>
                <div className="overflow-auto">{example.code}</div>
              </div>
              {example.output && (
                <div className="px-3 py-2">
                  <div className="text-gray-600 uppercase text-sm font-bold bg-gray-200 table-cell px-2 py-1 rounded">
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
