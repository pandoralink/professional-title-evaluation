import axios from "@/utils/axios";
import { TalentIntroductionMaterial } from "@/@types/model";

export const insertTalentIntroductionMaterial = (
  data: TalentIntroductionMaterial
) => {
  return axios({
    url: "/talentIntroductionmaterial",
    method: "post",
    data,
  });
};

export const updateTalentIntroductionMaterial = (
  data: TalentIntroductionMaterial
) => {
  return axios({
    url: "/talentIntroductionmaterial",
    method: "put",
    data,
  });
};

export const deleteTalentIntroductionMaterial = (id: number) => {
  return axios({
    url: "/talentIntroductionmaterial",
    method: "delete",
    data: {
      id,
    },
  });
};
