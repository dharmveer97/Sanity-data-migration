import React from 'react';
import SanitySync from '../components/sync';

const page = () => (
  <div>
    <div className="h-screen flex min-h-full flex-1 items-center flex-col justify-center px-6 py-12 lg:px-8">
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
        Create Specs for products
      </h2>

      <div className="mt-10 sm:mx-auto w-full">
        <SanitySync />
      </div>
    </div>
  </div>
);

export default page;
