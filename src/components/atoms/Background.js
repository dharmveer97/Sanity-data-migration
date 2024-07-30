'use client';

import React from 'react';
import { Image } from '@nextui-org/react';

const Background = () => (
  <div>
    <div
      aria-hidden="true"
      className="fixed hidden dark:md:block dark:opacity-70 -bottom-[40%] -left-[20%] z-0"
    >
      <Image
        height={1200}
        data-loaded="true"
        width={1200}
        src="/next.svg"
        className="relative z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large"
        alt="docs left background"
      />
    </div>
    <div
      className="absolute inset-x-0 -top-80  -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      aria-hidden="true"
    >
      <div
        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        style={{
          clipPath:
            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
        }}
      />
    </div>
  </div>
);

export default Background;
