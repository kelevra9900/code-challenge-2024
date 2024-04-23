import { ESFlag } from '@/components/icons/flags/ESFlag';
import { ESFlagRound } from '@/components/icons/flags/ESFlagRound';
import {USFlag} from '@/components/icons/flags/USFlag';
import {USFlagRound} from '@/components/icons/flags/USFlagRound';

export let languageMenu =[
  {
    id: "en",
    name: "English",
    value: "en",
    icon: <USFlag width="20px" height="15px" />,
    iconMobile: <USFlagRound />
  },
  {
    id: "es",
    name: "Español",
    value: "es",
    icon: <ESFlag width="20px" height="15px" />,
    iconMobile: <ESFlagRound />
  },
]