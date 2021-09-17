import Image from 'next/image';
import { useState } from 'react';

import {
  GlobeAltIcon,
  MenuIcon,
  UserCircleIcon,
  UsersIcon,
  SearchIcon,
} from '@heroicons/react/solid';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { useRouter } from 'next/dist/client/router';
import search from '../pages/search';

function Header({ placeholder }) {
  const [searchInput, setSearchInput] = useState('');

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [nbOfGuest, setNbOfGuest] = useState(1);
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();

  const handleSelect = ranges => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };
  const openDateRange = () => {
    setIsClicked(true);
  };
  const closeDateRange = () => {
    setSearchInput('');
    setIsClicked(false);
  };

  const search = () => {
    router.push({
      pathname: '/search',
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        nbOfGuest,
      },
    });
  };
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
  };

  return (
    <header className="sticky top-0  z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10">
      {/* Left section */}
      <div
        onClick={() => router.push('/')}
        className="relative flex items-center h-10 cursor-pointer my-auto"
      >
        <Image
          src="https://links.papareact.com/qd3"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>
      {/* Mid section */}
      <div className="flex items-center border-2 rounded-full py-2 md:shadow-sm">
        <input
          value={searchInput}
          onClick={openDateRange}
          onChange={event => setSearchInput(event.target.value)}
          type="text"
          placeholder={placeholder ? placeholder : 'Start a search'}
          className="outline-none pl-5 bg-transparent flex-grow text-gray-600"
        />
        <SearchIcon className=" hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2" />
      </div>
      {/* Right section */}
      <div className="flex space-x-4 items-center justify-end text-gray-500">
        <p className="hidden md:inline cursor-pointer">Become a host</p>
        <GlobeAltIcon className="h-6" />
        <div className="flex rounded-full items-center border-2 p-2">
          <MenuIcon className="h-6" />

          <UserCircleIcon className="h-6" />
        </div>
      </div>

      {isClicked ? (
        <div className="flex flex-col col-span-3 mx-auto">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={['#FD5B61']}
            onChange={handleSelect}
          />
          <div className="flex items-center border-b mb-4">
            <h2 className="text-2xl pl-2 flex-grow font-semibold">
              Number of Guests
            </h2>
            <UsersIcon className="h-5" />
            <input
              min={1}
              value={nbOfGuest}
              onChange={e => setNbOfGuest(e.target.value)}
              type="number"
              className="w-12 pl-2 text-lg outline-none text-red-400"
            />
          </div>

          <div className="flex">
            <button
              onClick={closeDateRange}
              className="flex-grow text-gray-500 hover:bg-red-400 hover:text-white border rounded-t-lg p-2"
            >
              Cancel
            </button>
            <button
              onClick={search}
              className="flex-grow text-red-400 hover:bg-red-400 hover:text-white border rounded-t-lg p-2"
            >
              Search
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}

export default Header;
