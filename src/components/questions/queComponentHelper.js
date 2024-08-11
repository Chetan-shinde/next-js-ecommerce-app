export const getListOfMqToShow = (question, value, questionsList) => {
  let dep_que_show_list = [];
  let dep_ques_hide_list = [];
  question.que_input_details.forEach((item) => {
    if (item.input_value === value) {
      if (item.dep_que_show_list.length) {
        dep_que_show_list = item.dep_que_list;
      }
      if (item.dep_ques_hide_list.length) {
        dep_ques_hide_list = item.dep_que_list;
      }
    }
  });

  if (dep_que_show_list.length == 0 && dep_ques_hide_list.length == 0) {
    return questionsList;
  }

  const upDateQueList = questionsList.map((item) => {
    if (dep_que_show_list.includes(item.id)) {
      return { ...item, show: true };
    }
    if (dep_ques_hide_list.includes(item.id)) {
      return { ...item, show: false };
    }

    return item;
  });

  return upDateQueList;
};
