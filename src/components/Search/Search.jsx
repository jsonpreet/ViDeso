import { Loader } from '@components/UIElements/Loader'
import { Tab } from '@headlessui/react'
import { useEffect, useRef, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { useDebounce } from 'use-debounce';
import { Button } from '../UIElements/Button';


const Search = ({ onSearchResults }) => {
  const [activeSearch, setActiveSearch] = useState('')
  const [keyword, setKeyword] = useState('')
  const resultsRef = useRef(null)
  const debouncedValue = useDebounce(keyword, 500)
  const [loading, setLoading] = useState(false)
  const [showSearchModal, setShowSearchModal] = useState(false)

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
    <>
      <div className="md:w-[728px] hidden md:flex" style={{flex: '0 1 728'}}>
        <div ref={resultsRef} className='mx-auto'>
          <div className="relative mt-1">
            <div className="relative w-full overflow-hidden border shadow-inner customBorder cursor-default bg-secondary dark:border-gray-800 rounded-full">
              <input
                className="w-full py-2.5 pl-3 pr-10 bg-transparent focus:outline-none"
                onChange={(event) => setKeyword(event.target.value)}
                placeholder="Search"
                value={keyword}
              />
              <div className="absolute inset-y-0 right-3 flex items-center pr-2">
                <AiOutlineSearch size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden flex items-center pr-2">
        <button onClick={() => setShowSearchModal()} className='w-10 h-10 text-secondary hover-primary flex items-center justify-center rounded-full'>
          <AiOutlineSearch size={24} />
        </button>
      </div>
    </>
  )
}
export default Search