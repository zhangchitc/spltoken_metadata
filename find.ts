import { Connection, PublicKey } from "@solana/web3.js";
import { Metaplex } from "@metaplex-foundation/js";

async function getTokenMetadata() {
    const connection = new Connection("https://api.devnet.solana.com", 'finalized');
    const metaplex = Metaplex.make(connection);

    //const mintAddress = new PublicKey("Your Mint address");
    const mintAddress = new PublicKey("BKfDj4icQrLVWSpQSXsa4Ah67ED9aVkRNkGF651wWJ5j");
    let tokenName;
    let tokenSymbol;
    let tokenLogo;

    const metadataAccount = metaplex
        .nfts()
        .pdas()
        .metadata({ mint: mintAddress });

    const metadataAccountInfo = await connection.getAccountInfo(metadataAccount);
    const token = await metaplex.nfts().findByMint({ mintAddress: mintAddress });
    console.log(token);
}

getTokenMetadata();
