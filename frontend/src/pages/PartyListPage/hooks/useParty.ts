import { Party, User } from "common/types";
import { useCallback, useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";

export const changePeopleCountInParty = (
  parties: Party[],
  isModified: User[],
  index: number
) => {
  let output = [...parties];
  if (isModified) {
    let joinedParty = output[index];
    joinedParty.users.push({ email: "", username: "" });
    output[index] = joinedParty;
  }
  return output;
};

const useParty = () => {
  const [parties, setParties] = useState<Party[]>([]);

  const getParties = async () => {
    const res = await Axios.get("/parties");
    if (res.data) {
      setParties(res.data);
    }
  };

  const onJoinClick = useCallback(
    (party: Party, index: number) => () => {
      const joinParty = async () => {
        const res = await Axios.put("/parties/join", {
          partyId: party._id,
        });
        if (res.data?.nModified === 1) {
          Swal.fire({
            title: "เข้าร่วมปาร์ตี้แล้ว",
            icon: "success",
            showCloseButton: false,
            showCancelButton: false,
            showConfirmButton: false,
          });
          setParties(
            changePeopleCountInParty(parties, res.data.nModified, index)
          );
        } else if (res.data?.nModified === 0) {
          Swal.fire({
            title: "คุณได้เข้าร่วมปาร์ตี้นี้แล้ว",
            icon: "error",
            showCloseButton: false,
            showCancelButton: false,
            showConfirmButton: false,
          });
        }
      };
      joinParty();
    },
    [parties]
  );
  return {
    onJoinClick,
    parties,
    getParties,
  };
};

export default useParty;
