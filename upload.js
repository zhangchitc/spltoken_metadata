const { updateV1, fetchMetadataFromSeeds } = require('@metaplex-foundation/mpl-token-metadata');
const { createUmi } = require('@metaplex-foundation/umi-bundle-defaults');
const { PublicKey } = require('@solana/web3.js');
const fs = require('fs');
const { createSignerFromKeypair, signerIdentity } = require('@metaplex-foundation/umi');

async function upload() {
  const umi = createUmi('https://api.mainnet-beta.solana.com');

  const mint = new PublicKey("Your Mint Address");
  // const mint = new PublicKey("BKfDj4icQrLVWSpQSXsa4Ah67ED9aVkRNkGF651wWJ5j");
  const keypairFilePath = '/Users/zhangchi/.config/solana/id.json';
  const data = fs.readFileSync(keypairFilePath, "utf8");
  const keypairJson = JSON.parse(data);
  const signerKey = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(keypairJson));
  const signer = createSignerFromKeypair(umi, signerKey);
  umi.use(signerIdentity(signer));

  const initialMetadata = await fetchMetadataFromSeeds(umi, { mint })
  await updateV1(umi, {
    mint,
    authority: signer,
    data: { ...initialMetadata, uri: 'https://oss.woo.org/static/icons/WOO.png' },
  }).sendAndConfirm(umi)
}

upload()