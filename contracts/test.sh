yarn asb
WASMPATH=build/release/nk.wasm

NK=nearknights.near
NK=nearknights.testnet
USER1=user100.testnet

near deploy $NK $WASMPATH

near call --accountId $NK $NK battle '{"location": 1}'
near call --accountId $NK $NK create_knight '{}'


near call --accountId $NK $NK init '{"owner_id": "'$NK'", "metadata": {"spec": "nft-1.0.0", "name": "NEAR Knights", "symbol": "NK", "icon": "", "base_uri": "", "reference": "", "reference_hash": ""}}'

near view --accountId $NK $NK nft_tokens_for_owner_set '{"account_id": "'$NK'"}'
near view --accountId $NK $NK nft_token_metadata '{"token_id": "100"}'


near call --accountId $USER1 $LKR nft_market_sell '{"token_id": "1", "price": "1000000000000000000000000"}' --gas 300000000000000
near call --accountId $USER1 $LKR nft_market_cancel '{"token_id": "1"}'
near call --accountId $USER2 $LKR nft_market_buy '{"token_id": "3"}' --amount 1.0

near view-state $LKR --prefix "itemMarket::" --finality final --utf8

