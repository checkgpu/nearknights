import { math } from "near-sdk-as"

/*
function rng() {
    int i;
    seed = seed * 2053 + 13849;
    i = (seed % max) + 1;
}

struct xorshift128p_state {
  uint64_t x[2];
};

uint64_t xorshift128p(struct xorshift128p_state *state)
{
    uint64_t t = state->x[0];
    uint64_t const s = state->x[1];
    state->x[0] = s;
    t ^= t << 23;       // a
    t ^= t >> 18;       // b -- Again, the shifts and the multipliers are tunable
    t ^= s ^ (s >> 5);  // c
    state->x[1] = t;
    return t + s;
}
*/

function uint8ArrayToU64(data: Uint8Array): u64 {
    return (
      ((0xff & data[0]) << 56) |
      ((0xff & data[1]) << 48) |
      ((0xff & data[2]) << 40) |
      ((0xff & data[3]) << 32) |
      ((0xff & data[4]) << 24) |
      ((0xff & data[5]) << 16) |
      ((0xff & data[6]) << 8) |
      ((0xff & data[7]) << 0)
    );
}

export function rng_xorshift128p_seed(): Array<u64> {
    let vrf_seed = math.randomSeed();
    let seed = new Array<u64>();
    seed.push(uint8ArrayToU64(vrf_seed))
    seed.push(uint8ArrayToU64(vrf_seed.slice(8,16)))
    return seed;
}

//TODO what happens if this goes out of bounds (rollover or becomes bigint)
function rng_xorshift128p_round(seed: Array<u64>): u64 {
    let t = seed[0]
    let s = seed[1]
    seed[0] = s
    t ^= t << 23
    t ^= t >> 18
    t ^= s ^ (s >> 5)
    seed[1] = t
    return t+s
}

export function rng_next(seed: Array<u64>): u64 {
    return rng_xorshift128p_round(seed)
}

export function rng_next_u64(seed: Array<u64>, max: u64): u64 {
    let random_number = rng_next(seed)
    return random_number % max;
}