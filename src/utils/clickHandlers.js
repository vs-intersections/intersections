import { useArtist } from '../hooks'

export const handleClickArtist = () => {
  useArtist().then((data) => console.log(data))
}
