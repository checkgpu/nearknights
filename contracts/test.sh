yarn asb
WASMPATH=build/release/nk.wasm

NK=nearknights.testnet
USER1=user100.testnet

near deploy $NK $WASMPATH

near call --accountId $NK $NK battle '{"location": 1}'
near call --accountId $NK $NK create_knight '{}'


near call --accountId $LKR $LKR init '{"owner_id": "'$LKR'", "metadata": {"spec": "nft-1.0.0", "name": "Last Kingdom: Revival", "symbol": "LKR", "icon": "", "base_uri": "", "reference": "", "reference_hash": ""}}'
near call --accountId $LKR $LKR nft_create_metadata '{"index": "1010000", "metadata": {"title": "Test Knife", "description": "Just a test", "extra": "damage:1", "media": "", "media_hash": "", "copies": 1, "issued_at": "", "expires_at": "", "starts_at": "", "updated_at": "", "reference": "", "reference_hash": ""}}'

near call --accountId $LKR $LKR nft_mint '{"receiver_id": "'$USER1'", "index": "101000"}'

near view --accountId $LKR $LKR nft_tokens_for_owner_set '{"account_id": "'$USER1'"}'
near view --accountId $LKR $LKR nft_token_metadata '{"token_id": "3"}'


near call --accountId $USER1 $LKR nft_market_sell '{"token_id": "1", "price": "1000000000000000000000000"}' --gas 300000000000000
near call --accountId $USER1 $LKR nft_market_cancel '{"token_id": "1"}'
near call --accountId $USER2 $LKR nft_market_buy '{"token_id": "3"}' --amount 1.0

near view-state $LKR --prefix "itemMarket::" --finality final --utf8

