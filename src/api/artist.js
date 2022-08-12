import { request } from '@/utils'

export const getArtists = id => request.get(`/artists?id=${id}`)

export const getArtistsList = () => request.get('/toplist/detail')
