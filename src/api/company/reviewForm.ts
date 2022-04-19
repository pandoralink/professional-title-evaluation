import axios from "@/utils/axios";

export const getReviewForm = () => {
  return axios({
    url: "/department/reviewform",
    method: "get",
  });
};
