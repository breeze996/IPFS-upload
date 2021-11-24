import * as ipfsHttpClient from 'ipfs-http-client'
import { AddOptions, AddResult } from 'ipfs-core-types/src/root'
import { ImportCandidate } from 'ipfs-core-types/src/utils'

export function addFileToIPFS(entry: ImportCandidate, options?: AddOptions): Promise<AddResult> {
  const client = ipfsHttpClient.create({ url: process.env.IPFS_SERVICE || 'http://127.0.0.1:5001' })
  
  // @ts-ignore
  return client.add(entry, options)
}
