import { CREATOR_VIDEO_CATEGORIES } from '@data/categories'
import useAppStore from '@store/app'
import { Listbox, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { BsCheck } from 'react-icons/bs'

const Category = () => {
  const uploadedVideo = useAppStore((state) => state.uploadedVideo)
  const setUploadedVideo = useAppStore((state) => state.setUploadedVideo)

  return (
    <>
      <div className="flex items-center mb-1 space-x-1.5">
        <div className="font-medium text-sm mb-1">
          Category
        </div>
      </div>
      <Listbox
        value={uploadedVideo.videoCategory}
        onChange={(category) => setUploadedVideo({ videoCategory: category })}
      >
        <div className="relative mt-1">
          <Listbox.Button className="w-full text-sm py-2.5 px-3 bg-primary border theme-border rounded-md focus:outline-none text-left">
            <span className="block truncate">
              {uploadedVideo.videoCategory.name}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <BsCheck size={17} />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full py-1 mt-1 z-[1] overflow-auto text-base rounded-lg dropdown-shadow bg-dropdown max-h-52 focus:outline-none sm:text-sm">
              {CREATOR_VIDEO_CATEGORIES.map((category, categoryIdx) => (
                <Listbox.Option
                  key={categoryIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-gray-100 dark:bg-gray-800' : ''
                    }`
                  }
                  value={category}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {category.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                          <BsCheck size={17} />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </>
  )
}

export default Category