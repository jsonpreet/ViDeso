import { Loader } from '@components/UIElements/Loader'
import { Tab } from '@headlessui/react'
import { useEffect, useRef, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { useDebounce } from 'use-debounce';


const GlobalSearchBar = ({ onSearchResults }) => {
  const [activeSearch, setActiveSearch] = useState('PUBLICATION')
  const [keyword, setKeyword] = useState('')
  const resultsRef = useRef(null)
  const debouncedValue = useDebounce(keyword, 500)
  const [loading, setLoading] = useState(false)

  const onDebounce = () => {
    if (keyword.trim().length) {
    //   searchChannels({
    //     variables: {
    //       request: {
    //         type: activeSearch,
    //         query: keyword,
    //         limit: 10,
    //         sources: [LENSTUBE_APP_ID, LENSTUBE_BYTES_APP_ID],
    //         customFilters: LENS_CUSTOM_FILTERS
    //       }
    //     }
    //   })
    }
  }

  useEffect(() => {
    onDebounce()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue, activeSearch])

  const clearSearch = () => {
    setKeyword('')
    onSearchResults?.()
  }

  return (
    <div className="md:w-96">
      <div ref={resultsRef}>
        <div className="relative mt-1">
          <div className="relative w-full overflow-hidden border border-gray-200 cursor-default dark:border-gray-800 rounded-xl sm:text-sm">
            <input
              className="w-full py-2 pl-3 pr-10 text-sm bg-transparent focus:outline-none"
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="Search by hashtag / channel"
              value={keyword}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
              <AiOutlineSearch
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
          </div>
          <div className='md:absolute w-full mt-1 text-base bg-white overflow-hidden dark:bg-[#181818] rounded-xl ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
            <Tab.Group>
              <Tab.List className="flex justify-center">
                <Tab
                  className={({ selected }) =>
                    'px-4 py-2 border-b-2 text-sm focus:outline-none w-full'
                  }
                  onClick={() => {
                    setActiveSearch('PUBLICATION')
                  }}
                >
                  Videos
                </Tab>
                <Tab
                  className={({ selected }) =>
                    'px-4 py-2 border-b-2 text-sm focus:outline-none w-full'
                  }
                  onClick={() => {
                    setActiveSearch('PROFILE')
                  }}
                >
                  Channels
                </Tab>
              </Tab.List>
              <Tab.Panels>
                <Tab.Panel className="overflow-y-auto max-h-[80vh] no-scrollbar focus:outline-none">
                  {/* <Videos
                    results={channels?.search?.items}
                    loading={loading}
                    clearSearch={clearSearch}
                  /> */}
                </Tab.Panel>
                <Tab.Panel className="overflow-y-auto max-h-[80vh] no-scrollbar focus:outline-none">
                  {/* <Channels
                    results={channels?.search?.items}
                    loading={loading}
                    clearSearch={clearSearch}
                  /> */}
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>

            {loading && (
              <div className="flex justify-center p-5">
                <Loader />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default GlobalSearchBar