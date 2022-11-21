import { DESO_CONFIG } from '@app/utils/constants';
import { getProfilePicture } from '@app/utils/functions/getProfilePicture';
import { Loader, Loader2 } from '@components/UIElements/Loader'
import { Tab } from '@headlessui/react'
import clsx from 'clsx';
import Deso from 'deso-protocol';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { BiUser } from 'react-icons/bi';
import { useDebounce } from 'use-debounce';
import IsVerified from '../Common/IsVerified';
import { Button } from '../UIElements/Button';
import Modal from '../UIElements/Modal';


const Search = () => {
  const [results, setResults] = useState('')
  const resultsRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [showSearchModal, setShowSearchModal] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [deso, setDeso] = useState()

  useEffect(() => {
    const deso = new Deso(DESO_CONFIG)
    setDeso(deso)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSearch = async (e) => {
    const prefix = e.target.value
    setKeyword(prefix)
    setLoading(true)
    if (prefix.trim().length > 0) {
      const request = {
        "UsernamePrefix": prefix,
      }
      try {
        const profiles = await deso.user.getProfiles(request);
        if (profiles && profiles.ProfilesFound !== null) {
          setShowResults(true);
          setLoading(false);
          setResults(profiles.ProfilesFound.slice(0, 10));
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
        setResults('');
      }
    } else {
      setResults('');
      setShowResults(false);
      setLoading(false);
    }
  }

  const clearSearch = () => {
    setKeyword('')
    setResults('');
    setShowResults(false);
    setLoading(false);
    setShowSearchModal(false);
  }

  return (
    <>
      <div className="md:w-[728px] hidden md:flex" style={{flex: '0 1 728'}}>
        <div ref={resultsRef} className='w-full mx-auto'>
          <div className="relative mt-1">
            <div className="relative w-full overflow-hidden cursor-default border shadow-inner customBorder bg-primary dark:border-gray-800 rounded-full">
              <input
                className="w-full py-2.5 pl-3 pr-10 bg-transparent focus:outline-none"
                onChange={onSearch}
                placeholder="Search"
                value={keyword}
              />
              <div className="absolute inset-y-0 right-3 flex items-center pr-2">
                {loading ? <Loader2 className='w-5 h-5'/> : <AiOutlineSearch size={24} />}
              </div>
            </div>
            <div
              className={clsx(
                'md:absolute w-full mt-1 py-3 text-base bg-white overflow-hidden dark:bg-theme rounded-xl ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm',
                { hidden: !showResults}
              )}
            >
              <div className="overflow-y-auto max-h-[80vh] no-scrollbar focus:outline-none">
                {results.length > 0 && results.map((channel) => (
                <div
                  key={channel.ProfilePublicKeyBase58Check}
                  className="relative pl-3 pr-4 cursor-default select-none hover:bg-gray-100 dark:hover:bg-gray-900"
                >
                  <Link
                    href={`/@${channel.Username}`}
                      key={channel.Username}
                    onClick={() => clearSearch()}
                    className="flex flex-col justify-center py-2 space-y-1 rounded-xl"
                  >
                    <span className="flex items-center justify-between">
                      <div className="inline-flex items-start w-3/4 space-x-2">
                        <img
                          className="w-6 h-6 rounded-full"
                          src={getProfilePicture(channel)}
                          draggable={false}
                          alt={channel?.Username}
                        />
                        <div className="flex items-center space-x-1">
                          <p className="text-sm">
                            <span>{channel.Username}</span>
                          </p>
                          {channel.IsVerified ? <IsVerified size="xs" /> : null}
                        </div>
                      </div>
                    </span>
                  </Link>
                </div>
              ))}
              {!results?.length && !loading && (
                <div className="relative p-5 text-center cursor-default select-none">
                  No results found.
                </div>
              )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden flex items-center">
        <button onClick={() => setShowSearchModal(true)} className='w-10 h-10 text-secondary hover-primary flex items-center justify-center rounded-full'>
          <AiOutlineSearch size={24} />
        </button>
      </div>
      <Modal
        title="Search"
        onClose={() => setShowSearchModal(false)}
        show={showSearchModal}
        panelClassName="max-w-md min-h-[50vh]"
      >
        <div className="relative w-full overflow-hidden cursor-default border shadow-inner customBorder bg-primary dark:border-gray-800 mb-3 rounded-full">
          <input
            className="w-full py-2.5 pl-3 pr-10 bg-transparent focus:outline-none"
            onChange={onSearch}
            placeholder="Search"
            value={keyword}
          />
          <div className="absolute inset-y-0 right-3 flex items-center pr-2">
            {loading ? <Loader2 className='w-5 h-5'/> : <AiOutlineSearch size={24} />}
          </div>
        </div>
        {results.length > 0 && results.map((channel) => (
        <div
          key={channel.ProfilePublicKeyBase58Check}
          className="relative cursor-default select-none hover:bg-gray-100 -ml-4 -mr-4 px-4 dark:hover:bg-gray-900"
        >
          <Link
            href={`/@${channel.Username}`}
              key={channel.Username}
            onClick={() => clearSearch()}
            className="flex flex-col justify-center py-2 space-y-1 rounded-xl"
          >
            <span className="flex items-center justify-between">
              <div className="inline-flex items-start w-3/4 space-x-2">
                <img
                  className="w-6 h-6 rounded-full"
                  src={getProfilePicture(channel)}
                  draggable={false}
                  alt={channel?.Username}
                />
                <div className="flex items-center space-x-1">
                  <p className="text-sm">
                    <span>{channel.Username}</span>
                  </p>
                  {channel.IsVerified ? <IsVerified size="xs" /> : null}
                </div>
              </div>
            </span>
          </Link>
        </div>
        ))}
        {showResults && results?.length === 0 && !loading && (
          <div className="relative p-5 text-center cursor-default select-none">
            No results found.
          </div>
        )}
      </Modal>
    </>
  )
}
export default Search