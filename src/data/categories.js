import { AiOutlineCar } from 'react-icons/ai'
import { BsBrush, BsEmojiLaughing, BsNewspaper, BsVoicemail } from 'react-icons/bs'
import { CgGames, CgMusicNote, CgFilm, CgOrganisation, CgData } from 'react-icons/cg'
import { GiPopcorn } from 'react-icons/gi'
import {
  MdCardTravel,
  MdOutlinePets,
  MdOutlineSportsHandball
} from 'react-icons/md'

import { FaGraduationCap, FaBookReader } from "react-icons/fa";

export const CREATOR_VIDEO_CATEGORIES = [
  {
    name: 'People & Blogs',
    tag: 'people',
    icon: <FaBookReader size={18} />
  },
  {
    name: 'Podcast',
    tag: 'podcast',
    icon: <BsVoicemail size={21} />
  },
  {
    name: 'Autos & Vehicles',
    tag: 'vehicles',
    icon: <AiOutlineCar size={20} />
  },
  {
    name: 'Comedy',
    tag: 'comedy',
    icon: <BsEmojiLaughing size={20} />
  },
  {
    name: 'Education',
    tag: 'education',
    icon: <FaGraduationCap size={20} />
  },
  {
    name: 'Entertainment',
    tag: 'entertainment',
    icon: <GiPopcorn size={20} />
  },
  {
    name: 'Film & Animation',
    tag: 'film',
    icon: <CgFilm size={20} />
  },
  {
    name: 'Gaming',
    tag: 'gaming',
    icon: <CgGames size={21} />
  },
  {
    name: 'Howto & Style',
    tag: 'howto',
    icon: <BsBrush  size={20} />
  },
  {
    name: 'Music',
    tag: 'music',
    icon: <CgMusicNote size={21} />
  },
  {
    name: 'News & Politics',
    tag: 'news',
    icon: <BsNewspaper size={20} />
  },
  {
    name: 'Nonprofits & Activism',
    tag: 'nonprofits',
    icon: <CgOrganisation size={20} />
  },
  {
    name: 'Pets & Animals',
    tag: 'pets',
    icon: <MdOutlinePets size={20} />
  },
  {
    name: 'Science & Technology',
    tag: 'technology',
    icon: <CgData size={20} />
  },
  {
    name: 'Sports',
    tag: 'sports',
    icon: <MdOutlineSportsHandball size={20} />
  },
  {
    name: 'Travel & Events',
    tag: 'travel',
    icon: <MdCardTravel size={20} />
  }
]