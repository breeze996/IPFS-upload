import { PinataPinOptions, PinataPinResponse, PinataClient } from '@pinata/sdk'
const pinataSDK = require('@pinata/sdk') as (
  pinataApiKey: string,
  pinataSecretApiKey: string
) => PinataClient

const pinataClient = pinataSDK(
  process.env.PINATA_API_KET || '0e99f23f1bdf4c73edb6',
  process.env.PINATA_SECRET_API_KET ||
    'b3daa69730e6659749ce54d01660b0e4ffe2e154a9d984cc4002c1b8215de6d8'
)

export async function pinFileToIPFS(
  readableStream: any,
  options?: PinataPinOptions
): Promise<PinataPinResponse> {
  return new Promise((resolve, reject) => {
    pinataClient
      .pinFileToIPFS(readableStream, options)
      .then(res => resolve(res))
      .catch(err => reject(new Error(err)))
  })
}

export function pinJSONToIPFS(
  body: Object,
  options?: PinataPinOptions
): Promise<PinataPinResponse> {
  return new Promise((resolve, reject) => {
    pinataClient
      .pinJSONToIPFS(body, options)
      .then(res => resolve(res))
      .catch(err => reject(new Error(err)))
  })
}
