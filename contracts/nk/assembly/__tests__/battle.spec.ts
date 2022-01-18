import { u128, VMContext } from "near-sdk-as";
import { battle } from "..";

const alice = "alice";

describe("battle", () => {
  it("should battle in 1", () => {
    VMContext.setSigner_account_id(alice);
    let res = battle(1);
    assert(res, 1)
  });
});