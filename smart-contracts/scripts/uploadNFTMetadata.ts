import pinataSDK from '@pinata/sdk';
import dotenv from 'dotenv';
import * as fs from 'fs'

dotenv.config()

const pinata = pinataSDK({ pinataJWTKey: process.env.PINATA_JWT});

const urls: string[] = []

pinata.pinFromFS("deployments/IPFS/cats").then(res => {
    console.log(res)
})